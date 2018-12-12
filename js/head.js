layui.use('element', function(){
    var element = layui.element;
    /* //监听导航点击
    element.on('nav(test)', function(elem){
    console.log(elem)
    layer.msg(elem.text());
  }); */
});


function logout(){
  $.ajax({
    type: 'get',
    url: nginx_url+'/mananger/logout',
    async: false,
    success: function (result) {
        console.log(result);
        if (result.head.status === 200) {
        
            window.location.href = 'login.html';
        } else{
            layer.alert(result.head.message);
        }
    }
});
}



