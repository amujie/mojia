layui.define(['mojia', 'iconfonts', 'multiple'], function(exports) {
	var $ = layui.jquery;
	var mojia = {
		'global': {
			'init': function() {
				layui.util.fixbar();
				mojia.global.update(0);
				layui.mojia.moload.mojia();
				layui.multiple.init('select[multiple]');
				layui.iconfonts.init('.layui-font-info');
				layui.laydate.render({
					elem: '.mo-date-time',
					type: 'datetime'
				});
				layui.form.on('select(navbar)', function(data) {
					$(this).parents('td').prev().prev().find('input').val(data.elem[data.elem.selectedIndex].dataset.type);
					$(this).parents('td').next().find('input').val(data.elem[data.elem.selectedIndex].dataset.link);
				});
				layui.form.on('select(homeid)', function(data) {
					$(this).parents('td').next().next().find('input').val(data.elem[data.elem.selectedIndex].dataset.name);
					$(this).parents('td').next().next().next().find('input').val(data.elem[data.elem.selectedIndex].dataset.link);
				});
				layui.form.on('select(iconer)', function(data) {
					if (data.value == 'artist') {
						$(this).parents('td').next().find('.layui-form-select').addClass('mo-cols-show').removeClass('mo-cols-hide');
						$(this).parents('td').next().find('.layui-font-select').addClass('mo-cols-hide').removeClass('mo-cols-show');
					} else {
						$(this).parents('td').next().find('.layui-form-select').addClass('mo-cols-hide').removeClass('mo-cols-show');
						$(this).parents('td').next().find('.layui-font-select').addClass('mo-cols-show').removeClass('mo-cols-hide');
					}
				});
				layui.form.on('submit(submit)', function(data) {
					$.post($('.layui-form-pane').attr('action'), data.field, function(data) {
						$.post(magic.tpl + 'asset/exc/create.php?id=opt', 'chat=chat&send=' + $('input[name="mojia[play][chat][send]"]').val() + '&code=' + $('input[name="mojia[play][chat][code]"]').val() + '&close=' + $('input[name="mojia[other][close][state]"]:checked').val());
						$.post(magic.tpl + 'asset/exc/create.php?id=url', 'tao=tao');
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
				layui.form.on('submit(reset)', function(data) {
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
				layui.form.on('submit(lookup)', function(data) {
					var image = $(this).parents('td').prev().prev().find('input').val();
					layer.open({
						type: 1,
						title: false,
						shadeClose: true,
						area: ['300px', '300px'],
						content: '<img width="100%" src="' + (image.indexOf('//') != -1 ? image : magic.path + image) + '"/>'
					});
				});
				layui.form.on('submit(colour)', function(data) {
					$(data.elem).css({
						'color': '#ffffff',
						'background-color': data.elem.dataset.back
					}).parent().siblings('td').find('button').removeAttr('style');
					$('input[name="mojia[color][type][name]"]').val(data.elem.dataset.type);
					var color = data.elem.dataset.color.split(',');
					for (var i = 0; i < color.length; i++) {
						$('.mo-look-btns' + [i]).parent().prev().find('input').val(color[i]);
					}
				});
				layui.upload.render({
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
					layui.colorpicker.render({
						elem: '.mo-look-btns' + nums,
						color: $('.mo-look-btns' + nums).parent().prev().find('input').val(),
						predefine: true,
						format: 'rgb',
						alpha: true,
						done: function(color) {
							$('.mo-look-btns' + nums).parent().prev().find('input').val(color);
						}
					});
				});
				$(document).ready(function() {
					$('select[name="mojia[nav][icon][artid]"]').next().addClass($('select[name="mojia[nav][icon][artid]"]').attr('class'));
					$('select[name="mojia[nav][font][artid]"]').next().addClass($('select[name="mojia[nav][font][artid]"]').attr('class'));
				});
			},
			'latest': function(index) {
				var href = ['@master', '', '@latest'];
				return 'https://cdn.jsdelivr.net/gh/amujie/mojia' + href[index] + '/info.ini';
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
			'record': function(newmojia, password) {
				$.post(magic.tpl + 'asset/exc/create.php?id=url', 'ver=log&new=' + encodeURIComponent('https://cdn.jsdelivr.net/gh/amujie/mojia@' + newmojia + '/about/changelog.json'), function(data) {
					var output = '<table class="layui-table mo-logs-form"><tbody>';
					for (var i = 0; i < data[newmojia].length; i++) output += '<tr><td width="20" align="center" class="mo-logs-nums">' + (i + 1) + '</td><td class="mo-logs-item">' + data[newmojia][i] + '</td></tr>';
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
			},
			'update': function(count) {
				$('.layui-body', parent.document).css('overflow-y', 'hidden');
				$.post(magic.tpl + 'asset/exc/create.php?id=url', 'ver=new&cdn=' + encodeURIComponent(mojia.global.latest(count)), function(data) {
					if (mojia.global.contra(0, $('.mo-opts-vers').text(), data.ver) > 0) {
						$('.mo-opts-news').html('最新版：' + data.ver + '<a href="javascript:;" class="mo-opts-btns mo-pnxs-10px" style="color:red">立即更新</a>').css('color', 'red');
						mojia.global.record(data.ver, data.key);
					} else if (count < 2) {
						mojia.global.update(count + 1);
					}
				});
			},
			'change': function(news, pass) {
				var index = layer.load(2);
				$.post(magic.tpl + 'asset/exc/create.php?id=upd', 'ver=' + news + '&key=' + pass, function(data) {
					layer.close(index);
					if (data.code == 1) mojia.global.withfl(news);
					else layer.msg(data.msg);
				}).error(function(data) {
					layer.msg('请求失败：' + data.status);
				}, 'json');
			},
			'withfl': function(news) {
				$.post(magic.tpl + 'asset/exc/create.php?id=opt', 'tpl=mojia-' + news, function(data) {
					if (data.msg == 'mojia-' + news) {
						layer.alert('升级成功', function(index) {
							$.post($('.j-ajax', parent.document).attr('href'), function(data) {
								layer.msg((data.msg ? data.msg : '请手动清除缓存'), {
									time: 1000
								}, function() {
									location.reload();
								});
							});
						});
					} else {
						layer.open({
							title: '升级失败',
							content: '<center>主题下载成功<br/>但未自动更换为最新主题<br/>请前往系统设置切换主题为<br/>mojia-' + news + '</center>'
						});
					}
				});
			}
		}
	};
	exports('admin', mojia);
});
