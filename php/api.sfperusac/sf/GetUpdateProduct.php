<?php
include "conexion.php";


$idcliente=$_GET['idcliente'];
$idproducto=$_GET['idproducto'];

$mysqli = new mysqli($server,$user,$password,$iddatabase);

if ($mysqli->connect_errno) {
    printf("Fallo la conexion: %s\n", $mysqli->connect_error);
    exit();
}
$queri="call spsystem_getVersionProducto('".$idcliente."','".$idproducto."');";
$myArray = array();
if ($result = $mysqli->query($queri)) {
    while($row = $result->fetch_array()) {

$row_array['numberVersion']=utf8_encode($row['numberVersion']);
$row_array['nameVersion']=utf8_encode($row['nameVersion']);
$row_array['urlVersion']=utf8_encode($row['urlVersion']);
$row_array['activo']=utf8_encode($row['activo']);
$row_array['fechacreacion']=utf8_encode($row['fechacreacion']);
$row_array['observaciones']=utf8_encode($row['observaciones']);


      array_push($myArray,$row_array);
    }
    echo json_encode($myArray);
}


$result->close();
$mysqli->close();


?>
