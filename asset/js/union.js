layui.define(['income'], function(exports) {
	var $ = layui.jquery;
	var mojia = {
		'global': {
			'urls': magic.path + magic.admin + '/admin/collect/api?ac={ac}&h={h}&cjflag={cjflag}&cjurl={cjurl}&mid={mid}&type={type}&opt={opt}&filter={filter}&filter_from={filter_from}&param={param}',
			'init': function() {
				mojia.lister.list('我的收藏', '取消', 'cancel', 'favs=list', 'prepend');
				mojia.lister.list('资源列表', '收藏', 'stores', 'info=info', 'append');
				mojia.clicks.init();
				layui.util.fixbar();
			}
		},
		'lister': {
			'name': function(name, str) {
				if (name.indexOf(str) == -1) return name;
				else return name.substring(0, name.indexOf(str));
			},
			'list': function(title, name, favs, data, type) {
				$.post(magic.tpl + 'asset/exc/create.php?id=col', data, function(data) {
					if (data.length == 0) return false;
					var html = '';
					html += '<table class="layui-table"><thead><tr><td colspan="11"><span style="float:left">' + title + '</span><span style="float:right">' + (favs == 'cancel' ? '已收藏资源库列表' : '主题不附带资源接口') + '</span></td></tr></thead><tbody>';
					$.each(data, function(nums, info) {
						var href = mojia.global.urls.replace('{cjflag}', info.collect_flag).replace('{cjurl}', encodeURIComponent(info.collect_url)).replace('{mid}', info.collect_mid).replace('{type}', info.collect_type).replace('{opt}', info.collect_opt).replace('{filter}', info.collect_filter).replace('{filter_from}', info.collect_filter_from).replace('{param}', info.collect_param);
						html += '<tr data-id="' + info.collect_id + '" data-url="' + info.collect_url + '" data-name="' + info.collect_name + '" data-flag="' + info.collect_flag + '" data-type="' + info.collect_type + '" data-text="' + info.collect_text + '" data-mold="' + info.collect_mold + '" data-param="' + href.replace('{ac}', 'cj').replace('{h}', '24').replace(magic.path + magic.admin + '/admin/collect/api?', '') + '">';
						html += '<td width="20" align="center">' + info.collect_id + '</td>';
						html += '<td width="40" align="center"><span class="layui-badge layui-bg-green">' + info.collect_text + '</span></td>';
						html += '<td><a href="javascript:;" class="mo-unit-addtab" data-id="100000' + info.collect_id + '" data-url="' + href.replace('{ac}', 'list').replace('{h}', '') + '" data-name="' + mojia.lister.name(info.collect_name, '【') + '">【绑定】' + info.collect_name + '</a></td>';
						html += '<td width="30" align="center"><a href="javascript:;" class="mo-unit-' + info.collect_mold + 'er' + (info.collect_mid != 1 ? ' layui-disabled' : '') + '">配置</a></td>';
						html += '<td width="30" align="center"><a href="javascript:;" class="mo-unit-addtab" data-id="100007" data-url="' + href.replace('{ac}', 'cj').replace('{h}', '24') + '" data-name="' + mojia.lister.name(info.collect_name, '【') + '当天">当天</a></td>';
						html += '<td width="30" align="center"><a href="javascript:;" class="mo-unit-addtab" data-id="100008" data-url="' + href.replace('{ac}', 'cj').replace('{h}', '168') + '" data-name="' + mojia.lister.name(info.collect_name, '【') + '本周">本周</a></td>';
						html += '<td width="30" align="center"><a href="javascript:;" class="mo-unit-thread" data-id="100009" data-url="' + href.replace('{ac}', 'cj').replace('{h}', '') + '" data-name="' + mojia.lister.name(info.collect_name, '【') + '全部">全部</a></td>';
						html += '<td width="30" align="center"><a href="javascript:;" class="mo-unit-timing">定时</a></td>';
						html += '<td width="30" align="center"><a href="javascript:;" class="mo-unit-' + favs + '">' + name + '</a></td>';
						html += '<td width="30" align="center"><a href="javascript:;" class="mo-unit-gather">编辑</a></td>';
						html += '<td width="30" align="center"><a href="javascript:;" class="mo-unit-delete">删除</a></td>';
						html += '</tr>';
					});
					html += '</tbody></table>';
					$('.mo-unit-table')[type](html);
				}).error(function(data) {
					layer.msg('请求失败：' + data.status);
				}, 'json');
			},
			'post': function(urls, info, key, count) {
				$.ajaxSettings.timeout = 10000;
				var url = info[key].collect_url.split('?');
				var xhr = $.post(magic.tpl + 'asset/exc/create.php?id=col', 'seek=seek&type=' + info[key].collect_type + '&name=' + encodeURIComponent($('.mo-unit-input').val()) + '&url=' + encodeURIComponent(url[0]), function(data, status) {
					if (data.length > 0) {
						var html = '';
						var href = urls.replace('{cjflag}', info[key].collect_flag).replace('{cjurl}', encodeURIComponent(info[key].collect_url)).replace('{mid}', info[key].collect_mid).replace('{type}', info[key].collect_type).replace('{opt}', info[key].collect_opt).replace('{filter}', info[key].collect_filter).replace('{filter_from}', info[key].collect_filter_from).replace('{param}', info[key].collect_param).replace('{ac}', 'list').replace('{h}', '');
						for (var i = 0; i < data.length; i++) {
							html += '<tr data-name="' + info[key].collect_name + '" data-url="' + info[key].collect_url + '" data-word="' + href + '&wd=' + $('.mo-unit-input').val() + '" data-sole="' + data[i][info[key].collect_code + '_play_from'] + '" data-text="' + info[key].collect_text + '" data-mold="' + info[key].collect_mold + '">';
							html += '<td width="30" align="center">' + info[key].collect_id + '</td>';
							html += '<td width="90" align="center"><span class="layui-badge layui-bg-green">' + mojia.lister.name(info[key].collect_name, '【') + '</span></td>';
							html += '<td><a href="javascript:;" class="mo-unit-dataer">' + data[i][info[key].collect_code + '_name'] + '【' + data[i][info[key].collect_code + '_remarks'] + '】</a></td>';
							html += '<td width="60" align="center"><a href="javascript:;" class="mo-unit-' + info[key].collect_mold + 'er">' + info[key].collect_text + '配置</a></td>';
							html += '<td width="60" align="center"><a href="javascript:;">' + data[i]['type_name'] + '</a></td>';
							html += '<td width="60" align="center"><a href="javascript:;">' + data[i][info[key].collect_code + '_play_from'] + '</a></td>';
							html += '<td width="130" align="center"><a href="javascript:;">' + data[i][info[key].collect_code + '_time'] + '</a></td>';
							html += '</tr>';
						}
						$('.mo-unit-table tbody').append(html);
					}
				}).complete(function(data) {
					if (data.statusText == 'timeout') var current = [];
					else var current = JSON.parse(data.responseText);
					if (info.length == key + 1) {
						$('.mo-unit-table tfoot tr td').html('搜索完毕&nbsp;&nbsp;&nbsp;共' + parseInt(count + current.length) + '条结果');
						return false;
					}
					if (data.statusText == 'timeout') {
						$('.mo-unit-table tfoot tr td').html('【' + mojia.lister.name(info[key].collect_name, '【') + '】请求超时&nbsp;&nbsp;&nbsp;正在搜索【' + mojia.lister.name(info[key + 1].collect_name, '【') + '】请稍等...');
						xhr.abort();
					} else {
						$('.mo-unit-table tfoot tr td').html('【' + mojia.lister.name(info[key].collect_name, '【') + '】搜索到' + current.length + '条相关资源&nbsp;&nbsp;&nbsp正在搜索【' + mojia.lister.name(info[key + 1].collect_name, '【') + '】请稍等...');
					}
					mojia.lister.post(urls, info, key + 1, parseInt(count + current.length));
				}, 'json');
			}
		},
		'clicks': {
			'init': function() {
				layui.income.global.init();
				$('.layui-body', parent.document).css('overflow-y', 'hidden');
				$(document).on('click', '.mo-unit-stores', function() {
					var that = $(this).parents('tr');
					$.post(magic.tpl + 'asset/exc/create.php?id=col', 'info=info&id=' + that.attr('data-id'), function(data) {
						data[0]['favs'] = 'add';
						layer.confirm('您确定要加入收藏吗', function(index) {
							$.post(magic.tpl + 'asset/exc/create.php?id=col', data[0], function(data) {
								layer.msg(data.msg, {
									time: 500,
									anim: 0
								}, function() {
									location.reload();
								});
							}).error(function(data) {
								layer.msg('请求失败：' + data.status);
							}, 'json');
						});
					}).error(function(data) {
						layer.msg('请求失败：' + data.status);
					}, 'json');
				});
				$(document).on('click', '.mo-unit-cancel', function() {
					var that = $(this).parents('tr');
					layer.confirm('您确定要取消收藏吗', function(index) {
						$.post(magic.tpl + 'asset/exc/create.php?id=col', 'favs=del&id=' + that.attr('data-id'), function(data) {
							layer.msg(data.msg, {
								time: 500,
								anim: 0
							}, function() {
								location.reload();
							});
						}).error(function(data) {
							layer.msg('请求失败：' + data.status);
						}, 'json');
					});
				});
				$(document).on('click', '.mo-unit-thread', function() {
					var that = $(this);
					layer.open({
						btn: false,
						title: that.attr('data-name'),
						content: '<input class="layui-input mo-unit-page" type="text" value="1" placeholder="请输入起始页码" autocomplete="off"><div class="mo-ptxs-5px mo-coxs-center"><p>分页采集可以从指定的页码开始采集</p><font color="red">低配置主机别用分页采集,别给卡崩了</font></div><div class="mo-unit-pageer mo-ptxs-5px mo-coxs-center"><a href="javascript:;" class="layui-btn layui-btn-normal mo-unit-addtab" data-id="100011" data-url="' + that.attr('data-url') + '" data-name="' + that.attr('data-name') + '">单页采集全部</a><a href="javascript:;" class="layui-btn mo-unit-addtab" data-id="100012" data-url="' + that.attr('data-url') + '" data-name="' + that.attr('data-name') + '">分页同时采集</a></div>',
						success: function(layero, index) {
							$(document).on('keyup', '.mo-unit-page', function(event) {
								$('.mo-unit-pageer').find('a').eq(1).attr('data-name', that.attr('data-name') + '第' + $('.mo-unit-page').val() + '页');
								$('.mo-unit-pageer').find('a').eq(1).attr('data-url', that.attr('data-url') + '&page=' + $('.mo-unit-page').val());
								$('.mo-unit-pageer').find('a').eq(1).attr('data-id', Number($('.mo-unit-pageer').find('a').eq(1).attr('data-id')) + 1);
							});
						}
					});
				});
				$(document).on('click', '.mo-unit-addtab', function(event) {
					var that = $(this);
					if (!that.attr('data-url')) return false;
					if (window.top != window.self) {
						if ($(window.parent.document).find('iframe[lay-id="' + that.attr('data-id') + '"]')[0]) {
							parent.layui.element.tabChange('macTab', that.attr('data-id'));
							event.stopPropagation();
							return false;
						}
						parent.layui.element.tabAdd('macTab', {
							content: '<iframe width="100%" height="100%" lay-id="' + that.attr('data-id') + '" frameborder="0" src="' + that.attr('data-url') + '" scrolling="yes" class="x-iframe"></iframe>',
							title: (that.attr('data-name') ? that.attr('data-name') : that.text()),
							id: that.attr('data-id')
						});
						parent.layui.element.tabChange('macTab', that.attr('data-id'));
					} else window.open(that.attr('data-url'), '_blank');
				});
				$(document).on('click', '.mo-unit-addtor', function() {
					layer.open({
						area: ['85%', '80%'],
						title: '添加自定义资源',
						content: magic.path + magic.admin + '/admin/collect/info.html',
						maxmin: true,
						type: 2
					});
				});
				$(document).on('click', '.mo-unit-severs', function() {
					layer.open({
						area: ['85%', '80%'],
						title: '添加服务器组',
						content: magic.path + magic.admin + '/admin/vodserver/info.html',
						maxmin: true,
						type: 2
					});
				});
				$(document).on('click', '.mo-unit-gather', function() {
					layer.open({
						area: ['85%', '80%'],
						title: $(this).parents('tr').attr('data-name'),
						content: magic.path + magic.admin + '/admin/collect/info/id/' + $(this).parents('tr').attr('data-id') + '.html',
						maxmin: true,
						type: 2
					});
				});
				$(document).on('click', '.mo-unit-delete', function() {
					var that = $(this).parents('tr');
					layer.confirm('删除之后无法恢复，您确定要删除吗', function(index) {
						$.post(magic.path + magic.admin + '/admin/collect/del/ids/' + that.attr('data-id') + '.html', function(data) {
							layer.msg(data.msg, {
								time: 500,
								anim: 0
							}, function() {
								location.reload();
							});
						});
					});
				});
				$(document).on('click', '.mo-unit-search', function() {
					if ($('.mo-unit-input').val().trim() == '') return false;
					$('.mo-unit-table').html('<table class="layui-table"><thead><tr><td width="30" align="center">编号</td><td width="90" align="center">资源站</td><td>名称</td><td width="60" align="center">操作</td><td width="60" align="center">分类</td><td width="60" align="center">来源</td><td width="60" align="center">更新时间</td></tr></thead><tbody></tbody><tfoot><tr><td colspan="7" align="center">搜索中，请稍等...</td></tr></tfoot></table>');
					$.post(magic.tpl + 'asset/exc/create.php?id=col', 'info=info', function(data) {
						mojia.lister.post(mojia.global.urls, data, 0, 0);
					});
				});
				$(document).on('click', '.mo-unit-dataer', function() {
					layer.open({
						area: ['85%', '80%'],
						title: $(this).parents('tr').attr('data-name'),
						content: $(this).parents('tr').attr('data-word'),
						maxmin: true,
						type: 2,
					});
				});
				$(document).on('click', '.mo-unit-player', function() {
					var that = $(this).parents('tr');
					if (that.attr('data-sole')) {
						mojia.clicks.boxs(that, that.attr('data-sole').split(','));
					} else {
						layer.load(2);
						$.ajaxSettings.timeout = 10000;
						var xhr = $.post(magic.tpl + 'asset/exc/create.php?id=col', 'code=code&type=' + that.attr('data-type') + '&url=' + that.attr('data-url'), function(data) {
							layer.closeAll();
							if (data.length) mojia.clicks.boxs(that, data);
							else layer.alert('未获取到播放器编号,请重试下<br>可能网络不好,可能接口已失效');
						}).complete(function(data) {
							if (data.statusText == 'timeout') {
								layer.closeAll();
								layer.alert('请求超时,请重试下');
								xhr.abort();
							}
						}).error(function(data) {
							layer.closeAll();
							layer.msg('请求失败：' + data.status);
						}, 'json');
					}
				});
				$(document).on('click', '.mo-unit-downer', function() {
					var that = $(this).parents('tr');
					if (that.attr('data-sole')) {
						mojia.clicks.boxs(that, that.attr('data-sole').split(','));
					} else {
						mojia.clicks.boxs(that, ['http', 'xunlei', 'weiyun', 'baidu', 'ed2k', 'magnet']);
					}
				});
				$(document).on('click', '.mo-unit-timing', function() {
					var that = $(this).parents('tr');
					layer.open({
						area: ['85%', '80%'],
						title: that.attr('data-name'),
						content: magic.path + magic.admin + '/admin/timming/info.html?id=' + that.attr('data-flag'),
						maxmin: true,
						type: 2,
						success: function(layero, index) {
							var body = layer.getChildFrame('body', index);
							if (!body.find('#name').val()) body.find('#name').val(that.attr('data-flag'));
							if (!body.find('#param').val()) body.find('#param').val(that.attr('data-param'));
							if (!body.find('#des').val()) body.find('#des').val('每日定时采集：' + mojia.lister.name(that.attr('data-name'), '【'));
							if (body.find('#rad-1').is(':checked')) body.find('#rad-1').attr('checked', false).next('.layui-form-radio').removeClass('layui-form-radioed').find('i').removeClass('layui-anim-scaleSpring').html('&#xe63f;');
							if (!body.find('#rad-2').is(':checked')) body.find('#rad-2').attr('checked', true).next('.layui-form-radio').addClass('layui-form-radioed').find('i').addClass('layui-anim-scaleSpring').html('&#xe643;');
							body.find('button[type="submit"]').attr('data-child', 'no');
							setTimeout(function() {
								if (!body.find('input[type=checkbox]').is(':checked')) {
									$(body.find('input[type=checkbox]')).each(function() {
										$(this).attr('checkbox', true).next('.layui-form-checkbox').addClass('layui-form-checked');
									});
								}
							}, 500);
						}
					});
				});
			},
			'boxs': function(that, data) {
				var time = Date.parse(new Date()) / 1000;
				layer.open({
					type: 1,
					btn: data,
					area: '360px',
					btnAlign: 'c',
					title: that.attr('data-name'),
					skin: 'mo-open-info mo-open-' + time,
					success: function() {
						$('.layui-layer-btn').find('a').addClass('mo-open-item mo-bord-muted').css('color', '#333').css('border-color', '#dedede').css('background-color', '#fff');
						for (var i = 0; i < data.length; i++) {
							$(document).on('click', '.mo-open-' + time + ' .layui-layer-btn' + i, function(every) {
								mojia.clicks.open(that, data[$(this).prop('className').substring(15, 16)]);
								every.stopPropagation();
							});
						}
					}
				});
			},
			'open': function(that, data) {
				layer.open({
					area: ['85%', '80%'],
					title: that.attr('data-name'),
					content: magic.path + magic.admin + '/admin/vod' + that.attr('data-mold') + 'er/info/id/' + data + '.html',
					maxmin: true,
					type: 2,
					success: function(layero, index) {
						var body = layer.getChildFrame('body', index);
						var name = that.attr('data-name').substring(0, 2);
						var name = data.indexOf('m3u8') != -1 ? name + '在线' : (data.indexOf('yun') != -1 ? name + '云播' : that.attr('data-name'));
						body.find('button[type="submit"]').attr('data-child', 'no');
						if (!body.find('#from').val()) body.find('#from').val(data);
						if (!body.find('#sort').val()) body.find('#sort').val(layui.income.unions[data] ? layui.income.unions[data][0].sort : 999);
						if (!body.find('#show').val()) body.find('#show').val(layui.income.unions[data] ? layui.income.unions[data][0].name : mojia.lister.name(name, '【'));
						if (!body.find('#des').val()) body.find('#des').val(that.attr('data-url').split('/')[2]);
						if (!body.find('textarea[name="tip"]').val()) body.find('textarea[name="tip"]').val(layui.income.unions[data] ? layui.income.unions[data][0].tips : '在线' + that.attr('data-text'));
						if (body.find('#rad-1').is(':checked')) body.find('#rad-1').attr('checked', false).next('.layui-form-radio').removeClass('layui-form-radioed').find('i').removeClass('layui-anim-scaleSpring').html('&#xe63f;');
						if (!body.find('#rad-2').is(':checked')) body.find('#rad-2').attr('checked', true).next('.layui-form-radio').addClass('layui-form-radioed').find('i').addClass('layui-anim-scaleSpring').html('&#xe643;');
						if (data.indexOf('m3u8') == -1) {
							if (body.find('input[name="ps"]').eq(0).is(':checked')) body.find('input[name="ps"]').eq(0).attr('checked', false).next('.layui-form-radio').removeClass('layui-form-radioed').find('i').removeClass('layui-anim-scaleSpring').html('&#xe63f;');
							if (!body.find('input[name="ps"]').eq(1).is(':checked')) body.find('input[name="ps"]').eq(1).attr('checked', true).next('.layui-form-radio').addClass('layui-form-radioed').find('i').addClass('layui-anim-scaleSpring').html('&#xe643;');
						}
					}
				});
			}
		}
	};
	exports('union', mojia);
});
