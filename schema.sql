  
DROP TABLE IF EXISTS comments;
CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    post INT,
    userimg VARCHAR (255),
    title VARCHAR (255),
    user_name VARCHAR (255),
    comment Text,
    first_name VARCHAR (255),
    last_name VARCHAR (255)


);

DROP TABLE IF EXISTS healthcomments;
CREATE TABLE healthcomments(
    id SERIAL PRIMARY KEY,
    post INT,
    userimg VARCHAR (255),
    title VARCHAR (255),
    user_name VARCHAR (255),
    comment Text,
    first_name VARCHAR (255),
    last_name VARCHAR (255));

DROP TABLE IF EXISTS sportcomments;
CREATE TABLE sportcomments(
    id SERIAL PRIMARY KEY,
    post INT,
    userimg VARCHAR (255),
    title VARCHAR (255),
    user_name VARCHAR (255),
    comment Text,
    first_name VARCHAR (255),
    last_name VARCHAR (255)
);

DROP TABLE IF EXISTS techcomments;
CREATE TABLE techcomments(
   id SERIAL PRIMARY KEY,
    post INT,
    userimg VARCHAR (255),
    title VARCHAR (255),
    user_name VARCHAR (255),
    comment Text,
    first_name VARCHAR (255),
    last_name VARCHAR (255)
);

DROP TABLE IF EXISTS favorite;
CREATE TABLE favorite (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR (255),
  userimg VARCHAR (255),
  category VARCHAR(255),
  urlToImage VARCHAR(255),
  author VARCHAR(255),
  title VARCHAR(255),
  url VARCHAR(255),
  publishedAt VARCHAR(255),
  content TEXT
  );

DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR (255),
    password VARCHAR (255),
    userimg VARCHAR (255),
    email VARCHAR (255),
    first_name VARCHAR (255),
    last_name VARCHAR (255)

);


DROP TABLE IF EXISTS dashboard;
CREATE TABLE dashboard (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR (255),
  last_name VARCHAR (255),
  user_name VARCHAR (255),
  userimg VARCHAR (255),
  category VARCHAR(255),
  urlToImage VARCHAR(255),
  author VARCHAR(255),
  title VARCHAR(255),
  url VARCHAR(255),
  publishedAt VARCHAR(255),
  content TEXT
  );

  
DROP TABLE IF EXISTS searchcomments;
CREATE TABLE searchcomments(
   id SERIAL PRIMARY KEY,
    post INT,
    userimg VARCHAR (255),
    title VARCHAR (255),
    user_name VARCHAR (255),
    comment Text
);