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

	$count = 0;
	
	try{
		$con = dbConnection();

		//페이징 위한 토탈 카운트
		
		$sqlCount = "select count(*) as cnt from NK_USER as nku LEFT JOIN (select * from NK_IMAGE) as nki ON nku.nike_id = nki.nike_id;";
		
		$result = sql_query($sqlCount, $con);
		//페이징
		$row1 = sql_fetch($result);
		$total_count = $row1["cnt"];
		$rows = 10;		
		$total_page  = ceil($total_count / $rows);  // 전체 페이지 계산
		if($page == "") $page = 1; // 페이지가 없으면 첫 페이지 (1 페이지)
		$from_record = ($page - 1) * $rows; // 시작 열을 구함
		$end_record = $from_record + 10;
		
		$sql = "select nku.nike_id, nku.insta_id, nku.phone, DATE_ADD(nki.register_datetime,  INTERVAL 9 HOUR) as rg1, DATE_ADD(nku.register_datetime,  INTERVAL 9 HOUR) as rg2 , nki.image ";
		$sql = $sql."from NK_USER as nku LEFT JOIN (select * from NK_IMAGE) as nki ON nku.nike_id = nki.nike_id ORDER BY rg2 DESC, rg1 DESC";

		//print_r($sql);
	
		$result = sql_query($sql, $con);
		
		sql_close($con);
	}catch(Exception $e){
		$msg = $e -> getMessage();
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
<script type="text/javascript" src="js/excellentexport.js"></script>
</head>
<body>
<div id="divTableDataHolder" style="display:none">
	<table id="divTableData" width="100%">
		<thead>
			<tr>
				<th>index</th>
				<th>phone</th>
				<th>nike</th>
				<th>insta</th>
				<th>reg time</th>
				<th>img time</th>
				<th>img</th>               
			</tr>
		</thead>       
		<tbody>
			<?php			
			while( $row = sql_fetch_array($result) ) {
			?>
			<tr>
				<td><?=$total_count-($count+$from_record)?></td>
				<td><?=$row['phone']?></td>
				<td><?=$row['nike_id']?></td>
				<td><a href="https://www.instagram.com/<?=$row['insta_id']?>"><?=$row['insta_id']?></a></td>
				<td><?=$row['rg2']?></td>
				<td><?=$row['rg1']?></td>
				<td><?if($row['image'] != ''){?>http://battleforce-art.co.kr/upload/<?=$row['image']?><?}?></td>
			</tr>	
			<?php $count+=1; } ?>
		</tbody>
	</table>
</div>
<a id="excel" download="nike.xls" href="#" onclick="return ExcellentExport.excel(this, 'divTableData', 'nike');"></a>

<script>
window.onload = function(){
	document.getElementById('excel').click();
	setTimeout(function(){window.close();},1000);
}
</script>

</body>
</html>