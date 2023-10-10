<?php
/*
CLASE PARA LA CONEXION Y LA GESTION DE LA BASE DE DATOS Y LA PAGINA WEB - MYSQL
*/

class Database {

    private $conexion;
    private $parametros = array();
    private $parametrosIn = array();

    # METODO PARA CONECTAR CON LA BASE DE DATOS

    public function Conectar() {
        if (!isset($this->conexion)) {
          $serverName = "localhost"; //serverName\instanceName
          $connectionInfo = array( "Database"=>"sfagro", "UID"=>"sa", "PWD"=>"amadeus2010","CharacterSet" => "UTF-8");//, "CharacterSet" => "UTF-8");
          $this->conexion = sqlsrv_connect( $serverName, $connectionInfo);
          SQLSRV_PHPTYPE_STRING('UTF-8');
          if (!$this->conexion)
          echo 'Error al conectar la base de datos.';
        }
    }

    # METODO PARA REALIZAR UNA CONSULTA
    	public function Consulta($sql) {
            $params = array();
            $options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
            $resultado = sqlsrv_query($this->conexion, $sql, $params, $options);
    	    if(!$resultado) {
                foreach( sqlsrv_errors() as $error ) {
                    echo "Código: " . $error['code'] . "&#09; <=> ";
                    echo "<span style='color: red;'>" . utf8_encode($error['message']) . "</span><br>";
                }
    		    #echo 'SQL-SERVER ERROR: ';
    		    exit;
    	    }
      		return $resultado;
    	}

        public function Procedimiento($name) {
            $sql = "execute ".$name;
            $es_pri = true;
            if (count($this->parametros) == 0) {
                $this->parametros = array();
                $this->parametrosIn = array(array());
            }
            foreach($this->parametros as &$data) {
                if ($es_pri)
                    $es_pri = false;
                else
                    $sql .= ',';
                $sql .= " " . $data . " = ?";
            }
            if ($es_pri)
                $stmt = sqlsrv_prepare($this->conexion, $sql);
            else
                $stmt = sqlsrv_prepare($this->conexion, $sql, $this->parametrosIn);
            sqlsrv_execute($stmt);
            echo $this->numeroFilas($stmt);
            $data1 = [];
            while ( $arrayDatos = $this->fetch_assoc($stmt) )
                $data1[] = $arrayDatos;
            $this->parametros = array();
            $this->parametrosIn = array();
            //unset($this->parametros);
            return $data1;
        }

        public function Procedimiento_return($name) {
            $sql = "execute ".$name;
            $es_pri = true;
            if (count($this->parametros) == 0) {
                $this->parametros = array();
                $this->parametrosIn = array(array());
            }
            foreach($this->parametros as &$data) {
                if ($es_pri)
                    $es_pri = false;
                else
                    $sql .= ',';
                $sql .= " " . $data . " = ?";
            }
            if ($es_pri)
                $stmt = sqlsrv_prepare($this->conexion, $sql);
            else
                $stmt = sqlsrv_prepare($this->conexion, $sql, $this->parametrosIn);
            sqlsrv_execute($stmt);
            echo $this->numeroFilas($stmt);
            $data1 = [];
            while ( $arrayDatos = $this->fetch_assoc($stmt) )
                $data1[] = $arrayDatos;
            $this->parametros = array();
            $this->parametrosIn = array();
            //unset($this->parametros);
            return $data1;
        }


        public function Parametro($p1, $p2){
            array_push($this->parametros, $p1);
            array_push($this->parametrosIn, array(&$p2, SQLSRV_PARAM_IN));
        }

    	# METODO PARA CONTAR EL NUMERO DE RESULTADOS
    	function numeroFilas($result) {
    		#if(!is_resource($result)) return false;
    		#return mysql_num_rows($result);
            return sqlsrv_num_rows($result);
    	}

        # METODO PARA CREAR ARRAY ASOCIATIVO DESDE UNA CONSULTA
        function fetch_assoc($result) {
            if(!is_resource($result)) return false;
            #return mysql_fetch_assoc($result);
            return sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC);
        }

        # METODO PARA CREAR ARRAY NUMÉRICO DESDE UNA CONSULTA
        function fetch_array($result) {
            if(!is_resource($result)) return false;
            #return mysql_fetch_assoc($result);
            return sqlsrv_fetch_array($result, SQLSRV_FETCH_NUMERIC);
        }

    	# METODO PARA CREAR ARRAY DE OBJETOS DESDE UNA CONSULTA
    	function fetch_object($result) {
    		if(!is_resource($result)) return false;
    		#return mysql_fetch_assoc($result);
            return sqlsrv_fetch_object($result);
    	}

        # METODO PARA CERRAR LA CONEXION A LA BASE DE DATOS
    	public function Desconectar() {
            sqlsrv_close($this->conexion);
            #mysql_close();
    	}
}
