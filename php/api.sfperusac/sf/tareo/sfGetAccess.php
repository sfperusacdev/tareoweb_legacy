<?php
include "../conexion.php";


$idcliente=$_GET['idcliente'];
$idproducto=$_GET['idproducto'];
$imei=$_GET['imei'];
$serial=$_GET['serial'];

$mysqli = new mysqli($server,$user,$password,$iddatabase);

if ($mysqli->connect_errno) {
    printf("Fallo la conexion: %s\n", $mysqli->connect_error);
    exit();
}
$queri="call spsystem_getAccess('".$idcliente."','".$idproducto."','".$imei."','".$serial."');";
$myArray = array();
if ($result = $mysqli->query($queri)) {
    while($row = $result->fetch_array()) {
      $row_array['activo'] = utf8_encode($row['activo']);
      $row_array['idusuarioap'] = utf8_encode($row['idusuarioap']);
      array_push($myArray,$row_array);
    }
    echo json_encode($myArray);
}


$result->close();
$mysqli->close();


?>
