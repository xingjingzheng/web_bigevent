$(function () {
    getData();
    //获取数据
    var layer = layui.layer
    var form = layui.form
    function getData() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status == 0) {
                    // 调用template函数
                    var htmlStr = template('tp-tabl', res)
                   
                    // 渲染结构
                    $('tbody').html(htmlStr)
                }
            }
        })
    }
    // 当鼠标点击添加类别时
    var indexAdd = null
    $('#addClassCato').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章类型'
            , content: $('#dialog-add').html()
        });
        //    监听layui-form提交
        $('.layui-form').on('submit', function (e) {
            e.preventDefault();
            var data = $(this).serialize();
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('发表失败')
                    }
                    getData();
                    layer.msg('发表成功');
                    layer.close(indexAdd)

                }
            })
        })
    })
    // 当点击编辑时显示文档 因为后来创建所以要委托
    var indexEdit = null
    $('tbody').on('click', '.layui-btn-xm', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章介绍'
            , content: $('#bialog-add').html()
        });
        // 获取当前点击的id
        var id = $(this).attr('data-id')
        console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                console.log(res.data);
                form.val('form-edit', res.data)
                console.log(form.val('form-edit'));
            }
        })
        $('body').on('submit', '#form-edit', function (e) {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('更新分类数据失败！')
                    }
                    layer.msg('更新分类数据成功！')
                    layer.close(indexEdit)
                    getData();
                },
                error:function(){
                   console.log(arguments);
                }
            })
        })
    })


    // 删除功能的实现
    $('tbody').on('click','.delete',function(){
        var id = $(this).attr('data-id')
        console.log(id);
        layer.confirm('确定是否删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                  if (res.status !== 0) {
                      return layer.msg('删除失败')
                  }
                  layer.msg('删除成功')
                  getData();
                  layer.close(index);

                }
            })

          });

    })











})