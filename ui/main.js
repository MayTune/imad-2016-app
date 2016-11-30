var submit=document.getElementById('submit_btn');
submit.onclick=function(){
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            if(request.status===200)
            {
               console.log('User logged in');
               alert('Logged in successfully');
            }
            else if(request.status===403)
            {
                alert('Username/Password incorrect');
            }
            else 
            {
                alert('Something went wrong on the server');
            }
        }
    };
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST','http://maytune.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
    
};


var button=document.getElementById("click");
button.onclick=function(){
    
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            if(request.status===200)
            {
               var counter=request.responseText; 
               var span=document.getElementById("count");
               span.innerHTML=counter;
            }
        }
    };
  
    request.open('GET','http://maytune.imad.hasura-app.io/counter',true);
    request.send(null);
};