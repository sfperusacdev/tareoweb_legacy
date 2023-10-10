<?php
require_once "vendor/autoload.php";
use GuzzleHttp\Client;

require 'Encriptar.php';
class login
{

    public function __construct()
    {
        if (!isset($_SESSION)) {
            session_start();
        }
        //session_start();
        if (isset($_GET["logout"])) {
            $this->doLogout();
        }
        // login via post data (if user just submitted a login form)
        //  elseif (isset($_POST["login"])) {
        //      $this->dologinWithPostData();
        //  }
    }
    public function dologinWithPostData_old()
    {
        if (empty($_POST['username'])) {
            $mensaje = "Usuario no válido";
            return $mensaje;
        } elseif (empty($_POST['password'])) {
            $mensaje = "Password no válido";
            return $mensaje;
        } elseif (empty($_POST['webservice'])) {
            $mensaje = "Dominio no válido";
            echo $mensaje;
        } elseif (!empty($_POST['username']) && !empty($_POST['password']) && !empty($_POST['webservice'])) {
            //header("Content-Type: application/json; charset=UTF-8");
            $ec = new Encriptar();
            $password = $ec->encriptar1($_POST['password']);

            $response = array();
            $curl = curl_init();
            curl_setopt_array(
                $curl,
                array(
                    CURLOPT_URL => $_POST['webservice'],
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => "",
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 500,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => "POST",
                    CURLOPT_POSTFIELDS => array('accion' => 'login', 'controller' => 'usuario', 'usuario' => $_POST['username'], 'password' => $password),
                )
            );

            $response = curl_exec($curl);


            if (($errno = curl_errno($curl)) || $response == ' ') {

                if (in_array($errno, [CURLE_OPERATION_TIMEDOUT, CURLE_OPERATION_TIMEOUTED])) {
                    echo ("error en tiempo");
                    curl_close($curl);
                    return;
                }

                if ($response == '') {
                    $err = "Error: No hay respuesta de la URL remota";

                    curl_close($curl);
                    return json_encode($err);
                } else {
                    $error_message = curl_strerror($errno);
                    $ex = " ({$errno}):\n {$error_message}";
                    $err = "Error: " . $ex;

                    curl_close($curl);
                    return json_encode($err);
                }

            } else {

                // $tam = sizeof($array);
                /*  if($tam>0){
                          $_SESSION['user_id'] = $result_row->user_id;
                          $_SESSION['user_name'] = $result_row->user_name;
                          $_SESSION['user_email'] = $result_row->user_email;
                          $_SESSION['user_login_status'] = 1;
                  }*/
                //echo $array[0]["nombres"];

                $data = json_decode(str_replace('ï»¿', '', utf8_encode($response)));
                $tam = sizeof($data);
                if ($tam > 0) {
                    $data2 = $data[0];
                    $_SESSION['user_id'] = $data2->idusuario;
                    $_SESSION['user_name'] = $data2->nombres;
                    $_SESSION['user_email'] = $data2->email;
                    $_SESSION['webservice'] = $_POST['webservice'];

                    return 'ok';
                } else {
                    return 'Error autenticando usuario';
                }

            }
            curl_close($curl);

        }



    }


    public function dologinWithPostData()
    {
        if (empty($_POST['username'])) {
            $mensaje = "Usuario no válido";
            return $mensaje;
        } elseif (empty($_POST['password'])) {
            $mensaje = "Password no válido";
            return $mensaje;
        } elseif (empty($_POST['webservice'])) {
            $mensaje = "Dominio no válido";
            echo $mensaje;
        } elseif (!empty($_POST['username']) && !empty($_POST['password']) && !empty($_POST['webservice'])) {
            //header("Content-Type: application/json; charset=UTF-8");
            $ec = new Encriptar();
            $password = $ec->encriptar1($_POST['password']);
            $client = new Client([
                // Base URI is used with relative requests
                'base_uri' => $_POST['webservice'],
            ]);

            $response = $client->request('POST', '', [
                'form_params' => [
                    'accion' => 'login',
                    'controller' => 'usuario',
                    'usuario' => $_POST['username'],
                    'password' => $password
                ]
            ]);

            if (200 == $response->getStatusCode()) {
                $response = $response->getBody();
                // $arr_result = json_decode($response);
                $data = json_decode(str_replace('ï»¿', '', utf8_encode($response)));

                if (is_array($data)) {
                    $tam = sizeof($data);
                    if ($tam > 0) {
                        $data2 = $data[0];
                        $_SESSION['user_id'] = $data2->idusuario;
                        $_SESSION['user_name'] = $data2->nombres;
                        $_SESSION['user_email'] = $data2->email;
                        $_SESSION['webservice'] = $_POST['webservice'];
                        $_SESSION['ruta_inicial'] = 'http://192.168.100.6:8082/app.sfperusac/';
                        // define('__ROOT__', dirname(dirname(__FILE__)));
                        //$_SESSION['ruta_inicial']=__ROOT__;
                        return 'ok';
                    } else {
                        return 'Error autenticando usuario';
                    }
                } else {
                    return 'Error autenticando usuario';
                }

            } else {
                return 'Error consultando a servidor del cliente';
            }


        }

    }






    public function log()
    {
        if (isset($_SESSION['user_id'])) {
            $_SESSION['user_login_status'] = 1;
            return 'ok';
        }
        return 'Error autenticando usuario';

    }

    public function doLogout()
    {
        // delete the session of the user
        $_SESSION = array();
        session_destroy();
        // return a little feeedback message
        $this->messages[] = "Has sido desconectado.";

    }

    public function isUserLoggedIn()
    {
        if (isset($_SESSION['user_login_status']) and $_SESSION['user_login_status'] == 1) {
            return true;
        }
        // default return
        return false;
    }




}

$accion = isset($_POST['accion']) ? $_POST['accion'] : null;
if ($accion == "login") {
    try {
        $ec = new login();
        echo $ec->dologinWithPostData();
    } catch (Exception $ex) {
        echo $ex;
    }

}
if ($accion == "log") {
    try {
        $ec = new login();
        echo $ec->log();
    } catch (Exception $ex) {
        echo $ex;
    }

}
if ($accion == "sesion") {

    session_start();
    echo $_SESSION['webservice'];
}
?>