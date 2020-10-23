/**
 * Listado básico de los operadores
 */
var operadores = ["+","-","*","/"];

/**
 * Función para añadir los números a las casillas
 * de la operación y del operando.
 * @button es el botón desde el cuál se ha llamado a esta función
 */
function addNumber(button){
    let num = button.name;
    let operando = document.getElementById("operando").value;
    
    document.getElementById("operacion").value += num;
    if (operando == 0){
        document.getElementById("operando").value = num;
    } else {
        document.getElementById("operando").value += num;
    }
}

/**
 * Función para añadir los operadores a la casilla de la operación.
 * @button es el botón desde el cuál se ha llamado a esta función
 */
function addSymbol(button){
    let num = button.name;
    
    document.getElementById("operacion").value += num;
    document.getElementById("operando").value = 0;//reseteo la casilla del operando
}

/**
 * Función para calcular la operación
 */
function calcular(){
    let operacion = document.getElementById("operacion").value;
    let res = eval(operacion);
    
    document.getElementById("historial").innerHTML += "<p>" + operacion + "</p>";
    document.getElementById("operacion").value = res;
    document.getElementById("operando").value = res;
}

/**
 * Función para resetear los cálculos realizados
 * hasta el momento
 */
function borrarTodo(){ /*¿Debe borrarse también el historial? */
    document.getElementById("operacion").value = "";
    document.getElementById("operando").value = 0
}

/**
 * Función para borrar el último número introducido
 * @button es el botón desde el cuál se ha llamado a esta función
 */
function borrarOperando(button){
    let operacion = document.getElementById("operacion").value;
    let ultimoValor = operacion.substr(-1,1); //obtengo el último valor

    document.getElementById("operando").value = 0

    if (button.name == "ce"){
        if (operadores.indexOf(ultimoValor) == -1){
            eliminarUltimo(operacion,1);
        }
    } else if (button.name == "backspace"){
        eliminarUltimo(operacion,1);
    }
}

/**
 * Función para eliminar el último dígito de la operación
 * @operacion es la operacion completa que se está calculando
 * @numLen indica la longitud de digitos a eliminar
 */
function eliminarUltimo(operacion,numLen){
    let num = operacion.substr(0,operacion.length-numLen);

    document.getElementById("operacion").value = num;

    return num;
}

/**
 * Función para cambiar el signo del último número escrito
 * @deprecated se ha optimizado y sustituido por cambioSigno()
 */
function cambioSigno_old(){
    let operacion = document.getElementById("operacion").value;
    let ultimoValor = operacion.substr(-1,1);
    /*obtengo la posición del ultimo operador para saber el
    número completo al que tengo que cambiar el signo*/
    let ultimoOperador = buscoOperador(operacion);

    /*controlo que el ultimo valor no sea un operador,
    ya que el cambio de signo aplica a los números únicamente*/
    if (operadores.indexOf(ultimoValor) == -1){
        let num = null; //obtengo el último num completo
        num = obtenerNumero();
        if (num != null && ultimoOperador != null){
            let simbolo = operacion.substr(ultimoOperador,1);
            let numLen = (operacion.length) - (ultimoOperador+1);
            eliminarUltimo(operacion,numLen);//elimino el último valor
            
            if (simbolo != "-") {
                document.getElementById("operacion").value += "(-" + num + ")";
            } else {
                document.getElementById("operacion").value += "(+" + num + ")";
            }
        } else {
            eliminarUltimo(operacion,operacion.length); //elimino el último valor
            document.getElementById("operacion").value = "(-" + num + ")";
        }
    } else{
        let simbolo = operacion.substr(ultimoOperador,1);
        eliminarUltimo(operacion,1);
        if (simbolo != "-") {
            document.getElementById("operacion").value += "-";
        } else {
            document.getElementById("operacion").value += "+";
        }
    }
}

/**
 * Función para cambiar el signo del último número escrito
 */
function cambioSigno(){
    let operacion = document.getElementById("operacion").value;
    let num = document.getElementById("operando").value;
    let ultimoOperador = buscoOperador(operacion);
    let simbolo = operacion.substr(ultimoOperador,1);
    /* Si detectamos que el número está entre "()", hay que eliminar
    los dos paréntesis + el símbolo, por eso, si detectamos un paréntesis,
    envío el length del num + 3.
     */
    if (operacion.substr(ultimoOperador-1,1) == "("){
        eliminarUltimo(operacion,num.length+3);
    } else {
        eliminarUltimo(operacion,num.length);
    }
    
    if (num != 0){
        if (simbolo != "-") {
            document.getElementById("operacion").value += "(-" + num + ")";
        } else {
            document.getElementById("operacion").value += "(+" + num + ")";
        }
    }
}

/**
 * Función para buscar el último operador
 */
function buscoOperador(operacion){
    let posSimbolo = null;
    for (let i = operacion.length; i > 0; i--){
        if (operadores.indexOf(operacion.charAt(i-1)) != -1){
            posSimbolo = i-1;
            break;
        }
    }
    return posSimbolo;
}

/**
 * Función para calcular el cuadrado de un número dado
 */
function alCuadrado(){
    let num = obtenerNumero();
    let ultimoValor = operacion.substr(-1,1);
}

/**
 * Función que devuelve el último número que se ha cargado
 * @deprecated ya no se necesita porqué en el input con id="operando" siempre grabamos el último número cargado
 */
function obtenerNumero(){
    let operacion = document.getElementById("operacion").value;
    /*posición del ultimo operador*/
    let ultimoOperador = buscoOperador(operacion);
    let num = null;
    if (ultimoOperador != null){
        //obtengo el ultimo operador
        let simbolo = operacion.substr(ultimoOperador,1);
        /*obtengo el length del ultimo num, a partir de la posicion
        del operador, sumo 1 porque la posicion empieza en 0*/
        let numLen = (operacion.length) - (ultimoOperador+1);
        num = operacion.substr(ultimoOperador+1,numLen); //obtengo el número completo
    } else {
        num = operacion.substr(0,operacion.length);
    }

    return num;
}

/**TODO
 * Funcion a crear si no están definidas:
 * Controlar que si hay un * o / y a continuación escribo * o /, se debe sustituir, no concatenar, idem con + -
 * 
 * Hasta que no se meta un operador, seguir añadiendo los números en el operando
 * 
 */