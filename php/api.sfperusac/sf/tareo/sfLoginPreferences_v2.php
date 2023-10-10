<?php
include "../conexion.php";


$idcliente=$_GET['idcliente'];
$idproducto=$_GET['idproducto'];
$key=$_GET['key'];

$mysqli = new mysqli($server,$user,$password,$iddatabase);

if ($mysqli->connect_errno) {
    printf("Fallo la conexion: %s\n", $mysqli->connect_error);
    exit();
}
$queri="call spsystem_getPreference_v2('".$idcliente."','".$idproducto."','".$key."');";
$myArray = array();
if ($result = $mysqli->query($queri)) {
    while($row = $result->fetch_array()) {
      $row_array['prefKey'] = utf8_encode($row['prefKey']);
      $row_array['prefDesc'] = utf8_encode($row['prefDesc']);
      $row_array['prefValue'] = utf8_encode($row['prefValue']);
      $row_array['prefType'] = utf8_encode($row['prefType']);
      array_push($myArray,$row_array);
    }
    echo json_encode($myArray);
}


$result->close();
$mysqli->close();


?>
