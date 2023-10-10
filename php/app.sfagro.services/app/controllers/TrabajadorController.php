<?php
/**
* SF AGRO
*/
use GuzzleHttp\Client;
require 'api/vendor/autoload.php';
class TrabajadorController
{
	
    public function consultar_RENIEC_CAIDO()
	{
        try{
        $url='https://servicio.apirest.pe/api/getDniPremium';
        $token_reniec = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ5OGY4YzdmNjcwNmFjZTZlMDA2Y2U2Y2JlZWY0NWVlNmI1ZjhlZTM0YjRiODNlM2EyM2VmZWRkN2M3OTkzNjZhYzdjMDRhYTlhODI3MDg1In0.eyJhdWQiOiIxIiwianRpIjoiZDk4ZjhjN2Y2NzA2YWNlNmUwMDZjZTZjYmVlZjQ1ZWU2YjVmOGVlMzRiNGI4M2UzYTIzZWZlZGQ3Yzc5OTM2NmFjN2MwNGFhOWE4MjcwODUiLCJpYXQiOjE2MTUzNTIzMTQsIm5iZiI6MTYxNTM1MjMxNCwiZXhwIjoxOTMwODg1MTE0LCJzdWIiOiIxODkzIiwic2NvcGVzIjpbIioiXX0.gjnjzroD1BJDJlIu4qghkE74y-ym6RjpRivxx4lmoQLtfs6WbyteEiXAHz4mzl3QBNMWyBS23s-7RyvudYmXrjrjJ1eAKLQVSQIoAM5RDZQH4RIa7zPgfVhKQ0pWxUVFZ4d-9BCF7bYcZWED8NWRykVapjbKv__tm7SjOohczRtxGCndCnuudEADG2byqUAfd-E0BsdzS99PqICaFP5pIOXxB0UwVUyHs2OvfQZ8lnxRpVWV0Ob270Xp5O7D2sjxBFo-RSeLj5b7gBua-lpuRU2QvrjrxzdLblEX7hJ5PYwfnvRUOytOKOj7V5K_2UT-bq2tmLi4aeJgFQpIYCkUIWnoyOQBR5Dyxfsqfm2gP7bbFQ0K8KcumFdUQ7CY3k1Fd7Re-eVDzMVZrHAIGCHQ7HCw6hesu1AvqdnbVguVuR4JVZnSkmkGNDk6wU-p2j2cupsUMmD6CfpOaKxELo25jz1jrk5jW2-C7zxcKtsqSaAkb5nlPP54vuDhYBETCaXCNbOrT9S9aHfG5effswpFAY-mhNAq3NcE1u9Kp18dXBQdNgzAEtV1PQAM32Qo7DabU0Ze9nmGFv7xgo-b9rELzWALwzM9dD5-MTEWTEhBV4CC7_GzkxXEekkcVOc_zkdL0OcBIXGAEDQQ1c24DcvJlGkoAkzA5jftaJSI0aK7dak';
        $dni = $_POST['dni'];

        $client = new Client([
            'base_uri' => $url,
        ]);

        $response = $client->request('POST', '', [
            'headers'=> ['Content-Type' => 'application/json',
                         'Authorization' => 'Bearer '.$token_reniec],
            'json' => [
                'dni' => $dni
            ]
        ]);

        if (200 == $response->getStatusCode()) {
            $response = $response->getBody();
             // echo $response;  
           
           $array = json_decode($response);
           
           if(isset($array->success)){

               if($array->success){

                $datos = array($array->result);
                        $return_arr = array();
                        $row_array['DNI'] = $datos[0]->DNI;
                        $row_array['Paterno'] = $datos[0]->Paterno;
                        $row_array['Materno'] = $datos[0]->Materno;
                        $row_array['Nombre'] = $datos[0]->Nombre;
                        
                        if ($datos[0]->FechaNacimiento == 'null') {
                            $row_array['FechaNacimiento'] = '';
                        }else{
                            
                            $row_array['FechaNacimiento'] = $datos[0]->FechaNacimiento;
                        }

                        if ($datos[0]->Sexo == 'null') {
                            $row_array['Sexo'] = '';
                        } else {
                            $row_array['Sexo'] = $datos[0]->Sexo;
                        }

                        if ($datos[0]->Direccion == '') {
                            $row_array['Direccion'] = '';
                        } else {
                            $row_array['Direccion'] = $datos[0]->Direccion;
                        }

                        if ($datos[0]->Departamento == '') {
                            $row_array['Departamento'] = '';
                        } else {
                            $row_array['Departamento'] = $datos[0]->Departamento;
                        }

                        if ($datos[0]->Provincia == '') {
                            $row_array['Provincia'] = '';
                        } else {
                            $row_array['Provincia'] = utf8_encode($datos[0]->Provincia);
                        }

                        if ($datos[0]->Distrito == '') {
                            $row_array['Distrito'] = '';
                        } else {
                            $row_array['Distrito'] = $datos[0]->Distrito;
                        }


                        $row_array['EsPersonaViva'] = $datos[0]->EsPersonaViva;
                        $row_array['Ubigeo'] = $datos[0]->Ubigeo;

                        if ($datos[0]->EstadoCivil == '') {
                            $row_array['Estado'] = '';
                        } else {
                            $row_array['Estado'] = $datos[0]->EstadoCivil;
                        }

                        
                        $row_array['Foto'] = '';
                        array_push($return_arr, $row_array);
                        echo json_encode($return_arr);
              
 }else{
                    echo $this->consultar_RENIEC_AP($dni);
                } 
           } 
        
        }
        else {
            $respuesta = array('respuesta' => 'Error consultando a servidor del cliente');
            echo json_encode($respuesta);
            //echo $this->consultar_RENIEC_AP($dni);
        } 

	    }catch (Exception $ex){
            $err = array('errores' => $ex);
	      //  echo json_encode($err);
	    }
	}

