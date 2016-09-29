console.log('Loaded!');
var hi=document.getElementById("maintext");
hi.innerHTML="Hi there!";
var pic=document.getElementById("madi");
var marginLeft=0;
function moveRight()
{
    marginLeft=marginLeft+10;
    pic.style.marginLeft=marginLeft+'px';
}
pic.onclick=function(){
    var interval=setInterval(moveRight,10);
    pic.style.marginLeft="100px";
}