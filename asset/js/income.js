layui.define(['jquery'], function(exports) {
	var $ = layui.jquery;
	var mojia = {
		'global': {
			'init': function() {
				mojia.global.html();
			},
			'html': function() {
				var html = '';
				$.each(mojia.global.info, function(nums, info) {
					html += '<table class="layui-table"><tbody><tr><td colspan="8" style="padding:0">';
					html += '<a target="_blank" href="' + info.link + '" title="' + info.name + '">';
					html += '<img src="' + info.pics + '" alt="' + info.tips + '" style="max-width:100%;width:100%;" />';
					html += '</a></td></tr></tbody></table>';
				});
				html += '</tbody></table>';
				$('.mo-unit-table').before(html);
			},
			'info': [{
				'name': '苹果CMS魔加影视模板',
				'link': 'https://jq.qq.com/?_wv=1027&k=51Zakp5',
				'pics': 'https://cdn.jsdelivr.net/gh/amujie/mojia@latest/asset/img/advert.jpg',
				'tips': '苹果CMS魔加影视模板'
			}]
		},
		'unions': {
			'qq': [{
				'name': '腾讯视频',
				'tips': '在线播放',
				'sort': '999'
			}],
			'youku': [{
				'name': '优酷视频',
				'tips': '在线播放',
				'sort': '998'
			}],
			'qiyi': [{
				'name': '奇艺视频',
				'tips': '在线播放',
				'sort': '997'
			}],
			'sohu': [{
				'name': '搜狐视频',
				'tips': '在线播放',
				'sort': '996'
			}],
			'letv': [{
				'name': '乐视视频',
				'tips': '在线播放',
				'sort': '995'
			}],
			'migu': [{
				'name': '咪咕视频',
				'tips': '在线播放',
				'sort': '994'
			}],
			'kankan': [{
				'name': '迅雷看看',
				'tips': '在线播放',
				'sort': '993'
			}],
			'bilibili': [{
				'name': '哔哩哔哩',
				'tips': '在线播放',
				'sort': '992'
			}],
			'mgtv': [{
				'name': '芒果TV',
				'tips': '在线播放',
				'sort': '991'
			}],
			'pptv': [{
				'name': 'PP视频',
				'tips': '在线播放',
				'sort': '990'
			}],
			'm1905': [{
				'name': 'M1905',
				'tips': '在线播放',
				'sort': '989'
			}],
			'm3u8': [{
				'name': '在线播放',
				'tips': '在线播放',
				'sort': '988'
			}],
			'ckplayer': [{
				'name': '在线播放',
				'tips': '在线播放',
				'sort': '987'
			}],
			'xunlei': [{
				'name': '迅雷下载',
				'tips': '在线下载',
				'sort': '999'
			}],
			'http': [{
				'name': '普通下载',
				'tips': '在线下载',
				'sort': '998'
			}],
			'ed2k': [{
				'name': '电驴下载',
				'tips': '在线下载',
				'sort': '997'
			}],
			'baidu': [{
				'name': '百度网盘',
				'tips': '网盘下载',
				'sort': '996'
			}],
			'weiyun': [{
				'name': '微云网盘',
				'tips': '网盘下载',
				'sort': '995'
			}],
			'magnet': [{
				'name': '磁力链接',
				'tips': '在线下载',
				'sort': '994'
			}]
		}
	};
	exports('income', mojia);
});
