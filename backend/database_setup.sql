-- Script DDL para crear las tablas
-- Ejecutar en MySQL antes de iniciar el backend

CREATE DATABASE IF NOT EXISTS test_bi;
USE test_bi;

CREATE TABLE cliente
(
    idCliente INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) NULL,
    PRIMARY KEY (idCliente)
);

CREATE TABLE orden
(
    idOrden INT NOT NULL AUTO_INCREMENT,
    idCliente INT NOT NULL,
    FOREIGN KEY (idCliente) REFERENCES cliente (idCliente),
    PRIMARY KEY (idOrden)
);

CREATE TABLE operacion
(
    idOperacion INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) NULL,
    PRIMARY KEY (idOperacion)
);

CREATE TABLE orden_operacion
(
    idOrden INT NOT NULL,
    idOperacion INT NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idOrden) REFERENCES orden (idOrden),
    FOREIGN KEY (idOperacion) REFERENCES operacion (idOperacion),
    PRIMARY KEY (idOrden, idOperacion)
);

CREATE TABLE tipo
(
    idTipo INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) NULL,
    PRIMARY KEY (idTipo)
);

CREATE TABLE orden_tipo
(
    idOrden INT NOT NULL,
    idTipo INT NOT NULL,
    fecha_desde DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_hasta DATETIME NULL,
    FOREIGN KEY (idOrden) REFERENCES orden (idOrden),
    FOREIGN KEY (idTipo) REFERENCES tipo (idTipo),
    PRIMARY KEY (idOrden, idTipo)
);

-- Datos de ejemplo
INSERT INTO cliente (nombre) VALUES 
('Juan Pérez'),
('María García'),
('Carlos López');

INSERT INTO operacion (nombre) VALUES 
('Crear'),
('Actualizar'),
('Eliminar'),
('Consultar');

INSERT INTO tipo (nombre) VALUES 
('Urgente'),
('Normal'),
('Baja prioridad');

-- Ejemplo de stored procedures
DELIMITER //

CREATE PROCEDURE sp_resumen_cliente(IN p_idCliente INT)
BEGIN
    SELECT 
        c.idCliente,
        c.nombre,
        COUNT(o.idOrden) as total_ordenes
    FROM cliente c
    LEFT JOIN orden o ON c.idCliente = o.idCliente
    WHERE c.idCliente = p_idCliente
    GROUP BY c.idCliente, c.nombre;
END //

CREATE PROCEDURE sp_procesar_orden(IN p_idOrden INT, IN p_accion VARCHAR(50))
BEGIN
    DECLARE orden_existe INT DEFAULT 0;
    
    SELECT COUNT(*) INTO orden_existe 
    FROM orden 
    WHERE idOrden = p_idOrden;
    
    IF orden_existe > 0 THEN
        SELECT 
            CONCAT('Orden ', p_idOrden, ' procesada con acción: ', p_accion) as resultado,
            NOW() as fecha_proceso;
    ELSE
        SELECT 'Orden no encontrada' as resultado;
    END IF;
END //

DELIMITER ;
