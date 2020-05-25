<?php 

	$conn = mysqli_connect("localhost","root","","gucuo");

	$query = 'SELECT * FROM indoors';

	$result = mysqli_query($conn,$query);

	$indoors = mysqli_fetch_all($result,MYSQLI_ASSOC);

	echo json_encode($indoors);
 ?>