layui.define(['jquery', 'form', 'layer', 'income'], function(exports) {
	var $ = layui.jquery;
	var mojia = {
		'global': {
			'urls': magic.admin[0] + 'php/admin/collect/api?ac={ac}&h={h}&cjflag={cjflag}&cjurl={cjurl}&mid={mid}&type={type}&opt={opt}&filter={filter}&filter_from={filter_from}&param={param}',
			'init': function() {
				mojia.lister.each();
				mojia.clicks.init();
				layui.util.fixbar();
			}
		},
		'lister': {
			'each': function() {
				$.post(magic.tpl + 'asset/exc/create.php?id=col', 'info=info', function(data) {
					var html = '';
					html += '<table class="layui-table"><thead><tr><td colspan="9"><span style="float:left">魔加采集优化</span><span style="float:right">添加采集资源：采集 > 自定义资源库 > 添加</span></td></tr></thead><tbody>';
					$.each(data, function(nums, info) {
						var href = mojia.global.urls.replace('{cjflag}', info.collect_flag).replace('{cjurl}', encodeURIComponent(info.collect_url)).replace('{mid}', info.collect_mid).replace('{type}', info.collect_type).replace('{opt}', info.collect_opt).replace('{filter}', info.collect_filter).replace('{filter_from}', info.collect_filter_from).replace('{param}', info.collect_param);
						html += '<tr>';
						html += '<td width="20" align="center">' + info.collect_id + '</td>';
						html += '<td width="40" align="center"><span class="layui-badge layui-bg-green">' + info.collect_text + '</span></td>';
						html += '<td><a href="' + href.replace('{ac}', 'list').replace('{h}', '') + '">【绑定】' + info.collect_name + '</a></td>';
						html += '<td width="60" align="center"><a href="javascript:;" class="mo-unit-' + info.collect_mold + 'er" data-type="' + info.collect_type + '" data-reso="' + info.collect_reso + '" data-mold="' + info.collect_mold + '" data-show="' + info.collect_name + '" data-apis="' + info.collect_url + '" data-host="' + info.collect_host + '">' + (info.collect_mold == 'down' ? '下载' : info.collect_text) + '配置</a></td>';
						html += '<td width="60" align="center"><a href="javascript:;" class="mo-unit-timing" data-name="当日采集：' + info.collect_name + '" data-flag="' + info.collect_flag + '" data-param="' + href.replace('{ac}', 'cj').replace('{h}', '24').replace(magic.admin[0] + 'php/admin/collect/api?', '') + '">定时采集</a></td>';
						html += '<td width="60" align="center"><a href="' + href.replace('{ac}', 'cj').replace('{h}', '24') + '">采集当天</a></td>';
						html += '<td width="60" align="center"><a href="' + href.replace('{ac}', 'cj').replace('{h}', '168') + '">采集本周</a></td>';
						html += '<td width="30" align="center"><a href="javascript:;" class="mo-unit-gather" data-code="' + info.collect_id + '">编辑</a></td>';
						html += '<td width="30" align="center"><a href="javascript:;" class="mo-unit-delete" data-code="' + info.collect_id + '">删除</a></td>';
						html += '</tr>';
					});
					html += '</tbody></table>';
					$('.mo-unit-table').html(html);
					layui.income.global.init();
				}).error(function(data) {
					layer.msg('请求失败：' + data.status);
				}, 'json');
			},
			'post': function(urls, collec, hander, count) {
				$.ajaxSettings.timeout = 10000;
				var apis = collec[hander].collect_url.split('?');
				var xhr = $.post(magic.tpl + 'asset/exc/create.php?id=col', 'seek=seek' + '&type=' + collec[hander].collect_type + '&name=' + encodeURIComponent($('.mo-unit-input').val()) + '&apis=' + encodeURIComponent(apis[0]), function(data, status) {
					if (data.length > 0) {
						var html = '';
						var href = urls.replace('{cjflag}', collec[hander].collect_flag).replace('{cjurl}', encodeURIComponent(collec[hander].collect_url)).replace('{mid}', collec[hander].collect_mid).replace('{type}', collec[hander].collect_type).replace('{opt}', collec[hander].collect_opt).replace('{filter}', collec[hander].collect_filter).replace('{filter_from}', collec[hander].collect_filter_from).replace('{param}', collec[hander].collect_param).replace('{ac}', 'list').replace('{h}', '');
						for (var i = 0; i < data.length; i++) {
							html += '<tr>';
							html += '<td width="30" align="center">' + collec[hander].collect_id + '</td>';
							html += '<td width="90" align="center"><span class="layui-badge layui-bg-green">' + collec[hander].collect_name.substring(0, collec[hander].collect_name.indexOf('【')) + '</span></td>';
							html += '<td><a href="javascript:;" class="mo-unit-dataer" data-urls="' + href + '&wd=' + $('.mo-unit-input').val() + '" data-head="' + collec[hander].collect_name + '">' + data[i][collec[hander].collect_code + '_name'] + '【' + data[i][collec[hander].collect_code + '_remarks'] + '】</a></td>';
							html += '<td width="60" align="center"><a href="javascript:;" class="mo-unit-' + collec[hander].collect_mold + 'er" data-sole="' + data[i][collec[hander].collect_code + '_play_from'] + '" data-reso="' + collec[hander].collect_reso + '" data-mold="' + collec[hander].collect_mold + '" data-show="' + collec[hander].collect_name + '" data-apis="' + collec[hander].collect_url + '" data-host="' + collec[hander].collect_host + '">' + (collec[hander].collect_mold == 'down' ? '下载' : collec[hander].collect_text) + '配置</a></td>';
							html += '<td width="60" align="center"><a href="javascript:;">' + data[i]['type_name'] + '</a></td>';
							html += '<td width="60" align="center"><a href="javascript:;">' + data[i][collec[hander].collect_code + '_play_from'] + '</a></td>';
							html += '<td width="130" align="center"><a href="javascript:;">' + data[i][collec[hander].collect_code + '_time'] + '</a></td>';
							html += '</tr>';
						}
						$('.mo-unit-table tbody').append(html);
					}
				}).complete(function(data) {
					if (data.statusText == 'timeout') var current = [];
					else var current = JSON.parse(data.responseText);
					if (collec.length == hander + 1) {
						$('.mo-unit-table tfoot tr td').html('搜索完毕&nbsp;&nbsp;&nbsp;共' + parseInt(count + current.length) + '条结果');
						return false;
					}
					if (data.statusText == 'timeout') {
						$('.mo-unit-table tfoot tr td').html('【' + collec[hander].collect_name.substring(0, collec[hander].collect_name.indexOf('【')) + '】请求超时&nbsp;&nbsp;&nbsp;正在搜索【' + collec[hander + 1].collect_name.substring(0, collec[hander + 1].collect_name.indexOf('【')) + '】请稍等...');
						xhr.abort();
					} else {
						$('.mo-unit-table tfoot tr td').html('【' + collec[hander].collect_name.substring(0, collec[hander].collect_name.indexOf('【')) + '】搜索到' + current.length + '条相关资源&nbsp;&nbsp;&nbsp正在搜索【' + collec[hander + 1].collect_name.substring(0, collec[hander + 1].collect_name.indexOf('【')) + '】请稍等...');
					}
					mojia.lister.post(urls, collec, hander + 1, parseInt(count + current.length));
				}, 'json');
			}
		},
		'clicks': {
			'init': function() {
				$(document).on('click', '.mo-unit-addtor', function() {
					layer.open({
						area: ['85%', '80%'],
						title: '添加自定义资源',
						content: magic.admin[0] + 'php/admin/collect/info.html',
						maxmin: true,
						type: 2
					});
				});
				$(document).on('click', '.mo-unit-severs', function() {
					layer.open({
						area: ['85%', '80%'],
						title: '添加服务器组',
						content: magic.admin[0] + 'php/admin/vodserver/info.html',
						maxmin: true,
						type: 2
					});
				});
				$(document).on('click', '.mo-unit-gather', function() {
					layer.open({
						area: ['85%', '80%'],
						content: magic.admin[0] + 'php/admin/collect/info/id/' + $(this).attr('data-code') + '.html',
						maxmin: true,
						type: 2
					});
				});
				$(document).on('click', '.mo-unit-delete', function() {
					var that = $(this);
					layer.confirm('删除之后无法恢复，您确定要删除吗', function(index) {
						$.post(magic.admin[0] + 'php/admin/collect/del/ids/' + that.attr('data-code') + '.html', function(data) {
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
					if ($('.mo-unit-input').val() == '') return false;
					$('.mo-unit-table').html('<table class="layui-table"><thead><tr><td width="30" align="center">编号</td><td width="90" align="center">资源站</td><td>名称</td><td width="60" align="center">操作</td><td width="60" align="center">分类</td><td width="60" align="center">来源</td><td width="60" align="center">更新时间</td></tr></thead><tbody></tbody><tfoot><tr><td colspan="7" align="center">搜索中，请稍等...</td></tr></tfoot></table>');
					$.post(magic.tpl + 'asset/exc/create.php?id=col', 'info=info', function(data) {
						mojia.lister.post(mojia.global.urls, data, 0, 0);
					});
				});
				$(document).on('click', '.mo-unit-dataer', function() {
					layer.open({
						area: ['85%', '80%'],
						title: $(this).attr('data-head'),
						content: $(this).attr('data-urls'),
						maxmin: true,
						type: 2,
					});
				});
				$(document).on('click', '.mo-unit-player', function() {
					if ($(this).attr('data-sole')) {
						mojia.clicks.boxs($(this), $(this).attr('data-sole').split(','));
					} else {
						layer.load(2);
						var that = $(this);
						$.ajaxSettings.timeout = 10000;
						var xhr = $.post(magic.tpl + 'asset/exc/create.php?id=col', 'code=code' + '&type=' + that.attr('data-type') + '&apis=' + that.attr('data-apis'), function(data) {
							layer.closeAll();
							if (data.length) mojia.clicks.boxs(that, data);
							else layer.alert('未获取到播放器编号,请重试下<br>可能网络不好,可能接口已失效');
						}).complete(function(data) {
							if (data.statusText == 'timeout') {
								layer.alert('请求超时,请重试下');
								xhr.abort();
							}
						}).error(function(data) {
							layer.msg('请求失败：' + data.status);
						}, 'json');
					}
				});
				$(document).on('click', '.mo-unit-downer', function() {
					if ($(this).attr('data-sole')) {
						mojia.clicks.boxs($(this), $(this).attr('data-sole').split(','));
					} else {
						mojia.clicks.boxs($(this), ['http', 'xunlei', 'weiyun', 'baidu', 'ed2k', 'magnet']);
					}
				});
				$(document).on('click', '.mo-unit-timing', function() {
					var that = $(this);
					layer.open({
						area: ['85%', '80%'],
						content: magic.admin[0] + 'php/admin/timming/info.html?id=' + that.attr('data-flag'),
						maxmin: true,
						type: 2,
						success: function(layero, index) {
							var body = layer.getChildFrame('body', index);
							if (!body.find('#name').val()) body.find('#name').val(that.attr('data-flag'));
							if (!body.find('#des').val()) body.find('#des').val(that.attr('data-name'));
							if (!body.find('#param').val()) body.find('#param').val(that.attr('data-param'));
							if (body.find('#rad-1').is(':checked')) body.find('#rad-1').attr('checked', false).next('.layui-form-radio').removeClass('layui-form-radioed').find('i').removeClass('layui-anim-scaleSpring').html('&#xe63f;');
							if (!body.find('#rad-2').is(':checked')) body.find('#rad-2').attr('checked', true).next('.layui-form-radio').addClass('layui-form-radioed').find('i').addClass('layui-anim-scaleSpring').html('&#xe643;');
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
					content: magic.admin[0] + 'php/admin/vod' + that.attr('data-mold') + 'er/info/id/' + data + '.html',
					maxmin: true,
					type: 2,
					success: function(layero, index) {
						var body = layer.getChildFrame('body', index);
						var name = that.attr('data-show').substring(0, 2);
						var name = data.indexOf('m3u8') != -1 ? name + '在线' : (data.indexOf('yun') != -1 ? name + '云播' : that.attr('data-show'));
						if (!body.find('#from').val()) body.find('#from').val(data);
						if (!body.find('#sort').val()) body.find('#sort').val(income.unions[data] ? income.unions[data][0].sort : 999);
						if (!body.find('#show').val()) body.find('#show').val(income.unions[data] ? income.unions[data][0].name : name);
						if (!body.find('#des').val()) body.find('#des').val(that.attr('data-host'));
						if (!body.find('textarea[name="tip"]').val()) body.find('textarea[name="tip"]').val(income.unions[data] ? income.unions[data][0].tips : '在线' + that.attr('data-reso'));
						if (body.find('#rad-1').is(':checked')) body.find('#rad-1').attr('checked', false).next('.layui-form-radio').removeClass('layui-form-radioed').find('i').removeClass('layui-anim-scaleSpring').html('&#xe63f;');
						if (!body.find('#rad-2').is(':checked')) body.find('#rad-2').attr('checked', true).next('.layui-form-radio').addClass('layui-form-radioed').find('i').addClass('layui-anim-scaleSpring').html('&#xe643;');
						if (body.find('input[name="ps"]').eq(0).is(':checked')) body.find('input[name="ps"]').eq(0).attr('checked', false).next('.layui-form-radio').removeClass('layui-form-radioed').find('i').removeClass('layui-anim-scaleSpring').html('&#xe63f;');
						if (!body.find('input[name="ps"]').eq(1).is(':checked')) body.find('input[name="ps"]').eq(1).attr('checked', true).next('.layui-form-radio').addClass('layui-form-radioed').find('i').addClass('layui-anim-scaleSpring').html('&#xe643;');
					}
				});
			}
		}
	};
	exports('union', mojia);
});
