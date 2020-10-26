//Listado de operadores
var operadores = ["+", "-", "*", "/"];
// variable para controlar si en el operando ya se ha puesto un decimal
var decimal = false;
// variable para comprobar si ya se ha calculado una expresión
var reset = false;

/**
 * Función para poner a la escucha todos los botones de la calculadora
 */
window.onload = function () {
  document.getElementById("but9").addEventListener("click", addNumber);
  document.getElementById("but8").addEventListener("click", addNumber);
  document.getElementById("but7").addEventListener("click", addNumber);
  document.getElementById("but6").addEventListener("click", addNumber);
  document.getElementById("but5").addEventListener("click", addNumber);
  document.getElementById("but4").addEventListener("click", addNumber);
  document.getElementById("but3").addEventListener("click", addNumber);
  document.getElementById("but2").addEventListener("click", addNumber);
  document.getElementById("but1").addEventListener("click", addNumber);
  document.getElementById("but0").addEventListener("click", addNumber);
  document.getElementById("decimal").addEventListener("click", addNumber);
  document.getElementById("operadorSum").addEventListener("click", addSymbol);
  document.getElementById("operadorRes").addEventListener("click", addSymbol);
  document.getElementById("operadorMult").addEventListener("click", addSymbol);
  document.getElementById("operadorDiv").addEventListener("click", addSymbol);
  document.getElementById("ce").addEventListener("click", borrarOperando);
  document
    .getElementById("backspace")
    .addEventListener("click", borrarOperando); /*TODO prettier */
  document.getElementById("c").addEventListener("click", borrarTodo);
  document.getElementById("cambioSig").addEventListener("click", cambioSigno);
  document.getElementById("cambioSig").addEventListener("click", cambioSigno);
  document.getElementById("alCuadrado").addEventListener("click", alCuadrado);
  document.getElementById("calcular").addEventListener("click", calcular);
};

/**
 * Función para añadir los números a las casillas
 * de la operación y del operando.
 */
function addNumber() {
  let num = this.name;
  let operando = document.getElementById("operando").value;
  let operacion = document.getElementById("operacion").value;

  if (!decimal || (decimal && num != ".")) {
    if (operando == 0 && operacion == 0 && num != ".") {
      document.getElementById("operando").value = num;
      document.getElementById("operacion").value = num;
    } else if (operando == 0 && operacion != 0 && num != ".") {
      document.getElementById("operacion").value += num;
      document.getElementById("operando").value = num;
    } else if (num == ".") {
      //Si es un decimal, ya no se podrán cargar más decimales
      decimal = true;
      document.getElementById("operando").value += ",";
      document.getElementById("operacion").value += ",";
    } else {
      if (reset) {
        reset = false;
        document.getElementById("operando").value = num;
        document.getElementById("operacion").value = num;
      } else {
        document.getElementById("operando").value += num;
        document.getElementById("operacion").value += num;
      }
    }
  } else {
    //TODO mostrar mensaje de error:
    alert("Un mismo número no puede tener dos comas decimales");
  }
}

/**
 * Función para añadir los operadores a la casilla de la operación.
 */
function addSymbol() {
  let num = this.name;
  let operando = document.getElementById("operando").value;

  document.getElementById("operacion").value += num;
  document.getElementById("operando").value = 0; //reseteo la casilla del operando
  decimal = false; // resteo
}

/**
 * Función para calcular la operación
 */
function calcular() {
  let operacion = document.getElementById("operacion").value;
  operacion = operacion.replace(/,/g, "."); //cambio comas por . para calcularlo
  let res = eval(operacion);

  res = res.toString().replace(".",","); //convierto los . en comas para pintarlo
  operacion = operacion.replace(/\./g, ","); //convierto los . en comas para pintarlo

  //TODO FALTA QUE PINTE COMAS EN VEZ DE PUNTOS
  document.getElementById("historial").innerHTML += "<p>" + operacion + "</p>";
  document.getElementById("operacion").value = res;
  document.getElementById("operando").value = res;

  decimal = false;
  reset = true;
}

/**
 * Función para resetear los cálculos realizados
 * hasta el momento
 */
function borrarTodo() {
  /*¿Debe borrarse también el historial? */
  document.getElementById("operacion").value = 0;
  document.getElementById("operando").value = 0;
  decimal = false;
  reset = false;
}

/**
 * Función para borrar el último número introducido
 */
function borrarOperando() {
  let operacion = document.getElementById("operacion").value;
  let ultimoValor = operacion.substr(-1, 1); //obtengo el último valor

  document.getElementById("operando").value = 0;

  //si se elimina el decimal, reseteo var
  if ((ultimoValor = ".")) {
    decimal = false;
  }

  if (this.name == "ce") {
    if (operadores.indexOf(ultimoValor) == -1) {
      eliminarUltimo(operacion, 1);
    }
  } else if (this.name == "backspace") {
    eliminarUltimo(operacion, 1);
  }

  resetOperacion();
}

