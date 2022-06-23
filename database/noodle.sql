CREATE DATABASE IF NOT EXISTS Noodle;

CREATE TABLE IF NOT EXISTS `Noodle`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `apellido` VARCHAR(255) NOT NULL,
  `correo` VARCHAR(255) NOT NULL,
  `contra` VARCHAR(255) NOT NULL,
  `agregado` DATETIME NOW(),
  PRIMARY KEY (`idusuario`),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) VISIBLE
  
  )
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Noodle`.`proyecto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Noodle`.`proyecto` (
  `idproyecto` INT NOT NULL,
  `titulo` VARCHAR(45) NOT NULL,
  `descripcion` LONGTEXT NOT NULL,
  `link` VARCHAR(45) NULL,
  `img` VARCHAR(45) NULL,
  `usuario_idusuario` INT NOT NULL,
  `agregado` DATETIME NOW(),
  PRIMARY KEY (`idproyecto`),
  INDEX `fk_proyecto_usuario_idx` (`usuario_idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_proyecto_usuario`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `Noodle`.`usuario` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Noodle`.`cv`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Noodle`.`cv` (
  `idcv` INT NOT NULL,
  `biografia` VARCHAR(45) NULL,
  `habilidades` VARCHAR(45) NULL,
  `experiencia` LONGTEXT NULL,
  `formacion` LONGTEXT NULL,
  `idiomas` LONGTEXT NULL,
  `usuario_idusuario` INT NOT NULL,
  PRIMARY KEY (`idcv`),
  INDEX `fk_cv_usuario1_idx` (`usuario_idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_cv_usuario1`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `Noodle`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Noodle`.`contacto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Noodle`.`contacto` (
  `idcontacto` INT NOT NULL,
  `correo` VARCHAR(255) NOT NULL,
  `conteido` LONGTEXT NOT NULL,
  `destinatario` VARCHAR(255) NOT NULL,
  `fecha` DATETIME NOT NULL DEFAULT NOW(),
  `usuario_idusuario` INT NOT NULL,
  PRIMARY KEY (`idcontacto`),
  INDEX `fk_contacto_usuario1_idx` (`usuario_idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_contacto_usuario1`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `Noodle`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

