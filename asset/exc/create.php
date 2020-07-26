<?php
/**
 * 作者:大橙子
 * 网址:https://amujie.com
 * QQ:1570457334
 */
// 请勿修改此文件
error_reporting(0);
require ('obtain.php');
header('Content-type: application/json; charset=utf-8');
if (@$_GET['id'] != 'url' && !moJiaPower('login', moJiaPath('base'))) {
	die(json_encode(array('code' => '0', 'msg' => '请先登录后台管理系统再进行操作')));
} elseif (@$_GET['id'] == 'opt') {
	moJiaOptions();
} elseif (@$_GET['id'] == 'col') {
	moJiaCollect();
} elseif (@$_GET['id'] == 'url') {
	moJiaCommon();
}

// 主题设置
function moJiaOptions() {
	if (!moJiaPower('mojia', moJiaPath('base'))) {
		die(json_encode(array('msg' => '权限不足')));
	} elseif (isset($_POST['ver'])) {
		if (@$_POST['ver'] == 'now') {
			$version = parse_ini_file('../../info.ini');
			die(json_encode(array('ver' => $version['version'])));
		} elseif (@$_POST['ver'] == 'new') {
			$versnew = moJiaCurlGet(moJiaPath('vers'));
			preg_match_all('/<option\s+value="amujie\/mojia@(.*)">/i', $versnew, $match);
			die(json_encode(array('ver' => $match[1][0], 'key' => md5('mojia-' . $match[1][0]))));
		} elseif (@$_POST['ver'] == 'log') {
			die(moJiaCurlGet(str_replace('latest', $_POST['new'], moJiaPath('vers')) . 'about/changelog.json'));
		}
	} elseif (isset($_POST['key'])) {
		if (file_put_contents(moJiaPath('path') . 'application/extra/mojiakey.php', '<?php return ' . var_export($_POST, true) . ';?>')) {
			file_put_contents(moJiaPath('path') . 'runtime/temp/' . md5('mojia') . '.php', '<?php return ' . var_export(time(), true) . ';?>');
			$path = moJiaPath('path') . 'application/data/config/quickmenu.txt';
			$info = '魔加主题设置,' . moJiaPath('home') . 'index.php/label/admin' . chr(13) . chr(10) . '魔加采集优化,' . moJiaPath('home') . 'index.php/label/union';
			if (stristr(file_get_contents($path), $info)) {
				die(json_encode(array('msg' => '授权成功,快捷菜单已存在')));
			} elseif (file_put_contents($path, '行分隔符,###' . chr(13) . chr(10) . $info . chr(13) . chr(10) . '行分隔符,###' . chr(13) . chr(10) . file_get_contents($path))) {
				die(json_encode(array('msg' => '授权成功,快捷菜单添加成功')));
			}
		} else {
			die(json_encode(array('msg' => '授权失败,请联系QQ1570457334')));
		}
	} elseif (isset($_POST['def'])) {
		if (file_exists(moJiaPath('path') . 'application/extra/mojiaopt.php')) {
			if (@unlink(moJiaPath('path') . 'application/extra/mojiaopt.php')) {
				$html = file_get_contents('../../html/basics/seokey.html');
				$seokey = @require ('config.php');
				foreach ($seokey['seo'] as $value => $key) {
					foreach ($seokey['seo'][$value] as $item => $sub) {
						$html = str_replace('{' . $item . $seokey['seo'][$value]['aid'] . '}', $sub, $html);
					}
				}
				if (!file_put_contents('../../html/tinier/seokey.html', $html)) {
					die(json_encode(array('msg' => 'SEO设置恢复失败,请检查文件权限')));
				}
				die(json_encode(array('msg' => '恢复成功')));
			} else {
				die(json_encode(array('msg' => '恢复失败')));
			}
		} else {
			die(json_encode(array('msg' => '当前已经是默认设置了')));
		}
	} elseif (isset($_POST['chat'])) {
		$option = @require (moJiaPath('path') . 'application/extra/maccms.php');
		$option['weixin']['gjc1'] = @$_POST['send'];
		$option['weixin']['gjcm1'] = @$_POST['code'];
		$option['site']['site_status'] = @$_POST['close'];
		if (file_put_contents(moJiaPath('path') . 'application/extra/maccms.php', '<?php return ' . var_export($option, true) . ';?>')) {
			die(json_encode(array('msg' => '修改成功')));
		} else {
			die(json_encode(array('msg' => '执行失败')));
		}
	} elseif (isset($_POST['tpl'])) {
		$option = @require (moJiaPath('path') . 'application/extra/maccms.php');
		$option['site']['template_dir'] = @$_POST['tpl'];
		if (file_put_contents(moJiaPath('path') . 'application/extra/maccms.php', '<?php return ' . var_export($option, true) . ';?>')) {
			@unlink('../../../' . $_POST['tpl'] . '.zip');
			$mojia = moJiaPath('mojia');
			$option = @require (moJiaPath('path') . 'application/extra/maccms.php');
			die(json_encode(array('msg' => $option['site']['template_dir'])));
		} else {
			die(json_encode(array('msg' => '执行失败')));
		}
	} elseif (isset($_POST['seo'])) {
		$option = @require (moJiaPath('path') . 'application/extra/mojiaopt.php');
		unset($option['seo']);
		$seokey = @require ('config.php');
		$option['seo'] = $seokey['seo'];
		if (file_put_contents(moJiaPath('path') . 'application/extra/mojiaopt.php', '<?php return ' . var_export($option, true) . ';?>')) {
			$html = file_get_contents('../../html/basics/seokey.html');
			foreach ($seokey['seo'] as $value => $key) {
				foreach ($seokey['seo'][$value] as $item => $sub) {
					$html = str_replace('{' . $item . $seokey['seo'][$value]['aid'] . '}', $sub, $html);
				}
			}
			if (!file_put_contents('../../html/tinier/seokey.html', $html)) {
				die(json_encode(array('msg' => 'SEO设置恢复失败,请检查文件权限')));
			}
			die(json_encode(array('msg' => 'SEO设置恢复成功')));
		} else {
			die(json_encode(array('msg' => 'SEO设置恢复失败')));
		}
	} elseif (isset($_POST['mojia'])) {
		if (file_put_contents(moJiaPath('path') . 'application/extra/mojiaopt.php', '<?php return ' . var_export($_POST['mojia'], true) . ';?>')) {
			$html = file_get_contents('../../html/basics/seokey.html');
			$seokey = $_POST['mojia']['seo'];
			foreach ($seokey as $value => $key) {
				foreach ($seokey[$value] as $item => $sub) {
					$html = str_replace('{' . $item . $seokey[$value]['aid'] . '}', $sub, $html);
				}
			}
			if (!file_put_contents('../../html/tinier/seokey.html', $html)) {
				die(json_encode(array('msg' => 'SEO设置保存失败,请检查文件权限')));
			}
			$option = @require (moJiaPath('path') . 'application/extra/maccms.php');
			$option['weixin']['gjc1'] = $_POST['mojia']['play']['chat']['send'];
			$option['weixin']['gjcm1'] = $_POST['mojia']['play']['chat']['code'];
			$option['site']['site_status'] = $_POST['mojia']['other']['close']['state'];
			if (!file_put_contents(moJiaPath('path') . 'application/extra/maccms.php', '<?php return ' . var_export($option, true) . ';?>')) {
				die(json_encode(array('msg' => '系统设置保存失败')));
			}
			if ($_POST['mojia']['home']['taoke']['state'] == 1) {
				$taoke = moJiaDaTaoKe('https://openapi.dataoke.com/api/goods/get-goods-list', array('pageSize' => '50', 'cids' => $_POST['mojia']['home']['taoke']['type'], 'juHuaSuan' => $_POST['mojia']['home']['taoke']['qiang'] == 1 ? 1 : '', 'taoQiangGou' => $_POST['mojia']['home']['taoke']['qiang'] == 2 ? 1 : '', 'tmall' => $_POST['mojia']['home']['taoke']['qiang'] == 3 ? 1 : '', 'tchaoshi' => $_POST['mojia']['home']['taoke']['qiang'] == 4 ? 1 : '', 'goldSeller' => $_POST['mojia']['home']['taoke']['qiang'] == 5 ? 1 : '', 'haitao' => $_POST['mojia']['home']['taoke']['qiang'] == 6 ? 1 : '', 'specialId' => $_POST['mojia']['home']['taoke']['brand'], 'sort' => $_POST['mojia']['home']['taoke']['sort'], 'version' => $_POST['mojia']['home']['taoke']['ver'], 'appKey' => $_POST['mojia']['other']['taoke']['key']), $_POST['mojia']['other']['taoke']['secret']);
				if (!file_put_contents(moJiaPath('path') . 'application/extra/mojiatao.php', '<?php return ' . var_export(array_slice($taoke['data']['list'], 0, $_POST['mojia']['home']['taoke']['num']), true) . ';?>')) {
					die(json_encode(array('msg' => '首页淘客数据更新失败')));
				}
			}
			die(json_encode(array('msg' => '保存成功')));
		} else {
			die(json_encode(array('msg' => '保存失败')));
		}
	} elseif (isset($_POST['news'])) {
		$path = '../../../';
		$name = 'mojia-' . $_POST['news'] . '.zip';
		$href = moJiaPath('down') . $name . '?v=' . time();
		if (!moJiaIsExists($href)) {
			die(json_encode(array('code' => '0', 'msg' => '未找到到最新版主题文件')));
		}
		if (!moJiaDownload($href, $path, $name)) {
			die(json_encode(array('code' => '0', 'msg' => '主题下载失败')));
		}
		if (moJiaUnzip($path, $name, @$_POST['pass'])) {
			die(json_encode(array('code' => '1', 'msg' => '主题升级成功')));
		} else {
			die(json_encode(array('code' => '0', 'msg' => '主题解压失败')));
		}
	} else {
		die(json_encode(array('msg' => '执行失败')));
	}
}

