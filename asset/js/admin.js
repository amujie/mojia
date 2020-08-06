layui.define(['income', 'iconfonts', 'multiple', 'sortable'], function(exports) {
	var $ = layui.jquery;
	var mojia = {
		'global': {
			'init': function() {
				layui.income.global.init();
				layui.iconfonts.init('.layui-font-info');
				layui.multiple.init('select[multiple]');
				mojia.global.update();
				mojia.global.seokey();
				mojia.global.browse();
				layui.util.fixbar();
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
					$(this).parents('td').prev().find('input').next().find('span').find('i').attr('class', 'mo-icon-font ' + data.elem[data.elem.selectedIndex].dataset.icon);
					$(this).parents('td').prev().find('input').val(data.elem[data.elem.selectedIndex].dataset.icon);
					$(this).parents('td').next().find('input').val(data.elem[data.elem.selectedIndex].dataset.url);
					if (data.value == 'artist') {
						$(this).parents('td').next().find('.layui-form-select').addClass('mo-cols-show').removeClass('mo-cols-hide');
						$(this).parents('td').next().find('.layui-font-select').addClass('mo-cols-hide').removeClass('mo-cols-show');
					} else {
						$(this).parents('td').next().find('.layui-form-select').addClass('mo-cols-hide').removeClass('mo-cols-show');
						$(this).parents('td').next().find('.layui-font-select').addClass('mo-cols-show').removeClass('mo-cols-hide');
					}
				});
				layui.form.on('submit(submit)', function(data) {
					layer.load(2);
					$.post($('.layui-form-pane').attr('action'), data.field, function(data) {
						layer.closeAll();
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
						$.post($('.layui-form-pane').attr('action'), 'def=renews', function(data) {
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
				layui.form.on('submit(seokey)', function(data) {
					layer.confirm('确定恢复SEO默认设置吗', {
						title: '提示'
					}, function() {
						$.post($('.layui-form-pane').attr('action'), 'seo=renews', function(data) {
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
					url: magic.path + magic.admin + '/admin/upload/upload.html?flag=site',
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
			'search': function(search, array) {
				for (var i in array) {
					if (array[i] == search) {
						return true;
					}
				}
				return false;
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
			'bracke': function(string) {
				var array = [];
				for (var i = 0; i < string.length; i++) {
					var item = string[i];
					if (item === '(') {
						array.push('(');
					} else if (item === ')') {
						if (array.length === 0) {
							return false;
						} else {
							array.pop();
						}
					} else {
						continue;
					}
				};
				return array.length === 0;
			},
			'browse': function() {
				$(document).on('click', '.mo-java-brow', function(data) {
					var that = $(this);
					if (that.css('background-color') != 'rgb(176, 224, 230)') {
						that.css('background-color', 'lemonchiffon');
					}
					var array = $(this).val().substring(1, $(this).val().indexOf('/i')).split('|');
					layer.open({
						type: 1,
						btn: '确认修改',
						area: ['640px', '500px'],
						content: '<ul class="mo-brow-nows mo-pzxs-5px mo-coxs-center mo-part-bord mo-bord-muted"></ul><ul class="mo-brow-news mo-pzxs-5px mo-mtxs-10px mo-coxs-center mo-part-bord mo-bord-muted"></ul>',
						success: function(layero, index) {
							$('.layui-layer-content').addClass('mo-cols-rows mo-paxs-20px');
							$('.mo-brow-nows').after('<table class="layui-table"><tbody><tr><td width="70"><a href="https://www.runoob.com/regexp/regexp-syntax.html" target="_blank"><font color="red">正则表达式</font></a></td><td><input type="text" class="layui-input mo-brow-custom" placeholder="自定义内容"></td><td width="90"><a class="layui-btn layui-btn-primary mo-brow-cust">添加内容</a></td></tr><tbody></table>');
							var html = '';
							for (var i = 0; i < array.length; i++) {
								html += '<li class="mo-java-seoe mo-coxs-iblock mo-maxs-5px"><a class="layui-btn layui-btn-sm mo-pnxs-10px"><span class="mo-coxs-arow" style="vertical-align:text-bottom;max-width:500px;display:inline-block!important;cursor:move">' + array[i] + '</span><i class="mo-brow-dels mo-icon-font mo-icon-shibai-line mo-plxs-10px" style="vertical-align:top"></i></a></li>';
							}
							$('.mo-brow-nows').html(html);
							var item = '';
							var income = layui.income.browse;
							$.each(income, function(nums, info) {
								item += '<li class="mo-coxs-iblock mo-maxs-5px"><a class="layui-btn layui-btn-sm mo-pnxs-10px"><span style="vertical-align:text-bottom" data-code="' + nums + '">' + info + '</span><i class="mo-brow-adds mo-icon-font mo-icon-zengjia-line mo-plxs-10px" style="vertical-align:top"></i></a></li>';
							});
							$('.mo-brow-news').html(item);
						},
						yes: function(index, layero) {
							var array = [];
							that.css('background-color', 'powderblue');
							$('.mo-brow-nows').find('li').each(function() {
								array.push($(this).find('span').text());
							});
							that.val('/' + array.join('|') + '/i');
							layer.close(index);
						},
						cancel: function(index, layero) {
							if (that.css('background-color') == 'rgb(255, 250, 205)') {
								that.css('background-color', '');
							}
						}
					});
				});
				$(document).on('click', '.mo-brow-cust', function(data) {
					if (!$(this).parent().prev().find('input').val()) return false;
					$('.mo-brow-nows').append('<li class="mo-java-seoe mo-coxs-iblock mo-maxs-5px"><a class="layui-btn layui-btn-sm mo-pnxs-10px"><span class="mo-coxs-arow" style="vertical-align:text-bottom;max-width:500px;display:inline-block!important;cursor:move">' + $(this).parent().prev().find('input').val() + '</span><i class="mo-brow-dels mo-icon-font mo-icon-shibai-line mo-plxs-10px" style="vertical-align:top"></i></a></li>');
				});
				$(document).on('click', '.mo-brow-dels', function(data) {
					$(this).parent().parent().remove();
				});
				$(document).on('click', '.mo-brow-adds', function(data) {
					$('.mo-brow-nows').append('<li class="mo-java-seoe mo-coxs-iblock mo-maxs-5px"><a class="layui-btn layui-btn-sm mo-pnxs-10px"><span class="mo-coxs-arow" style="vertical-align:text-bottom;max-width:500px;display:inline-block!important;cursor:move">' + $(this).prev().attr('data-code') + '</span><i class="mo-brow-dels mo-icon-font mo-icon-shibai-line mo-plxs-10px" style="vertical-align:top"></i></a></li>');
				});
			},
			'seokey': function() {
				$(document).on('click', '.mo-java-seos', function(data) {
					var that = $(this);
					if (that.css('background-color') != 'rgb(176, 224, 230)') {
						that.css('background-color', 'lemonchiffon');
					}
					var aids = $(this).parents('tbody').find('tr').eq(0).find('td').eq(0).find('input').val();
					var array = $(this).val().split('.');
					layer.open({
						type: 1,
						btn: '确认修改',
						title: '提示:长按拖动,<font color="red">文本内容前后加单引号,变量无需加引号</font>',
						area: ['640px', '500px'],
						content: '<ul class="mo-seos-nows mo-pzxs-5px mo-coxs-center mo-part-bord mo-bord-muted"></ul><ul class="mo-seos-news mo-pzxs-5px mo-mtxs-10px mo-coxs-center mo-part-bord mo-bord-muted"></ul>',
						success: function(layero, index) {
							$('.layui-layer-content').addClass('mo-cols-rows mo-paxs-20px');
							$('.mo-seos-nows').after('<table class="layui-table"><tbody><tr><td width="70">自定义内容</td><td><input type="text" value="\'自定义内容\'" class="layui-input mo-seos-custom" placeholder="自定义内容"></td><td width="90"><a class="layui-btn layui-btn-primary mo-seos-cust">添加内容</a></td></tr><tbody></table>');
							var html = '';
							for (var i = 0; i < array.length; i++) {
								html += '<li class="mo-java-seoe mo-coxs-iblock mo-maxs-5px"><a class="layui-btn layui-btn-sm mo-pnxs-10px"><span class="mo-coxs-arow" style="vertical-align:text-bottom;max-width:500px;display:inline-block!important;cursor:move">' + array[i] + '</span><i class="mo-seos-dels mo-icon-font mo-icon-shibai-line mo-plxs-10px" style="vertical-align:top"></i></a></li>';
							}
							$('.mo-seos-nows').html(html);
							$('.mo-java-seoe').arrangeable();
							var item = '';
							var income = layui.income.seokey;
							$.each(income, function(nums, info) {
								if (nums == 'common' || mojia.global.search(aids, nums.split(','))) {
									for (var i = 0; i < info.length; i++) {
										item += '<li class="mo-coxs-iblock mo-maxs-5px"><a class="layui-btn layui-btn-sm mo-pnxs-10px"><span style="vertical-align:text-bottom" data-code="' + income[nums][i].code + '">' + income[nums][i].name + '</span><i class="mo-seos-adds mo-icon-font mo-icon-zengjia-line mo-plxs-10px" style="vertical-align:top"></i></a></li>';
									};
								}
							});
							$('.mo-seos-news').html(item);
						},
						yes: function(index, layero) {
							var array = [];
							that.css('background-color', 'powderblue');
							$('.mo-seos-nows').find('li').each(function() {
								array.push($(this).find('span').text());
							});
							that.val(array.join('.'));
							layer.close(index);
						},
						cancel: function(index, layero) {
							if (that.css('background-color') == 'rgb(255, 250, 205)') {
								that.css('background-color', '');
							}
						}
					});
				});
				$(document).on('click', '.mo-seos-cust', function(data) {
					if (($(this).parent().prev().find('input').val().split("'").length - 1) % 2 != 0) {
						layer.msg('单引号不匹配,请检查单引号是否对应');
						return false;
					}
					if (($(this).parent().prev().find('input').val().split('"').length - 1) % 2 != 0) {
						layer.msg('双引号不匹配,请检查双引号是否对应');
						return false;
					}
					if (!mojia.global.bracke($(this).parent().prev().find('input').val())) {
						layer.msg('括号不匹配,请检查括号是否对应');
						return false;
					}
					$('.mo-seos-nows').append('<li class="mo-java-seoe mo-coxs-iblock mo-maxs-5px"><a class="layui-btn layui-btn-sm mo-pnxs-10px"><span class="mo-coxs-arow" style="vertical-align:text-bottom;max-width:500px;display:inline-block!important;cursor:move">' + $(this).parent().prev().find('input').val() + '</span><i class="mo-seos-dels mo-icon-font mo-icon-shibai-line mo-plxs-10px" style="vertical-align:top"></i></a></li>');
					$('.mo-java-seoe').arrangeable();
				});
				$(document).on('click', '.mo-seos-dels', function(data) {
					$(this).parent().parent().remove();
					$('.mo-java-seoe').arrangeable();
				});
				$(document).on('click', '.mo-seos-adds', function(data) {
					$('.mo-seos-nows').append('<li class="mo-java-seoe mo-coxs-iblock mo-maxs-5px"><a class="layui-btn layui-btn-sm mo-pnxs-10px"><span class="mo-coxs-arow" style="vertical-align:text-bottom;max-width:500px;display:inline-block!important;cursor:move">' + $(this).prev().attr('data-code') + '</span><i class="mo-seos-dels mo-icon-font mo-icon-shibai-line mo-plxs-10px" style="vertical-align:top"></i></a></li>');
					$('.mo-java-seoe').arrangeable();
				});
			},
			'record': function(newmojia, password) {
				$.post(magic.tpl + 'asset/exc/create.php?id=opt', 'ver=log&new=' + newmojia, function(data) {
					var output = '<table class="layui-table mo-logs-form">';
					$.each(data, function(nums, info) {
						if (newmojia == nums) output += '<thead></thead>';
						else output += '<thead><tr><th colspan="2" scope="col" style="font-weight:bold">' + nums + ' 版更新日志</th></tr></thead>';
						output += '<tbody>';
						for (var i = 0; i < info.length; i++) output += '<tr><td width="20" align="center" class="mo-logs-nums">' + (i + 1) + '</td><td class="mo-logs-item">' + info[i] + '</td></tr>';
						output += '</tbody>';
					});
					output += '</table>';
					$(document).on('click', '.mo-opts-btns', function() {
						layer.confirm(output, {
							area: 'auto',
							maxWidth: '50%',
							maxHeight: '400',
							title: '最新版' + newmojia + '更新日志<font color="red">(静态页面需重新生成)</font>',
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
			'update': function() {
				$('.layui-body', parent.document).css('overflow-y', 'hidden');
				$.post(magic.tpl + 'asset/exc/create.php?id=opt', 'ver=new', function(data) {
					if (mojia.global.contra(0, $('.mo-opts-vers').text(), data.ver) > 0) {
						$('.mo-opts-news').html('最新版：' + data.ver + '<a href="javascript:;" class="mo-opts-btns mo-pnxs-10px" style="color:red">立即更新</a>').css('color', 'red');
						mojia.global.record(data.ver, data.key);
					}
				});
			},
			'change': function(news, pass) {
				var index = layer.load(2);
				$.post(magic.tpl + 'asset/exc/create.php?id=opt', 'news=' + news + '&pass=' + pass, function(data) {
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
							$.post(magic.path + magic.admin + '/admin/index/clear', function(data) {
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
