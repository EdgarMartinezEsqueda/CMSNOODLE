$(document).ready(function () {
  var zindex = 10;

  $("div.card").click(function (e) {
    if (!document.cookie.includes("vermas=true")) e.preventDefault();
    document.cookie = "vermas=false";
    var isShowing = false;

    if ($(this).hasClass("show")) {
      isShowing = true;
    }

    if ($("div.nColeccion").hasClass("showing")) {
      // Una card se ve...
      $("div.card.show").removeClass("show");

      if (isShowing) {
        // LA card esta mostrada, se resetea el grid
        $("div.nColeccion").removeClass("showing");
      } else {
        // LA card no se ve, se muestra
        $(this).css({ zIndex: zindex }).addClass("show");
      }

      zindex++;
    } else {
      // Ninguna card se muestra
      $("div.nColeccion").addClass("showing");
      $(this).css({ zIndex: zindex }).addClass("show");

      zindex++;
    }
  });
  $(".card-actions a").click(function (e) {
    document.cookie = "vermas=true";
  });
});
