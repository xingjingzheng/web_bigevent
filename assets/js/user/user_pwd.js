$(function(){
//      利用 `form.verify()`  来定义规则
// - 长度必须是6到12位
// - 不能与旧密码一致
// - 两次密码是否相同
 // 表单验证功能
 var form= layui.form
 form.verify({
    newPwd: function(value){ //value：表单的值、item：表单的DOM对象
      if(value !==$('[name = rePwd]').val()){
        return '新旧密码不一致';
      }
    },
    rePwd:function(value){ //value：表单的值、item：表单的DOM对象
        if(value !==$('[name = newPwd]').val()){
          return '新旧密码不一致';
        }
      }
    
    ,pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] 
  });  
//   重置功能的实现
$('.layui-form').on('submit',function(e){
    e.preventDefault();
    var data =$('.layui-form').serialize();
    $.ajax({
        method:'POST',
        url:'/my/updatepwd',
        data,
        success:function(res){
         if (res.status !== 0) {
             return layui.layer.msg('更新密码失败')
         }
         layui.layer.msg('更新密码成功')
         $('.layui-form')[0].reset();
        }
    })
})


})