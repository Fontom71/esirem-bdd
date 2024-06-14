-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 14 juin 2024 à 12:34
-- Version du serveur : 10.6.5-MariaDB
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `polynames`
--
DROP DATABASE IF EXISTS `polynames`;
CREATE DATABASE IF NOT EXISTS `polynames` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `polynames`;

-- --------------------------------------------------------

--
-- Structure de la table `card`
--

DROP TABLE IF EXISTS `card`;
CREATE TABLE IF NOT EXISTS `card` (
  `game_id` varchar(8) NOT NULL,
  `row` int(11) DEFAULT NULL,
  `col` int(11) DEFAULT NULL,
  `word_id` int(11) NOT NULL,
  `type_card` varchar(15) DEFAULT 'neutral',
  `is_revealed` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`game_id`,`word_id`) USING BTREE,
  UNIQUE KEY `uq_card` (`game_id`,`row`,`col`),
  KEY `fk_card_word_id` (`word_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `clue`
--

DROP TABLE IF EXISTS `clue`;
CREATE TABLE IF NOT EXISTS `clue` (
  `game_id` varchar(8) NOT NULL,
  `round` int(11) NOT NULL,
  `clue_text` varchar(20) DEFAULT NULL,
  `clue_num` int(11) DEFAULT NULL,
  `found` int(11) DEFAULT 0,
  `is_guess` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`game_id`,`round`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `game`
--

DROP TABLE IF EXISTS `game`;
CREATE TABLE IF NOT EXISTS `game` (
  `game_id` varchar(8) NOT NULL,
  `is_started` tinyint(1) DEFAULT 0,
  `playing` varchar(8) DEFAULT NULL,
  `score` int(11) DEFAULT 0,
  PRIMARY KEY (`game_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `player`
--

DROP TABLE IF EXISTS `player`;
CREATE TABLE IF NOT EXISTS `player` (
  `player_id` varchar(8) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `game_id` varchar(8) DEFAULT NULL,
  `is_host` tinyint(1) DEFAULT 0,
  `player_role` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`player_id`) USING BTREE,
  KEY `fk_player_game_id` (`game_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `word`
--

DROP TABLE IF EXISTS `word`;
CREATE TABLE IF NOT EXISTS `word` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_word` (`text`)
) ENGINE=InnoDB AUTO_INCREMENT=401 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `word`
--

INSERT INTO `word` (`id`, `text`) VALUES
(1, 'AFRICA'),
(2, 'AGENT'),
(3, 'AIR'),
(4, 'ALIEN'),
(5, 'ALPS'),
(6, 'AMAZON'),
(7, 'AMBULANCE'),
(8, 'AMERICA'),
(9, 'ANGEL'),
(10, 'ANTARCTICA'),
(11, 'APPLE'),
(12, 'ARM'),
(13, 'ATLANTIS'),
(14, 'AUSTRALIA'),
(15, 'AZTEC'),
(16, 'BACK'),
(17, 'BALL'),
(18, 'BAND'),
(19, 'BANK'),
(20, 'BAR'),
(21, 'BARK'),
(22, 'BAT'),
(23, 'BATTERY'),
(24, 'BEACH'),
(25, 'BEAR'),
(26, 'BEAT'),
(27, 'BED'),
(28, 'BEIJING'),
(29, 'BELL'),
(30, 'BELT'),
(31, 'BERLIN'),
(32, 'BERMUDA'),
(33, 'BERRY'),
(34, 'BILL'),
(35, 'BLOCK'),
(36, 'BOARD'),
(37, 'BOLT'),
(38, 'BOMB'),
(39, 'BOND'),
(40, 'BOOM'),
(41, 'BOOT'),
(42, 'BOTTLE'),
(43, 'BOW'),
(44, 'BOX'),
(45, 'BRIDGE'),
(46, 'BRUSH'),
(47, 'BUCK'),
(48, 'BUFFALO'),
(49, 'BUG'),
(50, 'BUGLE'),
(51, 'BUTTON'),
(52, 'CALF'),
(53, 'CANADA'),
(54, 'CAP'),
(55, 'CAPITAL'),
(56, 'CAR'),
(57, 'CARD'),
(58, 'CARROT'),
(59, 'CASINO'),
(60, 'CAST'),
(61, 'CAT'),
(62, 'CELL'),
(63, 'CENTAUR'),
(64, 'CENTER'),
(65, 'CHAIR'),
(66, 'CHANGE'),
(67, 'CHARGE'),
(68, 'CHECK'),
(69, 'CHEST'),
(70, 'CHICK'),
(71, 'CHINA'),
(72, 'CHOCOLATE'),
(73, 'CHURCH'),
(74, 'CIRCLE'),
(75, 'CLIFF'),
(76, 'CLOAK'),
(77, 'CLUB'),
(78, 'CODE'),
(79, 'COLD'),
(80, 'COMIC'),
(81, 'COMPOUND'),
(82, 'CONCERT'),
(83, 'CONDUCTOR'),
(84, 'CONTRACT'),
(85, 'COOK'),
(86, 'COPPER'),
(87, 'COTTON'),
(88, 'COURT'),
(89, 'COVER'),
(90, 'CRANE'),
(91, 'CRASH'),
(92, 'CRICKET'),
(93, 'CROSS'),
(94, 'CROWN'),
(95, 'CYCLE'),
(96, 'CZECH'),
(97, 'DANCE'),
(98, 'DATE'),
(99, 'DAY'),
(100, 'DEATH'),
(101, 'DECK'),
(102, 'DEGREE'),
(103, 'DIAMOND'),
(104, 'DICE'),
(105, 'DINOSAUR'),
(106, 'DISEASE'),
(107, 'DOCTOR'),
(108, 'DOG'),
(109, 'DRAFT'),
(110, 'DRAGON'),
(111, 'DRESS'),
(112, 'DRILL'),
(113, 'DROP'),
(114, 'DUCK'),
(115, 'DWARF'),
(116, 'EAGLE'),
(117, 'EGYPT'),
(118, 'EMBASSY'),
(119, 'ENGINE'),
(120, 'ENGLAND'),
(121, 'EUROPE'),
(122, 'EYE'),
(123, 'FACE'),
(124, 'FAIR'),
(125, 'FALL'),
(126, 'FAN'),
(127, 'FENCE'),
(128, 'FIELD'),
(129, 'FIGHTER'),
(130, 'FIGURE'),
(131, 'FILE'),
(132, 'FILM'),
(133, 'FIRE'),
(134, 'FISH'),
(135, 'FLUTE'),
(136, 'FLY'),
(137, 'FOOT'),
(138, 'FORCE'),
(139, 'FOREST'),
(140, 'FORK'),
(141, 'FRANCE'),
(142, 'GAME'),
(143, 'GAS'),
(144, 'GENIUS'),
(145, 'GERMANY'),
(146, 'GHOST'),
(147, 'GIANT'),
(148, 'GLASS'),
(149, 'GLOVE'),
(150, 'GOLD'),
(151, 'GRACE'),
(152, 'GRASS'),
(153, 'GREECE'),
(154, 'GREEN'),
(155, 'GROUND'),
(156, 'HAM'),
(157, 'HAND'),
(158, 'HAWK'),
(159, 'HEAD'),
(160, 'HEART'),
(161, 'HELICOPTER'),
(162, 'HIMALAYAS'),
(163, 'HOLE'),
(164, 'HOLLYWOOD'),
(165, 'HONEY'),
(166, 'HOOD'),
(167, 'HOOK'),
(168, 'HORN'),
(169, 'HORSE'),
(170, 'HORSESHOE'),
(171, 'HOSPITAL'),
(172, 'HOTEL'),
(173, 'ICE'),
(174, 'ICE CREAM'),
(175, 'INDIA'),
(176, 'IRON'),
(177, 'IVORY'),
(178, 'JACK'),
(179, 'JAM'),
(180, 'JET'),
(181, 'JUPITER'),
(182, 'KANGAROO'),
(183, 'KETCHUP'),
(184, 'KEY'),
(185, 'KID'),
(186, 'KING'),
(187, 'KIWI'),
(188, 'KNIFE'),
(189, 'KNIGHT'),
(190, 'LAB'),
(191, 'LAP'),
(192, 'LASER'),
(193, 'LAWYER'),
(194, 'LEAD'),
(195, 'LEMON'),
(196, 'LEPRECHAUN'),
(197, 'LIFE'),
(198, 'LIGHT'),
(199, 'LIMOUSINE'),
(200, 'LINE'),
(201, 'LINK'),
(202, 'LION'),
(203, 'LITTER'),
(204, 'LOCH NESS'),
(205, 'LOCK'),
(206, 'LOG'),
(207, 'LONDON'),
(208, 'LUCK'),
(209, 'MAIL'),
(210, 'MAMMOTH'),
(211, 'MAPLE'),
(212, 'MARBLE'),
(213, 'MARCH'),
(214, 'MASS'),
(215, 'MATCH'),
(216, 'MERCURY'),
(217, 'MEXICO'),
(218, 'MICROSCOPE'),
(219, 'MILLIONAIRE'),
(220, 'MINE'),
(221, 'MINT'),
(222, 'MISSILE'),
(223, 'MODEL'),
(224, 'MOLE'),
(225, 'MOON'),
(226, 'MOSCOW'),
(227, 'MOUNT'),
(228, 'MOUSE'),
(229, 'MOUTH'),
(230, 'MUG'),
(231, 'NAIL'),
(232, 'NEEDLE'),
(233, 'NET'),
(234, 'NEW YORK'),
(235, 'NIGHT'),
(236, 'NINJA'),
(237, 'NOTE'),
(238, 'NOVEL'),
(239, 'NURSE'),
(240, 'NUT'),
(241, 'OCTOPUS'),
(242, 'OIL'),
(243, 'OLIVE'),
(244, 'OLYMPUS'),
(245, 'OPERA'),
(246, 'ORANGE'),
(247, 'ORGAN'),
(248, 'PALM'),
(249, 'PAN'),
(250, 'PANTS'),
(251, 'PAPER'),
(252, 'PARACHUTE'),
(253, 'PARK'),
(254, 'PART'),
(255, 'PASS'),
(256, 'PASTE'),
(257, 'PENGUIN'),
(258, 'PHOENIX'),
(259, 'PIANO'),
(260, 'PIE'),
(261, 'PILOT'),
(262, 'PIN'),
(263, 'PIPE'),
(264, 'PIRATE'),
(265, 'PISTOL'),
(266, 'PIT'),
(267, 'PITCH'),
(268, 'PLANE'),
(269, 'PLASTIC'),
(270, 'PLATE'),
(271, 'PLATYPUS'),
(272, 'PLAY'),
(273, 'PLOT'),
(274, 'POINT'),
(275, 'POISON'),
(276, 'POLE'),
(277, 'POLICE'),
(278, 'POOL'),
(279, 'PORT'),
(280, 'POST'),
(281, 'POUND'),
(282, 'PRESS'),
(283, 'PRINCESS'),
(284, 'PUMPKIN'),
(285, 'PUPIL'),
(286, 'PYRAMID'),
(287, 'QUEEN'),
(288, 'RABBIT'),
(289, 'RACKET'),
(290, 'RAY'),
(291, 'REVOLUTION'),
(292, 'RING'),
(293, 'ROBIN'),
(294, 'ROBOT'),
(295, 'ROCK'),
(296, 'ROME'),
(297, 'ROOT'),
(298, 'ROSE'),
(299, 'ROULETTE'),
(300, 'ROUND'),
(301, 'ROW'),
(302, 'RULER'),
(303, 'SATELLITE'),
(304, 'SATURN'),
(305, 'SCALE'),
(306, 'SCHOOL'),
(307, 'SCIENTIST'),
(308, 'SCORPION'),
(309, 'SCREEN'),
(310, 'SCUBA DIVER'),
(311, 'SEAL'),
(312, 'SERVER'),
(313, 'SHADOW'),
(314, 'SHAKESPEARE'),
(315, 'SHARK'),
(316, 'SHIP'),
(317, 'SHOE'),
(318, 'SHOP'),
(319, 'SHOT'),
(320, 'SINK'),
(321, 'SKYSCRAPER'),
(322, 'SLIP'),
(323, 'SLUG'),
(324, 'SMUGGLER'),
(325, 'SNOW'),
(326, 'SNOWMAN'),
(327, 'SOCK'),
(328, 'SOLDIER'),
(329, 'SOUL'),
(330, 'SOUND'),
(331, 'SPACE'),
(332, 'SPELL'),
(333, 'SPIDER'),
(334, 'SPIKE'),
(335, 'SPINE'),
(336, 'SPOT'),
(337, 'SPRING'),
(338, 'SPY'),
(339, 'SQUARE'),
(340, 'STADIUM'),
(341, 'STAFF'),
(342, 'STAR'),
(343, 'STATE'),
(344, 'STICK'),
(345, 'STOCK'),
(346, 'STRAW'),
(347, 'STREAM'),
(348, 'STRIKE'),
(349, 'STRING'),
(350, 'SUB'),
(351, 'SUIT'),
(352, 'SUPERHERO'),
(353, 'SWING'),
(354, 'SWITCH'),
(355, 'TABLE'),
(356, 'TABLET'),
(357, 'TAG'),
(358, 'TAIL'),
(359, 'TAP'),
(360, 'TEACHER'),
(361, 'TELESCOPE'),
(362, 'TEMPLE'),
(363, 'THEATER'),
(364, 'THIEF'),
(365, 'THUMB'),
(366, 'TICK'),
(367, 'TIE'),
(368, 'TIME'),
(369, 'TOKYO'),
(370, 'TOOTH'),
(371, 'TORCH'),
(372, 'TOWER'),
(373, 'TRACK'),
(374, 'TRAIN'),
(375, 'TRIANGLE'),
(376, 'TRIP'),
(377, 'TRUNK'),
(378, 'TUBE'),
(379, 'TURKEY'),
(380, 'UNDERTAKER'),
(381, 'UNICORN'),
(382, 'VACUUM'),
(383, 'VAN'),
(384, 'VET'),
(385, 'WAKE'),
(386, 'WALL'),
(387, 'WAR'),
(388, 'WASHER'),
(389, 'WASHINGTON'),
(390, 'WATCH'),
(391, 'WATER'),
(392, 'WAVE'),
(393, 'WEB'),
(394, 'WELL'),
(395, 'WHALE'),
(396, 'WHIP'),
(397, 'WIND'),
(398, 'WITCH'),
(399, 'WORM'),
(400, 'YARD');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `card`
--
ALTER TABLE `card`
  ADD CONSTRAINT `fk_card_game_id` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`),
  ADD CONSTRAINT `fk_card_word_id` FOREIGN KEY (`word_id`) REFERENCES `word` (`id`);

--
-- Contraintes pour la table `clue`
--
ALTER TABLE `clue`
  ADD CONSTRAINT `fk_clue_game_id` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`);

--
-- Contraintes pour la table `player`
--
ALTER TABLE `player`
  ADD CONSTRAINT `fk_player_game_id` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
