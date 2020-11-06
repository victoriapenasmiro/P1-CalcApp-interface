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
    .addEventListener("click", borrarOperando);
  document.getElementById("c").addEventListener("click", borrarTodo);
  document.getElementById("cambioSig").addEventListener("click", cambioSigno);
  document.getElementById("cambioSig").addEventListener("click", cambioSigno);
  document.getElementById("alCuadrado").addEventListener("click", alCuadrado);
  document.getElementById("porcentaje").addEventListener("click", porCien);
  document.getElementById("calcular").addEventListener("click", calcular);
  document
    .getElementById("historialMobile")
    .addEventListener("click", mostrarHistorial);
  document.getElementById("butFechas").addEventListener("click", mostrarFechas);
  document
    .getElementById("butStandard")
    .addEventListener("click", mostrarStandard);
  document
    .getElementById("butFechasMobile")
    .addEventListener("click", mostrarFechas);
  document
    .getElementById("butStandardMobile")
    .addEventListener("click", mostrarStandard);
  document
    .getElementById("calcularFecha")
    .addEventListener("click", calcularFecha);
  document.getElementById("mobileMenu").addEventListener("click", menuMobile);
  document
    .getElementById("optionsMenu")
    .getElementsByTagName("a")[0]
    .addEventListener("click", addActiveClass);
  document
    .getElementById("optionsMenu")
    .getElementsByTagName("a")[1]
    .addEventListener("click", addActiveClass);
  document
    .getElementById("optionsMenu")
    .getElementsByTagName("a")[2]
    .addEventListener("click", addActiveClass);

  document
    .getElementById("historial")
    .getElementsByTagName("p")[0]
    .addEventListener("click", function () {
      this.style.display = "none";
      document
        .getElementById("historial")
        .getElementsByTagName("p")[1].style.display = "inline";

      document
        .getElementById("historial")
        .getElementsByTagName("div")[1].style.display = "none";
    });

  document
    .getElementById("historial")
    .getElementsByTagName("p")[1]
    .addEventListener("click", function () {
      this.style.display = "none";
      document
        .getElementById("historial")
        .getElementsByTagName("p")[0].style.display = "inline";

      document
        .getElementById("historial")
        .getElementsByTagName("div")[1].style.display = "flex";
    });

  document
    .getElementsByClassName("fa-trash-alt")[0]
    .addEventListener("click", function () {
      document.getElementById("fecDesde").value = "";
      document.getElementById("fecHasta").value = "";
    });

  //calendario en español
  $.datepicker.regional["es"] = {
    closeText: "Cerrar",
    prevText: "< Ant",
    nextText: "Sig >",
    currentText: "Hoy",
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Juv", "Vie", "Sáb"],
    weekHeader: "Sm",
  };
  $.datepicker.setDefaults($.datepicker.regional["es"]);

  $(function () {
    $(".datepicker").datepicker({
      dateFormat: "dd/mm/yy, DD d 'de' MM 'del' yy",
      firstDay: 1,
      dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
    });
  });
};

/**
 * Funcion para activar la clase active en el menu mobile
 *
 */
function addActiveClass() {
  let options = document
    .getElementById("optionsMenu")
    .getElementsByTagName("a");

  /* Cuando obtenemos los items desde getElementsByTagName
  es necesario convertirlos a Array para poder tratarlos con 
  un forEach */

  let optionsList = Array.prototype.slice.call(options);

  optionsList.forEach(removeActiveClass);

  this.classList.add("active");
}

/**
 * Función para eliminar la clase active al elemento que la contenga
 * @param {a} element option responsive menu
 */
function removeActiveClass(element) {
  if (element.classList.contains("active")) {
    element.classList.remove("active");
  }
}

/**
 * Función para calcular la diferencia de dias entre dos fechas
 */
function calcularFecha() {
  const FECHADESDE = document
    .getElementById("fecDesde")
    .value.substr(0, 10)
    .split("/");
  const FECHAHASTA = document
    .getElementById("fecHasta")
    .value.substr(0, 10)
    .split("/");
  const DESDE = new Date(formatearFecha(FECHADESDE));
  const HASTA = new Date(formatearFecha(FECHAHASTA));
  let diffTime = null;
  let diffDays = null;
  let campoDesde = document.getElementById("fecDesde").value;
  let campoHasta = document.getElementById("fecHasta").value;

  if (DESDE > HASTA) {
    document.getElementById("fecDesde").value =
      "Error: fecha desde > a fecha Hasta";
  } else {
    diffTime = Math.abs(HASTA - DESDE);
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (Number.isNaN(diffDays)) {
      if (campoDesde == "") {
        document.getElementById("fecDesde").value =
          "ERROR: No has indicado ninguna fecha";
        addHistorial("ERROR", "Fecha Desde vacía");
      } else if (campoHasta == "") {
        document.getElementById("fecHasta").value =
          "ERROR: No has indicado ninguna fecha";
        addHistorial("ERROR", "Fecha Hasta vacía");
      }
    } else {
      document.getElementById("diferenciaDias").innerHTML =
        "<h4> Hay " + diffDays + " días de diferencia.</h4>";
      addHistorial(
        HASTA.toDateString() + " - " + DESDE.toDateString(),
        diffDays + " días"
      );
    }
  }
}

