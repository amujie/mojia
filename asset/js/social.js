layui.define(['jquery', 'layer', 'common'], function(exports) {
	var common = layui.common,
		layer = layui.layer,
		$ = layui.jquery;
	var mojia = {
		'global': {
			'init': function() {
				mojia.comment.init();
				mojia.message.init();
				mojia.express.init();
				mojia.global.focus();
			},
			'focus': function() {
				$(document).on('focus', '.mo-form-area', function() {
					if ($('.mo-comm-form').attr('data-login') == 1 && !common.cookie.get('user_id')) {
						$('.mo-navs-logins').click();
					}
				});
			},
			'count': function(str) {
				if ($(str + ' .mo-form-area').val() != undefined) $(str + ' .mo-comm-tips').text('还可以输入' + (255 - $(str + ' .mo-form-area').val().length) + '字');
				$(document).on('click keyup input', str + ' .mo-form-area', function() {
					$(str + ' .mo-comm-tips').text('还可以输入' + (255 - $(this).val().length) + '字');
				});
			}
		},
		'express': {
			'init': function() {
				$(document).on('click', '.mo-java-face', function() {
					var text = $(this).parents('.mo-comm-form').find('.mo-form-area');
					text.val(text.val() + $(this).attr('data-code'));
					$('.mo-form-face').removeClass('mo-icon-shibai-line');
					$('.mo-face-info').hide();
				});
				$(document).on('click', '.mo-form-face', function() {
					if ($('.mo-face-info').is(':visible')) {
						$(this).removeClass('mo-icon-shibai-line');
						$('.mo-face-info').hide();
					} else {
						$(this).addClass('mo-icon-shibai-line');
						var html = '<div class="mo-face-boxs mo-paxs-5px">';
						$.each(mojia.symbol, function(list, name) {
							html += '<div class="mo-face-item mo-part-btsd mo-part-blsd mo-bord-muted mo-cols-zero' + (list == 'qq' ? ' mo-cols-show' : ' mo-cols-hide') + '">';
							$.each(name.code, function(nums, info) {
								html += '<a class="mo-face-pics  mo-part-brsd mo-part-bbsd mo-bord-muted mo-coxs-center mo-cols-show mo-coxs-iblock mo-java-face" href="javascript:;" data-code="[' + list + '/' + info[1] + ']" title="' + info[0] + '"><img width="24" height="24" src="' + magic.cdn + 'asset/face/' + list + '/' + info[1] + '.' + (list == 'qq' ? 'gif' : 'png') + '"/></a>';
							});
							html += '</div>';
						});
						html += '</div><div class="mo-face-foot mo-part-btsd mo-bord-muted mo-back-muted">';
						$.each(mojia.symbol, function(list, name) {
							html += '<a class="mo-face-btns mo-cols-cell mo-coxs-center' + (list == 'qq' ? ' mo-text-mojia  mo-part-bans' : '') + '" href="javascript:;">' + name.name + '</a>';
						});
						html += '</div></div>';
						$(this).next().html(html).show();
						common.global.outer($(this), '.mo-form-tips', '.mo-face-info', 'mo-part-tops');
					}
				});
			}
		},
		'comment': {
			'init': function() {
				mojia.comment.show(1);
				common.global.submit('.mo-page-jump', '.mo-page-text');
				common.global.submit('.mo-comm-submit', '.mo-comm-maform');
				$(document).on('click', '.mo-comm-record', function() {
					mojia.comment.show(1);
				});
				$(document).on('click', '.mo-comm-rbtn', function() {
					mojia.comment.form($(this));
				});
				$(document).on('click', '.mo-comm-maform .mo-comm-submit', function() {
					mojia.comment.firm($(this));
				});
				$(document).on('click', '.mo-comm-repo', function() {
					mojia.comment.repo($(this));
				});
				$(document).on('click', '.mo-comm-digg', function() {
					mojia.comment.digg($(this));
				});
				$(document).on('click', '.mo-page-jump', function() {
					if ($('.mo-page-info').attr('data-aid') == 5) {
						mojia.comment.show($('.mo-page-text').val());
						mojia.global.gotopr('.mo-java-page');
					}
				});
				$(document).on('click', '.mo-page-item', function() {
					if ($('.mo-page-info').attr('data-aid') == 5) {
						mojia.comment.show($(this).attr('data-nums'));
						mojia.global.gotopr('.mo-java-page');
					}
				});
			},
			'form': function(that) {
				$('.mo-comm-suform').remove();
				if (that.text() == '取消') {
					$('.mo-comm-maform').show();
					that.text('回复');
					return false;
				} else if (that.text() == '回复') {
					$('.mo-comm-rbtn').text('回复');
					common.global.verify();
					that.text('取消');
				}
				var output = $($('.mo-comm-maform').prop('outerHTML'));
				output.addClass('mo-comm-suform mo-comm-sons');
				output.find('input[name="comment_pid"]').val(that.attr("data-id"));
				that.parent().parent().after(output);
				$('.mo-comm-maform').hide();
				$('.mo-comm-suform').show();
				$('.mo-comm-suform .mo-form-area').focus().val('@' + that.parent().parent().prev().find('.mo-part-bold').text() + '：');
				mojia.global.count('.mo-comm-suform');
			},
			'show': function(page) {
				if (!$('.mo-comm-critic').length) return false;
				$.get(magic.path + 'index.php/comment/index?rid=' + $('.mo-java-data').attr('data-rid') + '&mid=' + $('.mo-java-data').attr('data-mid') + '&page=' + page, function(data) {
					$('.mo-comm-critic').html(data);
					mojia.global.count('.mo-comm-maform');
					common.global.verify();
				}).error(function() {
					$('.mo-comm-critic').html('<p class="mo-coxs-center mo-paxs-5px mo-pamd-10px">评论加载失败，<a class="mo-comm-record mo-text-mojia" href="javascript:;">重新加载</a></p>');
				});
			},
			'firm': function(str) {
				$.post(magic.path + 'index.php/comment/saveData', $(str.parents('form')).serialize() + '&comment_mid=' + $('.mo-java-data').attr('data-mid') + '&comment_rid=' + $('.mo-java-data').attr('data-rid'), function(data) {
					$('.mo-comm-tips').text(data.msg.replace('参数错误：', ''));
					if (data.code == 1) mojia.comment.show(1);
					else common.global.verify();
				});
			},
			'repo': function(that) {
				$.post(magic.path + 'index.php/comment/report?id=' + that.attr('data-id'), function(data) {
					layer.msg(data.msg);
					that.html('已举报');
				});
			},
			'digg': function(that) {
				$.post(magic.path + 'index.php/ajax/digg?mid=' + that.attr('data-mid') + '&id=' + that.attr('data-id') + '&type=' + that.attr('data-type'), function(data) {
					layer.msg(data.msg);
					if (data.code != 1) return false;
					if (that.attr('data-type') == 'up') that.html('已支持(' + data.data.up + ')');
					else that.html('已反对(' + data.data.down + ')');
				});
			}
		},
		'message': {
			'init': function() {
				if ($('.mo-java-data').attr('data-mid') == 5) mojia.message.show(1);
				common.global.submit('.mo-comm-gbooks', '.mo-comm-gbform');
				if ($('.mo-java-data').attr('data-aid') == 13) $('.mo-comm-gbform').find('textarea').val('求片：请管理员添加《' + $('.mo-java-hunt').text() + '》谢谢！');
				mojia.global.count('.mo-comm-gbform');
				$(document).on('click', '.mo-comm-report', function() {
					var that = $(this);
					$.post($(this).attr('data-href'), function(data) {
						$('.mo-java-left').addClass('mo-part-left');
						layer.open({
							type: 1,
							btn: false,
							id: 'report',
							title: '视频报错',
							skin: 'mo-open-info mo-bord-round',
							content: data,
							shadeClose: true,
							success: function(layero) {
								common.global.verify();
								$(layero).addClass('mo-back-white');
								$(layero).find('.layui-layer-title').addClass('mo-open-head mo-back-white mo-part-zero');
								$('.mo-comm-gbform').find('textarea').val('报错《' + $('.mo-java-play').attr('data-name') + '》' + $('.mo-java-play').attr('data-nums') + '［' + that.attr('data-show') + '］请修复：' + location.href + '　' + navigator.userAgent.replace('Mozilla/', '').replace(/\sAppleWebKit\/[1-9][0-9]*\.[0-9]*\s\(KHTML,\slike\sGecko\)/i, '').replace(/\sMobile\sSafari\/[1-9][0-9]*\.[0-9]*/i, ''));
								mojia.global.count('.mo-comm-gbform');
								$.getScript('https://pv.sohu.com/cityjson?ie=utf-8', function(data, status) {
									$('.mo-comm-gbform').find('textarea').val($('.mo-comm-gbform').find('textarea').val() + ' ' + 'IPAdress/' + returnCitySN.cip);
									mojia.global.count('.mo-comm-gbform');
								});
							}
						});
					});
				});
				$(document).on('click', '.mo-comm-gbooks', function() {
					mojia.message.firm();
				});
				$(document).on('click', '.mo-page-jump', function() {
					if ($('.mo-page-info').attr('data-aid') == 4) {
						mojia.message.show($('.mo-page-text').val());
						mojia.global.gotopr('.mo-java-page');
					}
				});
				$(document).on('click', '.mo-page-item', function() {
					if ($('.mo-page-info').attr('data-aid') == 4) {
						mojia.message.show($(this).attr('data-nums'));
						mojia.global.gotopr('.mo-java-page');
					}
				});
			},
			'show': function(page) {
				$.get(magic.path + 'index.php/gbook/ajax?page=' + page, function(data) {
					$('.mo-comm-gbajax').html(data);
				}).error(function() {
					$('.mo-comm-gbajax').html('<p class="mo-coxs-center mo-paxs-5px mo-pamd-10px">留言加载失败，<a class="mo-comm-record mo-text-mojia" href="javascript:;">重新加载</a></p>');
				});
			},
			'firm': function() {
				$.post(magic.path + 'index.php/gbook/saveData', $('.mo-comm-gbform').serialize(), function(data) {
					$('.mo-comm-tips').text(data.msg.replace('参数错误：', ''));
					if (data.code == 1) {
						if ($('.mo-comm-gbform').attr('data-book')) location.reload();
						else $('.mo-comm-gbooks').text('成功').addClass('mo-back-disad mo-part-bans');
					} else common.global.verify();
				});
			}
		},
		'symbol': {
			'qq': {
				'name': '扣扣',
				'code': [
					['微笑', 'weixiao'],
					['撇嘴', 'piezui'],
					['色', 'se'],
					['发呆', 'fadai'],
					['得意', 'deyi'],
					['流泪', 'liulei'],
					['害羞', 'haixiu'],
					['闭嘴', 'bizui'],
					['睡', 'shui'],
					['大哭', 'daku'],
					['尴尬', 'ganga'],
					['发怒', 'fanu'],
					['调皮', 'tiaopi'],
					['呲牙', 'ciya'],
					['惊讶', 'jingya'],
					['难过', 'nanguo'],
					['酷', 'ku'],
					['冷汗', 'lenghan'],
					['抓狂', 'zhuakuang'],
					['吐', 'tu'],
					['偷笑', 'touxiao'],
					['可爱', 'keai'],
					['白眼', 'baiyan'],
					['傲慢', 'aoman'],
					['饥饿', 'jie'],
					['困', 'kun'],
					['惊恐', 'jingkong'],
					['流汗', 'liuhan'],
					['憨笑', 'hanxiao'],
					['大兵', 'dabing'],
					['奋斗', 'fendou'],
					['咒骂', 'zhouma'],
					['疑问', 'yiwen'],
					['嘘', 'xu'],
					['晕', 'yun'],
					['折磨', 'zhemo'],
					['衰', 'suai'],
					['骷髅', 'kulou'],
					['敲打', 'qiaoda'],
					['再见', 'zaijian'],
					['擦汗', 'cahan'],
					['抠鼻', 'koubi'],
					['鼓掌', 'guzhang'],
					['糗大了', 'qiudale'],
					['坏笑', 'huaixiao'],
					['左哼哼', 'zuohengheng'],
					['右哼哼', 'youhengheng'],
					['哈欠', 'haqian'],
					['鄙视', 'bishi'],
					['委屈', 'weiqu'],
					['快哭了', 'kuaikule'],
					['阴险', 'yinxian'],
					['亲亲', 'qinqin'],
					['吓', 'xia'],
					['可怜', 'kelian'],
					['菜刀', 'caidao'],
					['西瓜', 'xigua'],
					['啤酒', 'pijiu'],
					['篮球', 'lanqiu'],
					['乒乓', 'pingpang'],
					['咖啡', 'kafei'],
					['饭', 'fan'],
					['猪头', 'zhutou'],
					['玫瑰', 'meigui'],
					['凋谢', 'diaoxie'],
					['吻', 'wen'],
					['心', 'xin'],
					['心碎', 'xinsui'],
					['蛋糕', 'dangao'],
					['闪电', 'shandian'],
					['炸弹', 'zhadan'],
					['刀', 'dao'],
					['足球', 'zuqiu'],
					['瓢虫', 'piaochong'],
					['便便', 'bianbian'],
					['月亮', 'yueliang'],
					['太阳', 'taiyang'],
					['礼物', 'liwu'],
					['拥抱', 'yongbao'],
					['强', 'qiang'],
					['弱', 'ruo'],
					['握手', 'woshou'],
					['胜利', 'shengli'],
					['抱拳', 'baoquan'],
					['勾引', 'gouyin'],
					['拳头', 'quantou'],
					['差劲', 'chajin'],
					['爱你', 'aini'],
					['NO', 'no'],
					['OK', 'ok'],
					['爱情', 'aiqing'],
					['飞吻', 'feiwen'],
					['跳跳', 'tiaotiao'],
					['发抖', 'fadou'],
					['怄火', 'ouhuo'],
					['转圈', 'zhuanquan'],
					['磕头', 'ketou'],
					['回头', 'huitou'],
					['跳绳', 'tiaosheng'],
					['挥动', 'huidong'],
					['激动', 'jidong'],
					['街舞', 'jiewu'],
					['献吻', 'xianwen'],
					['左太极', 'zuotaiji'],
					['右太极', 'youtaiji'],
					['囍', 'xi'],
					['發财', 'facai'],
					['鞭炮', 'bianpao'],
					['灯笼', 'denglong'],
					['沙发', 'shafa'],
					['K歌', 'kge'],
					['喝彩', 'hecai'],
					['爆筋', 'baojing'],
					['棒棒糖', 'bangbangtang'],
					['奶瓶', 'naiping'],
					['钱', 'qian'],
					['药丸', 'yaowan'],
					['手枪', 'shouqiang'],
					['纸巾', 'zhijin'],
					['邮件', 'youjian'],
					['车', 'che'],
					['左车头', 'zuochetou'],
					['车厢', 'chexiang'],
					['右车头', 'youchetou'],
					['飞机', 'feiji'],
					['灯', 'deng'],
					['多云', 'duoyun'],
					['下雨', 'xiayu'],
					['雨伞', 'yusan'],
					['青蛙', 'qingwa'],
					['气球', 'qiqiu'],
					['香蕉', 'xiangjiao'],
					['熊猫', 'xiongmao'],
					['面条', 'miantiao'],
					['蜡烛', 'lazhu'],
					['闹钟', 'naozhong'],
					['风车', 'fengche'],
					['购物', 'gouwu'],
					['戒指', 'jiezhi'],
					['帅', 'shuai'],
				],
			},
			'dy': {
				'name': '抖音',
				'code': [
					['微笑', 'weixiao'],
					['色', 'se'],
					['发呆', 'fadai'],
					['得意', 'deyi'],
					['流泪', 'liulei'],
					['害羞', 'haixiu'],
					['闭嘴', 'bizui'],
					['睡', 'shui'],
					['大哭', 'daku'],
					['尴尬', 'ganga'],
					['调皮', 'tiaopi'],
					['呲牙', 'ciya'],
					['惊讶', 'jingya'],
					['难过', 'nanguo'],
					['酷', 'ku'],
					['抓狂', 'zhuakuang'],
					['吐', 'tu'],
					['偷笑', 'touxiao'],
					['可爱', 'keai'],
					['白眼', 'baiyan'],
					['困', 'kun'],
					['惊恐', 'jingkong'],
					['奋斗', 'fendou'],
					['咒骂', 'zhouma'],
					['疑问', 'yiwen'],
					['嘘', 'xu'],
					['晕', 'yun'],
					['敲打', 'qiaoda'],
					['再见', 'zaijian'],
					['擦汗', 'cahan'],
					['抠鼻', 'koubi'],
					['鼓掌', 'guzhang'],
					['冷汗', 'lenghan'],
					['坏笑', 'huaixiao'],
					['左哼哼', 'zuohengheng'],
					['右哼哼', 'youhengheng'],
					['哈欠', 'haqian'],
					['鄙视', 'bishi'],
					['委屈', 'weiqu'],
					['快哭了', 'kuaikule'],
					['阴险', 'yinxian'],
					['亲亲', 'qinqin'],
					['吓', 'xia'],
					['可怜', 'kelian'],
					['飞吻', 'feiwen'],
					['呃', 'e'],
					['嘟嘴', 'duzui'],
					['抽烟', 'chouyan'],
					['吃瓜', 'chigua'],
					['大笑', 'daxiao'],
					['爱钱', 'aiqian'],
					['嘚瑟', 'dese'],
					['关注我', 'guanzhuwo'],
					['互粉', 'hufen'],
					['加好友', 'jiahaoyou'],
					['哈哈', 'haha'],
					['黑线', 'heixian'],
					['吐血', 'tuxue'],
					['真棒', 'zhenbang'],
					['嘻嘻', 'xixi'],
					['鸭嘴', 'yazui'],
					['卧槽', 'wocao'],
					['捂脸笑', 'wulianxiao'],
					['没眼看', 'meiyankan'],
					['摸头', 'motou'],
					['听音乐', 'tinyinyue'],
					['思考', 'sikao'],
					['打脸', 'dalian'],
					['飙泪', 'biaolei'],
					['彩虹', 'caihong'],
					['拥抱', 'yongbao'],
					['大兵', 'dabing'],
					['绿帽', 'lvmao'],
					['脸红', 'lianhong'],
					['什么', 'what'],
					['就是你', 'jiushini'],
					['口罩', 'kouzhao'],
					['开心', 'kaixin'],
					['献爱心', 'xianaixin'],
					['捂嘴哭', 'wuzuiku'],
					['想法', 'xiangfa'],
					['嫌弃', 'xianqi'],
					['流口水', 'liukoushui'],
					['狂汗', 'kuanghan'],
					['喜欢', 'xihuan'],
					['吐舌', 'tushe'],
					['笑哭', 'xiaoku'],
					['斜眼', 'xieyan'],
					['斜眼笑', 'xieyanxiao'],
					['发怒', 'fanu'],
					['黑脸', 'heilian'],
					['衰', 'shuai'],
					['石化', 'shihua'],
					['骷髅', 'kulou'],
					['便便', 'bianbian'],
					['合掌', 'hezhang'],
					['欢迎', 'huanying'],
					['撞拳', 'zhuangquan'],
					['左指', 'zuozhi'],
					['右指', 'youzhi'],
					['拍手', 'paishou'],
					['强', 'qiang'],
					['弱', 'ruo'],
					['握手', 'woshou'],
					['标记', 'biaoji'],
					['OK', 'ok'],
					['胜利', 'shengli'],
					['抱拳', 'baoquan'],
					['勾引', 'gouyin'],
					['拳头', 'quantou'],
					['比心', 'bixin'],
					['力量', 'liliang'],
					['啦啦', 'lala'],
					['捂眼', 'wuyan'],
					['不看', 'bukan'],
					['猪头', 'zhutou'],
					['二哈', 'erha'],
					['狗头', 'goutou'],
					['啥', 'sha'],
					['黄瓜', 'huanggua'],
					['给力', 'geili'],
					['炸弹', 'zhadan'],
					['禁止', 'jinzhi'],
					['去污粉', 'quwufen'],
					['威武', 'weiwu'],
					['六六六', '666'],
					['红包', 'hongbao'],
					['蛋糕', 'dangao'],
					['礼物', 'liwu'],
					['菜刀', 'caidao'],
					['西瓜', 'xigua'],
					['啤酒', 'pijiu'],
					['咖啡', 'kafei'],
					['玫瑰', 'meigui'],
					['凋谢', 'diaoxie'],
					['吻', 'wen'],
					['心', 'xin'],
					['心碎', 'xinsui'],
					['發财', 'facai'],
					['喝彩', 'hecai'],
				],
			},
			'wb': {
				'name': '微博',
				'code': [
					['呵呵', 'hehe'],
					['可爱', 'keai'],
					['开心', 'kaixin'],
					['鼓掌', 'guzhang'],
					['嘻嘻', 'xixi'],
					['哈哈', 'haha'],
					['爱你', 'aini'],
					['笑哭', 'xiaoku'],
					['笑哭嗨', 'xiaokuhai'],
					['偷笑', 'touxiao'],
					['挤眼', 'jiyan'],
					['馋嘴', 'chanzui'],
					['黑线', 'heixian'],
					['吃惊', 'chijing'],
					['抠鼻', 'koubi'],
					['哼', 'heng'],
					['怒', 'nu'],
					['怒骂', 'numa'],
					['委屈', 'weiqu'],
					['可怜', 'kelian'],
					['悲伤', 'beishang'],
					['流泪', 'liulei'],
					['左哼哼', 'zuohengheng'],
					['右哼哼', 'youhengheng'],
					['懒得理', 'landeli'],
					['傻眼', 'shayan'],
					['失望', 'shiwang'],
					['抓狂', 'zhuakuang'],
					['阴险', 'yinxian'],
					['不听', 'buting'],
					['嘘', 'xu'],
					['晕', 'yun'],
					['思考', 'sikao'],
					['思考怒', 'sikaonu'],
					['生病', 'shengbing'],
					['钱', 'qian'],
					['亲亲', 'qinqin'],
					['睡觉', 'shuijiao'],
					['疑问', 'yiwen'],
					['困', 'kun'],
					['吐', 'tu'],
					['酷', 'ku'],
					['感冒', 'ganmao'],
					['害羞', 'haixiu'],
					['害羞怒', 'haixiunu'],
					['闭嘴', 'bizui'],
					['敲打', 'qiaoda'],
					['打脸', 'dalian'],
					['哈欠', 'haqian'],
					['拜拜', 'baibai'],
					['鄙视', 'bishi'],
					['花心', 'huaxin'],
					['互粉', 'hufen'],
					['衰', 'shuai'],
					['二哈', 'erha'],
					['汪', 'dog'],
					['汪嗨', 'doghai'],
					['汪怒', 'dognu'],
					['汪哭', 'dogku'],
					['汪添', 'dogtian'],
					['汪惊', 'dogjing'],
					['汪笑', 'dogxiao'],
					['汪思考', 'dogsikao'],
					['喵', 'miao'],
					['喵嗨', 'miaohai'],
					['喵怒', 'miaonu'],
					['喵哭', 'miaoku'],
					['喵思考', 'miaosikao'],
					['男孩', 'nanhai'],
					['女孩', 'nvhai'],
					['熊猫', 'xiongmao'],
					['兔子', 'tuzi'],
					['猪头', 'zhutou'],
					['神兽', 'shenshou'],
					['奥特曼', 'aoteman'],
					['囍', 'xi'],
					['囧', 'jiong'],
					['萌', 'meng'],
					['毛线', 'maoxian'],
					['肥皂', 'feizao'],
					['给力', 'geili'],
					['神马', 'shenma'],
					['威武', 'weiwu'],
					['斜眼', 'xieyan'],
				]
			},
			'tb': {
				'name': '贴吧',
				'code': [
					['啊', 'a'],
					['鄙视', 'bishi'],
					['不高兴', 'bugaoxing'],
					['乖', 'guai'],
					['哈哈', 'haha'],
					['汗', 'han'],
					['呵呵', 'hehe'],
					['黑线', 'heixian'],
					['滑稽', 'huaji'],
					['花心', 'huaxin'],
					['惊哭', 'jingku'],
					['惊讶', 'jingya'],
					['酷', 'ku'],
					['狂汗', 'kuanghan'],
					['懒得理', 'landeli'],
					['流泪', 'liulei'],
					['勉强', 'mianqiang'],
					['你懂的', 'nidongde'],
					['怒', 'nu'],
					['喷', 'pen'],
					['睡觉', 'shuijiao'],
					['酸爽', 'suanshuang'],
					['开心', 'kaixin'],
					['吐', 'tu'],
					['吐舌', 'tushe'],
					['抠鼻', 'koubi'],
					['委屈', 'weiqu'],
					['什么', 'what'],
					['捂嘴笑', 'wuzuixiao'],
					['乖巧', 'guaiqiao'],
					['脸红', 'lianhong'],
					['笑尿', 'xiaoniao'],
					['笑眼', 'xiaoyan'],
					['犀利', 'xili'],
					['雅蠛蝶', 'yamiedie'],
					['阴险', 'yinxian'],
					['疑问', 'yiwen'],
					['真棒', 'zhenbang'],
					['吃瓜', 'chigua'],
					['关注', 'guanzhu'],
					['喝彩', 'hecai'],
					['完美', 'wanmei'],
					['发呆', 'fadai'],
					['摊手', 'tanshou'],
					['偷看', 'toukan'],
					['嘿嘿', 'heihei'],
					['喝酒', 'hejiu'],
					['尴尬', 'ganga'],
					['放炮', 'fangpao'],
					['噗', 'pu'],
					['打盹', 'dadun'],
					['偷瞄', 'toumiao'],
					['黑笑', 'heixiao'],
					['呆滞', 'daizhi'],
					['爱心', 'aixin'],
					['心碎', 'xinsui'],
					['大拇指', 'damuzhi'],
					['胜利', 'shengli'],
					['OK', 'ok'],
					['爱你', 'aini'],
					['彩虹', 'caihong'],
					['钱币', 'qianbi'],
					['蛋糕', 'dangao'],
					['灯泡', 'dengpao'],
					['红领巾', 'honglingjin'],
					['礼物', 'liwu'],
					['玫瑰', 'meigui'],
					['咖啡', 'kafei'],
					['手纸', 'shouzhi'],
					['蜡烛', 'lazhu'],
					['香蕉', 'xiangjiao'],
					['沙发', 'shafa'],
					['便便', 'bianbian'],
					['音乐', 'yinyue'],
					['太阳', 'taiyang'],
					['月亮', 'yueliang'],
					['药丸', 'yaowan'],
				]
			}
		}
	};
	exports('social', mojia);
});
