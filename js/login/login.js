layui.use(['layer', 'form', 'jquery'], function() {
    let $ = layui.jquery,
        layer = layui.layer,
        form = layui.form;
    
    form.on('submit(login)', function () {
        let index = layer.load();

        var loginName = $('#loginname').val();
        var loginPassword = $('#password').val();

        var jsonStr = {"loginName":loginName,"loginPassword":loginPassword};
        var data=JSON.stringify(jsonStr);

        $.ajax({
            type: 'post',
            //url: nginx_url + '/member/login/user',
            url: 'http://localhost:8082/member/login/user',
            data: data,
            dataType: 'json',
            async: false,
            contentType:"application/json",
            success: function (result) {
                 if (result.head.status === 200) {
                    //$.cookie("loginId", result.USER.loginId);
                    setTimeout(function() {
                        layer.close(index);
                        layer.msg('登录成功', {
                            time: 800,
                            icon: 1
                        }, function () {
                            //window.location.href = 'index.html';
                        });
                    }, 800);
                } else{
                    layer.alert(result.head.message);
                }
            }
        });
        return false;
    });
});
