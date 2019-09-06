<?php
 
	 try{
		$data = array();
		$data['success'] = false;

		$nike_id = $_POST['nike_id'];
		$img = $_POST['base64image'];
		$img = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $img));
		
		$tmp_name = $nike_id.'_'.time().'_nike.png';
		$result = file_put_contents('./upload/'.$tmp_name, $img);

		if($result){      
			$data['success'] = true;
			$data["fileName"] = $tmp_name;
		}else{
			$data['success'] = false;
			$data['error'] = "error";
		}

		echo json_encode($data);
		 
	 }catch(Exception $e){
		$msg = $e -> getMessage();
		echo $msg;
	}

 
?>