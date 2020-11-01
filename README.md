# P1-CalcApp-interface
Repo de la Practica 1 - CalcApp de interfaces

Se han realizado todos los puntos marcados tanto de DIW como de DWEC. Todas las funciones se han comentado con JSDOC.

__DWIC:__
* Se ha utilizado Grid para el diseño de la arquitectura general, según el [sketch versión Desktop][1] y el [sketch versión *Mobile*][2] propuestos. 
[1]: https://drive.google.com/file/d/1JvRgoQzCdHua37YlM8MeBKoIX-MiGQhb/view
[2]: https://drive.google.com/file/d/1No_gH7zTcxFSWVrcJRQdE3wpqTHv5KVR/view
* Se ha utilizado Flexbox para la botonera de la calculadora.
* Se han utilizado Google Fonts y FontAwesome.
* Se ha utilizado validadores de HTML5 y CSS:
    - [W3C Validation](https://marketplace.visualstudio.com/items?itemName=Umoxfo.vscode-w3cvalidation) - VC extensión.
    - [CSS Lint](http://csslint.net/)

__DWEC:__
Se han configurado todas las funcionalidades indicadas en la [práctica](https://docs.google.com/document/d/165mvqgcaXJqPGgYvXEPV7a5pfU50RyFaRqMssPvsdtE/edit#heading=h.7vng54iu20fo):

* Calculadora Standard:
    - Operativa básica: historial de operación, cálculos con el método eval(), etc
    - Teclas para borrar: C, CE, BACKSPACE
    - Teclas último operando: Cambio de signo +/- y x2.
    - Casos especiales: Zero inicial, Reset, coma en los decimales.
    - Control de errores de cálculos y sintáxis con try/catch.

* Calculadora de fechas:
    - Se ha utilizado [Data picker](https://jqueryui.com/datepicker/) para desarrollar la calculadora de fechas.
    - En los inputs, aparece la fecha en dos formatos: DD/MM/AAAA y enf ormato escrito, por ejemplo: 16 de Octubre del 2020.
    - Se controla que la primera fecha no sea superior a la segunda mediante try/catch.

## 🖋️ Google fonts utilizadas:
Open Sans Condensed para cualquier texto que no sea un título.
Krona One para títulos.

## 🌟 AMPLIACIONES REALIZADAS:
1. Se ha optimizado la función *cambioSigno_old()*. Debido a esta optimización, la función *buscarNumero()*
ha quedado obsoleta y se ha etiquetado como @deprecated.
2. Se ha añadido un ancla por si hay muchas operaciones y crea un scroll.
3. Se ha creado un menu responsive, exclusivo para móviles con una resolución inferior a 700px. Me he basado en el siguiente [tutorial](https://www.w3schools.com/howto/howto_js_mobile_navbar.asp).
4. Se controla que en un mismo número el usuario no pueda poner dos decimales.
5. Se ha utilizado el snipet *<!-- prettier-ignore -->* en el HTML sobre aquellas lineas que no se deberían formatear con Prettier.
6. Para la calculadora de fechas, se ha traducido el calendario de DatePicker a español.

## ⏳ AMPLIACIONES PREVISTAS:
1. Controlar que si el último valor es un operador y a continuación se escribe otro, debe sustituirse y añadirse a la operación.

## PUNTOS PENDIENTES DE REALIZAR

__utilizar variables de CSS__ <br/>
__PASAR CSS LINT ANTES DE ENTREGAR__ <br/>
__RELEASE --> NO VISTO EN CLASSE__ <br/>

### 👩‍💻 Autora:
Mª Victoria Peñas Miró