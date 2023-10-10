<?php
declare(strict_types=1);

use Greenter\Sunat\ConsultaCpe\Api\AuthApi;
use Greenter\Sunat\ConsultaCpe\Api\ConsultaApi;
use Greenter\Sunat\ConsultaCpe\Configuration;
use Greenter\Sunat\ConsultaCpe\Model\CpeFilter;
use GuzzleHttp\Client;
require 'api/vendor/autoload.php';
require_once "app/config/Origin.php";
class SUNATController 
{
    public function getToken()
    {
        try{
            $scope = $_POST['scope'];
            $grant_type = $_POST['grant_type'];
            $cliente_id = $_POST['client_id'];
            $client_secret = $_POST['client_secret'];
            $client = new Client();
            $apiInstance = new AuthApi($client);
            $result = $apiInstance->getToken(
            $grant_type,
            $scope,
            $cliente_id,
            $client_secret);
            $token = $result->getAccessToken();
            $respuesta = array('respuesta' => $token);
            echo json_encode($respuesta);
        }catch(Exception $ex){
            $err = array('errores' => $ex);
            echo json_encode($err);
        }
    }

    public function validar_cpe_all()
    {
       
        try {
            $token = $_POST['token'];
            $rucproveedor = $_POST['rucproveedor'];
            $codComp = $_POST['codComp'];
            $numSerie = $_POST['numSerie']; 
            $numero =  $_POST['numero']; 
            $fecEmi =  $_POST['fecEmi']; 
            $monto =  $_POST['monto']; 

            $client = new Client();
           
            $config = Configuration::getDefaultConfiguration()
                        ->setAccessToken($token);
    
            $cpeInstance = new ConsultaApi(
                $client,
                $config->setHost($config->getHostFromSettings(1))
            );
            $filter = new CpeFilter();
            $filter
                ->setNumRuc($rucproveedor)
                ->setCodComp($codComp)
                ->setNumeroSerie($numSerie)
                ->setNumero($numero)
                ->setFechaEmision($fecEmi)
                ->setMonto($monto);
    
            $result = $cpeInstance->consultarCpe($rucproveedor, $filter);
    
            if (!$result->getSuccess()) {
                echo $result->getMessage();
                return;
            }
    
            $data = $result->getData();
            $estado_cpe="";
            $estadoRUC="";
            $condicionRUC="";
            switch ($data->getEstadoCp()) {
                case '0': $estado_cpe= 'NO EXISTE'; break;
                case '1': $estado_cpe= 'ACEPTADO'; break;
                case '2': $estado_cpe= 'ANULADO'; break;
                case '3': $estado_cpe= 'AUTORIZADO'; break;
                case '4': $estado_cpe= 'NO AUTORIZADO'; break;
            }
            switch ($data->getEstadoRuc()) {
                case '00': $estadoRUC= 'ACTIVO'; break;
                case '01': $estadoRUC= 'BAJA PROVISIONAL'; break;
                case '02': $estadoRUC= 'BAJA PROV. POR OFICIO'; break;
                case '03': $estadoRUC= 'SUSPENSION TEMPORAL'; break;
                case '10': $estadoRUC= 'BAJA DEFINITIVA'; break;
                case '11': $estadoRUC= 'BAJA DE OFICIO'; break;
                case '12': $estadoRUC= 'INHABILITADO-VENT.UNICA'; break;

            }
            switch ($data->getCondDomiRuc()) {
                case '00': $condicionRUC= 'HABIDO'; break;
                case '09': $condicionRUC= 'PENDIENTE'; break;
                case '11': $condicionRUC= 'POR VERIFICAR'; break;
                case '12': $condicionRUC= 'NO HABIDO'; break;
                case '20': $condicionRUC= 'NO HALLADO'; break;
            }
    
          //  echo 'estadoRUC: '.$data->getEstadoRuc().PHP_EOL;
          //  echo 'condicionRUC: '.$data->getCondDomiRuc().PHP_EOL;
          //  echo 'observaciones: '.(is_array($data->getObservaciones()) ? join(',', $data->getObservaciones()) : 'NINGUNO').PHP_EOL;
            $respuesta = array('estado_cpe' => $estado_cpe,
                                'estadoRUC' => $estadoRUC,
                                'condicionRUC' => $condicionRUC,
                                'observaciones' => (is_array($data->getObservaciones()) ? join(',', $data->getObservaciones()) : 'NINGUNO'));

            
            echo json_encode($respuesta);                  

        } catch (Exception $ex) {
            $err = array('errores' => $ex);
            echo json_encode($err);
        }
    }



