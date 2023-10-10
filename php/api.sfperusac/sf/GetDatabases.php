<?php
include "conexion.php";


$idcliente=$_GET['idcliente'];

$mysqli = new mysqli($server,$user,$password,$iddatabase);

if ($mysqli->connect_errno) {
    printf("Fallo la conexion: %s\n", $mysqli->connect_error);
    exit();
}
$queri="call spsystem_getDatabase('".$idcliente."');";
$myArray = array();
if ($result = $mysqli->query($queri)) {
    while($row = $result->fetch_array()) {
  $row_array['idservidor']=utf8_encode($row['idservidor']);
  $row_array['iddatabase']=utf8_encode($row['iddatabase']);
  $row_array['descripcion']=utf8_encode($row['descripcion']);
  $row_array['idadmin']=utf8_encode($row['idadmin']);
  $row_array['idconexion']=utf8_encode($row['idconexion']);
  $row_array['questpermision']=utf8_encode($row['questpermision']);
  $row_array['esdesktop']=utf8_encode($row['esdesktop']);
  $row_array['esmovil']=utf8_encode($row['esmovil']);
  $row_array['activo']=utf8_encode($row['activo']);
  $row_array['fechacreacion']=utf8_encode($row['fechacreacion']);
      array_push($myArray,$row_array);
    }
    echo json_encode($myArray);
}


$result->close();
$mysqli->close();


?>
