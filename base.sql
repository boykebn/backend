
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

SELECT m.id, m."movieTitle", string_agg(g.name, ', ') as genre FROM "movies" m
JOIN "movieGenre" mg ON m.id = mg."movieId"
JOIN "genre" g ON mg."genreId" = g.id GROUP BY m.id ;


ALTER TABLE "users" ADD CONSTRAINT "email" UNIQUE ("email");

ALTER TABLE "movieCasts"
ADD CONSTRAINT "fk_movieCasts_movieId"
FOREIGN KEY ("movieId") REFERENCES "movies" ("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "movieCasts"
ADD CONSTRAINT "fk_movieCasts_castsId"
FOREIGN KEY ("castsId") REFERENCES "casts" ("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "movieGenre"
ADD CONSTRAINT "fk_movieGenre_movieId"
FOREIGN KEY ("movieId") REFERENCES "movies" ("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "movieGenre"
ADD CONSTRAINT "fk_movieGenre_genreId"
FOREIGN KEY ("genreId") REFERENCES "genre" ("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "movieScheduleTime"
ADD CONSTRAINT "fk_movieScheduleTime_movieSchedulesId"
FOREIGN KEY ("movieSchedulesId") REFERENCES "movieSchedules" ("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "movieSchedules"
ADD CONSTRAINT "fk_movieSchedules_movieId"
FOREIGN KEY ("movieId") REFERENCES "movies" ("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "movieSchedules"
ADD CONSTRAINT "fk_movieSchedules_cinemaId"
FOREIGN KEY ("cinemaId") REFERENCES "cinemas" ("id")
ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE "reservedSeat"
-- ADD CONSTRAINT "fk_reservedSeat_transactionId"
-- FOREIGN KEY ("transactionId") REFERENCES "transaction" ("id")
-- ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE "resetPassword"
-- ADD CONSTRAINT "fk_resetPassword_usersId"
-- FOREIGN KEY ("usersId") REFERENCES "users" ("id")
-- ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "transaction"
ADD CONSTRAINT "fk_transaction_movieId"
FOREIGN KEY ("movieId") REFERENCES "movies" ("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "transaction"
ADD CONSTRAINT "fk_transaction_cinemaId"
FOREIGN KEY ("cinemaId") REFERENCES "cinemas" ("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "transaction"
ADD CONSTRAINT "fk_transaction_movieSchedulesId"
FOREIGN KEY ("movieSchedulesId") REFERENCES "movieSchedules" ("id")
ON DELETE CASCADE ON UPDATE CASCADE;


SELECT m.id, m."movieTitle", ms."startDate", ms."endDate", string_agg(g.name, ', ') AS "genre"
FROM "movies" m
JOIN "movieSchedules" ms ON ms."movieId" = m.id
LEFT JOIN "movieGenre" mg ON mg."movieId" = m.id
LEFT JOIN "genre" g ON g.id = mg."genreId"
WHERE current_date BETWEEN ms."startDate" AND ms."endDate" GROUP BY m.id, ms.id;


SELECT m.id, m.pictures, m."movieTitle", m."releaseDate", m."createdAt", string_agg(g.name,', ') AS genre FROM movies m
  JOIN "movieGenre" mg ON mg."movieId" = m.id
  JOIN genre g ON g.id = mg."genreId"
  WHERE
  date_part('year', "releaseDate")::TEXT = COALESCE(NULLIF('2022',''), date_part('year', CURRENT_DATE)::TEXT) AND
  date_part('month', "releaseDate")::TEXT = COALESCE(NULLIF('12',''), date_part('month', CURRENT_DATE)::TEXT)
  GROUP BY m.id, m."movieTitle", m."pictures", m."releaseDate", m."createdAt";



BEGIN;
INSERT INTO "transaction" ("bookingDate", "movieId", "cinemaId", "movieSchedulesId", "fullName", "phoneNUm", "statusId", "paymentMethodId") VALUES ('2023-02-13', '2', '2', '1', 'Berry', '081388562406', '1', '1', 'c1, c2, c3',);
INSERT INTO "reservedSeat" ("seatNum", "transactionId") VALUES ('C1', '1');
COMMIT;


SELECT m."id", m."pictures", m."movieTitle", string_agg(DISTINCT g.name,', ') AS genre, m."createdAt", m."releaseDate", m."duration", m."director", m."synopsis", string_agg(DISTINCT c.name,', ') AS casts FROM movies m
  JOIN "movieGenre" mg ON m."id" = mg."movieId"
  LEFT JOIN genre g ON mg."genreId" = g."id"
  JOIN "movieCasts" mc ON m.id = mc."movieId"
  LEFT JOIN "casts" c ON mc."castsId" = c.id
  WHERE m."id"= 1
  GROUP BY m."movieTitle",  m.id;


SELECT m."id", m."pictures", m."movieTitle", string_agg(DISTINCT g.name,', ') AS genre, m."createdAt", m."releaseDate", m."duration", m."director", m."synopsis", string_agg(DISTINCT c.name,', ') AS casts, cn."id", cn."picture", cn."name", cn."city", cn."address", mt."id", mt."time", ms."id", ms."price" , ms."startDate", ms."endDate" FROM movies m
  JOIN "movieGenre" mg ON m."id" = mg."movieId"
  LEFT JOIN genre g ON mg."genreId" = g."id"
  JOIN "movieCasts" mc ON m.id = mc."movieId"
  LEFT JOIN "casts" c ON mc."castsId" = c.id
  JOIN "cinemas" cn ON cn."id" = ms."cinemaId"
  JOIN "movieScheduleTime" mt ON ms."id" = mt."movieSchedulesId"
  JOIN "movieSchedules" ms ON ms."movieId" = m.id
  WHERE m."id" = '2' AND cn."city" = 'Karawang' AND CURRENT_DATE BETWEEN ms."startDate" AND ms."endDate"
  GROUP BY m."movieTitle", m.id;

  SELECT c.city AS name
    FROM "movieSchedules" mS
    JOIN cinemas c ON mS."cinemaId" = c.id
    JOIN movies m on mS."movieId" = m.id
    JOIN "movieScheduleTimes" mST on mS.id = mST."movieScheduleId"
    WHERE m.id = $1
    AND (COALESCE(NULLIF($2, '')::DATE, CURRENT_DATE) BETWEEN mS."startDate" AND mS."endDate")
    GROUP BY c.city;


    SELECT c.picture,
  t."bookingDate",
  t.time,
  m."movieTitle",
  string_agg(DISTINCT g.name,', ') AS genre,
  string_agg(DISTINCT rs."seatNum",', ') AS SeatNum,
  t.id
  FROM transaction t
  JOIN cinemas c ON t."cinemaId" = c.id
  JOIN movies m ON t."movieId" = m.id
  JOIN "movieGenre" mg ON mg."movieId" = m.id
  JOIN genre g ON g.id = mg."genreId"
  JOIN "reservedSeat" rs ON rs."transactionId" = t.id
  WHERE t."userId"=$1
  GROUP BY c.picture, t."bookingDate", t.time, m."movieTitle", t.id