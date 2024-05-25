-- phpMyAdmin SQL Dump
    -- version 3.3.9.2
    -- <http://www.phpmyadmin.net>
    --

    -- Host: localhost
    -- Generation Time: Mar 23, 2013 at 04:40 PM
    -- Server version: 5.5.9
    -- PHP Version: 5.3.6
SET
    SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
    --

    -- Database: `pa5`
    --

    -- --------------------------------------------------------
    --

    -- Table structure for table `userTable`
    --

CREATE TABLE `userTable`(
    -- `id` int(6) NOT NULL,
    `id` INT NOT NULL,
    `name` VARCHAR(10) NOT NULL,
    `surname` VARCHAR(15) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `api_key` VARCHAR(100) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1 COMMENT = 'This table contains all lecturer records for the example database.';
--

-- Dumping data for table `userTable`
--

INSERT INTO `userTable`
VALUES(
    1,
    'John',
    'Doe',
    'john.doe@example.com',
    'password123',
    'api_key_123'
);
INSERT INTO `userTable`
VALUES(
    2,
    'root',
    'root',
    'root@gmail.com',
    'root',
    'api_key_root'
);
INSERT INTO `userTable`
VALUES(
    3,
    'Jane',
    'Smith',
    'jane.smith@example.com',
    'password456',
    'api_key_456'
);
INSERT INTO `userTable`
VALUES(
    4,
    'Michael',
    'Johnson',
    'michael.johnson@example.com',
    'password789',
    'api_key_789'
);
INSERT INTO `userTable`
VALUES(
    5,
    'Emily',
    'Davis',
    'emily.davis@example.com',
    'password012',
    'api_key_012'
);
-- --------------------------------------------------------
--

-- Table structure for table `listingTable`
--

CREATE TABLE `listingTable`(
    `id` INT NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `location` VARCHAR(30) NOT NULL,
    `price` INT NOT NULL,
    `bedrooms` INT NOT NULL,
    `bathrooms` INT NOT NULL,
    `url` VARCHAR(100) NOT NULL,
    `parking_spaces` INT NOT NULL,
    `amenities` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `type` ENUM('sale', 'rent') NOT NULL,
    `images` JSON NOT NULL,
    -- images field is set as a JSON data type to store the array of image URLs.
    PRIMARY KEY(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1 COMMENT = 'This table contains all module records for the example database.';
--

-- Dumping data for table `lecturerTable`
--

INSERT INTO `listingTable`(
    id,
    title,
    location,
    price,
    bedrooms,
    bathrooms,
    url,
    parking_spaces,
    amenities,
    description,
    TYPE,
    images
)
VALUES(
    1,
    'Title 1',
    'Location 1',
    100,
    1,
    1,
    'url1',
    1,
    'Amenities 1',
    'Description 1',
    'sale',
    '["https://jsonplaceholder.typicode.com/photos/1"]'
);
INSERT INTO `listingTable`(
    id,
    title,
    location,
    price,
    bedrooms,
    bathrooms,
    url,
    parking_spaces,
    amenities,
    description,
    TYPE,
    images
)
VALUES(
    2,
    'Title 2',
    'Location 2',
    200,
    2,
    2,
    'url2',
    2,
    'Amenities 2',
    'Description 2',
    'rent',
    '["https://jsonplaceholder.typicode.com/photos/1", "https://jsonplaceholder.typicode.com/photos/2"]'
);
INSERT INTO `listingTable`(
    id,
    title,
    location,
    price,
    bedrooms,
    bathrooms,
    url,
    parking_spaces,
    amenities,
    description,
    TYPE,
    images
)
VALUES(
    3,
    'Title 3',
    'Location 3',
    300,
    3,
    3,
    'url3',
    3,
    'Amenities 3',
    'Description 3',
    'sale',
    '["https://jsonplaceholder.typicode.com/photos/1", "https://jsonplaceholder.typicode.com/photos/2", "https://jsonplaceholder.typicode.com/photos/3"]'
);
INSERT INTO `listingTable`(
    id,
    title,
    location,
    price,
    bedrooms,
    bathrooms,
    url,
    parking_spaces,
    amenities,
    description,
    TYPE,
    images
)
VALUES(
    4,
    'Title 2',
    'Location 4',
    400,
    4,
    4,
    'url4',
    4,
    'Amenities 4',
    'Description 4',
    'rent',
    '[]'
);
-- --------------------------------------------------------