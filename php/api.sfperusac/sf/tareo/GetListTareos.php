<?php
include "../conexion.php";

$server =$_GET['server'];
$iddatabase=$_GET['iddatabase'];

$denisira=$_GET['denisira'];
$iddatabase2=$_GET['iddatabase2'];
$idusuario=$_GET['idusuario'];
$idestado=$_GET['idestado'];
$fecha=$_GET['fecha'];


$connectionInfo = array( "Database"=>$iddatabase, "UID"=>$user, "PWD"=>$password);
$conn = sqlsrv_connect( $server, $connectionInfo);

if( $conn === false ){
	echo "Mil Disculpas, no existe comunicacion con el Servidor";
	die( print_r( sqlsrv_errors(), true));
}


$sql = "EXEC sptareo_getListaTareos ".$denisira.",'".$iddatabase2."','".$idusuario."','".$idestado."','".$fecha."';";
$stmt = sqlsrv_query( $conn, $sql);

if( $stmt === false){
	echo "Existio un problema, se esta revisando.";
	die( print_r( sqlsrv_errors(), true));
}

$return_arr = array();

while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
  $row_array['idtareo']=utf8_encode($row['idtareo']);
  $row_array['idusuario']=utf8_encode($row['idusuario']);
  $row_array['idtrabajador']=utf8_encode($row['idtrabajador']);
  $row_array['nombres']=utf8_encode($row['nombres']);
  $row_array['idplanilla']=utf8_encode($row['idplanilla']);
  $row_array['documento']=utf8_encode($row['documento']);
  $row_array['cant']=utf8_encode($row['cant']);
  $row_array['idestado']=utf8_encode($row['idestado']);
  $row_array['idturnotrabajo']=utf8_encode($row['idturnotrabajo']);
  $row_array['semana']=utf8_encode($row['semana']);
  $row_array['fechacreacion']=$row['fechacreacion']->format('Y-m-d');
	// $row_array['fechacreacion']=utf8_encode($row['fechacreacion']);
	$row_array['observaciones']=utf8_encode($row['observaciones']);
	$row_array['p1']=utf8_encode($row['p1']);
  $row_array['p2']=utf8_encode($row['p2']);
	array_push($return_arr,$row_array);
}
echo json_encode($return_arr);

sqlsrv_free_stmt( $stmt);
sqlsrv_close( $conn);


?>
