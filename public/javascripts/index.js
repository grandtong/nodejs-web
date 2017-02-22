window.onload=function(){
  // if判断后可以防止在非注册，登陆页面找不到dom对象而报错
  if(window.location.hash==="#signup"||window.location.hash==="#signin"||window.location.pathname==="/user"){
    var signin=document.getElementById('signIn');
    var signup=document.getElementById('signUp');
    var sin=document.getElementById('sin');
    var sup=document.getElementById('sup');
    sin.onclick=function(){
      signup.style.display="none";
      signin.style.display="block";
      sup.style.border= "none";
      sin.style.border="1px solid #777";
    }
    sup.onclick=function(){
      signin.style.display="none";
      signup.style.display="block";
      sin.style.border= "none";
      sup.style.border="1px solid #777";
    }
  }
 
}

