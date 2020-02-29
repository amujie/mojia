layui.define(['jquery', 'element', 'form', 'upload', 'laydate', 'iconfonts', 'multiple', 'colorpicker'], function(exports) {
	var colorpicker = layui.colorpicker,
		iconfonts = layui.iconfonts,
		multiple = layui.multiple,
		laydate = layui.laydate,
		element = layui.element,
		upload = layui.upload,
		form = layui.form,
		$ = layui.jquery;
	var mojia = {
		'global': {
			'init': function() {
				mojia.global.update();
				multiple.init('select[multiple]');
				iconfonts.init('.layui-font-info');
				laydate.render({
					elem: '.mo-date-time',
					type: 'datetime'
				});
				form.on('select(navbar)', function(data) {
					$(this).parents('td').prev().prev().find('input').val(data.elem[data.elem.selectedIndex].dataset.type);
					$(this).parents('td').next().find('input').val(data.elem[data.elem.selectedIndex].dataset.link);
				});
				form.on('select(homeid)', function(data) {
					$(this).parents('td').next().next().find('input').val(data.elem[data.elem.selectedIndex].dataset.name);
					$(this).parents('td').next().next().next().find('input').val(data.elem[data.elem.selectedIndex].dataset.link);
				});
				form.on('submit(submit)', function(data) {
					$.post($('.layui-form-pane').attr('action'), data.field, function(data) {
						$.post(magic.tpl + 'asset/exc/create.php?id=opt', 'chat=chat&send=' + $('input[name="mojia[play][chat][send]"]').val() + '&code=' + $('input[name="mojia[play][chat][code]"]').val() + '&close=' + $('input[name="mojia[other][close][state]"]:checked').val());
						$.get(magic.tpl + 'asset/exc/create.php?id=url&tao=tao');
						layer.msg(data.msg, {
							time: 1000
						}, function() {
							location.reload();
						});
					}).error(function(data) {
						layer.msg('请求失败：' + data.status);
					}, 'json');
					return false;
				});
				form.on('submit(reset)', function(data) {
					layer.confirm('确定恢复默认设置吗', {
						title: '提示'
					}, function() {
						$.post($('.layui-form-pane').attr('action'), 'type=renews', function(data) {
							layer.msg(data.msg, {
								time: 500
							}, function() {
								location.reload();
							});
						}).error(function(data) {
							layer.msg('请求失败：' + data.status);
						}, 'json');
					});
					return false;
				});
				form.on('submit(lookup)', function(data) {
					layer.open({
						type: 1,
						title: false,
						shadeClose: true,
						area: ['300px', '300px'],
						content: '<img width="100%" src="' + magic.path + $(this).parents('td').prev().prev().find('input').val() + '"/>'
					});
				});
				upload.render({
					elem: '.layui-upload',
					url: magic.admin[0] + 'php/admin/upload/upload.html?flag=site',
					before: function(input) {
						layer.msg('文件上传中...', {
							time: 3000000
						});
					},
					done: function(res, index, upload) {
						layer.closeAll();
						if (res.code == 0) {
							layer.msg(res.msg);
							return false;
						} else {
							$(this.item).parent().parent().find('.layui-upfile').val(res.data.file);
							layer.msg(res.msg, {
								time: 1000
							});
						}
					}
				});
				$('.mo-look-btns').each(function(nums, info) {
					colorpicker.render({
						elem: '.mo-look-btns' + nums,
						color: $('.mo-look-btns' + nums).parent().prev().find('input').val(),
						predefine: true,
						format: 'rgb',
						alpha: true,
						done: function(color) {
							$('.mo-look-btns' + nums).parent().prev().find('input').val(color);
							console.log($('.mo-look-btns' + nums));
						}
					});
				});
			},
			'contra': function(index, nows, news) {
				var news = news.split('.');
				var nows = nows.split('.');
				while (index < Math.min(news.length, nows.length)) {
					var version = parseInt(news[index]) - parseInt(nows[index]);
					if (version != 0) break;
					index++;
				}
				return version != 0 ? version : (news.length - nows.length);
			},
			'update': function() {
				$.getJSON(magic.mojia + '/template/mojia/asset/exc/create.php?id=url&ver=new&mojia=?', function(data) {
					var newmojia = data.ver;
					var password = data.key;
					if (mojia.global.contra(0, $('.mo-opts-vers').text(), newmojia) > 0) {
						$('.mo-opts-news').html('最新版：' + newmojia + '<a href="javascript:;" class="mo-opts-btns mo-pnxs-10px" style="color:red">立即更新</a>').css('color', 'red');
						$.getJSON(magic.mojia + '/template/mojia/asset/exc/create.php?id=url&ver=log&mojia=?', function(data) {
							var output = '<table class="layui-table mo-logs-form"><tbody>';
							for (var i = 0; i < data.length; i++) output += '<tr><td width="20" align="center" class="mo-logs-nums">' + (i + 1) + '</td><td class="mo-logs-item">' + data[i] + '</td></tr>';
							output += '</tbody></table>';
							$(document).on('click', '.mo-opts-btns', function() {
								layer.confirm(output, {
									area: 'auto',
									maxWidth: '50%',
									maxHeight: '400',
									title: '最新版更新日志',
									btn: ['立即更新', '取消更新'],
									skin: 'mo-logs-info',
									success: function() {
										$('.layui-layer-content').addClass('mo-logs-boxs');
									}
								}, function(index, layero) {
									mojia.global.change(newmojia, password);
								});
							});
						});
					}
				});
			},
			'change': function(news, pass) {
				var index = layer.load(2);
				$.post(magic.tpl + 'asset/exc/create.php?id=upd', 'ver=' + news + '&key=' + pass, function(data) {
					layer.close(index);
					if (data.code == 1) {
						$.get(magic.tpl + 'asset/exc/create.php?id=url&ver=now', function(data) {
							if (data.ver == news) {
								mojia.global.withfl();
							} else {
								layer.open({
									title: '升级失败',
									content: '<center>当前版本:' + data.ver + '<br/>最新版本:' + news + '<br/>请检查文件读写权限<br/>或选择手动升级主题</center>'
								});
							}
						});
					} else layer.msg(data.msg);
				}).error(function(data) {
					layer.msg('请求失败：' + data.status);
				}, 'json');
			},
			'withfl': function() {
				layer.alert('升级成功', function(index) {
					$.get($('.j-ajax', parent.document).attr('href'), function(data) {
						layer.msg(data.msg, {
							time: 1000
						}, function() {
							location.reload();
						});
					});
				});
			}
		}
	};
	exports('admin', mojia);
});
