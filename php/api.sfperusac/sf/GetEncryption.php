<?php
include "origin.php";
$metodo=$_POST['metodo'];
$pass=$_POST['pass'];
$pass1 = "0123456789QWERTYUIOPASDFGHJKLZXCVBNÑMqwerttyuiopasdfghjklzxcvbnñm ";
$pass2 = "ãª¿®¦ÁÂÀ©¦Çå"."$"."üâêä(}~|é#%&/)=?ëç!à°<Ñ¿£óÄÉƒñáÆÜøè×ìÅæôjöòÑúîíïÖñÿÃ";
$v1 = array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "Ñ", "M", "q", "w", "e", "r", "t", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "ñ", "m", " ");
$v2 = array("ã", "ª", "¿", "®", "¦", "Á", "Â", "À", "©", "¦", "Ç", "å", "$", "ü", "â", "ê", "ä", "(", "}", "~", "|", "é", "#", "%", "&", "/", ")", "=", "?", "ë", "ç", "!", "à", "°", "<", "Ñ", "¿", "£", "ó", "Ä", "É", "ƒ", "\u0083", "ñ", "á", "Æ", "Ü", "ø", "è", "×", "ì", "Å", "æ", "ô", "j", "ö", "ò", "Ñ", "ú", "î", "í", "ï", "Ö", "ñ", "ÿ", "Ã");


if($metodo=="encripta"){
    $aCaracteres = str_split($pass);
    $encript = "";
  // return ($this->v2[0]);
    for($i = 0; $i < sizeof($aCaracteres); ++$i) {
        if (strpos($pass1,(utf8_encode($aCaracteres[$i]) . ""))==null) {
            $encript = $encript . utf8_encode($aCaracteres[$i]);
        } else {
            for($j = 0; $j < sizeof($v1); ++$j) {
                if (($v1[$j])==(utf8_encode($aCaracteres[$i]) . "")) {
                    $encript = $encript . ($v2[$j]);
                    break;
                }
            }
        }
       
    }

    echo $encript;
    

}

if($metodo=="desencripta"){
    $aCaracteres = str_split(utf8_decode($pass));
    $encript = "";
    //return utf8_encode($aCaracteres[2]);
    //return ($this->v2[0]);

    for($i = 0; $i < sizeof($aCaracteres); ++$i) {
        if (strpos($pass2,(utf8_encode($aCaracteres[$i]) . ""))==null) {
            $encript = $encript . utf8_encode($aCaracteres[$i]);
        } else {
            for($j = 0; $j < sizeof($v2); ++$j) {
                if ($v2[$j]==(utf8_encode($aCaracteres[$i]). "")) {
                    $encript = $encript . utf8_encode($v1[$j]);
                    break;
                }
            }
        }
    }

    return $encript;

}









?>