/**
 * Función que comprueba si la operación está vacía y añade 0
 */
function resetOperacion() {
  let operacion = document.getElementById("operacion").value;

  if (operacion.length == 0) {
    document.getElementById("operacion").value = 0;
  }
}

/**
 * Función para eliminar el último dígito de la operación
 * @operacion es la operacion completa que se está calculando
 * @numLen indica la longitud de digitos a eliminar
 */
function eliminarUltimo(operacion, numLen) {
  let num = operacion.substr(0, operacion.length - numLen);

  document.getElementById("operacion").value = num;

  return num;
}

/**
 * Función para cambiar el signo del último número escrito
 * @deprecated se ha optimizado y sustituido por cambioSigno()
 */
function cambioSigno_old() {
  let operacion = document.getElementById("operacion").value;
  let ultimoValor = operacion.substr(-1, 1);
  /*obtengo la posición del ultimo operador para saber el
    número completo al que tengo que cambiar el signo*/
  let ultimoOperador = buscoOperador(operacion);

  /*controlo que el ultimo valor no sea un operador,
    ya que el cambio de signo aplica a los números únicamente*/
  if (operadores.indexOf(ultimoValor) == -1) {
    let num = null; //obtengo el último num completo
    num = obtenerNumero();
    if (num != null && ultimoOperador != null) {
      let simbolo = operacion.substr(ultimoOperador, 1);
      let numLen = operacion.length - (ultimoOperador + 1);
      eliminarUltimo(operacion, numLen); //elimino el último valor

      if (simbolo != "-") {
        document.getElementById("operacion").value += "(-" + num + ")";
      } else {
        document.getElementById("operacion").value += "(+" + num + ")";
      }
    } else {
      eliminarUltimo(operacion, operacion.length); //elimino el último valor
      document.getElementById("operacion").value = "(-" + num + ")";
    }
  } else {
    let simbolo = operacion.substr(ultimoOperador, 1);
    eliminarUltimo(operacion, 1);
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
function cambioSigno() {
  let operacion = document.getElementById("operacion").value;
  let num = document.getElementById("operando").value;
  let ultimoOperador = buscoOperador(operacion);
  let simbolo = operacion.substr(ultimoOperador, 1);

  /* Si detectamos que el número está entre "()", hay que eliminar
    los dos paréntesis + el símbolo, por eso, si detectamos un paréntesis,
    envío el length del num + 3*/
  if (operacion.substr(ultimoOperador - 1, 1) == "(") {
    eliminarUltimo(operacion, num.length + 3);
  } else {
    eliminarUltimo(operacion, num.length);
  }

  if (num != 0) {
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
function buscoOperador(operacion) {
  let posSimbolo = null;
  for (let i = operacion.length; i > 0; i--) {
    if (operadores.indexOf(operacion.charAt(i - 1)) != -1) {
      posSimbolo = i - 1;
      break;
    }
  }
  return posSimbolo;
}

/**
 * Función para calcular el cuadrado de un número dado
 */
function alCuadrado() {
  let operacion = document.getElementById("operacion").value;
  let num = document.getElementById("operando").value;
  let ultimoOperador = buscoOperador(operacion);
  let simbolo = operacion.substr(ultimoOperador, 1);

  if (num != 0) {
    /* Si detectamos que el número está entre "()", hay que eliminar
        los dos paréntesis + el símbolo, por eso, si detectamos un paréntesis,
        envío el length del num + 3*/
    if (operacion.substr(ultimoOperador - 1, 1) == "(") {
      eliminarUltimo(operacion, num.length + 3);
      document.getElementById("operacion").value +=
        "(" + simbolo + Math.pow(num, 2) + ")";
      document.getElementById("operando").value =
        "(" + simbolo + Math.pow(num, 2) + ")";
    } else {
      eliminarUltimo(operacion, num.length);
      document.getElementById("operacion").value += Math.pow(num, 2);
      document.getElementById("operando").value = Math.pow(num, 2);
    }
  }
}

/**
 * Función que devuelve el último número que se ha cargado
 * @deprecated ya no se necesita porqué en el input con id="operando"
 * ya obtenemos el último número cargado.
 */
function obtenerNumero() {
  let operacion = document.getElementById("operacion").value;
  /*posición del ultimo operador*/
  let ultimoOperador = buscoOperador(operacion);
  let num = null;
  if (ultimoOperador != null) {
    //obtengo el ultimo operador
    let simbolo = operacion.substr(ultimoOperador, 1);
    /*obtengo el length del ultimo num, a partir de la posicion
        del operador, sumo 1 porque la posicion empieza en 0*/
    let numLen = operacion.length - (ultimoOperador + 1);
    num = operacion.substr(ultimoOperador + 1, numLen); //obtengo el número completo
  } else {
    num = operacion.substr(0, operacion.length);
  }

  return num;
}
