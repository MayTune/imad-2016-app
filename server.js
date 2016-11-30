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
app.use(morgan('combined'));

var articles=
{
    'article-one':{
        title:'Article-one',
        heading:'Article-one',
        date:'Sept 22,2016',
        content:` <p>
                    Hi there, I am Maytune 
                    </p>
                <p>
                I like making webapps
                </p>
                <p>
                Would you like to learn too?
                </p>
                <p>
                Its quite easy!
                </p> `
        
    },
    'article-two': {
     title:'Article-two',
    heading:'Article-two',
    date:'Sept 22,2016',
    content:` <p>
                Hi there, I am Maytune 
                </p>
            <p>
            I like making webapps
            </p>
            <p>
            Would you like to learn too?
            </p>
            <p>
            Its quite easy!
            </p> `
},
    'article-three':{
     title:'Article-three',
    heading:'Article-three',
    date:'Sept 22,2016',
    content:` <p>
                Hi there, I am Maytune 
                </p>
            <p>
            I like making webapps
            </p>
            <p>
            Would you like to learn too?
            </p>
            <p>
            Its quite easy!
            </p> `
}
};
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
                ${date}
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
    
    pool.query("SELECT * FROM article WHERE title='"+req.params.articleName+"'",function(err,result){
        if(err){
           res.status(500).send(err.toString());
        }
           else{
               if(result.rows.length===0){
                   res.status(404).send('Article not found');
               }
               else
               {
                   var articleData=sesult.rows[0];
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
