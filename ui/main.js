var button=document.getElementById("click");
button.onclick=function(){
    
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readystate===XMLHttpRequest.DONE){
            if(request.status===200)
            {
               var counter=JSON.parse(request.responseText); 
               var span=document.getElementById("count");
    span.innerHTML=counter.toString();
            }
        }
    };
  
    request.open('GET','http://maytune.imad.hasura-app.io/counter',true);
    request.send(null);
};