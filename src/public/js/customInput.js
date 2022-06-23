$('input[type="file"]').each(function () {
  var $file = $(this),
    $label = $file.next("label"),
    $labelText = $label.find("span"),
    labelDefault = $labelText.text();

  $file.on("change", function (event) {
    var fileName = $file.val().split("\\").pop(),
      tmppath = URL.createObjectURL(event.target.files[0]);

    if (fileName) {
      $label
        .addClass("file-ok")
        .css("background-image", "url(" + tmppath + ")");

      //Si el archivo es un documento de word
      if (fileName.includes(".doc"))
        $label.css(
          "background-image",
          "url(https://image.flaticon.com/icons/png/512/337/337932.png)"
        );
      //si el archivo es un pdf
      else if (fileName.includes(".pdf"))
        $label.css(
          "background-image",
          "url(https://image.flaticon.com/icons/png/512/337/337946.png)"
        );
      //si el archivo es un excel
      else if (fileName.includes(".xls"))
        $label.css(
          "background-image",
          "url(https://image.flaticon.com/icons/png/512/337/337958.png)"
        );
      //si el archivo es un power point
      else if (fileName.includes(".ppt"))
        $label.css(
          "background-image",
          "url(https://image.flaticon.com/icons/png/512/337/337949.png)"
        );
      //si el archivo es un texto plano
      else if (fileName.includes(".txt"))
        $label.css(
          "background-image",
          "url(https://image.flaticon.com/icons/png/512/337/337956.png)"
        );
      //si no es lo anterior ni una imagen
      else if (
        !fileName.includes(".png") &&
        !fileName.includes(".jpg") &&
        !fileName.includes(".jepg") &&
        !fileName.includes(".gif") &&
        !fileName.includes(".svg")
      )
        $label.css(
          "background-image",
          "url(https://image.flaticon.com/icons/png/512/3601/3601157.png)"
        );
      $labelText.text(fileName);
    } else {
      $label.removeClass("file-ok");
      $labelText.text(labelDefault);
    }
  });
});