       public function consultar_RENIEC2()
    {
		$dni = $_POST['dni'];

        try {
            $url = 'https://consulta.apiperu.pe/api/dni_ficha/';
            $token_reniec = '5ca3a2eae6080d6ff3638276ea5568888e8933d1';
            

            $client = new Client([
                'base_uri' => $url . $dni,
                'verify' => false
            ]);

            $response = $client->request('GET', '', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer ' . $token_reniec
                ],
                'json' => [
                    'dni' => $dni
                ]
            ]);

            if (200 == $response->getStatusCode()) {
                $response = $response->getBody();
                // echo $response;  

                $array = json_decode($response);


                if (isset($array->success)) {
                    if ($array->success==true) {
                        $datos = array($array->data);
                        $return_arr = array();
                        $row_array['DNI'] = $datos[0]->numero;
                        $row_array['Paterno'] = $datos[0]->apellido_paterno;
                        $row_array['Materno'] = $datos[0]->apellido_materno;
                        $row_array['Nombre'] = $datos[0]->nombres;
                        
                        
                        if ($datos[0]->fecha_nacimiento == null) {
                            //$row_array['FechaNacimiento'] = '';
							echo $this->consultar_RENIEC_NEOTEC($dni);
							return;
                        }else{
                            $date = date_create($datos[0]->fecha_nacimiento);
                            $row_array['FechaNacimiento'] = date_format($date, "d/m/Y");
                        }

                        if ($datos[0]->sexo == null) {
                            $row_array['Sexo'] = '';
                        } else {
                            $row_array['Sexo'] = $datos[0]->sexo;
                        }

                        if ($datos[0]->direccion == '') {
                            $row_array['Direccion'] = '';
                        } else {
                            $row_array['Direccion'] = $datos[0]->direccion;
                        }

                        if ($datos[0]->ubigeo_direccion_departamento == '') {
                            $row_array['Departamento'] = '';
                        } else {
                            $row_array['Departamento'] = $datos[0]->ubigeo_direccion_departamento;
                        }

                        if ($datos[0]->ubigeo_direccion_provincia == '') {
                            $row_array['Provincia'] = '';
                        } else {
                            $row_array['Provincia'] = utf8_encode($datos[0]->ubigeo_direccion_provincia);
                        }

                        if ($datos[0]->ubigeo_direccion_distrito == '') {
                            $row_array['Distrito'] = '';
                        } else {
                            $row_array['Distrito'] = $datos[0]->ubigeo_direccion_distrito;
                        }


                        $row_array['EsPersonaViva'] = 'SI';
                        $row_array['Ubigeo'] = $datos[0]->ubigeo_reniec;

                        if ($datos[0]->estado_civil == '') {
                            $row_array['Estado'] = '';
                        } else {
                            $row_array['Estado'] = $datos[0]->estado_civil;
                        }

                        $img = array($array->images);
                        $row_array['Foto'] = $img[0]->foto;
                        array_push($return_arr, $row_array);
                        echo json_encode($return_arr);
                    }else{
							echo $this->consultar_RENIEC_NEOTEC($dni);
							return;
						}
                }else{
				echo $this->consultar_RENIEC_NEOTEC($dni);
							return;
				}
            } else {
				
                 echo $this->consultar_RENIEC_NEOTEC($dni);
				 return;
            }
        } catch (Exception $ex) {
            $err = array('errores' => $ex);
            echo json_encode($err);
        }
		
    }
	
	public function consultar_RENIEC()
    {
		try {
            $url = 'https://api.dniruc.com/api/search/dni/';
            $token_reniec = 'Live_6435ccf8378822b80945c6bf4f619a1812b97ef3';
            $dni = $_POST['dni'];

            $client = new Client([
                'base_uri' => $url . $dni.'/'.$token_reniec,
                'verify' => false
            ]);

            $response = $client->request('GET', '', [
                 'headers' => [
                    'Content-Type' => 'application/json',
                    
                ],
                'json' => [
                    'dni' => $dni
                ]
            ]);

            if (201 == $response->getStatusCode()) {
                $response = $response->getBody();
                // echo $response;  

                $array = json_decode($response);

                if (isset($array->success)) {
                    if ($array->success) {
                        $datos = array($array->data);
                        $return_arr = array();
                        $row_array['DNI'] = $datos[0]->dni;
						if($datos[0]->ap_paterno==null || $datos[0]->ap_paterno==''){
							echo $this->consultar_RENIEC_tmp($dni);
							return;
							}else{
								$row_array['Paterno'] = utf8_encode($datos[0]->ap_paterno);
								}
                        
                        $row_array['Materno'] = utf8_encode($datos[0]->ap_materno);
                        $row_array['Nombre'] = $datos[0]->nombres;
                        
                        
                        if ($datos[0]->fecha_nacimiento == 'null') {
                            $row_array['FechaNacimiento'] = '';
                        }else{
                            
                            $row_array['FechaNacimiento'] = $datos[0]->fecha_nacimiento;;
                        }

                        if ($datos[0]->sexo == 'null') {
                            $row_array['Sexo'] = '';
                        } else {
                            $row_array['Sexo'] = strtoupper($datos[0]->sexo);
                        }

                        if ($datos[0]->direccion == '') {
                            $row_array['Direccion'] = '';
                        } else {
                            $row_array['Direccion'] = $datos[0]->direccion;
                        }
                        $ubigeo = explode('-',$datos[0]->ubigeotext);


                        if ($ubigeo[0] == '') {
                            $row_array['Departamento'] = '';
                        } else {
                            $row_array['Departamento'] = strtoupper($ubigeo[0]);
                        }

                        if ($ubigeo[1] == '') {
                            $row_array['Provincia'] = '';
                        } else {
                            $row_array['Provincia'] = strtoupper(utf8_encode($ubigeo[1]));
                        }

                        if ($ubigeo[2] == '') {
                            $row_array['Distrito'] = '';
                        } else {
                            $row_array['Distrito'] = strtoupper($ubigeo[2]);
                        }


                        $row_array['EsPersonaViva'] = 'SI';
                        if (isset($datos[0]->ubigeo_reniec) == null) {
                            $row_array['Ubigeo'] = '';
                        } else {
                            $row_array['Ubigeo'] = $datos[0]->ubigeo_reniec;
                        }

                       if (isset($datos[0]->estadoCivil)) {
						 if($datos[0]->estadoCivil == ''){
                            $row_array['Estado'] = '';
							} else {
                            $row_array['Estado'] = $datos[0]->estadoCivil;
							}
						}else{
							$row_array['Estado'] = '';
							}
							
                        $row_array['Foto'] = 'http://app.sfperusac.com/src/img/no-foto.jpg';
                        
						array_push($return_arr, $row_array);
						echo json_encode($return_arr);
                        //return json_encode($return_arr);
                    }else{
						echo $this->consultar_RENIEC_tmp($dni);
							return;
						}
                }
            } else {
               // $respuesta = array('respuesta' => 'Error consultando a servidor del cliente');
               // echo json_encode($respuesta);
				echo $this->consultar_RENIEC_tmp($dni);
							return;
            }
        } catch (Exception $ex) {
            //$err = array('errores' => $ex);
           // echo json_encode($err);
		   echo $this->consultar_RENIEC_tmp($dni);
							return;
        }
    }
	
	public function consultar_RENIEC_tmp($dni)
    {
		//$dni = $_POST['dni'];
		//echo $dni;
        try {
            $url = 'https://apiperu.dev/api/dni/'.$dni;
            $token_reniec = '93ddf79faa824f088c81b9360174a9e6b6c9cc6e894b5f836da18e07d996f4f9';
            

            $client = new Client([
                'base_uri' => $url,
                'verify' => false
            ]);

            $response = $client->request('GET', '', [
                'headers' => [
                    
                    'Authorization' => 'Bearer ' . $token_reniec
                ]
                
            ]);

            if (200 == $response->getStatusCode()) {
                $response = $response->getBody();
                // echo $response;  

                $array = json_decode($response);


                if (isset($array->success)) {
                    if ($array->success==true) {
                        $datos = array($array->data);
                        $return_arr = array();
                        $row_array['DNI'] = $dni;
                        $row_array['Paterno'] = $datos[0]->apellido_paterno;
                        $row_array['Materno'] = $datos[0]->apellido_materno;
                        $row_array['Nombre'] = $datos[0]->nombres;
                        
                        
                        if (isset($datos[0]->fecha_nacimiento) == null) {
                            $row_array['FechaNacimiento'] = '00/00/0000';

                        }else{
                            $date = date_create($datos[0]->fecha_nacimiento);
                            $row_array['FechaNacimiento'] = date_format($date, "d/m/Y");
                        }

                        if (isset($datos[0]->sexo) == null) {
                            $row_array['Sexo'] = '';
                        } else {
							if($datos[0]->sexo=='M'){
								$row_array['Sexo']='MASCULINO';
								}ELSE{
									$row_array['Sexo']='FEMENINO';
									}
                          
                        }

                        if (isset($datos[0]->direccion) == null) {
                            $row_array['Direccion'] = '';
                        } else {
                            $row_array['Direccion'] = $datos[0]->direccion;
                        }

                        if (isset($datos[0]->departamento) == null) {
                            $row_array['Departamento'] = '';
                        } else {
                            $row_array['Departamento'] = $datos[0]->departamento;
                        }

                        if (isset($datos[0]->provincia) == null) {
                            $row_array['Provincia'] = '';
                        } else {
                            $row_array['Provincia'] = utf8_encode($datos[0]->provincia);
                        }

                        if (isset($datos[0]->distrito) == null) {
                            $row_array['Distrito'] = '';
                        } else {
                            $row_array['Distrito'] = $datos[0]->distrito;
                        }


                        $row_array['EsPersonaViva'] = 'SI';
                       
						if (isset($datos[0]->ubigeo_reniec) == null) {
                            $row_array['Ubigeo'] = '';
                        } else {
                            $row_array['Ubigeo'] = $datos[0]->ubigeo_reniec;
                        }

                        if (isset($datos[0]->estado_civil) == null) {
                            $row_array['Estado'] = '';
                        } else {
                            $row_array['Estado'] = $datos[0]->estado_civil;
                        }

                        $row_array['Foto'] = 'http://app.sfperusac.com/src/img/no-foto.jpg';
                        array_push($return_arr, $row_array);
                        echo json_encode($return_arr);
                    }else{
							$respuesta = array('respuesta' => 'Error consultando a servidor del cliente');
                            echo json_encode($respuesta);
						}
                }else{
				
							$respuesta = array('respuesta' => 'Error consultando a servidor del cliente');
                            echo json_encode($respuesta);
				}
            } else {
							$respuesta = array('respuesta' => 'Error consultando a servidor del cliente');
                            echo json_encode($respuesta);
            }
        } catch (Exception $ex) {
            $err = array('errores' => $ex);
            echo json_encode($err);
        }
		
    }
	