// 采集设置
function moJiaCollect() {
	if (isset($_POST['info'])) {
		require (moJiaPath('path') . 'application/common.php');
		$where = isset($_POST['id']) ? ' where collect_id = ' . $_POST['id'] : '';
		$array = moJiaMysql(1, moJiaPath('base'), "select * from {pre}collect" . $where);
		foreach ($array as $value => $key) {
			$array[$value]['collect_flag'] = md5($array[$value]['collect_url']);
			$array[$value]['collect_mold'] = $array[$value]['collect_param'] == '&ct=1' ? 'down' : ($array[$value]['collect_mid'] == 1 ? 'play' : mac_get_mid_code($array[$value]['collect_mid']));
			$array[$value]['collect_text'] = $array[$value]['collect_param'] == '&ct=1' ? '下载' : mac_get_mid_text($array[$value]['collect_mid']);
			$array[$value]['collect_code'] = mac_get_mid_code($array[$value]['collect_mid']);
			$array[$value]['collect_param'] = base64_encode($array[$value]['collect_param']);
		}
		die(json_encode($array ? $array : array()));
	} elseif (isset($_POST['code'])) {
		$data = moJiaCurlGet($_POST['url']);
		if (@$_POST['type'] == 1) {
			$result = moJiaSimple($data);
			$recordcount = @$result['list']['@attributes']['recordcount'];
			if ($recordcount == 0) {
				die(json_encode(array()));
			} elseif (!@$result['list']['video'][0]['dt']) {
				die(json_encode(array()));
			} elseif ($recordcount == 1) {
				die('[' . json_encode(@explode(',', @$result['list']['video'][0]['dt'])) . ']');
			} else {
				die(json_encode(@explode(',', @$result['list']['video'][0]['dt'])));
			}
		} else {
			$result = json_decode($data, true);
			die(json_encode(@explode(',', @$result['list'][0]['vod_play_from'])));
		}
	} elseif (isset($_POST['seek'])) {
		$data = moJiaCurlGet($_POST['url'] . '?wd=' . urlencode($_POST['name']));
		if (@$_POST['type'] == 1) {
			$result = moJiaSimple($data);
			$recordcount = @$result['list']['@attributes']['recordcount'];
			if ($recordcount == 0) {
				die(json_encode(array()));
			} elseif (!@$result['list']['video']) {
				die(json_encode(array()));
			} elseif ($recordcount == 1) {
				$array = array($result['list']['video']);
			} else {
				$array = $result['list']['video'];
			}
			foreach ($array as $value => $key) {
				$array[$value]['vod_name'] = $array[$value]['name'];
				$array[$value]['type_name'] = $array[$value]['type'];
				$array[$value]['vod_time'] = $array[$value]['last'];
				$array[$value]['vod_remarks'] = $array[$value]['note'];
				$array[$value]['vod_play_from'] = $array[$value]['dt'];
			}
			die(json_encode($array));
		} else {
			$result = json_decode($data, true);
			die(json_encode(@$result['list']));
		}
	} elseif (isset($_POST['favs'])) {
		if ($_POST['favs'] == 'add') {
			if (file_exists(moJiaPath('path') . 'application/extra/mojiafav.php')) {
				$html = @require (moJiaPath('path') . 'application/extra/mojiafav.php');
				if (is_array($html)) {
					$html[$_POST['collect_id']] = $_POST;
				} else {
					$html = array($_POST['collect_id'] => $_POST);
				}
				if (file_put_contents(moJiaPath('path') . 'application/extra/mojiafav.php', '<?php return ' . var_export($html, true) . ';?>')) {
					die(json_encode(array('msg' => '收藏成功')));
				} else {
					die(json_encode(array('msg' => '收藏失败')));
				}
			} else {
				if (file_put_contents(moJiaPath('path') . 'application/extra/mojiafav.php', '<?php return ' . var_export(array($_POST['collect_id'] => $_POST), true) . ';?>')) {
					die(json_encode(array('msg' => '收藏成功')));
				} else {
					die(json_encode(array('msg' => '收藏失败')));
				}
			}
		} elseif ($_POST['favs'] == 'del') {
			$html = @require (moJiaPath('path') . 'application/extra/mojiafav.php');
			unset($html[$_POST['id']]);
			if (file_put_contents(moJiaPath('path') . 'application/extra/mojiafav.php', '<?php return ' . var_export($html, true) . ';?>')) {
				die(json_encode(array('msg' => '取消收藏成功')));
			} else {
				die(json_encode(array('msg' => '取消收藏失败')));
			}
		} elseif ($_POST['favs'] == 'list') {
			if (file_exists(moJiaPath('path') . 'application/extra/mojiafav.php')) {
				die(json_encode(@require (moJiaPath('path') . 'application/extra/mojiafav.php')));
			} else {
				die(json_encode(array()));
			}
		}
	}
}

