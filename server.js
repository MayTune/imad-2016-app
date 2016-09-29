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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName',function(req,res){
    var articleName=req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});
var coumter=0;

app.get('/coumter',function(req,res){
    counter=counter+1;
    res.send(coumter.toString);
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
