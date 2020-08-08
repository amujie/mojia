layui.define(['jquery'], function(exports) {
	window.$ = window.jQuery = layui.$;
	var mojia = {
		'global': {
			'init': function() {
				mojia.navbar.init();
				mojia.button.init();
				mojia.player.init();
				mojia.global.click();
				mojia.global.event();
				mojia.global.output();
				mojia.global.paging();
				mojia.global.passer();
				mojia.global.verify();
				mojia.global.jumper(3);
				var screen = [['.mo-movs-btns', '.mo-movs-item'], ['.mo-down-btns', '.mo-down-item'], ['.mo-tabs-btns', '.mo-tabs-item'], ['.mo-face-btns', '.mo-face-item']];
				for (var i = 0; i < screen.length; i++) {
					mojia.global.tabser(screen[i][0], screen[i][1], 'mo-text-mojia mo-part-bans');
				}
				var screen = ['show', 'sort', 'class', 'starsign', 'area', 'lang', 'level', 'year', 'letter'];
				for (var i = 0; i < screen.length; i++) {
					mojia.global.scroll('.mo-java-' + screen[i], '.mo-scre-' + screen[i]);
				}
				if ($('.mo-java-waps').attr('data-mob') != 0 && $('.mo-java-waps').attr('data-wap') != location.host && mojia.global.mobile()) location.href = location.href.replace(location.host, $('.mo-java-waps').attr('data-wap'));
				if ($('.mo-java-data').attr('data-aid') == 15) {
					$.post(magic.path + 'index.php/user/ajax_ulog/?ac=set&mid=' + $('.mo-java-data').attr('data-mid') + '&id=' + $('.mo-java-data').attr('data-rid') + '&sid=' + $('.mo-java-data').attr('data-sid') + '&nid=' + $('.mo-java-data').attr('data-nid') + '&type=4');
				} else if ($('.mo-java-data').attr('data-aid') == 16) {
					$.post(magic.path + 'index.php/user/ajax_ulog/?ac=set&mid=' + $('.mo-java-data').attr('data-mid') + '&id=' + $('.mo-java-data').attr('data-rid') + '&sid=' + $('.mo-java-data').attr('data-sid') + '&nid=' + $('.mo-java-data').attr('data-nid') + '&type=5');
				}
				if ($('.mo-java-data').attr('data-aid') == 15 || $('.mo-java-data').attr('data-aid') == 24 || $('.mo-java-data').attr('data-aid') == 34 || $('.mo-java-data').attr('data-aid') == 84 || $('.mo-java-data').attr('data-aid') == 94 || $('.mo-java-data').attr('data-aid') == 114) {
					$.post(magic.path + 'index.php/ajax/hits?mid=' + $('.mo-java-data').attr('data-mid') + '&id=' + $('.mo-java-data').attr('data-rid') + '&type=update');
				}
				if ($('.mo-java-data').attr('data-mid') == 5 || $('.mo-java-data').attr('data-aid') == 13 || $('.mo-comm-critic').length) {
					layui.use('social', function() {
						layui.social.global.init();
					});
				}
				if ($('.mo-java-data').attr('data-mid') == 6) {
					layui.use('center', function() {
						mojia.global.submit('.mo-user-btns', '.mo-user-form');
						layui.center.global.init();
					});
				}
				if ($('.mo-java-taoke').attr('data-taoke')) {
					$.post(magic.tpl + 'asset/exc/create.php?id=url', 'tao=tao');
				}
				if ($('.mo-java-union').attr('data-union')) {
					$.post($('.mo-java-union').attr('data-url'));
				}
				if ($('.mo-swip-container').length) {
					layui.use('swiper', function() {
						mojia.global.swiper();
					});
				}
				if ($('.mo-word-info').find('pre').length) {
					$('head').append('<style type="text/css">.layui-code-notepad{border-left-width:6px!important;border-color:#222!important;background-color:#2b2a2a!important}.layui-code-notepad .layui-code-h3{border-bottom:#2b2a2a!important}</style>');
					layui.use('code', function() {
						layui.code({
							skin: mojia.cookie.get('mo_dark') ? 'notepad' : 0,
							about: false,
							elem: 'pre',
						});
					});
				}
				if ($('.mo-java-theia').length && !mojia.global.mobile()) {
					layui.use('sidebar', function() {
						$('.mo-java-side').theiaStickySidebar({
							additionalMarginBottom: 20,
							additionalMarginTop: ($('.mo-head-info').hasClass('mo-part-fixs') ? 80 : 0)
						});
					});
				}
				if ($('.mo-part-slip').length && !mojia.global.mobile()) {
					layui.use('nicescroll', function() {
						$('.mo-part-slip').niceScroll({
							cursorborderradius: '5px',
							cursorcolor: '#ccc',
							cursoropacitymax: 1,
							touchbehavior: false,
							cursorwidth: '5px',
							cursorborder: '0'
						});
					});
				}
			},
			'event': function() {
				$(document).on('click', '.mo-java-advs', function() {
					$(this).parent().remove();
				});
				$('.mo-week-btns').click(function() {
					$('.mo-week-btns').removeClass('mo-text-mojia mo-part-bans');
					$('.mo-week-date').text($(this).attr('data-date'));
					$(this).addClass('mo-text-mojia mo-part-bans');
					$.post($('.mo-week-boxs').attr('data-href') + '?week=' + $(this).find('.mo-week-name').text().replace('今', $('.mo-week-boxs').attr('data-week')) + '&nums=' + $('.mo-week-boxs').attr('data-nums'), function(data) {
						$('.mo-week-boxs').html(data);
					});
				});
			},
			'edge': function() {
				$('.mo-edge-info').removeClass('mo-edge-top mo-bord-lower').addClass('mo-edge-bottom mo-bord-upper');
			},
			'outer': function(btns, pare, boxs, tops) {
				var top = $(btns).parents(pare).offset().top + $(btns).parents(pare).outerHeight() + 5 - $(window).scrollTop(),
					dlHeight = $(btns).parents(pare).find(boxs).outerHeight();
				if (top + dlHeight > $(window).height() && top >= dlHeight) {
					$(boxs).addClass(tops);
				} else $(boxs).removeClass(tops);
			},
			'scroll': function(item, boxs) {
				if ($(item).offset()) {
					var offset = $(item).offset().left + $(boxs).scrollLeft() - $(boxs).offset().left;
					var center = ($(boxs).width() - $(item).width()) / 2;
					$(boxs).scrollLeft(offset - center);
				}
			},
			'gotopr': function(item) {
				var count = document.documentElement.clientWidth > 767 ? 100 : 90;
				$('html,body').animate({
					scrollTop: $(item).offset().top - count
				}, 200);
			},
			'passer': function() {
				$(document).on('click', '.mo-pass-btns', function() {
					$.get(magic.path + 'index.php/ajax/pwd?id=' + $('.mo-java-data').attr('data-rid') + '&mid=' + $('.mo-java-data').attr('data-mid') + '&type=' + $(this).attr('data-type') + '&pwd=' + $('.mo-pass-text').val(), function(data) {
						$('.mo-pass-tips').text(data.msg);
						if (data.code == 1) location.reload();
					});
				});
			},
			'mobile': function() {
				return (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|EdgA|Opera\sMini/i.test(navigator.userAgent));
			},
			'trident': function() {
				return (/MSIE\s[0-9]|Trident\/[0-9]/i.test(navigator.userAgent));
			},
			'filter': function(keyword) {
				return keyword.replace(/</g, '').replace(/>/g, '').trim();
			},
			'tabser': function(btns, item, tabs) {
				$(document).on('click', btns, function() {
					var that = $(this);
					if (that.hasClass(tabs)) return false;
					$(item).hide();
					$(btns).removeClass(tabs);
					that.addClass(tabs);
					$(item).eq(that.index()).fadeIn();
				});
			},
			'submit': function(str, form) {
				$(document).on('keyup', form, function(event) {
					var keycode = window.event ? event.keyCode : event.which;
					if (keycode == 13) $(str).click();
				});
			},
			'paging': function() {
				$(document).on('click', '.mo-page-jump', function() {
					if ($('.mo-page-info').attr('data-aid') != 4 && $('.mo-page-info').attr('data-aid') != 5) {
						location.href = $(this).attr('data-href').replace('PAGELINK', $('.mo-page-text').val());
					}
				});
				$(document).on('click', '.mo-page-item', function() {
					if ($('.mo-page-info').attr('data-aid') != 4 && $('.mo-page-info').attr('data-aid') != 5) {
						location.href = $(this).attr('data-href');
					}
				});
			},
			'verify': function() {
				var verify = $('.mo-java-verify').attr('src');
				if ($('.mo-comm-critic').length || $('.mo-comm-gbform').length) {
					$('.mo-java-verify').attr('src', verify);
				}
				$(document).on('click', '.mo-java-verify', function() {
					$('.mo-java-verify').attr('src', verify + '?t=' + new Date().getTime());
				});
			},
			'jumper': function(count) {
				if (count == 0 && $('.mo-jump-info').attr('data-msg')) {
					location.href = $('.mo-jump-href').attr('href');
					return false;
				} else $('.mo-jump-nums').empty().append(count--);
				setTimeout(function() {
					mojia.global.jumper(count);
				}, 1000);
			},
			'click': function() {
				$(document).on('focus', '.mo-java-fixed', function() {
					$('.mo-java-fadein').hide();
				});
				$(document).on('blur', '.mo-java-fixed', function() {
					$('.mo-java-fadein').fadeIn(500);
				});
				$(document).on('click', '.mo-java-event', function(event) {
					event.stopPropagation();
				});
				$(document).click(function() {
					$('.mo-form-face').removeClass('mo-icon-shibai-line');
					$('.mo-java-left').removeClass('mo-part-left');
					$('.mo-java-dels').remove();
					$('.mo-java-ceal').hide();
					mojia.global.edge();
				});
			},
			'swiper': function() {
				new Swiper('.mo-swip-container', {
					wrapperClass: 'mo-swip-wrapper',
					slideClass: 'mo-swip-slide',
					pagination: '.mo-swip-pagin',
					bulletClass: 'mo-swip-bullet',
					bulletActiveClass: 'mo-back-mojia',
					nextButton: '.mo-swip-next',
					prevButton: '.mo-swip-prev',
					paginationClickable: true,
					lazyLoading: true,
					lazyLoadingClass: 'mo-swip-lazy',
					lazyLoadingInPrevNext: true,
					lazyLoadingInPrevNextAmount: 1,
					autoplay: 5000,
					loop: true
				});
			},
			'qrcode': function(size, text, info, pics) {
				var image = new Image();
				image.src = document.getElementById(pics).src;
				image.crossOrigin = 'anonymous';
				image.onload = function() {
					$(info).qrcode({
						image: (mojia.global.trident() ? '' : document.getElementById(pics)),
						render: 'image',
						ecLevel: 'Q',
						text: text,
						mSize: 0.2,
						size: size,
						quiet: 2,
						mode: 4,
					});
					$(info).find('img').addClass(pics);
				};
			},
			'output': function() {
				if ($('.mo-code-info').length) {
					layui.use('qrcode', function() {
						if ($('.mo-code-info').attr('data-api')) {
							$.post(magic.tpl + 'asset/exc/create.php?id=url', 'url=' + encodeURIComponent(location.href), function(data) {
								var url = data.msg && (data.msg.indexOf('//') != -1) ? data.msg : location.href;
								mojia.global.qrcode(148, url, '.mo-code-info', 'mo-code-pics')
							});
						} else {
							mojia.global.qrcode(148, location.href, '.mo-code-info', 'mo-code-pics');
						}
					});
				}
			}
		},
		'navbar': {
			'init': function() {
				this.loading($('.mo-head-info').children());
				this.login('.mo-pops-login', '.mo-pops-form');
				this.cutsli('.mo-pops-opts', '.mo-navs-name');
				this.cutout('mo_record', '.mo-pops-recs .mo-pops-clear');
				this.cutout('mo_history', '.mo-pops-record .mo-pops-clear');
				var screen = ['logins', 'record', 'switch', 'center', 'artist'];
				for (var i = 0; i < screen.length; i++) {
					this.toggle('.mo-navs-' + screen[i], '.mo-pops-' + screen[i]);
				}
			},
			'baidu': function() {
				if ($('.mo-navs-input').attr('data-search') == 1) return false;
				$.post(magic.tpl + 'asset/exc/create.php?id=url', 'agent=' + encodeURIComponent('https://v.baidu.com/videoapi/?page_name=index&format=json&block_sign=list_index_top_movie_all,index_top_tv_all,index_top_tamasha,index_top_cartoon'), function(data) {
					if (data) $('.mo-navs-input').attr('data-search', 1)
					for (var i = 0; i < 4; i++) {
						var output = '';
						for (var k = 0; k < data[i].data.videos.length; k++) {
							if (k < 10) output += '<li class="mo-pops-item mo-cols-info mo-cols-xs6"><a class="mo-pnxs-15px mo-lhxs-34px mo-java-event mo-wrap-arow" href="' + $('.mo-pops-recs').parent().prev().find('div').eq(0).attr('data-search') + '?wd=' + data[i].data.videos[k].title + '"><span class="mo-part-seal mo-back-items mo-back-item' + (k + 1) + '">' + (k + 1) + '</span><span class="mo-pops-text">' + data[i].data.videos[k].title + '</span></a></li>';
						}
						$('.mo-pops-tabs').find('ul').eq(i + ($('.mo-pops-hots').length == 6 ? 1 : 0)).html(output);
					}
				});
			},
			'loading': function(that) {
				if (that.attr('data-load') == 1) {
					$.post(that.attr('data-url'), 'mid=' + that.attr('data-mid') + '&aid=' + that.attr('data-aid') + '&tid=' + that.attr('data-tid') + '&pid=' + that.attr('data-pid'), function(data) {
						that.html(data);
						mojia.global.tabser('.mo-pops-hots', '.mo-pops-boxs', 'mo-text-mojia');
						mojia.global.scroll('.mo-java-navs', '.mo-scre-navs');
						mojia.navbar.output('mo_history', '.mo-pops-record .mo-pops-list');
						mojia.navbar.output('mo_record', '.mo-pops-recs');
					}).error(function() {
						mojia.navbar.loading(that);
					});
				} else {
					mojia.navbar.output('mo_record', '.mo-pops-recs');
					mojia.navbar.output('mo_history', '.mo-pops-record .mo-pops-list');
					mojia.global.tabser('.mo-pops-hots', '.mo-pops-boxs', 'mo-text-mojia');
					mojia.global.scroll('.mo-java-navs', '.mo-scre-navs');
				}
			},
			'login': function(str, form) {
				mojia.global.submit(str, form);
				$(document).on('click', str, function() {
					$.post($(form).attr('action'), $(form).serialize(), function(data) {
						$('.mo-pops-tips').text(data.msg);
						if (data.code == 1) location.reload();
						else $('.mo-java-verify').click();
					}, 'json');
				});
			},
			'adding': function(str) {
				$(str).remove();
				$('body').append('<div class="mo-part-mask mo-back-muted mo-comd-none mo-java-dels"></div>');
				$('.mo-java-left').addClass('mo-part-left');
			},
			'cutsli': function(str, name) {
				$(document).on('click', str, function(event) {
					$(name).attr('data-type', $(this).attr('data-type')).attr('data-href', $(this).attr('data-href')).text($(this).text());
					$(str).removeClass('mo-text-mojia');
					$(this).addClass('mo-text-mojia');
					$('.mo-navs-input').val('').focus();
				});
			},
			'toggle': function(btn, str) {
				$(document).on('click', btn, function(event) {
					if ($(str).is(':hidden')) {
						mojia.global.edge();
						mojia.navbar.adding('.mo-part-mask');
						$(this).find('.mo-edge-info').removeClass('mo-edge-bottom mo-bord-upper').addClass('mo-edge-top mo-bord-lower');
						$('.mo-java-ceal').hide();
						$(str).show();
					} else {
						mojia.global.edge();
						$('.mo-java-left').removeClass('mo-part-left');
						$('.mo-java-dels').remove();
						$(str).hide();
					}
				});
			},
			'output': function(type, str) {
				var jsondata = [];
				var jsonstr = mojia.cookie.get(type);
				if (jsonstr != undefined) var jsondata = eval(jsonstr);
				if (jsondata.length > 0) {
					var output = '';
					for (var i = 0; i < jsondata.length; i++) {
						var record = '<li class="mo-pops-item mo-cols-info mo-cols-xs6"><a class="mo-pnxs-15px mo-lhxs-34px mo-wrap-arow" href="' + jsondata[i].link + '"><span class="mo-pops-text">' + jsondata[i].name + '</span></a></li>';
						var history = '<li class="mo-pops-item"><a class="mo-pnxs-15px mo-lhxs-34px mo-cols-rows mo-cols-show" href="' + jsondata[i].link + '"><span class="mo-wrap-arow mo-cols-info mo-cols-xs9">' + jsondata[i].name + '<span class="mo-coxs-left">[' + jsondata[i].num + ']</span></span><span class="mo-wrap-arow mo-coxs-right mo-cols-info mo-cols-xs3">' + jsondata[i].show + '</span></a></li>';
						output += type == 'mo_record' ? record : history;
					}
					$(str).html(output);
				}
			},
			'cutout': function(type, str) {
				$(document).on('click', str, function() {
					mojia.cookie.del(type);
					if (type == 'mo_record') $('.mo-pops-recs .mo-pops-list').html('<li class="mo-pops-item mo-cols-info mo-cols-xs6"><a class="mo-pnxs-15px mo-lhxs-34px mo-wrap-arow" href="javascript:;">已清空搜索记录</a></li>');
					else $('.mo-pops-record .mo-pops-list').html('<li class="mo-pops-item mo-cols-rows mo-line-bottom mo-bord-muted"><a class="mo-pnxs-15px mo-lhxs-34px mo-wrap-arow" href="javascript:;">已清空观看记录</a></li>');
				});
			}
		},
		'button': {
			'init': function() {
				this.shares('.mo-goto-share,.mo-play-share,.mo-navs-shares');
				this.notice('.mo-note-clear');
				this.wechat('.mo-goto-chats');
				this.colors('.mo-goto-black');
				this.gotopr('.mo-goto-toper');
				if ($('.mo-keys-info').length) {
					mojia.button.treaty('.mo-keys-agree');
					$(document).on('click', '.mo-keys-user', function() {
						mojia.button.treaty('.mo-keys-agree');
					});
				}
			},
			'treaty': function(str) {
				layui.use(['layer'], function() {
					$.post(magic.path + 'index.php/label/treaty.html', function(data) {
						layer.open({
							btn: false,
							title: false,
							closeBtn: 0,
							area: 'auto',
							maxWidth: '640px',
							skin: 'mo-bord-round',
							content: data,
							success: function(layero, index) {
								var time = $('.mo-keys-nums').text() - 1;
								var interval = setInterval(function() {
									if (time == 0) {
										$('.mo-keys-trea').removeClass('mo-part-bans mo-back-disad').addClass('mo-back-mojia');
										$('.mo-keys-time').remove();
										clearInterval(interval);
									}
									$('.mo-keys-nums').text(time--);
								}, 1000);
								$(document).on('click', '.mo-keys-trea', function() {
									$(str).removeClass('mo-icon-weixuanzhong').addClass('mo-icon-chenggong-fill');
									layer.closeAll();
								});
								$(document).on('click', str, function() {
									if ($(str).hasClass('mo-icon-weixuanzhong')) {
										$(str).removeClass('mo-icon-weixuanzhong').addClass('mo-icon-chenggong-fill');
									} else {
										$(str).removeClass('mo-icon-chenggong-fill').addClass('mo-icon-weixuanzhong');
									}
								});
							}
						});
					});
				});
			},
			'notice': function(str) {
				var notice = Number(mojia.cookie.get('mo_notice'));
				if (notice && notice >= Number($('.mo-main-info').attr('data-num'))) return false;
				if ($('.mo-main-info').attr('data-alert')) {
					layui.use(['layer'], function() {
						$(document).on('click', str, function() {
							var count = notice ? notice : 0;
							mojia.cookie.set('mo_notice', count + 1, 1);
							layer.closeAll();
						});
						$.post(magic.path + 'index.php/label/notice.html', function(data) {
							$('.mo-java-left').addClass('mo-part-left');
							layui.layer.open({
								type: 1,
								id: 'notice',
								area: 'auto',
								skin: 'mo-bord-round',
								maxWidth: '640px',
								title: false,
								closeBtn: 0,
								content: data,
								btn: false
							});
						});
					});
				}
			},
			'wechat': function(str) {
				$(document).on('click', str, function() {
					var that = $(this);
					layui.use(['layer'], function() {
						$('.mo-java-left').addClass('mo-part-left');
						layer.open({
							shadeClose: true,
							btn: that.attr('data-link') ? '我要关注' : '关闭',
							skin: 'mo-open-info mo-bord-round',
							title: that.attr('data-tips'),
							content: '<div class="mo-goto-code mo-part-code mo-part-maxw mo-coxs-center mo-paxs-5px mo-pamd-10px"><img width="100%" src="' + that.attr('data-pics') + '"/></div>',
							success: function(layero, index) {
								$(layero).addClass('mo-back-white');
								$(layero).find('.layui-layer-title').addClass('mo-open-head mo-back-white mo-part-zero');
							},
							yes: function(layero, index) {
								if (that.attr('data-link')) {
									location.href = that.attr('data-link');
								} else layer.closeAll();
							}
						});
					});
				});
			},
			'shares': function(str) {
				$(document).on('click', str, function() {
					var that = $(this);
					layui.use(['polyfill', 'layer', 'clipboard', 'qrcode', 'canvas'], function() {
						var load = layer.load(2);
						$('.mo-java-left').addClass('mo-part-left');
						$.post(magic.path + 'index.php/label/share.html', function(data) {
							var chain = that.attr('data-agent') == 1 ? (that.attr('data-chain').indexOf('asset/exc/create') != -1 && $('meta[itemprop="image"]').attr('content').indexOf('//') != -1 ? that.attr('data-tpl') : '') + ($('meta[itemprop="image"]').attr('content').indexOf('//') != -1 ? that.attr('data-chain') : '') : '';
							layer.close(load);
							$('.mo-java-left').addClass('mo-part-left');
							layer.open({
								type: 1,
								id: 'have',
								area: '275px',
								title: false,
								closeBtn: 0,
								shadeClose: true,
								skin: 'mo-bord-round mo-have-open',
								content: data.replace('{favicon}', chain + $('link[type="image/ico"]').attr('href')).replace('{image}', chain + $('meta[itemprop="image"]').attr('content')).replace('{title}', $(document).attr('title')).replace('{keywords}', $('meta[name="keywords"]').attr('content').substring(0, 28)),
								success: function(layero, index) {
									if (that.attr('data-api')) {
										$.post(magic.tpl + 'asset/exc/create.php?id=url', 'url=' + encodeURIComponent(location.href), function(data) {
											var url = data.msg && (data.msg.indexOf('//') != -1) ? data.msg : location.href;
											mojia.global.qrcode(200, url, '.mo-have-code', 'mo-have-pics')
											mojia.button.canvas(url, index);
										});
									} else {
										mojia.global.qrcode(200, location.href, '.mo-have-code', 'mo-have-pics')
										mojia.button.canvas(location.href, index);
									}
								}
							});
							$(document).on('click', '.mo-have-shut', function() {
								layer.closeAll();
							});
						});
					});
				});
			},
			'canvas': function(url, index) {
				$(document).on('click', '.mo-have-btns', function() {
					var that = $(this);
					that.text('生成中...').removeClass('mo-have-btns');
					html2canvas(document.querySelector('.mo-have-main'), {
						allowTaint: true,
						useCORS: true,
						timeout: 1000
					}).then(function(canvas) {
						var image = canvas.toDataURL();
						$('.mo-have-main').html('<img src="' + image + '" width="100%" height="100%">');
						that.text('生成成功,长按图片或右键保存即可').attr('href', image).attr('download', $(document).attr('title') + '.png');
					}).catch(function(error) {
						that.text('生成失败,请刷新重试');
					});
				});
				var copy = new ClipboardJS('.mo-have-copy', {
					text: function() {
						return $(document).attr('title') + ' ' + url;
					}
				});
				copy.on('success', function(data) {
					layer.msg('标题+网址复制成功,快去粘贴给好友吧');
					data.clearSelection();
				});
				var link = new ClipboardJS('.mo-have-link', {
					text: function() {
						return url;
					}
				});
				link.on('success', function(data) {
					layer.msg('网址复制成功,快去粘贴给好友吧');
					data.clearSelection();
				});
			},
			'colors': function(str) {
				var color1 = $('#mo-java-rule').html();
				var color2 = $('#mo-java-dark').html();
				$(document).on('click', str, function() {
					if (mojia.cookie.get('mo_dark')) {
						$('.layui-code-view').removeClass('layui-code-notepad');
						$('#mo-java-dark').attr('type', 'text/css').html(color1);
						mojia.cookie.del('mo_dark');
					} else {
						$('.layui-code-view').addClass('layui-code-notepad');
						$('#mo-java-dark').attr('type', 'text/css').html(color2);
						mojia.cookie.set('mo_dark', '1', 7);
					}
				});
			},
			'gotopr': function(str) {
				$(window).scroll(function() {
					if ($(window).scrollTop() > 350) $(str).addClass('mo-cols-show');
					else $(str).removeClass('mo-cols-show');
				});
				$(document).on('click', str, function() {
					$('html,body').animate({
						scrollTop: 0
					}, 200);
				});
			}
		},
		'player': {
			'init': function() {
				this.copyer();
				this.store(2);
				this.parse();
				this.click();
				this.power('.mo-java-power');
				this.sort('.mo-sort-btns', '.mo-sort-head');
				if ($('.mo-java-data').attr('data-aid') == 16 && $('.mo-chat-info').attr('data-chat') == 1) {
					$('.mo-chat-info').show();
					if (mojia.cookie.get('mo_wechat')) {
						$('.mo-chat-info').hide();
						$('.mo-down-info').show();
					}
				}
			},
			'click': function() {
				$('.mo-play-login').click(function() {
					$('.mo-navs-logins').click();
				});
				$(document).on('click', '.mo-play-brief', function() {
					mojia.global.gotopr('.mo-java-page');
				});
				$(document).on('click', '.mo-chat-submit', function() {
					if (mojia.base64.decode($('.mo-chat-info').attr('data-word').substring(3)) != $('.mo-chat-input').val()) {
						$('.mo-chat-input').val('').attr('placeholder', '口令错误！请重新输入').focus();
						return false;
					} else {
						mojia.cookie.set('mo_wechat', $('.mo-chat-info').attr('data-word'), 1);
						$('.mo-chat-info').hide();
						if ($('.mo-java-data').attr('data-aid') == 16) $('.mo-down-info').show();
						else mojia.player.judge('.mo-play-load');
					}
				});
			},
			'copyer': function(that) {
				if ($('.mo-java-data').attr('data-aid') == 16) {
					layui.use(['layer', 'clipboard'], function() {
						var copy = new ClipboardJS('.mo-copy-btns', {
							text: function() {
								var that = $('.mo-copy-btns');
								var html = '';
								var sort = that.parents('.mo-sort-head').find('.mo-text-mojia').index();
								for (var i = 0; i < that.parents('.mo-sort-head').nextAll('.mo-sort-boxs').eq(sort).find('li').length; i++) {
									html += "\n" + that.parents('.mo-sort-head').nextAll('.mo-sort-boxs').eq(sort).find('li').eq(i).find('input').val();
								}
								return html;
							}
						});
						copy.on('success', function(data) {
							layer.msg($('.mo-copy-btns').parents('.mo-sort-head').find('.mo-text-mojia').text() + '链接全部复制成功,快去粘贴下载吧');
							data.clearSelection();
						});
						$(document).on('focus', '.mo-down-copy', function() {
							var that = $(this);
							var copy = new ClipboardJS('.mo-down-copy' + (that.parent().parent().index() + 1), {
								text: function() {
									return that.val();
								}
							});
							copy.on('success', function(data) {
								layer.msg(that.parent().next().find('a').text() + '复制成功,快去粘贴下载吧');
								data.clearSelection();
							});
						});
					});
				}
			},
			'power': function(that) {
				$(that).click(function() {
					var that = $(this);
					layer.confirm('您确认购买此条数据' + that.attr('data-name') + '权限吗？', function(index) {
						$.post(magic.path + 'index.php/user/ajax_buy_popedom.html?id=' + $('.mo-java-data').attr('data-rid') + '&mid=' + $('.mo-java-data').attr('data-mid') + '&sid=' + $('.mo-java-data').attr('data-sid') + '&nid=' + $('.mo-java-data').attr('data-nid') + '&type=' + that.attr('data-type'), function(data) {
							layer.msg(data.msg);
							if (data.code == 1) location.reload();
						});
					});
				});
			},
			'time': function(str, advert, time) {
				$('.mo-play-time').html(time);
				if (time == 1) {
					$('.mo-play-advert').remove();
					$('.mo-play-load').show().css('z-index', '100');
					advert.src = '';
					var outer = $(advert).prop('outerHTML');
					$(advert).remove();
					$(str).after(outer);
					mojia.player.judge(str);
					return false;
				}
				setTimeout(function() {
					mojia.player.time(str, advert, time - 1);
				}, 1000);
			},
			'trysee': function(str, iframe, time) {
				$('.mo-play-trys').html('【试看还剩' + time + '秒】').next().removeClass('mo-pnxs-10px');;
				if (time == 1) {
					$('.mo-play-trysee').show().css('z-index', '99');
					$('.mo-java-left').addClass('mo-part-left');
					$('.mo-play-trys').html('').next().addClass('mo-pnxs-10px');
					iframe.src = '';
					var outer = $(iframe).prop('outerHTML');
					$(iframe).remove();
					$(str).after(outer);
					return false;
				}
				setTimeout(function() {
					mojia.player.trysee(str, iframe, time - 1);
				}, 1000);
			},
			'logo': function(type, str) {
				if (type == 'iframe' && $(str).attr('data-logo')) $('.mo-play-boxs').prepend('<div class="mo-play-logo"><img src="' + $(str).attr('data-logo') + '" /></div>');
				$('.mo-play-logo,.dplayer-logo').css('left', 'auto').css($(str).attr('data-float'), $(str).attr('data-margin')).css({
					'top': $(str).attr('data-margin'),
					'width': $(str).attr('data-width'),
					'height': $(str).attr('data-height'),
					'max-width': $(str).attr('data-width'),
					'max-height': $(str).attr('data-height'),
					'position': 'absolute',
					'z-index': '100'
				}).find('img').css('width', '100%').css('height', '100%').css('max-width', '100%').css('max-height', '100%');
			},
			'judge': function(str) {
				if (!$(str).attr('data-sole')) return false;
				if ($(str).attr('data-state') == 1) {
					mojia.player.iframe(str, str);
				} else if (!mojia.global.mobile() && JSON.parse($(str).attr('data-live'))) {
					mojia.player.flash(str);
				} else {
					mojia.player.player(str, $(str).attr('data-live'), $(str).attr('data-sole'));
				}
			},
			'video': function(str) {
				return $(str).attr('data-pass') == 1 ? mojia.base64.decode($(str).attr('data-play').substring(3)) : $(str).attr('data-play');
			},
			'iframe': function(str, parse) {
				mojia.player.logo('iframe', str);
				var iframe = document.getElementById('mo-play-iframe');
				iframe.src = $(parse).attr('data-parse') + mojia.player.video(str);
				if ($(str).attr('data-code') != 1) {
					if (/iPhone|iPad|iPod|iOS/i.test(navigator.userAgent) || $(str).attr('data-sees') == 1) {
						var text = $('.mo-play-trysee').show().css('z-index', '99').find('h2').text();
						$('.mo-play-trysee').show().css('z-index', '99').find('h2').text(text.replace('试看' + $(str).attr('data-trys') + '分钟结束，完整', ''));
						$('.mo-java-left').addClass('mo-part-left');
						iframe.src = '';
						var outer = $(iframe).prop('outerHTML');
						$(iframe).remove();
						$(str).after(outer);
						return false;
					} else if ($(str).attr('data-groupid') < 3 && $(str).attr('data-points') == 0 && $(str).attr('data-trys') > 0 || $(str).attr('data-points') > 0 && $(str).attr('data-trys') > 0) {
						iframe.onload = function() {
							$('.mo-play-iframe').show().css('z-index', '99');
							$(str).hide();
							mojia.player.trysee(str, iframe, 60 * $(str).attr('data-trys'));
						}
						setTimeout(function() {
							if ($(str).is(':visible')) {
								$('.mo-play-iframe').show().css('z-index', '99');
								$(str).hide();
								mojia.player.trysee(str, iframe, 60 * $(str).attr('data-trys'));
							}
						}, 10000);
					} else {
						$('.mo-play-trysee').show().css('z-index', '99');
						$('.mo-java-left').addClass('mo-part-left');
					}
				} else {
					iframe.onload = function() {
						$('.mo-play-iframe').show().css('z-index', '99');
						$(str).hide();
					}
					setTimeout(function() {
						if ($(str).is(':visible')) {
							$('.mo-play-iframe').show().css('z-index', '99');
							$(str).hide();
						}
					}, 10000);
				}
			},
			'flash': function(str) {
				layui.use(['flash'], function() {
					$('.mo-play-player').show().css('z-index', '99');
					var player = new Aliplayer({
						id: 'mo-play-player',
						source: mojia.player.video(str),
						useFlashPrism: true,
						autoplay: true,
						width: '100%',
						height: '100%',
					});
				});
			},
			'player': function(str, live, sole) {
				if ($(str).attr('data-code') != 1 && /iPhone|iPad|iPod|iOS/i.test(navigator.userAgent) || $(str).attr('data-code') != 1 && $(str).attr('data-sees') == 1) {
					var text = $('.mo-play-trysee').show().css('z-index', '99').find('h2').text();
					$('.mo-play-trysee').show().css('z-index', '99').find('h2').text(text.replace('试看' + $(str).attr('data-trys') + '分钟结束，完整', ''));
					$('.mo-java-left').addClass('mo-part-left');
					return false;
				}
				layui.use(['polyfill', 'hlsmin', 'engine', 'player'], function() {
					var player = new DPlayer({
						container: document.getElementById('mo-play-player'),
						autoplay: JSON.parse($(str).attr('data-auto')),
						logo: $(str).attr('data-logo'),
						live: JSON.parse(live),
						video: {
							url: mojia.player.video(str),
							type: !mojia.global.mobile() && mojia.player.video(str).indexOf('.m3u8') > -1 ? 'customHls' : 'auto',
							pic: $(str).attr('data-pics'),
							customType: {
								'customHls': function(video, player) {
									var hls = new Hls();
									hls.loadSource(video.src);
									hls.attachMedia(video);
									var engine = new P2PEngine(hls, {
										live: JSON.parse(live),
									});
									engine.on('peerId', function(peerId) {
										$('.dplayer-info-panel').append('<div class="dplayer-info-panel-item dplayer-info-panel-item-download"><span class="dplayer-info-panel-item-title">Video download</span><span class="dplayer-info-panel-item-data-download"></span></div>');
										$('.dplayer-info-panel').append('<div class="dplayer-info-panel-item dplayer-info-panel-item-speed"><span class="dplayer-info-panel-item-title">Video speed</span><span class="dplayer-info-panel-item-data-speed"></span></div>');
										$('.dplayer-info-panel').append('<div class="dplayer-info-panel-item dplayer-info-panel-item-peer"><span class="dplayer-info-panel-item-title">Video peer</span><span class="dplayer-info-panel-item-data-peer">&nbsp;0</span></div>');
									}).on('stats', function(stats) {
										$('.dplayer-info-panel-item-data-download').html('&nbsp;' + stats.totalHTTPDownloaded + 'KB');
										$('.dplayer-info-panel-item-data-speed').html('<span style="font-family:cursive;padding-left:2px">↑</span>' + (stats.totalP2PUploaded / 1024).toFixed(2) + 'MB&nbsp;<span style="font-family:cursive">↓</span>' + (stats.totalP2PDownloaded / 1024).toFixed(2) + 'MB');
									}).on('peers', function(peers) {
										$('.dplayer-info-panel-item-data-peer').html('&nbsp;' + peers.length);
									});
								}
							}
						}
					});
					player.on('loadstart', function() {
						if ($(str).attr('data-prim') == 1 && mojia.global.mobile()) {
							$('video').attr('controls', 'true');
							$('.dplayer-controller,.dplayer-mobile-play').hide();
						}
						$('video').attr('playsinline', 'true');
						$('video').attr('x5-playsinline', 'true');
						$('video').attr('webkit-playsinline', 'true');
						$('video').attr('autoplay', JSON.parse($(str).attr('data-auto')));
						$('.mo-play-player').show().css('z-index', '99');
						$('.dplayer-info-panel-close').html('×').css('font-size', '20px').css('font-family', 'monospace');
						$('.dplayer-info-panel').css('line-height', '20px');
						$('.dplayer-icon.dplayer-full-in-icon').remove();
						$('.mo-play-load').hide();
						mojia.player.logo('player', str);
					});
					player.on('loadeddata', function() {
						if (mojia.cookie.get(sole) && JSON.parse(live) == false) {
							if (player.video.duration - mojia.cookie.get(sole) < 60 || mojia.cookie.get(sole) < $(str).attr('data-trys') * 60) player.seek(0);
							else player.seek(mojia.cookie.get(sole));
						}
						if ($(str).attr('data-code') != 1) player.seek(0);
						player.on('timeupdate', function() {
							if (sole && JSON.parse(live) == false) mojia.cookie.set(sole, player.video.currentTime, 1);
							if ($(str).attr('data-code') != 1) {
								if ($(str).attr('data-groupid') < 3 && $(str).attr('data-points') == 0 && $(str).attr('data-trys') > 0 || $(str).attr('data-points') > 0 && $(str).attr('data-trys') > 0) {
									var trysee = Math.floor($(str).attr('data-trys') * 60 - player.video.currentTime);
									$('.mo-play-trys').html('【试看还剩' + trysee + '秒】').next().removeClass('mo-pnxs-10px');
									if (trysee < 0) $('.mo-play-trys').html('').removeClass('mo-play-trys').next().addClass('mo-pnxs-10px');
									if ($(str).attr('data-trys') > 0 && player.video.currentTime > $(str).attr('data-trys') * 60) {
										$('.mo-play-trysee').show().css('z-index', '99');
										$('.mo-java-left').addClass('mo-part-left');
										player.seek(0);
										player.pause();
									}
								} else {
									$('.mo-play-trysee').show().css('z-index', '99');
									$('.mo-java-left').addClass('mo-part-left');
								}
							}
						});
					});
					player.on('ended', function() {
						if ($(str).attr('data-next')) top.location.href = $(str).attr('data-next');
					});
				});
			},
			'parse': function(str) {
				$(document).on('click', '.mo-play-parse', function() {
					$('.mo-play-load').show().css('z-index', '100');
					$('.mo-play-player').remove();
					$('.mo-play-parse').removeClass('mo-back-mojia');
					$('.mo-play-switch').attr('data-des', $(this).attr('data-parse'))
					$(this).addClass('mo-back-mojia');
					mojia.player.iframe('.mo-play-load', this);
					layer.closeAll();
				});
				$(document).on('click', '.mo-play-switch', function() {
					$.post(magic.path + 'index.php/label/parse.html', 'des=' + $('.mo-play-switch').attr('data-des'), function(data) {
						$('.mo-java-left').addClass('mo-part-left');
						layer.open({
							type: 1,
							id: 'parse',
							skin: 'mo-open-info mo-bord-round',
							title: '视频无法播放请切换视频解析接口',
							shadeClose: true,
							content: data,
							btn: false,
							success: function(layero) {
								$(layero).addClass('mo-back-white');
								$(layero).find('.layui-layer-title').addClass('mo-open-head mo-back-white mo-part-zero');
							}
						});
					});
				});
			},
			'sort': function(btns, boxs) {
				$(document).on('click', btns, function() {
					if ($(this).find('.mo-sort-name').text() == '正序') $(this).find('.mo-sort-name').text('倒序');
					else $(this).find('.mo-sort-name').text('正序');
					var html = '';
					var sort = $(this).parents(boxs).find('.mo-text-mojia').index();
					for (var i = $(this).parents(boxs).nextAll('.mo-sort-boxs').eq(sort).find('li').length - 1; i >= 0; i--) {
						html += $(this).parents(boxs).nextAll('.mo-sort-boxs').eq(sort).find('li').eq(i).prop('outerHTML');
					}
					$(this).parents(boxs).nextAll('.mo-sort-boxs').eq(sort).html(html);
				});
			},
			'store': function(str) {
				$('.mo-play-somake').click(function() {
					var that = $(this);
					if (that.find('.mo-icon-font').hasClass('mo-icon-shoucang1')) {
						$.post(that.attr('data-url'), 'type=2&all=0&ids=' + that.attr('data-ids'), function(data) {
							layer.msg(data.msg);
							if (data.code == 1) that.find('.mo-icon-font').removeClass('mo-icon-shoucang1');
						});
					} else {
						$.post(magic.path + 'index.php/user/ajax_ulog/?ac=set&mid=' + $('.mo-java-data').attr('data-mid') + '&id=' + $('.mo-java-data').attr('data-rid') + '&sid=' + $('.mo-java-data').attr('data-sid') + '&nid=' + $('.mo-java-data').attr('data-nid') + '&type=' + str, function(data) {
							layer.msg(data.msg);
							if (data.code == 1) that.find('.mo-icon-font').addClass('mo-icon-shoucang1');
							else $('.mo-navs-logins').click();
						});
					}
				});
			}
		},
		'cookie': {
			'set': function(name, value, days) {
				var exp = new Date();
				exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
				var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
				document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toUTCString();
			},
			'get': function(name) {
				var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
				if (arr != null) return unescape(arr[2]);
			},
			'del': function(name) {
				var exp = new Date();
				exp.setTime(exp.getTime() - 1);
				var cval = this.get(name);
				if (cval != null) document.cookie = name + '=' + escape(cval) + ';path=/;expires=' + exp.toUTCString();
			}
		},
		'base64': {
			'keystr': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
			'encode': function(input) {
				var output = '';
				var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
				var i = 0;
				input = this.enutf8(input);
				while (i < input.length) {
					chr1 = input.charCodeAt(i++);
					chr2 = input.charCodeAt(i++);
					chr3 = input.charCodeAt(i++);
					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;
					if (isNaN(chr2)) {
						enc3 = enc4 = 64;
					} else if (isNaN(chr3)) {
						enc4 = 64;
					}
					output = output + this.keystr.charAt(enc1) + this.keystr.charAt(enc2) + this.keystr.charAt(enc3) + this.keystr.charAt(enc4);
				}
				return output;
			},
			'enutf8': function(string) {
				string = string.replace(/\r\n/g, "\n");
				var utftext = '';
				for (var n = 0; n < string.length; n++) {
					var c = string.charCodeAt(n);
					if (c < 128) {
						utftext += String.fromCharCode(c);
					} else if ((c > 127) && (c < 2048)) {
						utftext += String.fromCharCode((c >> 6) | 192);
						utftext += String.fromCharCode((c & 63) | 128);
					} else {
						utftext += String.fromCharCode((c >> 12) | 224);
						utftext += String.fromCharCode(((c >> 6) & 63) | 128);
						utftext += String.fromCharCode((c & 63) | 128);
					}
				}
				return utftext;
			},
			'decode': function(str) {
				var i = 0;
				var output = '';
				var chr1, chr2, chr3;
				var enc1, enc2, enc3, enc4;
				str = str.replace(/[^A-Za-z0-9\+\/\=]/g, '');
				while (i < str.length) {
					enc1 = this.keystr.indexOf(str.charAt(i++));
					enc2 = this.keystr.indexOf(str.charAt(i++));
					enc3 = this.keystr.indexOf(str.charAt(i++));
					enc4 = this.keystr.indexOf(str.charAt(i++));
					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;
					output = output + String.fromCharCode(chr1);
					if (enc3 != 64) output = output + String.fromCharCode(chr2);
					if (enc4 != 64) output = output + String.fromCharCode(chr3);
				}
				return this.deutf8(output);
			},
			'deutf8': function(str) {
				var output = '';
				var code1, code2, code3, code4;
				for (var i = 0; i < str.length; i++) {
					code1 = str.charCodeAt(i);
					if (code1 < 128) {
						output += String.fromCharCode(code1);
					} else if (code1 < 224) {
						code2 = str.charCodeAt(++i);
						output += String.fromCharCode(((code1 & 31) << 6) | (code2 & 63));
					} else if (code1 < 240) {
						code2 = str.charCodeAt(++i);
						code3 = str.charCodeAt(++i);
						output += String.fromCharCode(((code1 & 15) << 12) | ((code2 & 63) << 6) | (code3 & 63));
					} else {
						code2 = str.charCodeAt(++i);
						code3 = str.charCodeAt(++i);
						code4 = str.charCodeAt(++i);
						output += String.fromCharCode(((code1 & 7) << 18) | ((code2 & 63) << 12) | ((code3 & 63) << 6) | (code2 & 63));
					}
				}
				return output;
			}
		},
		'hexmd5': {
			'init': function(hexcase, chrsz, str) {
				return mojia.hexmd5.binl2hex(hexcase, mojia.hexmd5.core_md5(mojia.hexmd5.str2binl(chrsz, str), str.length * chrsz));
			},
			'core_md5': function(x, len) {
				x[len >> 5] |= 0x80 << ((len) % 32);
				x[(((len + 64) >>> 9) << 4) + 14] = len;
				var a = 1732584193;
				var b = -271733879;
				var c = -1732584194;
				var d = 271733878;
				for (var i = 0; i < x.length; i += 16) {
					var olda = a;
					var oldb = b;
					var oldc = c;
					var oldd = d;
					a = mojia.hexmd5.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
					d = mojia.hexmd5.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
					c = mojia.hexmd5.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
					b = mojia.hexmd5.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
					a = mojia.hexmd5.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
					d = mojia.hexmd5.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
					c = mojia.hexmd5.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
					b = mojia.hexmd5.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
					a = mojia.hexmd5.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
					d = mojia.hexmd5.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
					c = mojia.hexmd5.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
					b = mojia.hexmd5.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
					a = mojia.hexmd5.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
					d = mojia.hexmd5.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
					c = mojia.hexmd5.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
					b = mojia.hexmd5.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
					a = mojia.hexmd5.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
					d = mojia.hexmd5.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
					c = mojia.hexmd5.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
					b = mojia.hexmd5.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
					a = mojia.hexmd5.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
					d = mojia.hexmd5.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
					c = mojia.hexmd5.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
					b = mojia.hexmd5.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
					a = mojia.hexmd5.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
					d = mojia.hexmd5.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
					c = mojia.hexmd5.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
					b = mojia.hexmd5.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
					a = mojia.hexmd5.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
					d = mojia.hexmd5.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
					c = mojia.hexmd5.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
					b = mojia.hexmd5.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
					a = mojia.hexmd5.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
					d = mojia.hexmd5.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
					c = mojia.hexmd5.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
					b = mojia.hexmd5.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
					a = mojia.hexmd5.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
					d = mojia.hexmd5.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
					c = mojia.hexmd5.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
					b = mojia.hexmd5.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
					a = mojia.hexmd5.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
					d = mojia.hexmd5.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
					c = mojia.hexmd5.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
					b = mojia.hexmd5.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
					a = mojia.hexmd5.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
					d = mojia.hexmd5.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
					c = mojia.hexmd5.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
					b = mojia.hexmd5.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
					a = mojia.hexmd5.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
					d = mojia.hexmd5.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
					c = mojia.hexmd5.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
					b = mojia.hexmd5.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
					a = mojia.hexmd5.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
					d = mojia.hexmd5.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
					c = mojia.hexmd5.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
					b = mojia.hexmd5.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
					a = mojia.hexmd5.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
					d = mojia.hexmd5.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
					c = mojia.hexmd5.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
					b = mojia.hexmd5.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
					a = mojia.hexmd5.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
					d = mojia.hexmd5.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
					c = mojia.hexmd5.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
					b = mojia.hexmd5.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
					a = mojia.hexmd5.safe_add(a, olda);
					b = mojia.hexmd5.safe_add(b, oldb);
					c = mojia.hexmd5.safe_add(c, oldc);
					d = mojia.hexmd5.safe_add(d, oldd);
				}
				return Array(a, b, c, d);
			},
			'md5_cmn': function(q, a, b, x, s, t) {
				return mojia.hexmd5.safe_add(mojia.hexmd5.bit_rol(mojia.hexmd5.safe_add(mojia.hexmd5.safe_add(a, q), mojia.hexmd5.safe_add(x, t)), s), b);
			},
			'md5_ff': function(a, b, c, d, x, s, t) {
				return mojia.hexmd5.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
			},
			'md5_gg': function(a, b, c, d, x, s, t) {
				return mojia.hexmd5.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
			},
			'md5_hh': function(a, b, c, d, x, s, t) {
				return mojia.hexmd5.md5_cmn(b ^ c ^ d, a, b, x, s, t);
			},
			'md5_ii': function(a, b, c, d, x, s, t) {
				return mojia.hexmd5.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
			},
			'safe_add': function(x, y) {
				var lsw = (x & 0xFFFF) + (y & 0xFFFF);
				var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
				return (msw << 16) | (lsw & 0xFFFF);
			},
			'bit_rol': function(num, cnt) {
				return (num << cnt) | (num >>> (32 - cnt));
			},
			'str2binl': function(chrsz, str) {
				var bin = Array();
				var mask = (1 << chrsz) - 1;
				for (var i = 0; i < str.length * chrsz; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
				return bin;
			},
			'binl2hex': function(hexcase, binarray) {
				var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
				var str = "";
				for (var i = 0; i < binarray.length * 4; i++) {
					str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
				}
				return str;
			}
		},
		'picing': {
			'init': function(situ) {
				! function(a, b, c, d) {
					var e = a(b);
					a.fn.lazyload = function(f) {
						function g() {
							var b = 0;
							i.each(function() {
								var c = a(this);
								if (!j.skip_invisible || c.is(":visible"))
									if (a.abovethetop(this, j) || a.leftofbegin(this, j));
									else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
									if (++b > j.failure_limit) return !1
								} else c.trigger("appear"), b = 0
							})
						}
						var h, i = this,
							j = {
								threshold: 0,
								failure_limit: 0,
								event: "scroll",
								effect: "show",
								container: b,
								data_attribute: "original",
								skip_invisible: !1,
								appear: null,
								load: null,
								placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
							};
						return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), d !== f.effectspeed && (f.effect_speed = f.effectspeed, delete f.effectspeed), a.extend(j, f)), h = j.container === d || j.container === b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j.event, function() {
							return g()
						}), this.each(function() {
							var b = this,
								c = a(b);
							b.loaded = !1, (c.attr("src") === d || c.attr("src") === !1) && c.is("img") && c.attr("src", j.placeholder),
								c.one("appear", function() {
									if (!this.loaded) {
										if (j.appear) {
											var d = i.length;
											j.appear.call(b, d, j)
										}
										a("<img />").bind("load", function() {
											var d = c.attr("data-" + j.data_attribute);
											c.hide(), c.is("img") ? c.attr("src", d) : c.css("background-image", "url('" + d + "')"), c[j.effect]
												(j.effect_speed), b.loaded = !0;
											var e = a.grep(i, function(a) {
												return !a.loaded
											});
											if (i = a(e), j.load) {
												var f = i.length;
												j.load.call(b, f, j)
											}
										}).attr("src", c.attr("data-" + j.data_attribute))
									}
								}), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function() {
									b.loaded || c.trigger("appear")
								})
						}), e.bind("resize", function() {
							g()
						}), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function(b) {
							b.originalEvent && b.originalEvent.persisted && i.each(function() {
								a(this).trigger("appear")
							})
						}), a(c).ready(function() {
							g()
						}), this
					}, a.belowthefold = function(c, f) {
						var g;
						return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight : e.height()) + e.scrollTop() : a(f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f.threshold
					}, a.rightoffold = function(c, f) {
						var g;
						return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container).width(), g <= a(c).offset().left - f.threshold
					}, a.abovethetop = function(c, f) {
						var g;
						return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, g >= a(c).offset().top + f.threshold + a(c).height()
					}, a.leftofbegin = function(c, f) {
						var g;
						return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, g >= a(c).offset().left + f.threshold + a(c).width()
					}, a.inviewport = function(b, c) {
						return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c))
					}, a.extend(a.expr[":"], {
						"below-the-fold": function(b) {
							return a.belowthefold(b, {
								threshold: 0
							})
						},
						"above-the-top": function(b) {
							return !a.belowthefold(b, {
								threshold: 0
							})
						},
						"right-of-screen": function(b) {
							return a.rightoffold(b, {
								threshold: 0
							})
						},
						"left-of-screen": function(b) {
							return !a.rightoffold(b, {
								threshold: 0
							})
						},
						"in-viewport": function(b) {
							return a.inviewport(b, {
								threshold: 0
							})
						},
						"above-the-fold": function(b) {
							return !a.belowthefold(b, {
								threshold: 0
							})
						},
						"right-of-fold": function(b) {
							return a.rightoffold(b, {
								threshold: 0
							})
						},
						"left-of-fold": function(b) {
							return !a.rightoffold(b, {
								threshold: 0
							})
						}
					})
				}(jQuery, window, document);
				$(situ).lazyload();
			}
		}
	};
	exports('common', mojia);
});
