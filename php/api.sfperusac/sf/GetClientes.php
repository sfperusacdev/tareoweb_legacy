<?php
include "conexion.php";


$idcliente=$_GET['idcliente'];

$mysqli = new mysqli($server,$user,$password,$iddatabase);

if ($mysqli->connect_errno) {
    printf("Fallo la conexion: %s\n", $mysqli->connect_error);
    exit();
}
$queri="call spsystem_getCliente('".$idcliente."');";
$myArray = array();
if ($result = $mysqli->query($queri)) {
    while($row = $result->fetch_array()) {

  $row_array['idcliente'] = utf8_encode($row['idcliente']);
          $row_array['ruc'] = utf8_encode($row['ruc']);
          $row_array['razon_social'] = utf8_encode($row['razon_social']);
          $row_array['direccion'] = utf8_encode($row['direccion']);
          $row_array['representante'] = utf8_encode($row['representante']);
          $row_array['telef1'] = utf8_encode($row['telef1']);
          $row_array['telef2'] = utf8_encode($row['telef2']);
          $row_array['telef3'] = utf8_encode($row['telef3']);
          $row_array['email'] = utf8_encode($row['email']);
          $row_array['departamento'] = utf8_encode($row['departamento']);
          $row_array['distrito'] = utf8_encode($row['distrito']);
          $row_array['nrocuenta'] = utf8_encode($row['nrocuenta']);
          $row_array['idrubro'] = utf8_encode($row['idrubro']);
          $row_array['password'] = utf8_encode($row['password']);
          $row_array['activo'] = utf8_encode($row['activo']);
          $row_array['fechacreacion'] = utf8_encode($row['fechacreacion']);
      array_push($myArray,$row_array);
    }
    echo json_encode($myArray);
}


$result->close();
$mysqli->close();


?>