/*	public function insertar(Trabajador $sucursal)
	{
		$ec = new TrabajadorModel();
		return $ec->insertar($sucursal);
	}

	public function modificar(Trabajador $sucursal,$codigo)
	{
		$ec = new TrabajadorModel();
		return $ec->modificar($sucursal,$codigo);
	}

	public function eliminar($codigo)
	{
		$ec = new TrabajadorModel();
		return $ec->eliminar($codigo);
	}
    public function mostrar($codigo)
    {
        $ec = new TrabajadorModel();
        return $ec->mostrar($codigo);
    }*/
}

/*
$accion = isset($_POST['accion'])? $_POST['accion']:null;
switch($accion){
    case 'listar':
        try{
					$empresa = $_POST['empresa'];
        	$ec = new TrabajadorController();
        	echo $ec->listar($empresa)->jsonSerialize();
	    }catch (Exception $ex){
	        echo $ex;
	    }
	    break;
      case 'insertar':
	   try {
            $sucu = new Trabajador();
            $sucu->setCodigo($_POST['SUC_Codigo']);
						$sucu->setEmpresa($_POST['EMP_Id']);
            $sucu->setNombre($_POST['SUC_Nombre']);
            $sucu->setTelefono($_POST['SUC_Telefono']);
            $sucu->setDireccion($_POST['SUC_Direccion']);
            $sucu->setDescripcion($_POST['SUC_Descripcion']);
        	$ec = new TrabajadorController();
            echo $ec->insertar($sucu);
        } catch (Exception $e) {
            echo $ex;
        }
        break;
    case 'eliminar':
        try {
            $codigo = $_POST['codigo'];
            $ec = new TrabajadorController();
            echo $ec->eliminar($codigo);
        } catch (Exception $e) {
            echo $ex;
        }
        break;
    case 'Mostrar':
        try{
            $codigo = $_POST['codigo'];
            $ec = new TrabajadorController();
            echo $ec->mostrar($codigo)->jsonSerialize();
        }catch (Exception $ex){
            echo $ex;
        }
        break;
    case 'modificar':
        try {
						$codigo = $_POST['codigo'];
            $sucu = new Trabajador();
						$sucu->setCodigo($_POST['SUC_Codigo']);
						$sucu->setEmpresa($_POST['EMP_Id']);
            $sucu->setNombre($_POST['SUC_Nombre']);
            $sucu->setTelefono($_POST['SUC_Telefono']);
            $sucu->setDireccion($_POST['SUC_Direccion']);
            $sucu->setDescripcion($_POST['SUC_Descripcion']);
            $ec = new TrabajadorController();
            echo $ec->modificar($sucu,$codigo);
        } catch (Exception $e) {
            echo $ex;
        }
        break;


}*/
