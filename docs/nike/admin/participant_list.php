<?php 
	session_start(); 
	$request_uri = $_SERVER['REQUEST_URI'];
	$pos = strpos($request_uri, "login");
	
	$adminInfo;

	if(isset($_SESSION["adminInfo"])){
		if($pos){
			header('Location: /admin/participant_list.php');
		}
		
			$adminInfo = $_SESSION["adminInfo"];
		
	}else{
		if(!$pos){
			header('Location: /admin/login.php');					
		}

	}
?>

<?php
	include_once("../config/config.php");
	
	//교재 리스트
	$page = "";
	
	if(!empty($_POST['page_index'])){
		$page = $_POST["page_index"];	
	}

	$image = "";
	
	if(!empty($_POST['image'])){
		$image = $_POST["image"];	
	}

	if($image == "") $image = 0;

	$search = "";
	if(!empty($_POST['search'])){
		$search = $_POST["search"];	
	}

	
	try{
		$con = dbConnection();
	
		//페이징 위한 토탈 카운트
		
		$sqlCount = "";
		if($image == 1){
			$sqlCount = "select count(*) as cnt from NK_USER as nku, (select * from NK_IMAGE) as nki WHERE nku.nike_id = nki.nike_id";
		}
		else {
			$sqlCount = "select count(*) as cnt from NK_USER as nku LEFT JOIN (select * from NK_IMAGE) as nki ON nku.nike_id = nki.nike_id WHERE 1=1";
		}

		if($search != "")
		{
			$sqlCount .= " AND nku.nike_id LIKE '%$search%'";
		}

		//print_r($sqlCount);
		
		$result = sql_query($sqlCount, $con);
		//페이징
		$row1 = sql_fetch($result);
		$total_count = $row1["cnt"];
		$rows = 10;		
		$total_page  = ceil($total_count / $rows);  // 전체 페이지 계산
		if($page == "") $page = 1; // 페이지가 없으면 첫 페이지 (1 페이지)
		$from_record = ($page - 1) * $rows; // 시작 열을 구함
		$end_record = $from_record + 10;
		

		
		//$sql = "select * from NK_USER ORDER BY register_datetime DESC LIMIT $from_record, 10;";
		$sql = "";
		if($image == 1){
			$sql = "select nku.nike_id, nku.insta_id, nku.phone, DATE_ADD(nki.register_datetime, INTERVAL 9 HOUR) as rg1, DATE_ADD(nku.register_datetime,  INTERVAL 9 HOUR) as rg2 , nki.image ";
			$sql = $sql."from NK_USER as nku, (select * from NK_IMAGE) as nki WHERE nku.nike_id = nki.nike_id";
			if($search != "")
			{
				$sql .= " AND nku.nike_id LIKE '%$search%'";
			}
			$sql .= " ORDER BY rg2 DESC, rg1 DESC LIMIT $from_record, 10;";
		}
		else {
			$sql = "select nku.nike_id, nku.insta_id, nku.phone, DATE_ADD(nki.register_datetime,  INTERVAL 9 HOUR) as rg1, DATE_ADD(nku.register_datetime,  INTERVAL 9 HOUR) as rg2 , nki.image ";
			$sql = $sql."from NK_USER as nku LEFT JOIN (select * from NK_IMAGE) as nki ON nku.nike_id = nki.nike_id WHERE 1=1";
			if($search != "")
			{
				$sql .= " AND nku.nike_id LIKE '%$search%'";
			}
			$sql = $sql." ORDER BY rg2 DESC, rg1 DESC LIMIT $from_record, 10;";
		}
		//print_r($sql);
	
		$result = sql_query($sql, $con);
		
		sql_close($con);
	}catch(Exception $e){
		$msg = $e -> getMessage();
	}
	
