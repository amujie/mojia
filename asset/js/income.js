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
					html += '<table class="layui-table"' + (location.href.indexOf('label/admin') != -1 ? ' style="margin-top:0"' : '') + '><tbody><tr><td colspan="8" style="padding:0">';
					html += '<a target="_blank" href="' + info.link + '" title="' + info.name + '">';
					html += '<img src="' + info.pics + '" alt="' + info.tips + '" style="max-width:100%;width:100%;" />';
					html += '</a></td></tr></tbody></table>';
				});
				html += '</tbody></table>';
				$('.mo-unit-table').before(html);
			},
			'info': [{
				'name': '米上云香港GIA VPS20元起，购买魔加主题的新用户，赠送米上云香港VPS一个月使用时间！',
				'link': 'https://www.mishangyun.com/aff.php?aff=35',
				'pics': 'https://cdn.jsdelivr.net/gh/amujie/mojia@master/asset/img/advert.gif',
				'tips': '米上云香港GIA VPS20元起'
			}]
		},
		'browse': {
			'MSIE\\s[0-9]': 'IE系列',
			'MSIE\\s[8]': 'IE8',
			'MSIE\\s[9]': 'IE9',
			'MSIE\\s[10]': 'IE10',
			'Trident\\/[7]': 'IE11',
			'Edge\\/(\d+)': 'Edge',
			'baiduboxapp': '百度APP',
			'MicroMessenger': '微信',
			'WindowsWechat': '微信PC',
			'MQQBrowser.*\\sQ(?=Q\\/)': 'QQ内置',
			'MQQBrowser\\/\\d+\\.\\d+\\sMobile': 'QQ手机',
			'\\sQ(?=QBrowser)QBrowser': 'QQPC',
			'Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera\\sMini': '移动端'
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
		},
		'seokey': {
			'common': [{
				'name': '网站标题',
				'code': "$maccms['site_name']",
				}, {
				'name': '网站关键字',
				'code': "$maccms['site_keywords']",
				}, {
				'name': '网站描述',
				'code': "$maccms['site_description']",
				}, {
				'name': '逗号',
				'code': "','",
				}, {
				'name': '减号',
				'code': "' - '",
				}, {
				'name': '下划线',
				'code': "'_'",
			}],
			'11,12,21,22,81,82,111,112': [{
				'name': '分类标题',
				'code': "mac_default($obj['type_title'],mac_filter_html($obj['type_name']))",
				}, {
				'name': '分类关键字',
				'code': "mac_default($obj['type_key'],mac_filter_html($obj['type_name']))",
				}, {
				'name': '分类描述',
				'code': "mac_default($obj['type_des'],$maccms['site_description'])",
				}, {
				'name': '筛选年份',
				'code': "$param['year']",
				}, {
				'name': '筛选地区',
				'code': "$param['area']",
				}, {
				'name': '筛选语言',
				'code': "$param['lang']",
				}, {
				'name': '筛选类型',
				'code': "$param['class']",
				}, {
				'name': '筛选分类',
				'code': "$obj['type_name']",
				}, {
				'name': '筛选推荐',
				'code': "($param['level']?'推荐':'')",
				}, {
				'name': '筛选字母',
				'code': "$param['letter']",
				}, {
				'name': '筛选星座',
				'code': "$param['starsign']",
				}, {
				'name': '筛选页码',
				'code': "'第'.$param['page'].'页'",
			}],
			'13,23,33,83,103,113': [{
				'name': '搜索关键字',
				'code': "$param['wd']",
				}, {
				'name': '搜索主演',
				'code': "$param['actor']",
				}, {
				'name': '搜索导演',
				'code': "$param['director']",
				}, {
				'name': '搜索地区',
				'code': "$param['area']",
				}, {
				'name': '搜索年份',
				'code': "$param['lang']",
				}, {
				'name': '搜索星座',
				'code': "$param['starsign']",
			}],
			'14,15,16,24,84,94,104,114': [{
				'name': '分类标题',
				'code': "mac_default($obj['type']['type_title'],mac_filter_html($obj['type']['type_name']))",
				}, {
				'name': '分类关键字',
				'code': "mac_default($obj['type']['type_key'],mac_filter_html($obj['type']['type_name']))",
				}, {
				'name': '分类描述',
				'code': "mac_default($obj['type']['type_des'],$maccms['site_description'])",
			}],
			'14,15,16,104': [{
				'name': '视频标题',
				'code': "mac_default($obj['vod_name'],'404 Not Found')",
				}, {
				'name': '视频副标题',
				'code': "$obj['vod_sub']",
				}, {
				'name': '视频主演',
				'code': "$obj['vod_actor']",
				}, {
				'name': '视频导演',
				'code': "$obj['vod_director']",
				}, {
				'name': '视频编剧',
				'code': "$obj['vod_writer']",
				}, {
				'name': '视频地区',
				'code': "$obj['vod_area']",
				}, {
				'name': '视频年份',
				'code': "$obj['vod_year']",
				}, {
				'name': '视频类型',
				'code': "$obj['vod_class']",
				}, {
				'name': '视频标签',
				'code': "$obj['vod_tag']",
				}, {
				'name': '视频备注',
				'code': "$obj['vod_remarks']",
				}, {
				'name': '视频版本',
				'code': "$obj['vod_version']",
				}, {
				'name': '视频类别',
				'code': "$obj['vod_state']",
				}, {
				'name': '视频推荐',
				'code': "($obj['vod_level']?'【推荐】':'')",
				}, {
				'name': '视频简介',
				'code': "mac_default($obj['vod_blurb'],mac_substring(mac_filter_html($obj['vod_content']),120))",
				}, {
				'name': '视频播放器',
				'code': "$obj['vod_play_list'][$param['sid']]['player_info']",
				}, {
				'name': '视频播放集数',
				'code': "$obj['vod_play_list'][$param['sid']]['urls'][$param['nid']]['name']",
				}, {
				'name': '视频下载器',
				'code': "$obj['vod_down_list'][$param['sid']]['player_info']",
				}, {
				'name': '视频下载集数',
				'code': "$obj['vod_down_list'][$param['sid']]['urls'][$param['nid']]['name']",
			}],
			'24': [{
				'name': '文章标题',
				'code': "mac_default($obj['art_name'],'404 Not Found')",
				}, {
				'name': '文章副标题',
				'code': "$obj['art_sub']",
				}, {
				'name': '文章来源',
				'code': "$obj['art_from']",
				}, {
				'name': '文章作者',
				'code': "$obj['art_author']",
				}, {
				'name': '文章备注',
				'code': "$obj['art_remarks']",
				}, {
				'name': '文章类型',
				'code': "$obj['art_class']",
				}, {
				'name': '文章标签',
				'code': "$obj['art_tag']",
				}, {
				'name': '文章推荐',
				'code': "($obj['art_level']?'【推荐】':'')",
				}, {
				'name': '文章页标题',
				'code': "$obj['art_title']",
				}, {
				'name': '文章页备注',
				'code': "$obj['art_note']",
				}, {
				'name': '文章简介',
				'code': "mac_default($obj['art_blurb'],mac_substring(mac_filter_html($obj['art_content']),120))",
			}],
			'34': [{
				'name': '专题标题',
				'code': "mac_default(mac_default($obj['topic_title'],$obj['topic_name']),'404 Not Found')",
				}, {
				'name': '专题副标题',
				'code': "$obj['topic_sub']",
				}, {
				'name': '专题关键字',
				'code': "$obj['topic_key']",
				}, {
				'name': '专题类型',
				'code': "$obj['topic_type']",
				}, {
				'name': '专题推荐',
				'code': "($obj['topic_level']?'【推荐】':'')",
				}, {
				'name': '专题备注',
				'code': "$obj['topic_remarks']",
				}, {
				'name': '专题简介',
				'code': "mac_default(mac_default($obj['topic_des'],$obj['topic_blurb']),mac_substring(mac_filter_html($obj['topic_content']),120))",
			}],
			'84': [{
				'name': '演员姓名',
				'code': "mac_default($obj['actor_name'],'404 Not Found')",
				}, {
				'name': '演员昵称',
				'code': "$obj['actor_alias']",
				}, {
				'name': '演员性别',
				'code': "$obj['actor_sex']",
				}, {
				'name': '演员星座',
				'code': "$obj['actor_starsign']",
				}, {
				'name': '演员类型',
				'code': "$obj['actor_class']",
				}, {
				'name': '演员标签',
				'code': "$obj['actor_tag']",
				}, {
				'name': '演员院校',
				'code': "$obj['actor_school']",
				}, {
				'name': '演员地区',
				'code': "$obj['actor_area']",
				}, {
				'name': '演员籍贯',
				'code': "$obj['actor_birtharea']",
				}, {
				'name': '演员备注',
				'code': "$obj['actor_remarks']",
				}, {
				'name': '演员作品',
				'code': "$obj['actor_works']",
				}, {
				'name': '演员推荐',
				'code': "($obj['actor_level']?'【推荐】':'')",
				}, {
				'name': '演员简介',
				'code': "mac_default($obj['actor_blurb'],mac_substring(mac_filter_html($obj['actor_content']),120))",
			}],
			'94': [{
				'name': '角色姓名',
				'code': "mac_default($obj['role_name'],'404 Not Found')",
				}, {
				'name': '演员姓名',
				'code': "$obj['role_actor']",
				}, {
				'name': '角色推荐',
				'code': "($obj['role_level']?'【推荐】':'')",
				}, {
				'name': '角色备注',
				'code': "$obj['role_remarks']",
				}, {
				'name': '角色简介',
				'code': "mac_substring(mac_filter_html($obj['role_content']),120)",
			}],
			'114': [{
				'name': '网站标题',
				'code': "mac_default($obj['website_name'],'404 Not Found')",
				}, {
				'name': '网站副标题',
				'code': "$obj['website_sub']",
				}, {
				'name': '网站语言',
				'code': "$obj['website_lang']",
				}, {
				'name': '网站类型',
				'code': "$obj['website_class']",
				}, {
				'name': '网站标签',
				'code': "$obj['website_tag']",
				}, {
				'name': '网站地区',
				'code': "$obj['website_area']",
				}, {
				'name': '网站备注',
				'code': "$obj['website_remarks']",
				}, {
				'name': '网站推荐',
				'code': "($obj['website_level']?'【推荐】':'')",
				}, {
				'name': '网站简介',
				'code': "mac_substring(mac_filter_html($obj['website_content']),120)",
			}],
		}
	};
	exports('income', mojia);
});
