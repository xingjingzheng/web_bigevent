$(function(){
    // 表单验证功能
    var form= layui.form
    form.verify({
        nickname: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(value.length >6){
              return '字符必须在1~6之间';
            }
          }
      }) ;
      initUserInfo(); 
      // 初始化用户信息
function initUserInfo(){
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function(res) {
      if (res.status !== 0) {
        return layer.msg('获取用户信息失败！')
      }
      form.val('formUserInfo', res.data)
    }
  })
}
// 点击重置
$('#btnReset').on('click',function(e){
    e.preventDefault();
    initUserInfo();
});


// 当更新客户信息时
$('.layui-form').on('submit',function(e){
  e.preventDefault();//阻止默认行为
  var data = $('.layui-form').serialize();
  $.ajax({
    method:'POST',
    url:'/my/userinfo',
    data,
    success:function(res){
      if (res.status == 1) {
        return layer.msg('更新用户信息失败！') 
      }
     layer.msg('更新用户信息成功！')
      // 调用父页面中的方法，重新渲染用户的头像和用户的信息
      window.parent.getUserInfo();
      console.log(window.parent);
     
    }
 

  })
 

});





})
