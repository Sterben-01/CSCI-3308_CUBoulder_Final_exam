create database university_db;
CREATE TABLE IF NOT EXISTS university_info (
	id serial NOT NULL PRIMARY KEY,
  	university_name text NOT NULL,
  	review text NOT NULL,
  	review_date VARCHAR(255) NOT NULL
);


