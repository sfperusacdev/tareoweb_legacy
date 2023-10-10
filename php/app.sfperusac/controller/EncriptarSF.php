<?php

Class EncriptarSF{
    private $pass3 = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890 ";
    private $pass4 = " 0987654321zyxwvutsrqpoñnmlkjihgfedcbaZYXWVUTSRQPOÑNMLKJIHGFEDCBA";
    private $v3 = array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", " ");
    private $v4 = array(" ", "0", "9", "8", "7", "6", "5", "4", "3", "2", "1", "z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o", "ñ", "n", "m", "l", "k", "j", "i", "h", "g", "f", "e", "d", "c", "b", "a", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "Ñ", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A");


public function encriptar1($pass) {
    $aCaracteres = str_split($pass);
    $encript = "";
  
    for($i = 0; $i < sizeof($aCaracteres); ++$i) {
        if (strpos($this->pass3,($aCaracteres[$i] . ""))==null) {
            $encript = $encript . $aCaracteres[$i];
        } else {
            for($j = 0; $j < sizeof($this->v3); ++$j) {
                if ($this->v3[$j]==($aCaracteres[$i] . "")) {
                    $encript = $encript . $this->v4[$j];
                    break;
                }
            }
        }
    }

    return $encript;
}

public function desencriptar2($pass) {
    $pass="ª¿®¦ÁÂÀ©";
    $aCaracteres = str_split(utf8_decode($pass));
    $encript = "";
    //return utf8_encode($aCaracteres[2]);
    return $this->pass4;

    for($i = 0; $i < sizeof($aCaracteres); ++$i) {
        if (strpos(utf8_encode($this->pass4),(utf8_encode($aCaracteres[$i]) . ""))==null) {
            $encript = $encript . utf8_encode($aCaracteres[$i]);
        } else {
            for($j = 0; $j < sizeof($this->v4); ++$j) {
                if (utf8_encode($this->v4[$j])==(utf8_encode($aCaracteres[$i]). "")) {
                    $encript = $encript . utf8_encode($this->v3[$j]);
                    break;
                }
            }
        }
    }

    return $encript;
}
  }  
  
$ec = new EncriptarSF();
print_r($ec->desencriptar2('ª¿®¦ÁÂÀ©'));
//print_r( str_split(utf8_decode('ª¿®¦ÁÂÀ©')));
?>