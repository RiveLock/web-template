layui.use(['form', 'layer'], function() {
	var form = layui.form;
	var layer = layui.layer;
	form.on("submit(login)", function() {
		login();
		return false;
	});
})

if($.cookie('bit') === 'true') {
	$('#rememberMe').attr('checked', 'checked');
	$('#loginName').val($.cookie('loginName'));
	$('#loginPassword').val($.cookie('loginPassword'));
}

function login() {
	var loginName = $("#loginName").val();
	var loginPassword = $("#loginPassword").val();

	var jsonStr = {
		"loginName": loginName,
		"loginPassword": loginPassword
	};
	var data = JSON.stringify(jsonStr);

	$.ajax({
		type: 'post',
		url: nginx_url + '/mananger/login',
		//url: 'http://localhost:8082/member/login',
		data: data,
		dataType: 'json',
		async: false,
		contentType: "application/json",
		success: function(result) {
			console.log(result);
			if(result.head.status === 200) {
				if($('#rememberMe').is(':checked')) {
					$.cookie('loginName', loginName, {
						expires: 365
					});
					$.cookie('loginPassword', loginPassword, {
						expires: 365
					});
					$.cookie('bit', 'true', {
						expires: 365
					});
				} else {
					$.removeCookie('loginName');
					$.removeCookie('loginPassword');
					$.removeCookie('bit');
				}
				$.cookie("token", result.data.token);

				window.location.href = './home/home.html';
			} else {
				layer.alert(result.head.message);
			}
		}
	});
}