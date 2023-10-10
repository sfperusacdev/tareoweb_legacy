<?php include '../conexion.php';
$idcliente=$_GET['idcliente'];
$idproducto=$_GET['idproducto'];
$mysqli = new mysqli($server,$user,$password,$iddatabase); 

if ($mysqli->connect_errno) {
    printf("Falló la conexión: %s\n", $mysqli->connect_error);
    exit();
}
$queri="call spsystem_getMovProductoCliente('".$idcliente."','".$idproducto."');";
$myArray = array();
if ($result = $mysqli->query($queri)) {
    while($row = $result->fetch_assoc()) {
      $row_array['idcliente'] = utf8_encode($row['idcliente']);
      $row_array['idproducto'] = utf8_encode($row['idproducto']);
      $row_array['descripcion'] = utf8_encode($row['descripcion']);
      $row_array['licenseShort'] = utf8_encode($row['licenseShort']);
      $row_array['license'] = utf8_encode($row['license']);
      $row_array['mailSupport'] = utf8_encode($row['mailSupport']);
      $row_array['fechaLimite'] = utf8_encode($row['fechaLimite']);


      array_push($myArray,$row_array);
    }
    echo json_encode($myArray);
}

$result->close();
$mysqli->close();


?>