/**
 * Función para formatear una fecha al formato ISO
 * @param {array} fecha fecha a formatear en formato dd,mm,año
 */
function formatearFecha(fecha) {
  let fechaFormateada = "";
  fecha.reverse().forEach(function (i, index, num) {
    if (index != fecha.length - 1) {
      fechaFormateada += num[index] + "-";
    } else {
      fechaFormateada += num[index];
    }
  });
  return fechaFormateada;
}

/**
 * Función que ejecuta el menu en móviles
 */
function menuMobile() {
  let link = document.getElementById("optionsMenu");
  let img = document.getElementsByTagName("img")[0];
  let menu = document.getElementsByTagName("header")[0];
  let iconTanca = document.getElementsByClassName("fas fa-times")[0];
  let iconPrincipal = document.getElementsByClassName("fa fa-bars")[0];
  if (link.style.display === "block") {
    link.style.display = "none";
    img.style.display = "block";
    menu.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    iconTanca.style.display = "none";
    iconPrincipal.style.display = "block";
  } else {
    link.style.display = "block";
    img.style.display = "none";
    menu.style.backgroundColor = "white";
    iconPrincipal.style.display = "none";
    iconTanca.style.display = "block";
  }
}

/**
 * Función para añadir los numeros a las casillas
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
    alert("Un mismo número no puede tener dos comas decimales");
  }
}

/**
 * Función para añadir los operadores a la casilla de la operación.
 */
function addSymbol() {
  let num = this.name;
  let operacion = document.getElementById("operacion").value;
  let ultimoOperador = operacion.charAt(operacion.length - 1);
  decimal = false; // resteo

  //Si se intenta poner dos operadores seguidos, sustituyo el antiguo por el nuevo indicado
  if (
    (num == "*" || num == "/") &&
    (ultimoOperador == "*" || ultimoOperador == "/")
  ) {
    eliminarUltimo(operacion, 1);
  }

  if (operacion == 0 && num == "-") {
    document.getElementById("operacion").value = num;
  } else {
    document.getElementById("operacion").value += num;
  }
  //reseteo la casilla del operando
  document.getElementById("operando").value = 0;
}

/**
 * Función para calcular el tanto por ciento de un número
 * 
 */
function porCien() {
  let operacion = document.getElementById("operacion").value;
  let per = document.getElementById("operando").value.replace(/,/g, ".");
  let posUltimoOperador = buscoOperador(operacion);
  let num = operacion.substr(0,posUltimoOperador);
  let res = null;

  document.getElementById("operando").value += "%";
  
  //compruebo si hay más de un operador
  if (
    num.indexOf("*") == -1 &&
    num.indexOf("/") == -1 &&
    num.indexOf("+") == -1 &&
    num.indexOf("-") == -1
  ) {
    try{
      num = operacion.substr(0, operacion.length - per.length - 1).replace(/,/g, ".");
      num = parseFloat(num);
      res = eval(num + ((num / 100) * per));
      if(isNaN(res)) throw "La operación no es válida";
    } catch (error) {
      res = exceptionSyntax(error);
    } finally {
      addHistorial(operacion + "%", res);
      document.getElementById("operando").value = 0;
    }
  } else {
    try {
      num = num.replace(/,/g, ".");
      res = eval(num);
      res = eval(res + (res / 100) * per);
      if(isNaN(res)) throw "La operación no es válida";
    } catch (error) {
      res = exceptionSyntax(error);
    } finally {
      addHistorial(operacion + "%", res);
      document.getElementById("operando").value = 0;
    }
  }
  document.getElementById("operacion").value = res.toString().replace(".", ",");
}

/**
 * Función para lanzar controlar una excepción
 * @param {Error} error excepcion que se ha lanzado con eval()
 */
function exceptionSyntax(error){
  if (error instanceof SyntaxError) {
    error = "ERROR: sintaxis incorrecta";
    document.getElementById("operacion").value = error;
    document.getElementById("operando").value = error;
  } else {
    document.getElementById("operacion").value = error;
    document.getElementById("operando").value = error;
  }
  return error;
}

/**
 * Función para calcular la operación
 */
