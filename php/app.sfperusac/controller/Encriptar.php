<?php

Class Encriptar{
    private $pass1 = "0123456789QWERTYUIOPASDFGHJKLZXCVBNÑMqwerttyuiopasdfghjklzxcvbnñm ";
    private $pass2 = "ãª¿®¦ÁÂÀ©¦Çå"."$"."üâêä(}~|é#%&/)=?ëç!à°<Ñ¿£óÄÉƒ\u0083ñáÆÜøè×ìÅæôjöòÑúîíïÖñÿÃ";
    //"ãª¿®¦ÁÂÀ©¦Çå"."$"."üâêä(}~|é#%&/)=?ëç!à°<Ñ¿£óÄÉƒñáÆÜøè×ìÅæôjöòÑúîíïÖñÿÃ";
    private $v1 = array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "Ñ", "M", "q", "w", "e", "r", "t", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "ñ", "m", " ");
    private $v2 = array("ã", "ª", "¿", "®", "¦", "Á", "Â", "À", "©", "¦", "Ç", "å", "$", "ü", "â", "ê", "ä", "(", "}", "~", "|", "é", "#", "%", "&", "/", ")", "=", "?", "ë", "ç", "!", "à", "°", "<", "Ñ", "¿", "£", "ó", "Ä", "É", "ƒ", "\u0083", "ñ", "á", "Æ", "Ü", "ø", "è", "×", "ì", "Å", "æ", "ô", "j", "ö", "ò", "Ñ", "ú", "î", "í", "ï", "Ö", "ñ", "ÿ", "Ã");


public function encriptar1($pass) {
    $aCaracteres = str_split($pass);
  //  echo "[" . implode(", ", $aCaracteres) . "]\n";
   
    $encript = "";
    for ($i = 0; $i < count($aCaracteres); ++$i) {
        if (strpos($this->pass1, $aCaracteres[$i])==null && strpos($this->pass1, $aCaracteres[$i])!=0) {
           // echo $aCaracteres[$i]. "\n";
           // echo strpos($this->pass1, $aCaracteres[$i]). "\n";
            $encript .= $aCaracteres[$i];
           // echo $encript. "\n";
        } else {
            for ($j = 0; $j < count($this->v1); ++$j) {
                if ($this->v1[$j] === $aCaracteres[$i]) {
                    $encript .= $this->v2[$j];
                    break;
                }
            }
        }
    }
   // echo $encript;
    return $encript;
}
public function encriptar1_old($pass) {
    $aCaracteres = str_split($pass);
    $encript = "";
  // return ($this->v2[0]);
    for($i = 0; $i < sizeof($aCaracteres); ++$i) {
        if (strpos($this->pass1,(($aCaracteres[$i]) . ""))==null) {
            $encript = $encript . ($aCaracteres[$i]);
        } else {
            for($j = 0; $j < sizeof($this->v1); ++$j) {
                if (($this->v1[$j])==(($aCaracteres[$i]) . "")) {
                    $encript = $encript . ($this->v2[$j]);
                    break;
                }
            }
        }
    }

    return $encript;
}

public function desencriptar2($pass) {

    $aCaracteres = str_split(utf8_decode($pass));
    $encript = "";
    //return utf8_encode($aCaracteres[2]);
    //return ($this->v2[0]);

    for($i = 0; $i < sizeof($aCaracteres); ++$i) {
        if (strpos($this->pass2,(utf8_encode($aCaracteres[$i]) . ""))==null) {
            $encript = $encript . utf8_encode($aCaracteres[$i]);
        } else {
            for($j = 0; $j < sizeof($this->v2); ++$j) {
                if ($this->v2[$j]==(utf8_encode($aCaracteres[$i]). "")) {
                    $encript = $encript . utf8_encode($this->v1[$j]);
                    break;
                }
            }
        }
    }

    return $encript;
}
  }  
  

//print_r( str_split(utf8_decode('ª¿®¦ÁÂÀ©')));

$valor = isset($_POST['valor'])? $_POST['valor']:null;
$opcion = isset($_POST['opcion'])? $_POST['opcion']:null;
if($valor!=null && $opcion !=null){
    $ec = new Encriptar();
    if($opcion=='encripta')
    {
        echo($ec->encriptar1($valor));
    }
    if($opcion=='desencripta')
    {
        echo($ec->desencriptar2($valor));
    }

}
?>