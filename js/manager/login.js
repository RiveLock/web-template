layui.use(['form' ,'layer'], function() {
    var form = layui.form;
    var layer = layui.layer;
    form.on("submit(login)",function () {
        login();
        return false;
    });
})

function login(){
    var loginName=$("#loginName").val();
    var loginPassword=$("#loginPassword").val();
    var rememberMe = $("#rememberMe").val(); 
    console.log(rememberMe);

    var jsonStr = {"loginName":loginName,"loginPassword":loginPassword,"rememberMe":rememberMe};
    var data=JSON.stringify(jsonStr);
    

    $.ajax({
        type: 'post',
        url: nginx_url+'/mananger/login',
        //url: 'http://localhost:8082/member/login',
        data: data,
        dataType: 'json',
        async: false,
        contentType:"application/json",
        success: function (result) {
            console.log(result);
            if (result.head.status === 200) {
                //$.cookie("loginId", result.USER.loginId);
                window.location.href = './home/home.html';
            } else{
                layer.alert(result.head.message);
            }
        }
    });
}