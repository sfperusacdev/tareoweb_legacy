<?php
include "conexion.php";


$idcliente=$_GET['idcliente'];

$mysqli = new mysqli($server,$user,$password,$iddatabase);

if ($mysqli->connect_errno) {
    printf("Fallo la conexion: %s\n", $mysqli->connect_error);
    exit();
}
$queri="call spsystem_getEmpresa('".$idcliente."');";
$myArray = array();
if ($result = $mysqli->query($queri)) {
    while($row = $result->fetch_array()) {
      $row_array['iddatabase'] = utf8_encode($row['iddatabase']);
  $row_array['idempresa'] = utf8_encode($row['idempresa']);
  $row_array['razon_social'] = utf8_encode($row['razon_social']);
  $row_array['ruc'] = utf8_encode($row['ruc']);
  $row_array['direccion'] = utf8_encode($row['direccion']);
  $row_array['representante'] = utf8_encode($row['representante']);
  // $row_array['activo'] = utf8_encode($row['activo']);
  // $row_array['fechacreacion'] = utf8_encode($row['fechacreacion']);
      array_push($myArray,$row_array);
    }
    echo json_encode($myArray);
}


$result->close();
$mysqli->close();


?>