// 短链生成
function moJiaCommon() {
	if (isset($_POST['tao'])) {
		$mojia = moJiaPath('mojia');
		$taoke = moJiaDaTaoKe('https://openapi.dataoke.com/api/goods/get-goods-list', array('pageSize' => '50', 'cids' => $mojia['home']['taoke']['type'], 'juHuaSuan' => $mojia['home']['taoke']['qiang'] == 1 ? 1 : '', 'taoQiangGou' => $mojia['home']['taoke']['qiang'] == 2 ? 1 : '', 'tmall' => $mojia['home']['taoke']['qiang'] == 3 ? 1 : '', 'tchaoshi' => $mojia['home']['taoke']['qiang'] == 4 ? 1 : '', 'goldSeller' => $mojia['home']['taoke']['qiang'] == 5 ? 1 : '', 'haitao' => $mojia['home']['taoke']['qiang'] == 6 ? 1 : '', 'specialId' => $mojia['home']['taoke']['brand'], 'sort' => $mojia['home']['taoke']['sort'], 'version' => $mojia['home']['taoke']['ver'], 'appKey' => $mojia['other']['taoke']['key']), $mojia['other']['taoke']['secret']);
		if (file_put_contents(moJiaPath('path') . 'application/extra/mojiatao.php', '<?php return ' . var_export(array_slice($taoke['data']['list'], 0, $mojia['home']['taoke']['num']), true) . ';?>')) {
			die(json_encode(array('msg' => '更新成功')));
		} else {
			die(json_encode(array('msg' => '更新失败')));
		}
	} elseif (isset($_POST['time'])) {
		if (file_put_contents(moJiaPath('path') . 'runtime/temp/' . md5('mojia') . '.php', '<?php return ' . var_export(time(), true) . ';?>')) {
			die(json_encode(array('msg' => '更新成功')));
		} else {
			die(json_encode(array('msg' => '更新失败')));
		}
	} elseif (isset($_POST['addr'])) {
		die(json_encode(array('msg' => md5($_SERVER['SERVER_ADDR']))));
	} elseif (isset($_POST['key'])) {
		$output = moJiaCurlGet(@$_POST['key']);
		parse_str(parse_url(@$_POST['key'], PHP_URL_QUERY));
		die($output ? $output : json_encode(dns_get_record($name, DNS_TXT)));
	} elseif (isset($_POST['url'])) {
		$mojia = moJiaPath('mojia');
		$url = $mojia['other']['share']['host'] ? $mojia['other']['share']['host'] . parse_url(@$_POST['url'], PHP_URL_PATH) : @$_POST['url'];
		preg_match_all(($mojia['other']['share']['regex'] ? $mojia['other']['share']['regex'] : '/(.*)/i'), moJiaCurlGet($mojia['other']['share']['apis'] . rawurlencode($url)), $match);
		die(json_encode(array('msg' => $match[1][0])));
	} elseif (isset($_GET['pic'])) {
		header('Content-Type: image/jpeg; charset=utf-8');
		$time = isset($_GET['time']) ? $_GET['time'] : 5;
		$curl = curl_init($_GET['pic']);
		curl_setopt($curl, CURLOPT_HEADER, 0);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
		curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, $time);
		curl_setopt($curl, CURLOPT_TIMEOUT, $time);
		$output = curl_exec($curl);
		curl_close($curl);
		die($output);
	}
}
?>