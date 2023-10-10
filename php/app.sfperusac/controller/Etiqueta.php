<?php
require '../TCPDF/tcpdf_import.php';
require_once("Login.php");
//class Etiqueta{
 //  public function genera_etiquetas()
  //  {

   // $accion = isset($_POST['accion'])? $_POST['accion']:null;

    $login = new Login();
    
    if ($login->isUserLoggedIn() == false) {
    
       header("location: ".$ruta."/");
    
    } else{


        $cantidad=$_GET['cantidad'];
        $etiquetas=$_GET['etiquetas'];
        $empresa=$_GET['empresa'];
        $sucursal=$_GET['sucursal'];
        $cultivo=$_GET['cultivo'];
        $etiquetas=ceil($etiquetas/3);
        $servicio=$_SESSION['webservice'];
        $response=array();
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => $servicio,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 500,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => array('accion' => 'genera_etiquetas','controller' => 'Etiqueta',"cantidad"=>$cantidad
        ,"idempresa"=>$empresa,"idsucursal"=>$sucursal,"idcultivo"=>$cultivo),
        ));
        
        $response = curl_exec($curl);
        curl_close($curl);
        $data=  json_decode(str_replace('ï»¿','',utf8_encode($response)));
       
        $tam = sizeof($data);


        $pdf = new TCPDF("L", "mm", array(130, 25), true, 'UTF-8', false);
        $pdf->SetMargins(3, 3, 3);
        $pdf->setFontSubsetting(true);
        $pdf->SetFont('freeserif', 'B', 8);
    
        $pdf->SetAutoPageBreak(true, 0); // Whether to enable automatic paging
        $pdf->setPrintHeader(false);
        $type="MSI+";

        if($tam>0)
        {
            for ($i = 0; $i < $tam; $i++) {
            
                $j=0;

                for ($k=0;$k<$etiquetas;$k++){

                    $j=$j+1;
                    $code="";
                    $code = $data[$i]->num_numero;
                  //  echo $code."<br>";
                    
                    $pdf->AddPage();
                    $style = array(
                        'position' => '',
                        'align' => 'C',
                        'stretch' => false,
                        'fitwidth' => true,
                        'cellfitalign' => '',
                        'border' => false, // border
                        'hpadding' => 'auto',
                        'vpadding' => 'auto',
                        'fgcolor' => array(0, 0, 0),
                        'bgcolor' => false, //array(255,255,255),
                                 'text' => false, // whether to display the text below the barcode
                                 'font' => 'helvetica', //font
                                 'fontsize' => 4, //font size
                        'stretchtext' => 4
                    );


                    $style2 = array(
                        'border' =>0 ,
                        'vpadding' => 'auto',
                        'hpadding' => 'auto',
                        'fgcolor' => array(0,0,0),
                        'bgcolor' => false, //array(255,255,255)
                        'module_width' => 1.8, // width of a single module in points
                        'module_height' => 1 // height of a single module in points
                    );
            
                    $x = $pdf->GetX();
                    $y = $pdf->GetY();
                    $pdf->write1DBarcode($code. substr('0'.($j),-2), $type, '0', '-1', '40', 17, 0.4, $style, 'N');
                   // $pdf->write2DBarcode($code .substr('0'.($j),-2), 'PDF417', 0, -0.5, 0, 17, $style2, 'N');
                    $pdf->Text(0, 15, '    SF-Alaya ' . $code .' | '. substr('0'.($j),-2));
                    $pdf->Text(0, 18, '    '.date('d-m-Y'));
                    $j=$j+1;
                    $pdf->write1DBarcode($code. substr('0'.($j),-2), $type, 44, -1, 40, 17, 0.4, $style, 'N');
                   // $pdf->write2DBarcode($code .substr('0'.($j),-2), 'PDF417', 44, -0.5, 0, 17, $style2, 'N');
                    $pdf->Text(44, 15, '    SF-Alaya ' . $code .' | '. substr('0'.($j),-2));
                    $pdf->Text(44, 18, '    '.date('d-m-Y'));
                    $j=$j+1;               
                    $pdf->write1DBarcode($code. substr('0'.($j),-2), $type, 88, -1, 40, 17, 0.4, $style, 'N');
                    //$pdf->write2DBarcode($code .substr('0'.($j),-2), 'PDF417', 88, -0.5, 0, 17, $style2, 'N');
                    $pdf->Text(88, 15, '    SF-Alaya ' . $code .' | '. substr('0'.($j),-2));
                    $pdf->Text(88, 18, '    '.date('d-m-Y'));
                    if($k==$etiquetas-1){
                        $pdf->Text(0, 19, '_________________________________________________________________________________________');
                                    

                    }
                    
                }

            }
            $pdf->Output('C-1-20.pdf','I');	
                            //$response = new Response($pdf->Output('C-1-20.pdf','D'));
                            //$response->headers->set('Content-Type', 'application/pdf');  
                            //return $response;

        }else{
            $respuesta = array('respuesta' =>"Error, no se generaron los códigos");
            return json_encode($respuesta);
        }

        


    }
//}

