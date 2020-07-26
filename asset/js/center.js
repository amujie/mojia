layui.define(['jquery', 'layer', 'form', 'upload', 'clipboard'], function(exports) {
	var upload = layui.upload,
		layer = layui.layer,
		form = layui.form,
		$ = layui.jquery;
	var mojia = {
		'global': {
			'init': function() {
				this.radio();
				this.common();
				this.upload('.mo-user-load');
				this.whole('.mo-user-whole', '.mo-user-form');
				this.reset('.mo-user-reset', '.mo-user-clear');
				if ($('.mo-user-chat').length) {
					this.wechat('.mo-user-chat');
				}
				var link = new ClipboardJS('.mo-user-link');
				link.on('success', function(data) {
					layer.msg('网址复制成功,快去分享吧');
					data.clearSelection();
				});
			},
			'common': function(str) {
				form.on('submit(center)', function(data) {
					$.post($(data.elem).attr('data-url'), data.field, function(output) {
						$('.mo-user-tips').text(output.msg);
						layer.msg(output.msg);
						if (output.code != 1) return false;
						if ($(data.elem).attr('data-jump')) {
							location.href = $(data.elem).attr('data-jump');
						} else {
							location.reload();
						}
					}, 'json');
					return false;
				});
				form.on('submit(card)', function(data) {
					layer.confirm('确定要使用充值卡充值吗', function(index) {
						$.post($(data.elem).attr('data-url'), data.field, function(data) {
							layer.msg(data.msg);
							location.reload();
						}, 'json');
					});
					return false;
				});
				form.on('submit(pay)', function(data) {
					layer.confirm('确定要在线充值吗', function(index) {
						$.post($(data.elem).attr('data-url'), data.field, function(output) {
							if (output.code == 1) location.href = $(data.elem).attr('data-pay') + "?order_code=" + output.data.order_code;
							else layer.msg(output.msg);
						}, 'json');
					});
					return false;
				});
				form.on('submit(bindmsg)', function(data) {
					$(data.elem).addClass('mo-part-bans mo-text-disad').text('loading...');
					$.post($(data.elem).attr('data-url'), data.field, function(output) {
						$('.mo-user-tips').text(output.msg);
						if (output.code == 1) {
							mojia.global.count(data.elem, 'mo-part-bans mo-text-disad', 60);
						} else {
							$(data.elem).removeClass('mo-part-bans mo-text-disad').text('获取验证码');
						}
					}, 'json');
					return false;
				});
				form.on('submit(unbind)', function(data) {
					layer.confirm('确认解除绑定吗？此操作不可恢复', function(index) {
						$.post($(data.elem).attr('data-url'), {
							ac: $(data.elem).attr('data-type')
						}, function(data) {
							layer.msg(data.msg);
							location.reload();
						}, 'json');
					});
				});
				form.on('submit(group)', function(data) {
					layer.confirm('确定要升级到【' + $(data.elem).attr('data-name') + '】吗,需要花费【' + $(data.elem).attr('data-points') + '】积分', function(index) {
						$.post($(data.elem).attr('data-url'), {
							group_id: $(data.elem).attr('data-id'),
							long: $(data.elem).attr('data-long')
						}, function(data) {
							layer.msg(data.msg);
							location.reload();
						}, 'json');
					});
					return false;
				});
			},
			'whole': function(btn, box) {
				$(btn).off('click').on('click', function() {
					if ($(box).find('input:checkbox').is(':checked')) {
						$(box).find('input:checkbox').removeAttr("checked", false);
					} else {
						$(box).find('input:checkbox').prop("checked", true);
					}
				});
			},
			'reset': function(reset, clear) {
				$(reset).click(function() {
					var output = [];
					$('input[name="ids[]"]').each(function() {
						if (this.checked) output.push(this.value);
					});
					var ids = output.join(',');
					if (ids == '') {
						layer.msg('请至少选择一个数据');
						return false;
					}
					mojia.global.data(ids, 0, $('.mo-user-oper').attr('data-type'));
				});
				$(clear).click(function() {
					mojia.global.data('', 1, $('.mo-user-oper').attr('data-type'));
				});
			},
			'data': function(ids, all, type) {
				var msg = all == 1 ? '清空' : '删除';
				layer.confirm('确定要' + msg + '记录吗', function(index) {
					$.post($('.mo-user-oper').attr('data-url'), {
						ids: ids,
						type: type,
						all: all
					}, function(data) {
						if (data.code == 1) {
							layer.msg(msg + '成功');
							location.reload();
						} else layer.msg(data.msg);
					}, 'json');
				});
			},
			'radio': function(bind, disad) {
				$('.mo-user-radio').click(function() {
					$('input[name="paytype"]').val($(this).val());
				});
				$('input[name="payment"]').click(function() {
					$('.mo-tabs-item').hide().fadeOut();
					$('.mo-tabs-' + $(this).val().toLowerCase()).fadeIn();
					$('input[name="paytype"]').val($('.mo-tabs-' + $(this).val()).show().find('input[name="' + $(this).val() + '"]:checked').val());
				});
			},
			'count': function(bind, disad, count) {
				if (count == 0) {
					var count = 60;
					$(bind).removeClass(disad).text('获取验证码');
					return true;
				} else {
					$(bind).addClass(disad).text('重新获取(' + count + ')');
					count--;
				}
				setTimeout(function() {
					mojia.global.count(bind, disad, count);
				}, 1000);
			},
			'wechat': function(str) {
				setInterval(function() {
					$.post($(str).attr('data-info') + '?order_id=' + $(str).attr('data-code'), function(data) {
						if (data.info.order_status == 1) {
							layer.msg('支付完成，即将跳转到会员中心', {
								icon: 1,
								time: 1000
							}, function() {
								location.href = $(str).attr('data-index');
							});
						}
					});
				}, 5000);
			},
			'upload': function(str) {
				upload.render({
					elem: str,
					url: $(str).attr('data-role'),
					acceptMime: 'image/*',
					accept: 'images',
					size: 2048,
					before: function(input) {
						layer.msg('头像上传中...', {
							time: 3000000
						});
					},
					done: function(res, index, upload) {
						layer.closeAll();
						if (res.code == 0) {
							layer.msg(res.msg);
							return false;
						} else {
							$(this.item).next().next().attr('src', res.file);
							layer.msg('头像修改成功', {
								time: 1000
							});
						}
					}
				});
			}
		}
	};
	exports('center', mojia);
});
