(function(){

  //h5选择器，注册表单的DOM元素
  var signUpGroup=document.querySelectorAll('#signUp .group-input')[0]; 
  var upName= signUpGroup.children[0].children[0];
  var upTel= signUpGroup.children[1].children[0];
  var upPassword = signUpGroup.children[2].children[0];
  var upRePass = signUpGroup.children[3].children[0];
  var upBtn= document.querySelector('#signUp button');

// 登录表单的DOM元素
  var signInGroup=document.querySelectorAll('#signIn .group-input')[0];
  var inTel= signInGroup.children[0].children[0];
  var inPass= signInGroup.children[1].children[0];
  var inBtn= document.querySelector('#signIn button');

// 创建判断错误个数的变量
var errNum=0;

// 判断是否为密码
function isPasswd(s){
  var patrn=/^(\w){6,20}$/;
  if (!patrn.exec(s)) return false
  return true
}

// 判断是否为电话号
function isTel(s){
  var patrn=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
  if (!patrn.exec(s)) return false
  return true
}

// 判断是否为姓名，必须有中文（就是这么霸道）。
function isName(s){
  var patrn=/[\u4e00-\u9fa5]/gm ;
  if (!patrn.exec(s)) return false
  return true
}


  // 判断用户名        
upName.onblur=function(){
  if(isName(upName.value)) {
    this.nextSibling.innerHTML="yes";
    this.nextSibling.style.color="green";
  }
  else {
    this.nextSibling.innerHTML="no";
    this.nextSibling.style.color="red";
    errNum+=1;
  }
}

  // 判断手机号
upTel.onblur=function(){
  if(isTel(upTel.value)) {
    this.nextSibling.innerHTML="yes";
    this.nextSibling.style.color="green";
  }
  else {
    this.nextSibling.innerHTML="no";
    this.nextSibling.style.color="red";
  }
}

  // 判断密码格式
upPassword.onblur=function(){
  if(isPasswd(upPassword.value)) {
    this.nextSibling.innerHTML="yes";
    this.nextSibling.style.color="green";
  }
  else {
    this.nextSibling.innerHTML="no";
    this.nextSibling.style.color="red";
  }
}

upRePass.onblur=function(){
  if(this.value===upPassword.value){
    this.nextSibling.innerHTML="yes";
    this.nextSibling.style.color="green";
  }
  else {
    this.nextSibling.innerHTML="no";
    this.nextSibling.style.color="red";
  }
}


})()