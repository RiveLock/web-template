var pathUri = window.location.href;
var token = $.cookie("token");
$(function() {
	layui.use('element', function() {
		var element = layui.element;
		console.log(token);
		// 左侧导航区域（可配合layui已有的垂直导航）
		$.ajax({
			type: 'get',
			url: nginx_url + '/mananger/getUserPerms',
			beforeSend: function(request) {
				request.setRequestHeader("token", token);
			},
			success: function(result) {
				console.log(result);
				if(result.head.status === 200) {
					getMenus(result.data.perms);
					element.render('nav');
				} else {
					layer.alert(result.head.message);
					window.location.href="../login.html";
				}
			}
		});

		/*$.get(nginx_url+"/mananger/getUserPerms",{"token":token},function(data){
		    if(data.head.status === 200){
		        getMenus(data.data.perms);
		        element.render('nav');
		    }else{
		        layer.alert("权限不足，请联系管理员",function () {
		            //退出
		            window.location.href="../login.html";
		        });
		    }
		});*/
	});
})
var getMenus = function(data) {
	console.log("111" + data);
	//回显选中
	var ul = $("<ul class='layui-nav layui-nav-tree' lay-filter='test'></ul>");
	for(var i = 0; i < data.length; i++) {
		var node = data[i];
		console.log(node)
		var li = $("<li class='layui-nav-item' flag='" + node.id + "'></li>");
		var a = $("<a class='' href='javascript:;'>" + node.name + "</a>");
		li.append(a);
		//获取子节点
		var childArry = node.childrens;
		console.log(childArry);
		if(childArry.length > 0) {
			a.append("<span class='layui-nav-more'></span>");
			var dl = $("<dl class='layui-nav-child'></dl>");
			for(var y in childArry) {
				var dd = $("<dd><a href='.." + childArry[y].url + "'>" + childArry[y].name + "</a></dd>");
				//判断选中状态
				if(pathUri.indexOf(childArry[y].url) > 0) {
					li.addClass("layui-nav-itemed");
					dd.addClass("layui-this")
				}
				dl.append(dd);
			}
			li.append(dl);
		}
		ul.append(li);
	}
	$(".layui-side-scroll").append(ul);
}

function logout() {
	$.ajax({
		type: 'get',
		url: nginx_url + '/mananger/logout',
		async: false,
		beforeSend: function(request) {
				request.setRequestHeader("token", token);
		},
		success: function(result) {
			if(result.head.status === 200) {
				$.cookie("token", null);
				window.location.href = '../login.html';
			} else {
				layer.alert(result.head.message);
			}
		}
	});
}