?>
<?php
	function get_paging($write_pages, $cur_page, $total_page, $url, $on, $add="")
	{
		$str = "";
		if ($cur_page > 1) {
			$str .= "<a href=javascript:pageSearch('1','".$on."') class='btn_page first'>처음</a>";
			//$str .= "[<a href='" . $url . ($cur_page-1) . "'>이전</a>]";
		}

		$start_page = ( ( (int)( ($cur_page - 1 ) / $write_pages ) ) * $write_pages ) + 1;
		$end_page = $start_page + $write_pages - 1;

		if ($end_page >= $total_page) $end_page = $total_page;

		if ($start_page > 1) $str .= " <a href=javascript:pageSearch('".($start_page-1)."','".$on."') class='btn_page prev'>이전</a>";

		if ($total_page > 1) {
			for ($k=$start_page;$k<=$end_page;$k++) {

				if ($cur_page != $k){
					print_r($k);
					$str .= "<a href=javascript:pageSearch('$k','$on')><span>$k</span></a>";
				}else{

					$str .= "<a href='#None' class='on'><span>$k</span></a>";
				}
			}
		}

		if ($total_page > $end_page) $str .= " <a href=javascript:pageSearch('".($end_page+1)."','".$on."') class='btn_page next'>다음</a>";

		if ($cur_page < $total_page) {
			//$str .= "[<a href='$url" . ($cur_page+1) . "'>다음</a>]";
			$str .= " <a href=javascript:pageSearch('".$total_page."','".$on."') class='btn_page last'>맨끝</a>";
		}
		$str .= "";

		return $str;
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<!-- <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /> -->
<title>AF1 DIY STUDIO</title>
<link rel="shortcut icon" href="images/favicon.ico"/>
<link rel="stylesheet" type="text/css" href="css/reset.css"/>
<link rel="stylesheet" type="text/css" href="css/common.css"/>
<script type="text/javascript" src="js/jquery-1.12.4.min.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="../js/util.js"></script>
</head>
<body>

<div id="wrap">

	<!-- Header -->
	<div id="header">
		<h1><img src="images/logo.png" alt="AF1 DIY STUDIO"></h1>
		<div class="gnb">
			<div class="inner">
				<ul>
					<li class="menu1 on"><a href="participant_list.html">참여자 목록</a></li>
					<li class="menu2"><a href="prizewinner_list.html">당첨자 목록</a></li>
				</ul>
			</div>
		</div>
		<a href="javascript:logoutAdmin();" class="btn_logout">로그아웃</a>
	</div>
	<!-- //Header -->

	<!-- Container -->
	<div id="container">
		<h2 class="blind">본문 내용</h2>

		<div class="tit">
			<h3>참여자 목록</h3>
		</div>

		<div class="sort_section">
			<div class="fl">
				<input style="margin-right: 10px;" type="text" name="search_text" id="search_text" value="" />
			</div>
			<div class="fl">
				<a href="javascript:textSearch();" class="btn black">검색</a>
			</div>
			<div class="fr">
				<a href="javascript:pageSearch('1', '0')" class="btn white">이미지 무</a>
			</div>
			<div class="fr">
				<a href="javascript:pageSearch('1', '1')" class="btn white">이미지 유</a>
			</div>
			<div class="fr">
				<a href="javascript:excel()" class="btn white">엑셀 다운로드</a>
			</div>
		</div>
		<form name="sub" id="sub" method="post" action="participant_list.php">
			<input type="hidden" name="page_index" id="page_index" value="<?=$page?>" />
			<input type="hidden" name="image" id="image" value="<?=$image?>" />
			<input type="hidden" name="search" id="search" value="<?=$search?>" />
			<div class="table_section">
				<table>
					<colgroup>
						<col width="5%"/>
						<col width="15%"/>
						<col width="10%"/>
						<col width="10%"/>
						<col width="10%"/>
						<col width="10%"/>
						<col width="10%"/>
					</colgroup>
					<thead>
						<tr>
							<th scope="col">NO.</th>
							<th scope="col">CONTACT</th>
							<th scope="col">.COM ID</th>
							<th scope="col">INSTA ID</th>
							<th scope="col">REG TIME</th>
							<th scope="col">IMAGE TIME</th>
							<th scope="col">IMAGE</th>
						</tr>
					</thead>
					<tbody>
						<? for($i=0; $row=sql_fetch_array($result); $i++){   ?>
						<tr>
							<td><?=$total_count-($i+$from_record)?></td>
							<td><?=$row['phone']?></td>
							<td><?=$row['nike_id']?></td>
							<td><?=$row['insta_id']?></td>
							<td><?=$row['rg2']?></td>
							<td><?=$row['rg1']?></td>
							<td><?if($row['image'] != ''){?><a href="javascript:image_popup('../upload/<?=$row['image']?>')" target="blank_"><img src="../upload/<?=$row['image']?>" alt=""></a><?}?></td>
						</tr>
						<? } ?>
					</tbody>
				</table>
				<div class="paging">
					<?=get_paging(10, $page, $total_page, "", $image)?>
					<!-- <a href="#" class="btn_prev">Prev Page</a>
					<a href="#" class="on">1</a>
					<a href="#">2</a>
					<a href="#">3</a>
					<a href="#">4</a>
					<a href="#">5</a>
					<a href="#">6</a>
					<a href="#">7</a>
					<a href="#">8</a>
					<a href="#">9</a>
					<a href="#">10</a>
					<a href="#" class="btn_next">Next Page</a> -->
				</div>
			</div>
		</form>
	</div>
	<!-- //Container -->

</div>

<script>
	var pageSearch = function(page, image){
		jQuery("#page_index").val(page);
		jQuery("#image").val(image);
		jQuery("#sub").submit();
	};


	var textSearch = function(){
		var temp = jQuery("#search_text").val();
		jQuery("#search").val(temp);
		jQuery("#page_index").val(1);
		jQuery("#sub").submit();
	};


	function image_popup(url) {
		var imgObj = new Image();
		imgObj.src = url;
		imageWin = window.open("", "profile_popup", "width=" + imgObj.width + "px, height=" + imgObj.height + "px"); 
		imageWin.document.write("<html><body style='margin:0'>"); 
		imageWin.document.write("<a href=javascript:window.close()><img src='" + imgObj.src + "' border=0></a>"); 
		imageWin.document.write("</body><html>"); 
		imageWin.document.title = imgObj.src;
	}
</script>
<script type="text/javascript">
	var logoutAdmin = function(){
		var url = "/admin/logoutProc.php";
		var data = {
		};
		scriptUtil.ajaxCallBack(url, "POST", data, "html", function(data){
			if(data.trim() == 200){
				location.href = "/admin/login.php"
			}else{
				alert("서버에 오류가 발생하였습니다. 잠시 후에 다시 시도하세요.");
			}
		}, function(){});
	}; 

	function excel(){
		window.open('./excel.php');
	}
</script>
</body>
</html>