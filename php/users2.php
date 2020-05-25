<?php 

	$conn = mysqli_connect("175.24.29.241","root","","gucuo");

	$query = 'SELECT * FROM users';

	$result = mysqli_query($conn,$query);

	$users = mysqli_fetch_all($result,MYSQLI_ASSOC);

	echo json_encode($users);
 ?>