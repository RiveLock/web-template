layui.use(['form' ,'layer'], function() {
    var form = layui.form;
    var layer = layui.layer;
    form.on("submit(login)",function () {
        login();
        return false;
    });
})

function login(){
    var username=$("#username").val();
    var password=$("#password").val();
    var rememberMe = $("#rememberMe").val();
    console.log(username);
    /* $.post("/user/login",$("#useLogin").serialize(),function(data){
        if(data.code == 1){
            window.location.href=data.url;
        }else{
            layer.alert(data.message,function(){
                layer.closeAll();//关闭所有弹框
            });
        }
    }); */
}