    public function validar_cpe()
    {
       
        try {
            $scope = $_POST['scope'];
            $grant_type = $_POST['grant_type'];
            $cliente_id = $_POST['client_id'];
            $client_secret = $_POST['client_secret'];
            $rucConsultor = $_POST['rucConsultor'];
            $rucproveedor = $_POST['rucproveedor'];
            $codComp = $_POST['codComp'];
            $numSerie = $_POST['numSerie']; 
            $numero =  $_POST['numero']; 
            $fecEmi =  $_POST['fecEmi']; 
            $monto =  $_POST['monto']; 

            $client = new Client();
            $apiInstance = new AuthApi($client);
    
            $result = $apiInstance->getToken(
            $grant_type,
            $scope,
            $cliente_id,
            $client_secret);
            $token = $result->getAccessToken();
           // echo $token;
            $config = Configuration::getDefaultConfiguration()
                        ->setAccessToken($token);
    
            $cpeInstance = new ConsultaApi(
                $client,
                $config->setHost($config->getHostFromSettings(1))
            );
           // "20540010294", "01", "E001", "437", "08/03/2021", "12629.54"
           // $ruc = '20540010294';
            $filter = new CpeFilter();
            $filter
                ->setNumRuc($rucproveedor)
                ->setCodComp($codComp)
                ->setNumeroSerie($numSerie)
                ->setNumero($numero)
                ->setFechaEmision($fecEmi)
                ->setMonto($monto);
    
            $result = $cpeInstance->consultarCpe($rucproveedor, $filter);
    
           // $this->assertTrue($result->getSuccess());
    
            if (!$result->getSuccess()) {
                echo $result->getMessage();
                return;
            }
    
            $data = $result->getData();
            $estado_cpe="";
            $estadoRUC="";
            $condicionRUC="";
            switch ($data->getEstadoCp()) {
                case '0': $estado_cpe= 'NO EXISTE'; break;
                case '1': $estado_cpe= 'ACEPTADO'; break;
                case '2': $estado_cpe= 'ANULADO'; break;
                case '3': $estado_cpe= 'AUTORIZADO'; break;
                case '4': $estado_cpe= 'NO AUTORIZADO'; break;
            }
            switch ($data->getEstadoRuc()) {
                case '00': $estadoRUC= 'ACTIVO'; break;
                case '01': $estadoRUC= 'BAJA PROVISIONAL'; break;
                case '02': $estadoRUC= 'BAJA PROV. POR OFICIO'; break;
                case '03': $estadoRUC= 'SUSPENSION TEMPORAL'; break;
                case '10': $estadoRUC= 'BAJA DEFINITIVA'; break;
                case '11': $estadoRUC= 'BAJA DE OFICIO'; break;
                case '12': $estadoRUC= 'INHABILITADO-VENT.UNICA'; break;

            }
            switch ($data->getCondDomiRuc()) {
                case '00': $condicionRUC= 'HABIDO'; break;
                case '09': $condicionRUC= 'PENDIENTE'; break;
                case '11': $condicionRUC= 'POR VERIFICAR'; break;
                case '12': $condicionRUC= 'NO HABIDO'; break;
                case '20': $condicionRUC= 'NO HALLADO'; break;
            }
    
          //  echo 'estadoRUC: '.$data->getEstadoRuc().PHP_EOL;
          //  echo 'condicionRUC: '.$data->getCondDomiRuc().PHP_EOL;
          //  echo 'observaciones: '.(is_array($data->getObservaciones()) ? join(',', $data->getObservaciones()) : 'NINGUNO').PHP_EOL;
            $respuesta = array('estado_cpe' => $estado_cpe,
                                'estadoRUC' => $estadoRUC,
                                'condicionRUC' => $condicionRUC,
                                'observaciones' => (is_array($data->getObservaciones()) ? join(',', $data->getObservaciones()) : 'NINGUNO'));

            
            echo json_encode($respuesta);                  

        } catch (Exception $ex) {
            $err = array('errores' => $ex);
            echo json_encode($err);
        }
    }

    
}
