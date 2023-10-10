<?php
include "conexion.php";


$idcliente=$_GET['idcliente'];

$mysqli = new mysqli($server,$user,$password,$iddatabase);

if ($mysqli->connect_errno) {
    printf("Fallo la conexion: %s\n", $mysqli->connect_error);
    exit();
}
$queri="call spsystem_getServidor('".$idcliente."');";
$myArray = array();
if ($result = $mysqli->query($queri)) {
    while($row = $result->fetch_array()) {

$row_array['idcliente']=utf8_encode($row['idcliente']);
$row_array['item']=utf8_encode($row['item']);
$row_array['idservidor']=utf8_encode($row['idservidor']);
$row_array['descripcion']=utf8_encode($row['descripcion']);
$row_array['urilocal']=utf8_encode($row['urilocal']);
$row_array['uripublic']=utf8_encode($row['uripublic']);
$row_array['esdesktop']=utf8_encode($row['esdesktop']);
$row_array['esmovil']=utf8_encode($row['esmovil']);
$row_array['idprovider']=utf8_encode($row['idprovider']);
$row_array['activo']=utf8_encode($row['activo']);
$row_array['fechacreacion']=utf8_encode($row['fechacreacion']);

      array_push($myArray,$row_array);
    }
    echo json_encode($myArray);
}


$result->close();
$mysqli->close();


?>
