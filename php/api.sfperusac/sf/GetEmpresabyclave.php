<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');
include "conexion.php";


$cliente=$_GET['cliente'];
$producto=$_GET['producto'];
$clave=$_GET['clave'];

$mysqli = new mysqli($server,$user,$password,$iddatabase);

if ($mysqli->connect_errno) {
    printf("Fallo la conexion: %s\n", $mysqli->connect_error);
    exit();
}
$queri="call spsystem_getEmpresabyClave('".$cliente."','".$producto."','".$clave."');";
$myArray = array();
if ($result = $mysqli->query($queri)) {
    while($row = $result->fetch_array()) {
  $row_array['idmovproductocliente'] = utf8_encode($row['idmovproductocliente']);
  $row_array['idcliente'] = utf8_encode($row['idcliente']);
  $row_array['razon_social'] = utf8_encode($row['razon_social']);
  $row_array['idproducto'] = utf8_encode($row['idroducto']);
  $row_array['licenseShort'] = utf8_encode($row['licenseShort']);
  // $row_array['activo'] = utf8_encode($row['activo']);
  // $row_array['fechacreacion'] = utf8_encode($row['fechacreacion']);
      array_push($myArray,$row_array);
    }
    echo json_encode($myArray);
}


$result->close();
$mysqli->close();


?>