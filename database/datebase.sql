DROP DATABASE IF EXISTS ng_games_test_1;
CREATE DATABASE ng_games_test_1;
USE ng_games_test_1;
SET NAMES 'utf8';

CREATE TABLE usuario (
	int_usercodigo       INT(8) NOT NULL AUTO_INCREMENT,
	vch_userpaterno      VARCHAR(25) NOT NULL,
	vch_usermaterno      VARCHAR(25) NOT NULL,
	vch_usernombre       VARCHAR(30) NOT NULL,
	vch_userciudad       VARCHAR(30) NOT NULL,
	vch_userdireccion    VARCHAR(50) NOT NULL,
	vch_usertelefono     VARCHAR(20) NULL,
    vch_userusuario      VARCHAR(50) NOT NULL,
	vch_userclave        VARCHAR(50),
    boo_logsesion BOOLEAN,
	CONSTRAINT PK_Usuario PRIMARY KEY (int_usercodigo),
    CONSTRAINT U_Usuario_vch_userusuario UNIQUE (vch_userusuario),
    CONSTRAINT U_Usuario_vch_userclave UNIQUE (vch_userclave)
) ENGINE = INNODB ;

CREATE TABLE friends (
	id          	  INT(11) NOT NULL AUTO_INCREMENT,
	int_usercodigo   INT(8) NOT NULL,
    int_usercodigo1   INT(8) NOT NULL,
	CONSTRAINT PK_friends PRIMARY KEY (id), 
	KEY idx_friends01 (int_usercodigo),
	CONSTRAINT fk_friends_Usuario
		FOREIGN KEY (int_usercodigo)
		REFERENCES usuario (int_usercodigo)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
) ENGINE = INNODB ;

CREATE TABLE games (
	int_usercodigo       INT(8) NOT NULL,
    id               INT(11) NOT NULL AUTO_INCREMENT,
    title            VARCHAR(180),
    description      VARCHAR(255),
    image            VARCHAR(200),
    created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT PK_Game PRIMARY KEY (id), 
	KEY idx_Game01 (int_usercodigo),
	CONSTRAINT fk_Game_Usuario
		FOREIGN KEY (int_usercodigo)
		REFERENCES usuario (int_usercodigo)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
) ENGINE = INNODB ;

CREATE TABLE post (
    int_postcodigo      INT(11) NOT NULL AUTO_INCREMENT,
	int_usercodigo      INT(8) NOT NULL,
    id                  INT(11),
    vch_postdescripcion VARCHAR(255) NOT NULL,
    vch_postimagen      VARCHAR(200),
    post_created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT PK_Post PRIMARY KEY (int_postcodigo), 
	KEY idx_Post01 (int_usercodigo),
	CONSTRAINT fk_Post_Usuario
		FOREIGN KEY (int_usercodigo)
		REFERENCES usuario (int_usercodigo)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT,
    KEY idx_Post02 (id),
	CONSTRAINT fk_Post_Game
		FOREIGN KEY (id)
		REFERENCES games (id)
		ON DELETE RESTRICT
		ON UPDATE RESTRICT
) ENGINE = INNODB ;

USE ng_games_test_1;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `make_friends`(p_usercodigo INT(8), p_usercodigo1 INT(8))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING, NOT FOUND
	BEGIN
		rollback;
	END;
    start transaction;
		INSERT INTO friends (int_usercodigo,int_usercodigo1) VALUES
		(p_usercodigo, p_usercodigo1), (p_usercodigo1, p_usercodigo);
    commit;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `save_game`(
	p_usercodigo       INT(8),
    p_title            VARCHAR(180),
    p_description      VARCHAR(255),
    p_image            VARCHAR(200)
)
BEGIN
    DECLARE descrip varchar(200);
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING, NOT FOUND
	BEGIN
		rollback;
	END;
    start transaction;
		INSERT INTO games (int_usercodigo,title,description,image) VALUES
		(p_usercodigo, p_title, p_description, p_image);
		set descrip = CONCAT('Estoy Jugando ', p_title);
		INSERT INTO post (int_usercodigo,id,vch_postdescripcion,vch_postimagen) VALUES
		(p_usercodigo, @@identity, descrip, p_image);
    commit;
END$$
DELIMITER ;

INSERT INTO usuario (vch_userpaterno,vch_usermaterno,vch_usernombre,vch_userciudad,vch_userdireccion,vch_usertelefono,vch_userusuario,vch_userclave) VALUES
('Oroche','Quispe','Frank Anthony','Lima','Jr. Guillermo Zuñiga 971 - SMP','961809487','admin@mag.com',SHA('admin')),
('Oroche','Quispe','Joshua Aaron','Lima','Jr. Guillermo Zuñiga 971 - SMP','961809487','aaron@mag.com',SHA('aaron')),
('Oroche','Quispe','Kerim Yanet','Lima','Jr. Guillermo Zuñiga 971 - SMP','961809487','kerim@mag.com',SHA('kerim'));

call save_game(1,'God of War','God of War es una serie de videojuegos','https://image.api.playstation.com/vulcan/img/rnd/202010/2217/k1laGX3Ita2N6Jlb7BbkHYAr.png');
call save_game(1,'Left 4 Dead 2','Videojuego de disparos en primera persona cooperativo de tipo Horror de supervivencia','https://e.rpp-noticias.io/normal/2020/08/27/002900_988725.png');

call make_friends(1,2);
call make_friends(1,3);

select * from Usuario;
select * from games;
select * from friends;
select * from post;

SELECT f.int_usercodigo1 FROM Usuario as u INNER JOIN friends as f
ON u.int_usercodigo = f.int_usercodigo where u.int_usercodigo=1;