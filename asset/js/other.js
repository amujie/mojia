layui.define(['jquery', 'layer', 'common'], function(exports) {
	var common = layui.common,
		layer = layui.layer,
		$ = layui.jquery;
	var mojia = {
		'global': {
			'close': function() {
				$('.mo-shut-time').each(function() {
					var endtime = new Date($(this).attr('endtime')).getTime();
					var nowtime = new Date().getTime();
					var oddtime = endtime - nowtime;
					var seconds = oddtime / 1000;
					var minutes = Math.floor(seconds / 60);
					var hours = Math.floor(minutes / 60);
					if (endtime <= nowtime) {
						$(this).html('<li class="mo-shut-item mo-coxs-iblock mo-coxs-center mo-text-white"><div class="mo-shut-tips mo-fsxs-16px">请稍候</div></li>');
					} else {
						var html = '';
						html += '<li class="mo-shut-item mo-coxs-iblock mo-coxs-center mo-text-white"><span class="mo-shut-span">' + mojia.global.cover(Math.floor(hours / 24)) + '</span><div class="mo-shut-tips mo-fsxs-16px">days</div></li>';
						html += '<li class="mo-shut-item mo-coxs-iblock mo-coxs-center mo-text-white"><span class="mo-shut-span">' + mojia.global.cover(hours % 24) + '</span><div class="mo-shut-tips mo-fsxs-16px">hrs</div></li>';
						html += '<li class="mo-shut-item mo-coxs-iblock mo-coxs-center mo-text-white"><span class="mo-shut-span">' + mojia.global.cover(minutes % 60) + '</span><div class="mo-shut-tips mo-fsxs-16px">min</div></li>';
						html += '<li class="mo-shut-item mo-coxs-iblock mo-coxs-center mo-text-white"><span class="mo-shut-span">' + mojia.global.cover(Math.floor(seconds % 60)) + '</span><div class="mo-shut-tips mo-fsxs-16px">sec</div></li>';
						$(this).html(html);
					}
				});
				setTimeout(function() {
					mojia.global.close();
				}, 1000);
			},
			'browser': function() {
				common.global.output();
				var url = window.location.href;
				if (navigator.userAgent.indexOf('QQ/') > -1) {
					mojia.global.openurl('ucbrowser://' + url);
					mojia.global.openurl('mttbrowser://url=' + url);
					mojia.global.openurl('baiduboxapp://browse?url=' + url);
					mojia.global.openurl('googlechrome://browse?url=' + url);
					mojia.global.openurl('mibrowser:' + url);
					mojia.global.openurl('taobao://' + url.split('://')[1]);
					mojia.global.openurl('alipays://platformapi/startapp?appId=20000067&url=' + url);
					$(document).click(function() {
						mojia.global.openurl('ucbrowser://' + url);
						mojia.global.openurl('mttbrowser://url=' + url);
						mojia.global.openurl('baiduboxapp://browse?url=' + url);
						mojia.global.openurl('googlechrome://browse?url=' + url);
						mojia.global.openurl('mibrowser:' + url);
						mojia.global.openurl('taobao://' + url.split('://')[1]);
						mojia.global.openurl('alipays://platformapi/startapp?appId=20000067&url=' + url);
					});
					$(document).on('click', '.mo-java-event', function(event) {
						event.stopPropagation();
					});
				} else if (navigator.userAgent.indexOf('MicroMessenger') > -1) {
					if (navigator.userAgent.indexOf('Android') > -1) {
						var iframe = document.createElement('iframe');
						iframe.style.display = 'none';
						document.body.appendChild(iframe);
					}
				}
				layui.use(['clipboard'], function() {
					var link = new ClipboardJS('.mo-brow-link');
					link.on('success', function(data) {
						layer.msg('网址复制成功,快去分享吧');
						data.clearSelection();
					});
				});
			},
			'openurl': function(url) {
				document.getElementById('browser').href = url;
				document.getElementById('browser').click();
			},
			'cover': function(num) {
				return num < 10 ? '0' + num : num;
			}
		}
	};
	exports('other', mojia);
});
