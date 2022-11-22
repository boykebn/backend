
CREATE DATABASE eastick;

CREATE TABLE "users" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture"       VARCHAR(255),
    "firstName"     VARCHAR(255),
    "lastName"      VARCHAR(255),
    "phoneNUm"      VARCHAR(255),
    "email"         VARCHAR(255),
    "password"      VARCHAR(255),
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
);

CREATE TABLE "resetPassword" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "email"         VARCHAR(255),
    "userId"        INT,
    "codeUnique"    VARCHAR(255),
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ

);

CREATE TABLE "movies" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "movieTitle"    VARCHAR(255),
    "pictures"      VARCHAR(255),
    "releaseDate"   DATE,
    "director"      VARCHAR(255),
    "duration"      TIME,
    "synopsis"      TEXT,
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ

);

CREATE TABLE "genre" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name"          VARCHAR(255),
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ

);

CREATE TABLE "movieGenre" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "movieId"       INT,
    "genreId"       INT,
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ

);

CREATE TABLE "casts" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name"          VARCHAR(255),
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ

);

CREATE TABLE "movieCasts" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "movieId"       INT,
    "castsId"       INT,
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ

);

CREATE TABLE "cinemas" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture"       VARCHAR(255),
    "name"          VARCHAR(255),
    "address"       VARCHAR(255),
    "city"          VARCHAR(255),
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ

);

CREATE TABLE "movieSchedules" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "movieId"       INT,
    "cinemaId"      INT,
    "price"         BIGINT,
    "startDate"     DATE,
    "endDate"       DATE,
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ

);

CREATE TABLE "movieScheduleTime" (
    "id"                INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "time"              TIME,
    "movieSchedulesId"  INT,
    "createdAt"         TIMESTAMPTZ DEFAULT now(),
    "updatedAt"         TIMESTAMPTZ

);

CREATE TABLE "status" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name"          VARCHAR(255),
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ

);

CREATE TABLE "transaction" (
    "id"                INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "bookingDate"       DATE,
    "movieId"           INT,
    "cinemaId"          INT,
    "movieSchedulesId"  INT,
    "fullName"          VARCHAR(255),
    "email"             VARCHAR(255),
    "phoneNUm"          VARCHAR(255),
    "statusId"          INT,
    "createdAt"         TIMESTAMPTZ DEFAULT now(),
    "updatedAt"         TIMESTAMPTZ

);

CREATE TABLE "reservedSeat" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "seatNum"       VARCHAR(255),
    "transactionId" INT,
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ

);

CREATE TABLE "paymentMethod" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture"       VARCHAR(255),
    "name"          VARCHAR(255),
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ

);

CREATE TABLE "subscribe" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "email"         VARCHAR(255),
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ

);



INSERT INTO "users"
("picture", "firstName", "lastName", "phoneNUm", "email", "password")
VALUES
('https://blindspotetc.com/storage/2019/03/dummy-man-570x570.png', 'Super', 'Admin', '02123456', 'admin@eastick.com', '123654789');

INSERT INTO "resetPassword"
("email", "userId", "codeUnique")
VALUES
('admin@eastick.com', '2', '113333555555');

INSERT INTO "movies"
("movieTitle", "pictures", "releaseDate", "director", "duration", "synopsis")
VALUES
('Spirited Away',
'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
'2001-07-20',
'Hayao Miyazaki',
'02:05:00',
'Ten-year-old Chihiro and her parents end up at an abandoned amusement park inhabited by supernatural beings. Soon, she learns that she must work to free her parents who have been turned into pigs.');

INSERT INTO "genre"
("name")
VALUES
('Fantasy'), ('Adventure');

INSERT INTO "movieGenre"
("movieId", "genreId")
VALUES
('2', '2'), ('2', '3');

INSERT INTO "casts"
("name")
VALUES
('Rumi Hiiragi'),
('Miyu Irino'),
('Mari Natsuki'),
('Bunta Sugawara');

INSERT INTO "movieCasts"
("movieId", "castsId")
VALUES
('2', '2'),
('2', '3'),
('2', '4'),
('2', '5');

INSERT INTO "cinemas"
("picture", "name", "address", "city")
VALUES
('https://static.wikia.nocookie.net/logopedia/images/c/cd/21_Cineplex_logo.png', 'Dua Satu Cinemas', 'Jl. Dulu aja No. 2', 'Karawang');


INSERT INTO "movieSchedules"
("movieId", "cinemaId", "price", "startDate", "endDate")
VALUES
('2', '2', '10', '2022-07-20', '2022-10-20');

INSERT INTO "movieScheduleTime"
("time", "movieSchedulesId")
VALUES
('07:00', '2');

INSERT INTO "status"
("name")
VALUES
('In Active');

INSERT INTO "transaction"
("bookingDate", "movieId", "cinemaId", "movieSchedulesId", "fullName", "email", "phoneNUm", "statusId")
VALUES
('2022-07-21','2', '2', '2', 'Boyke Berry N', 'boykeberhahaha@mail.com', '002231654646', '2');

INSERT INTO "reservedSeat"
("seatNum", "transactionId")
VALUES
('c2', '2');

INSERT INTO "paymentMethod"
("picture", "name")
VALUES
('https://statik.tempo.co/data/2021/11/10/id_1065200/1065200_720.jpg', 'ODO');

INSERT INTO "subscribe"
("email")
VALUES
('boykeberhahaha@mail.com');
