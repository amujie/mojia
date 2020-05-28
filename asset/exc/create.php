<?php
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
} elseif (@$_GET['id'] == 'upd') {
	moJiaUpdate();
}

// 主题设置
function moJiaOptions() {
	if (isset($_POST['key'])) {
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
			die(json_encode(array('msg' => '授权失败,请联系QQ1278242793')));
		}
	} elseif (isset($_POST['type'])) {
		if (!moJiaPower('mojia', moJiaPath('base'))) {
			die(json_encode(array('msg' => '权限不足')));
		} elseif (file_exists(moJiaPath('path') . 'application/extra/mojiaopt.php')) {
			if (@unlink(moJiaPath('path') . 'application/extra/mojiaopt.php')) {
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
		if (!moJiaPower('mojia', moJiaPath('base'))) {
			die(json_encode(array('msg' => '权限不足')));
		} elseif (file_put_contents(moJiaPath('path') . 'application/extra/maccms.php', '<?php return ' . var_export($option, true) . ';?>')) {
			die(json_encode(array('msg' => '修改成功')));
		} else {
			die(json_encode(array('msg' => '执行失败')));
		}
	} elseif (isset($_POST['tpl'])) {
		$option = @require (moJiaPath('path') . 'application/extra/maccms.php');
		$option['site']['template_dir'] = @$_POST['tpl'];
		if (!moJiaPower('mojia', moJiaPath('base'))) {
			die(json_encode(array('msg' => '权限不足')));
		} elseif (file_put_contents(moJiaPath('path') . 'application/extra/maccms.php', '<?php return ' . var_export($option, true) . ';?>')) {
			die(json_encode(array('msg' => '修改成功')));
		} else {
			die(json_encode(array('msg' => '执行失败')));
		}
	} elseif (isset($_POST['mojia'])) {
		if (!moJiaPower('mojia', moJiaPath('base'))) {
			die(json_encode(array('msg' => '权限不足')));
		} elseif (file_put_contents(moJiaPath('path') . 'application/extra/mojiaopt.php', '<?php return ' . var_export($_POST['mojia'], true) . ';?>')) {
			die(json_encode(array('msg' => '保存成功')));
		} else {
			die(json_encode(array('msg' => '保存失败')));
		}
	} else {
		die(json_encode(array('msg' => '执行失败')));
	}
}

// 采集设置
function moJiaCollect() {
	if (isset($_POST['info'])) {
		require (moJiaPath('path') . 'application/common.php');
		$arrays = moJiaMysql(1, moJiaPath('base'), "select * from {pre}collect");
		foreach ($arrays as $v => $k) {
			$arrays[$v]['collect_flag'] = md5($arrays[$v]['collect_url']);
			$arrays[$v]['collect_host'] = parse_url($arrays[$v]['collect_url'], PHP_URL_HOST);
			$arrays[$v]['collect_mold'] = $arrays[$v]['collect_param'] == '&ct=1' ? 'down' : ($arrays[$v]['collect_mid'] == 1 ? 'play' : mac_get_mid_code($arrays[$v]['collect_mid']));
			$arrays[$v]['collect_reso'] = $arrays[$v]['collect_param'] == '&ct=1' ? '下载' : mac_get_mid_text($arrays[$v]['collect_mid']);
			$arrays[$v]['collect_code'] = mac_get_mid_code($arrays[$v]['collect_mid']);
			$arrays[$v]['collect_text'] = mac_get_mid_text($arrays[$v]['collect_mid']);
			$arrays[$v]['collect_param'] = base64_encode($arrays[$v]['collect_param']);
		}
		die(json_encode($arrays));
	} elseif (isset($_POST['code'])) {
		$data = moJiaCurlGet($_POST['apis']);
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
		$data = moJiaCurlGet($_POST['apis'] . '?wd=' . urlencode($_POST['name']));
		if (@$_POST['type'] == 1) {
			$result = moJiaSimple($data);
			$recordcount = @$result['list']['@attributes']['recordcount'];
			if ($recordcount == 0) {
				die(json_encode(array()));
			} elseif (!@$result['list']['video']) {
				die(json_encode(array()));
			} elseif ($recordcount == 1) {
				$arrays = array($result['list']['video']);
			} else {
				$arrays = $result['list']['video'];
			}
			foreach ($arrays as $v => $k) {
				$arrays[$v]['vod_name'] = $arrays[$v]['name'];
				$arrays[$v]['type_name'] = $arrays[$v]['type'];
				$arrays[$v]['vod_time'] = $arrays[$v]['last'];
				$arrays[$v]['vod_remarks'] = $arrays[$v]['note'];
				$arrays[$v]['vod_play_from'] = $arrays[$v]['dt'];
			}
			die(json_encode($arrays));
		} else {
			$result = json_decode($data, true);
			die(json_encode(@$result['list']));
		}
	}
}

// 短链生成
function moJiaCommon() {
	if (isset($_GET['ver'])) {
		$version = parse_ini_file('../../info.ini');
		$versnew = moJiaCurlGet(moJiaPath('cdns') . 'info.ini?v='.time());
		preg_match_all('/version=([\w\W]*?)adsdir/i', preg_replace('/\s+/','',$versnew), $match);
		if (@$_GET['ver'] == 'now') {
			echo json_encode(array('ver' => $version['version']));
		} elseif (@$_GET['ver'] == 'new') {
			echo json_encode(array('ver' => $match[1][0], 'key' => md5('mojia_' . $match[1][0])));
		} elseif (@$_GET['ver'] == 'log') {
			echo moJiaCurlGet(moJiaPath('cdns') . 'about/changelog.json?v='.time());
		}
	} elseif (isset($_GET['tao'])) {
		$mojia = moJiaPath('mojia');
		$taoke = moJiaDaTaoKe('https://openapi.dataoke.com/api/goods/get-goods-list', array('pageSize' => '50', 'cids' => $mojia['home']['taoke']['type'], 'taoQiangGou' => $mojia['home']['taoke']['qiang'], 'brand' => $mojia['home']['taoke']['brand'], 'sort' => $mojia['home']['taoke']['sort'], 'version' => $mojia['home']['taoke']['ver'], 'appKey' => $mojia['other']['taoke']['key']), $mojia['other']['taoke']['secret']);
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
	} elseif (isset($_POST['key'])) {
		parse_str(parse_url(@$_POST['key'], PHP_URL_QUERY));
		die($output?$output:json_encode(dns_get_record($name,DNS_TXT)));
	} else {
		$mojia = moJiaPath('mojia');
		$url = $mojia['other']['share']['host'] ? $mojia['other']['share']['host'] . parse_url(@$_POST['url'], PHP_URL_PATH) : @$_POST['url'];
		die(json_encode(array('msg' => moJiaCurlGet($mojia['other']['share']['apis'] . $url))));
	}
}

// 主题更新
function moJiaUpdate() {
	if (isset($_POST['ver'])) {
		$path = '../../../';
		$name = 'mojia-' . $_POST['ver'] . '.zip';
		$href = moJiaPath('down') . $name . '?v=' . time();
		if (!moJiaIsExists($href)) {
			die(json_encode(array('code' => '0', 'msg' => '未找到到最新版主题文件')));
		}
		if (!moJiaDownload($href, $path, $name)) {
			die(json_encode(array('code' => '0', 'msg' => '主题下载失败')));
		}
		if (moJiaUnzip($path, $name, @$_POST['key'])) {
			die(json_encode(array('code' => '1', 'msg' => '主题升级成功')));
		} else {
			die(json_encode(array('code' => '0', 'msg' => '主题升级失败')));
		}
	}
}
