$(function(){
   // 点击“去注册账号”的链接
   $('#link_reg').on('click', function() {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_login').on('click', function() {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  // 从 layui 中获取 form 对象
  var form = layui.form

  layui.code
form.verify({
  pwd: [
    /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
  ], 
  repwd: function(value){ //value：表单的值、item：表单的DOM对象
    var pwd = $('.reg-box [name=password]').val()
    if(pwd !=value){
      return '请输入相同密码';
    } 
  }
});  
// 监听表单的提交
// 监听注册表单的提交事件
$('#form_reg').on('submit', function(e) {
  // 1. 阻止默认的提交行为
  e.preventDefault()
  // 2. 发起Ajax的POST请求
  var data = {
    username: $('#form_reg [name=username]').val(),
    password: $('#form_reg [name=password]').val()
  }
  $.post('/api/reguser', data, function(res) {
    if (res.status !== 0) {
      return layer.msg(res.message)
    }
 layer.msg('注册成功，请登录！')
    $('#link_login').click()
  })
})

// // 监听注册列表事件
// $('#form_reg').on('submit', function(e) {
//   // 1. 阻止默认的提交行为
//   e.preventDefault()
//   // 2. 发起Ajax的POST请求
//  var data = $('#form_reg').serialize();
//  $.ajax({
//    method:"post",
//    url:'/api/reguser',
//    data,
//    success:function(){
//      if(res.status !==0 ){
//        return layer.msg(res.message)
//      }
//      layer.msg('注册成功，请登录')
//     //  模拟人的点击行为
//      $('#link_login').click()
//    }
//  })
// })
// 发起登录请求
var layer = layui.layer//使用layui 的提示框
$('#form_login').on('submit',function(e){
  e.preventDefault();
  var data = $(this).serialize();
  $.ajax({
    method:'post',
    url:'/api/login',
    data,
    success:function(res){
      if (res.status !==0) {
        return layer.msg('登录失败')
      }
      layer.msg('登录成功')
      // 登录成功得到token字符串 保存到locaStorage
      localStorage.setItem('token',res.token)
      location.href = '/code/index1.html'      
    },
  

  })


})


})