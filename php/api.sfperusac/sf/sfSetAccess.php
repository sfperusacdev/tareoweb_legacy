
<?php
include "conexion.php";

$idcliente  =$_POST['idcliente'];
$idproducto    =$_POST['idproducto'];
$usuario       =$_POST['usuario'];
$machine       =$_POST['machine'];
$model         =$_POST['model'];
$manufacturarer=$_POST['manufacturarer'];
$imei          =$_POST['imei'];
$serial        =$_POST['serial'];
$observaciones =$_POST['observaciones'];

$mysqli = new mysqli($server,$user,$password,$iddatabase);
// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$sql = "call spsystem_setAccess('"
.$idcliente."','"
.$idproducto."','"
.$usuario."','"
.$machine."','"
.$model."','"
.$manufacturarer."','"
.$imei."','"
.$serial."','"
.$observaciones."');";

if ($mysqli->query($sql) === TRUE) {
    echo "Se guardo la Solicitud";
} else {
    echo "Error: " . $sql . "<br>" . $mysqli->error;
}

$mysqli->close();
?>
