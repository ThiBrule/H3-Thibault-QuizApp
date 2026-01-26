SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
DROP DATABASE IF EXISTS quiz_app;

CREATE DATABASE quiz_app
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE quiz_app;

CREATE TABLE quiz (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT, -- peut etre nul
  title VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE question (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id INT NOT NULL,
  label TEXT NOT NULL,
  FOREIGN KEY (quiz_id)
    REFERENCES quiz(id)
    ON DELETE CASCADE
);

CREATE TABLE choice (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT, 
  label TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES question(id)
    ON DELETE CASCADE
);

ALTER TABLE choice 
MODIFY question_id INT NOT NULL;