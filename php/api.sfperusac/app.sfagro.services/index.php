<?php

	$controlador="";
	$method = $_SERVER['REQUEST_METHOD']; 
	$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1)); 
//	var_dump($request);
	switch ($method) { 
		case 'PUT': 
		//	rest_put($request); 
			break;
		case 'POST': 
			//rest_post($request); 
			
			$post_web = (isset($_POST['controller']) && !empty($_POST['controller'])) &&
			(isset($_POST['accion']) && !empty($_POST['accion']));
			if($post_web){
				$controlador =$_POST['controller'];
				$accion =$_POST['accion'];
			}else{
				$post = json_decode(file_get_contents("php://input"), true);
				$my_value = $post['controller'];

				//echo "respuestaaaa:".file_get_contents("php://input") ;
				$respuesta = array('error 404' => file_get_contents("php://input"));
        		echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);
			//	$respuesta = array('error 404' => 'Dirección no ubicada');
			//	echo json_encode($respuesta);
				return;
			}
			
			break;
		case 'GET': 
			//rest_get($request); 
			break; 
		case 'HEAD': 
			//rest_head($request); 
			break; 
		case 'DELETE': 
		//	rest_delete($request); 
			break;
		case 'OPTIONS': 
		//	rest_options($request); 
			break;
		default: 
		//rest_error($request); 
		break; 
	}

	if($controlador==""){
	/*	require_once "controllers/inicio.controller.php";
		$controlador = new ActividadController();
		call_user_func(array($controlador,"Inicio"));*/
		$respuesta = array('error 404' => 'Dirección no ubicada');
        return json_encode($respuesta,JSON_UNESCAPED_UNICODE);

	}else{
		try{
			$file="app/controllers/$controlador"."Controller.php";
			if(file_exists($file)){
			   	require_once($file);
			   	$controlador = ucwords($controlador."Controller");
			    $controlador = new $controlador;
				call_user_func(array($controlador,$accion));
			}else{
				$respuesta = array('error 404' => 'Dirección no ubicada');
			 	echo json_encode($respuesta,JSON_UNESCAPED_UNICODE);
			}

		}catch(Exception $ex)
		{
			$respuesta = array('error ' => $ex);
            return json_encode($respuesta,JSON_UNESCAPED_UNICODE);
			
		}
		
	}




?>

