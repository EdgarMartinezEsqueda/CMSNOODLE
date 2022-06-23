$(document).ready(function () {
  // Modo Oscuro
  let btnSwitch = document.querySelector("#switch");
  btnSwitch.addEventListener("click", () => {
    $("main").toggleClass("dark");
    btnSwitch.classList.toggle("active");
    let fondo =
      $(".nIndexTexto").css("background-color") === "rgb(242, 242, 242)"
        ? "#115788"
        : "#f2f2f2";
    $(".nIndexTexto").css("background-color", fondo);
    $(".nColeccion").css("color", "black");
    let modoActual = document.getElementById("cambioModo");
    modoActual.innerHTML =
      modoActual.innerHTML === "mode_night" ? "light_mode" : "mode_night";
  });

  //Función para abrir el sidebar en el docs.html
  $(".qAbrirSidebar").click(function () {
    $(".qSidebar").addClass("qActivo");
  });

  //Función para abrir el sidebar en el docs.html
  $(".qAbrirSidebarIndice").click(function () {
    $(".qSidebarIndiceRes").addClass("qActivo");
  });

  //Función para abrir los sub menus que se tengan en el sidebar
  $(".qAbrirSubMenu").click(function () {
    $(this).next(".qSubMenu").slideToggle();
  });

  //Función para cerrar el sidebar
  $(".qCerrarSidebar").click(function () {
    $("*[class*=qSidebar]").removeClass("qActivo");
  });

  //Funcion para que aparezca el boton de ir hacia arriba
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $("#qBtnSubir").fadeIn();
    } else {
      $("#qBtnSubir").fadeOut("slow");
    }
  });

  // Funcion para copiar el contenido
  $(".qCopiarContenido").click(function () {
    let copyText = $(this).parent().find("code").text();
    let textArea = document.createElement("textarea");
    textArea.textContent = copyText;
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");
    alert("Texto copiado a tu portapapeles");
    textArea.remove();
  });

  // Función para mostrar modales
  $(".qActivaModal").click(function () {
    $(".qFondoModal").fadeIn();
  });

  // Función para cerrar modales
  function ocultarModal() {
    $(".qFondoModal").fadeOut();
  }
  $(".qBloqueaModal").click(function () {
    document.getElementById("qModalForm").reset();
    ocultarModal();
  });
  //Función para validar campos.//
  function validarCampo(campo) {
    if (campo.value.trim() == "") {
      alert('El campo "' + campo.name + '" no se ha llenado correctamente.');
      return false;
    }
    return true;
  }
  //Función para validar formularios.//
  function validarFormulario() {
    let campos = document.getElementsByClassName("qCampoObligatorio");
    let val = true;
    /* recorrido del arreglo de campos obligatorios. */
    for (let i = 0; i < campos.length; i++) {
      if (!validarCampo(campos[i])) val = false;
    }
    return val;
  }
  //Función para agregar comentarios.//
  $("#qSubirModalForm").click(function () {
    if (validarFormulario()) {
      $("#listaComentarios").append(
        '<div class="qComentario">' +
          '<div class="qTituloComCard">' +
          '<h2 class="qUsuarioComentario">' +
          (!$("#usuarioNom").val().trim() == ""
            ? $("#usuarioNom").val()
            : "Anónimo") +
          "</h2>" +
          '<p class="qDescUsuario">' +
          (!$("#usuarioOcp").val().trim() == ""
            ? $("#usuarioOcp").val()
            : "Usuario de Quasiestado") +
          "</p>" +
          "</div>" +
          '<p class="qCita">' +
          $("#usuarioExp").val() +
          "</p>" +
          "</div>"
      );
      document.getElementById("qModalForm").reset();
      ocultarModal();
    }
  });
  //Método para validar subida de formulario en general.//
  $("#qEnviarForm").click(function (event) {
    if (!validarFormulario()) event.preventDefault();
  });

  //Evento para botones limpiar.//
  $(".qLimpiarForm").click(function () {
    $(this).closest("form").trigger("reset");
  });

  //funcion para abrir el navbar en el modo responsivo
  $(".qNavbarResponsivo").click(function () {
    $("nav").toggle("activo");
  });
  /*
  //funcion para validar el registro de nuevos usuarios
  $("#registrarUsuario").click(function (event) {
    console.log("Entro");
    if (!validarRegistro()) event.preventDefault();
  });
  function validarRegistro() {
    if (
      $("#nombre").val().trim().length === 0 ||
      $("#apellido").val().trim().length === 0 ||
      $("#correo")
        .val()
        .match(/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/) == null
    ) {
      alert("Rellene los campos correctamente");
      return false;
    }
  }
  */
});
//funcion para subir al tope de la pagina
function subir() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
