-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 05-12-2015 a las 18:27:56
-- Versión del servidor: 5.6.26
-- Versión de PHP: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mmo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE IF NOT EXISTS `administrador` (
  `id_adm` int(11) NOT NULL,
  `user_adm` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `pass_adm` varchar(500) COLLATE utf8_spanish_ci NOT NULL,
  `tp_adm` varchar(10) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`id_adm`, `user_adm`, `pass_adm`, `tp_adm`) VALUES
(1, 'admin', '38402a3618ab1ecbbab332271ce6fa65eece31e4', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contenido`
--

CREATE TABLE IF NOT EXISTS `contenido` (
  `id_ct` int(11) NOT NULL,
  `mn_id` int(11) NOT NULL,
  `tt_ct` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `txt_ct` text COLLATE utf8_spanish_ci NOT NULL,
  `es_ct` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `fe_ct` date NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `contenido`
--

INSERT INTO `contenido` (`id_ct`, `mn_id`, `tt_ct`, `txt_ct`, `es_ct`, `fe_ct`) VALUES
(10, 11, 'juego1', '<p>texto ver</p>\r\n', '1', '2015-11-01'),
(13, 11, 'contenido3', '', '1', '2015-11-04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images_ct`
--

CREATE TABLE IF NOT EXISTS `images_ct` (
  `id_img_ct` int(11) NOT NULL,
  `ct_id` int(11) NOT NULL,
  `rut_id` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `images_ct`
--

INSERT INTO `images_ct` (`id_img_ct`, `ct_id`, `rut_id`) VALUES
(15, 10, '1448997517793own5.png'),
(17, 10, '1449245516325Cute_Anime_Girl_-_Anime_Photo_36962613_-_Fanpop.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu`
--

CREATE TABLE IF NOT EXISTS `menu` (
  `id_mn` int(11) NOT NULL,
  `tt_mn` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `menu`
--

INSERT INTO `menu` (`id_mn`, `tt_mn`) VALUES
(8, 'menu1'),
(9, 'menu2'),
(11, 'menu3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_us` int(11) NOT NULL,
  `id_red` varchar(355) COLLATE utf8_spanish_ci NOT NULL,
  `nam_us` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `cor_us` varchar(455) COLLATE utf8_spanish_ci NOT NULL,
  `tp_us` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `es_us` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `fe_us` date NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_us`, `id_red`, `nam_us`, `cor_us`, `tp_us`, `es_us`, `fe_us`) VALUES
(1, '563726710441363', 'Angely Telesa Arias', '', '1', '1', '0000-00-00'),
(2, '10205336959168396', 'Albert Steward Arias Duarte', '', '1', '1', '0000-00-00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id_adm`);

--
-- Indices de la tabla `contenido`
--
ALTER TABLE `contenido`
  ADD PRIMARY KEY (`id_ct`),
  ADD KEY `menu` (`mn_id`);

--
-- Indices de la tabla `images_ct`
--
ALTER TABLE `images_ct`
  ADD PRIMARY KEY (`id_img_ct`),
  ADD KEY `contenidoid` (`ct_id`);

--
-- Indices de la tabla `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_mn`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_us`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `id_adm` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `contenido`
--
ALTER TABLE `contenido`
  MODIFY `id_ct` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de la tabla `images_ct`
--
ALTER TABLE `images_ct`
  MODIFY `id_img_ct` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT de la tabla `menu`
--
ALTER TABLE `menu`
  MODIFY `id_mn` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_us` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contenido`
--
ALTER TABLE `contenido`
  ADD CONSTRAINT `contenido_ibfk_1` FOREIGN KEY (`mn_id`) REFERENCES `menu` (`id_mn`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `images_ct`
--
ALTER TABLE `images_ct`
  ADD CONSTRAINT `images_ct_ibfk_1` FOREIGN KEY (`ct_id`) REFERENCES `contenido` (`id_ct`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
