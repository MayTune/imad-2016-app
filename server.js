var Pool=require('pg').Pool;
var config= {
    user : 'maytune',
    database : 'maytune',
    host: 'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
var crypto=require('crypto');
var bodyParser=require('body-parser');
app.use(morgan('combined'));
app.use(bodyParser.json());
function createTemplate(data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    var htmlTemplate=
    `<html>
        <head>
             <link href="/ui/style.css" rel="stylesheet" />
            <title>${title}</title>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <style>
                .container{
                    max-width: 800px;
        margin: 0 auto;
        color: grey;
        font-family: sans-serif;
        padding-top: 80px;
        padding-left: 20px;
        padding-right: 20px;
                }
                
            </style>
        </head>
        <body>
            <div class="container">
            <div>
                <a href='/'>Home</a>
            </div>
            <hr>
            <h3> ${heading}</h3>
            <div>
                ${date.toDateString()}
            </div>
            <div>
                ${content}
            </div>
            </div>
        </body>
    </html>`
    
    ;
    return htmlTemplate;
}
function hash(input,salt)
{
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512, 'sha512');
    return["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res){
   var hashedString=hash(req.params.input,'random');
   res.send(hashedString);
});
app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    pool.query('INSERT INTO "User"(username,password) VALUES($1,$2)',[username,dbString],function(err,result){
        if(err){
           res.status(500).send(err.toString());
       } 
       else{
           res.send("User created successfully : "+username);
       }
    });
});
app.post('/login',function(req,res){
     var username=req.body.username;
    var password=req.body.password;
    var dbString=hash(password,salt);
    pool.query('SELECT * FROM  "User" WHERE username=$1'[username],function(err,result){
        if(err){
           res.status(500).send(err.toString());
       } 
       else{
           if(result.rows.length===0)
           {
               res.send(403).send("User not found");
           }
           else{
               var dbString=result.rows[0].password;
               var salt=dbString.split('$1')[2];
               var hashedPassword=hash(password,salt);
               if(hashedPassword==dbString)
               {
                   res.send('Credentials correct');
               }
               else
               {
                   res.send(403).send('Username/Password incorrect');
               }
           }
           }
    });
});
var pool = new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM TEST',function(err,result){
       if(err){
           res.status(500).send(err.toString());
       } 
       else{
           res.send(JSON.stringify(result));
       }
    });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/articles/:articleName',function(req,res){
    
    pool.query("SELECT * FROM article WHERE title=$1",[req.params.articleName],function(err,result){
        if(err){
           res.status(500).send(err.toString());
        }
           else{
               if(result.rows.length===0){
                   res.status(404).send('Article not found');
               }
               else
               {
                   var articleData=result.rows[0];
                   res.send(createTemplate(articleData));
               }
           }
    });
   
});

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
