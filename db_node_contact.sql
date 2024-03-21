-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2024 at 03:26 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_node_contact`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_contact`
--

CREATE TABLE `tb_contact` (
  `ID` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL DEFAULT current_timestamp(),
  `lastUpdate` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `dob` date NOT NULL,
  `del` tinyint(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_contact`
--

INSERT INTO `tb_contact` (`ID`, `dateCreated`, `lastUpdate`, `first_name`, `last_name`, `phone_number`, `dob`, `del`) VALUES
(1, '2024-03-18 12:57:20', '2024-03-20 12:27:21', 'Ben', 'Sowah', '0274344903', '2024-03-01', 0),
(2, '2024-03-18 13:02:31', '2024-03-20 13:56:41', 'Benjy', 'Sow', '0274344903', '2024-02-28', 0),
(3, '2024-03-18 13:31:18', '2024-03-20 13:50:26', 'Benjiro', 'Sowah', '0274344905', '1990-02-25', 0),
(4, '2024-03-19 09:42:51', '2024-03-19 09:42:51', 'Benjamin', 'Sowah', '0274344900', '1995-02-05', 0),
(5, '2024-03-19 09:43:44', '2024-03-20 11:05:24', 'Benjamin', 'Sowah', '0274344909', '1997-02-05', 0),
(6, '2024-03-19 09:47:07', '2024-03-20 11:05:24', 'Benjamin', 'Sowah', '0274344909', '1997-02-05', 0),
(7, '2024-03-19 09:48:36', '2024-03-20 11:05:24', 'Benjamin', 'Sowah', '0274344903', '2024-02-28', 0),
(8, '2024-03-19 10:03:18', '2024-03-19 10:03:18', 'Benjamin', 'Sowah', '0274344901', '2022-02-28', 0),
(9, '2024-03-19 10:04:24', '2024-03-20 13:56:38', 'Benjamin', 'Sowah', '0274344901', '2022-02-28', 0),
(10, '2024-03-19 10:04:35', '2024-03-20 11:05:24', 'Benjamin', 'Sowah', '0274344903', '2024-02-28', 0),
(11, '2024-03-20 09:34:30', '2024-03-20 09:34:30', 'Benjamin', 'Sowah', '0274344903', '2024-03-06', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_contact`
--
ALTER TABLE `tb_contact`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_contact`
--
ALTER TABLE `tb_contact`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
