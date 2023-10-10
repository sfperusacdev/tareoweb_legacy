<?php
include "conexion.php";


$idcliente=$_GET['idcliente'];
$idproducto=$_GET['idproducto'];
$idmov=$_GET['idmov'];


$mysqli = new mysqli($server,$user,$password,$iddatabase);

if ($mysqli->connect_errno) {
    printf("Fallo la conexion: %s\n", $mysqli->connect_error);
    exit();
}
$queri="call spsystem_getMovQuery('".$idcliente."','".$idproducto."','".$idmov."');";
$myArray = array();
if ($result = $mysqli->query($queri)) {
    while($row = $result->fetch_array()) {
      $row_array['idmovquery'] = utf8_encode($row['idmovquery']);
      $row_array['descripcion'] = utf8_encode($row['descripcion']);
      $row_array['query'] = utf8_encode($row['query']);
      array_push($myArray,$row_array);
    }
    echo json_encode($myArray);
}

$result->close();
$mysqli->close();

?>
