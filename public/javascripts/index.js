window.onload=function(){
  // sign in && sign out page
  // if判断后可以防止在非注册，登陆页面找不到dom对象而报错
  if(window.location.hash==="#signup"||window.location.hash==="#signin"||window.location.pathname==="/user/signin"){
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
 
  if(window.location.pathname==="/"){
    var tech=document.getElementById('tech');
    var top=document.getElementById('top');
    var financial=document.getElementById('financial');
    var sport=document.getElementById('sport');
    var social=document.getElementById('social');

    tech.onclick=function(){
      window.location.href='/news'
    }
  }
if(window.location.pathname==="/news"){
  // ajax({
  //         type:"get",
  //         url:"http://localhost:3000",
  //         before:function(){
  //           console.log("before");  
  //         },
  //         success:function(str){
  //             window.str=str;
  //             console.log('success')
  //         },
  //         error:function(){
  //             console.log("error");
  //         }
  //     });
  }
}
  


