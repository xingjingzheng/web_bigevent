$(function () {
  getUserInfo();

})
// 获取用户信息
// var token = localStorage.getItem('token')
// console.log(token);
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    //headers 请求配置对象
    headers: {
      Authorization:
        localStorage.getItem('token') || ''
    },

    success: function (res) {
      // console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg('获取信息失败')
      };
      renderAvatar(res.data);
      // console.log(res.data);
    },
    // error:function(result){
    //    action()
    //   }
    complete: function (res) {
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
         
      }
    }

  })
}

// 渲染页面
// function renderAvatar(data) {
//   var username = data.username || data.nickname
//   var src = data.user_pic
//   // console.log(src);
//   // 渲染文本
//   $('#welcome').html('欢迎' + username)
//   // 渲染头像
//   // 如果头像不为空
//   if (src !== null) {
//     $('.layui-nav-img').prop('src', src).show();
//     $('.text-avatar').hide()
//   } else {//如果头像为空显示为本
//     $('.layui-nav-img').prop('src', src).hide();
//     var first = username[0].toUpperCase()
//     $('.text-avatar').html(first).show
//   }
// }
// 渲染用户的头像
function renderAvatar(user) {
  // 1. 获取用户的名称
  var name = user.nickname || user.username
  // 2. 设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 3. 按需渲染用户的头像
  if (user.user_pic !== null) {
    // 3.1 渲染图片头像
    $('.layui-nav-img')
      .attr('src', user.user_pic)
      .show()
    $('.text-avatar').hide()
  } else {
    // 3.2 渲染文本头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar')
      .html(first)
      .show()
  }
}
// 点击关闭页面
var layer = layui.layer
$('#btnLogout').on('click', function () {
  // 用layer的模板
  layer.confirm('确定退出登录吗?', { icon: 3, title: '提示' }, function (index) {
    //do something
    // location.href = '/login.html'
    location.href= '/code/login.html'
    localStorage.removeItem('token')
    layer.close(index);
    // 当点击关闭时 移除内存
    // 跳转页面
  });


})