function calcular() {
  let operacion = document.getElementById("operacion").value;
  let res = null;
  //cambio comas por . para calcularlo
  operacion = operacion.replace(/,/g, ".");
  try {
    res = eval(operacion);
    if (!isFinite(res)) throw "ERROR: Operación invalida";
    //convierto los . en comas para pintarlo
    res = res.toString().replace(".", ",");
    document.getElementById("operacion").value = res;
    document.getElementById("operando").value = res;
    borrarTodo();
  } catch (error) {
    res = exceptionSyntax(error);
  } finally {
    addHistorial(operacion, res);
  }

  decimal = false;
  reset = true;
}

/**
 * Función para añadir una operación al historial
 * @param {string} operacion es la operacion matematica que se ha realizado
 */
function addHistorial(operacion, resultado) {
  //convierto los . en comas para pintarlo
  operacion = operacion.replace(/\./g, ",");

  document
    .getElementById("historial")
    .getElementsByTagName("div")[1].innerHTML +=
    "<p>" + operacion + " = " + resultado + "  // </p>";
}

/**
 * Función para resetear los cálculos realizados hasta el momento
 */
function borrarTodo() {
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
  let num = document.getElementById("operando").value;

  document.getElementById("operando").value = 0;

  //si se elimina el decimal, reseteo var
  if (ultimoValor == ".") {
    decimal = false;
  }

  if (this.name == "ce") {
    if (operadores.indexOf(ultimoValor) == -1) {
      eliminarUltimo(operacion, num.length);
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
 * @param {string} operacion es la operacion completa que se está calculando
 * @param {number} numLen indica la longitud de digitos a eliminar
 */
function eliminarUltimo(operacion, numLen) {
  let num = operacion.substr(0, operacion.length - numLen);

  document.getElementById("operacion").value = num;

  return num;
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
 * Función para buscar la posición del último operador
 * @param {string} operacion es la operacion que se está calculando
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
  let num = document.getElementById("operando").value.replace(",", ".");
  let ultimoOperador = buscoOperador(operacion);
  let simbolo = operacion.substr(ultimoOperador, 1);

  if (num != 0) {
    /* Si detectamos que el número está entre "()", hay que eliminar
        los dos paréntesis + el símbolo, por eso, si detectamos un paréntesis,
        envío el length del num + 3*/
    if (operacion.substr(ultimoOperador - 1, 1) == "(") {
      eliminarUltimo(operacion, num.length + 3);
      document.getElementById("operacion").value +=
        "(" + simbolo + Math.pow(num, 2).toString().replace(".", ",") + ")";
      document.getElementById("operando").value =
        "(" + simbolo + Math.pow(num, 2).toString().replace(".", ",") + ")";
    } else {
      eliminarUltimo(operacion, num.length);
      document.getElementById("operacion").value += Math.pow(num, 2).toString().replace(".", ",");
      document.getElementById("operando").value = Math.pow(num, 2).toString().replace(".", ",");
    }
  } else {
    document.getElementById("operacion").value = Math.pow(parseFloat(operacion), 2);
  }
}

/**
 * Funcion para mostrar o ocultar el historial de operaciones
 */
function mostrarHistorial() {
  if (
    document.getElementById("historial").style.display == "none" ||
    document.getElementById("historial").style.display == ""
  ) {
    document.getElementById("historial").style.display = "block";
  } else {
    document.getElementById("historial").style.display = "none";
  }
}

/**
 * Funcion para mostrar la calculadora de fechas y ocultar la standard
 */
function mostrarFechas() {
  if (
    document.getElementById("fechas").style.display == "none" ||
    document.getElementById("fechas").style.display == ""
  ) {
    document.getElementById("fechas").style.display = "block";
    document.getElementById("standard").style.display = "none";
    //al cambiar de calculadora reseteo las casillas de la standard
    document.getElementById("operacion").value = 0;
    document.getElementById("operando").value = 0;
  }
}

/**
 * Funcion para mostrar la calculadora standard y ocultar la de fechas
 */
function mostrarStandard() {
  if (
    document.getElementById("standard").style.display == "none" ||
    document.getElementById("standard").style.display == ""
  ) {
    document.getElementById("standard").style.display = "block";
    document.getElementById("fechas").style.display = "none";
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
 * Función para comprobar si el resultado es infinito
 * @param {number} num es el resultado de una operacion realizadas con eval()
 * @deprecated obsoleta porqué ya existe una función en js que permite comprobar
 * si un número es o no Infinito con isFinite()
 */
function esInfinito(num) {
  if (num === Infinity) {
    document.getElementById("operacion").value = "ERROR: Operación invalida";
    document.getElementById("operando").value = "ERROR: Operación invalida";
    return true;
  } else {
    return false;
  }
}