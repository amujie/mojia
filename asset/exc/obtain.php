<?php
// 主题路径
function moJiaPath($path) {
	$install = '../../../../';
	$version = parse_ini_file('../../info.ini');
	$maccms = file_exists($install . 'application/extra/maccms.php') ? @require ($install . 'application/extra/maccms.php') : @require ('application/extra/maccms.php');
	if ($path == 'mojia') {
		return file_exists($install . 'application/extra/mojiaopt.php') ? @require ($install . 'application/extra/mojiaopt.php') : @require ('config.php');
	} elseif ($path == 'temp') {
		return $maccms['site']['install_dir'] . 'template/' . $maccms['site']['template_dir'] . '/';
	} elseif ($path == 'base') {
		return @require ($install . 'application/database.php');
	} elseif ($path == 'home') {
		return $maccms['site']['install_dir'];
	} elseif ($path == 'cdns') {
		return 'https://cdn.jsdelivr.net/gh/amujie/mojia/';
	} elseif ($path == 'down') {
		return 'https://cdn.jsdelivr.net/gh/amujie/download/';
	} elseif ($path == 'path') {
		return $install;
	}
}

// 判断是否有权限修改主题
function moJiaPower($type, $database) {
	$admin_id = @$_COOKIE['admin_id'];
	$admin_name = @$_COOKIE['admin_name'];
	$admin_check = @$_COOKIE['admin_check'];
	if (empty($admin_id) || empty($admin_name) || empty($admin_check)) {
		return false;
	}
	$admin_info = moJiaMysql(0, $database, "select * from {pre}admin where admin_id ='" . $admin_id . "' and admin_name = '" . $admin_name . "' and admin_status=1");
	if (empty($admin_info)) {
		return false;
	}
	if ($type == 'mojia' && $admin_info['admin_id'] != 1 && strstr($admin_info['admin_auth'], 'template/info') == false) {
		return false;
	}
	$login_check = md5($admin_info['admin_random'] . $admin_info['admin_name'] . $admin_info['admin_id']);
	if ($type == 'login' && $login_check != $admin_check) {
		return false;
	}
	return true;
}

// 连接数据库
function moJiaMysql($type, $database, $sql) {
	$conn = new mysqli($database['hostname'], $database['username'], $database['password'], $database['database'], $database['hostport']);
	$conn -> query('set names utf8');
	$sql = str_replace('{pre}', $database['prefix'], $sql);
	if ($conn -> connect_error) {
		die('连接失败:' . $conn -> connect_error);
	}
	if ($type == 1) {
		$array = mysqli_query($conn, $sql);
		mysqli_close($conn);
		while ($result = mysqli_fetch_array($array, MYSQLI_ASSOC)) {
			$output[] = $result;
		}
		return $output;
	} else {
		$array = $conn -> query($sql);
		$conn -> close();
		if ($array -> num_rows > 0) {
			return $array -> fetch_assoc();
		} else {
			return '';
		}
	}
}

// 获取淘客数据
function moJiaDaTaoKe($api, $param, $appSecret) {
	$output = '';
	ksort($param);
	foreach ($param as $key => $value) {
		$output .= '&' . $key . '=' . $value;
	}
	$output = trim($output, '&');
	$param['sign'] = strtoupper(md5($output . '&key=' . $appSecret));
	return json_decode(moJiaCurlGet($api . '?' . http_build_query($param)), true);
}

// 表情转换
function moJiaFace($data) {
	preg_match_all('/(?:\[)[^(?:\])]+]/i', $data, $match);
	foreach ($match[0] as $key => $value) {
		$data = str_replace($match[0][$key], '<img class="mo-part-mtop" width="auto" height="24" src="' . moJiaPath('temp') . 'asset/face/' . str_replace(array('[', ']'), '', $match[0][$key]) . (strstr($match[0][$key], 'qq') ? '.gif' : '.png') . '"/>', $data);
	}
	return $data;
}

// XML转换
function moJiaSimple($data) {
	if (file_exists($data)) {
		libxml_disable_entity_loader(false);
		return json_decode(json_encode(@simplexml_load_file($data, 'SimpleXMLElement', LIBXML_NOCDATA)), true);
	} else {
		libxml_disable_entity_loader(true);
		return json_decode(json_encode(@simplexml_load_string($data, 'SimpleXMLElement', LIBXML_NOCDATA)), true);
	}
}

// 获取网址内容
function moJiaCurlGet($url) {
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36');
	curl_setopt($curl, CURLOPT_REFERER, $url);
	curl_setopt($curl, CURLOPT_AUTOREFERER, 1);
	curl_setopt($curl, CURLOPT_HEADER, 0);
	curl_setopt($curl, CURLOPT_TIMEOUT, 10);
	curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 20);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($curl, CURLOPT_ENCODING, '');
	$data = @curl_exec($curl);
	curl_close($curl);
	return $data;
}

// 下载主题文件
function moJiaDownload($href, $path, $name) {
	$curl = curl_init($href); 
	$down = fopen($path . $name, 'w+'); 
	curl_setopt($curl, CURLOPT_HEADER, 0);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($curl, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
	$result = curl_exec($curl); 
	curl_close($curl); 
	fwrite($down, $result);
	fclose($down);
	return true;
}

// 判断主题文件是否存在
function moJiaIsExists($href) {
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $href);
	curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36');
	curl_setopt($curl, CURLOPT_REFERER, $href);
	curl_setopt($curl, CURLOPT_AUTOREFERER, 1);
	curl_setopt($curl, CURLOPT_HEADER, 1);
	curl_setopt($curl, CURLOPT_TIMEOUT, 10);
	curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 20);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($curl, CURLOPT_ENCODING, '');
	curl_setopt($curl, CURLOPT_NOBODY, 1);
	curl_exec($curl);
	$code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	curl_close($curl);
	if ($code == 200) {
		return true;
	} else {
		return false;
	}
}

// 解压zip文件
function moJiaUnzip($path, $name, $pass) {
	$zip = new ZipArchive();
	if ($zip -> open($path . $name) === true) {
		if ($zip -> setPassword($pass)) {
			if (!$zip -> extractTo($path)) {
				return false;
			}
		}
		$zip -> close();
		return true;
	} else {
		return false;
	}
}
