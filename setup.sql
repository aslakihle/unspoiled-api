CREATE TABLE categories
(
  categroy_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (categroy_id)
);

CREATE TABLE users
(
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE images
(
  image_id INT NOT NULL AUTO_INCREMENT,
  img_blob MEDIUMBLOB NOT NULL,
  PRIMARY KEY (image_id)
);

CREATE TABLE roles
(
  role_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (role_id)
);

CREATE TABLE authors
(
  author_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (author_id)
);

CREATE TABLE bookseries
(
  bookseries_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  author_id INT NOT NULL,
  image_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (bookseries_id),
  FOREIGN KEY (author_id) REFERENCES authors(author_id),
  FOREIGN KEY (image_id) REFERENCES images(image_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE existents
(
  existent_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  bookseries_id INT NOT NULL,
  categroy_id INT NOT NULL,
  image_id INT NOT NULL,
  PRIMARY KEY (existent_id),
  FOREIGN KEY (bookseries_id) REFERENCES bookseries(bookseries_id),
  FOREIGN KEY (categroy_id) REFERENCES categories(categroy_id),
  FOREIGN KEY (image_id) REFERENCES images(image_id)
);

CREATE TABLE posts
(
  post_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  text TEXT(5000) NOT NULL,
  existent_id INT NOT NULL,
  PRIMARY KEY (post_id),
  FOREIGN KEY (existent_id) REFERENCES existents(existent_id)
);

CREATE TABLE books
(
  book_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(60) NOT NULL,
  author_id INT NOT NULL,
  bookseries_id INT NOT NULL,
  PRIMARY KEY (book_id),
  FOREIGN KEY (author_id) REFERENCES authors(author_id),
  FOREIGN KEY (bookseries_id) REFERENCES bookseries(bookseries_id)
);

CREATE TABLE posts_edit
(
  post_edit_id INT NOT NULL AUTO_INCREMENT,
  old_text TEXT(5000) NOT NULL,
  new_text TEXT(5000) NOT NULL,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (post_edit_id),
  FOREIGN KEY (post_id) REFERENCES posts(post_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE bookseries_category
(
  category_id INT NOT NULL AUTO_INCREMENT,
  bookseries_id INT NOT NULL,
  PRIMARY KEY (category_id, bookseries_id),
  FOREIGN KEY (category_id) REFERENCES categories(categroy_id),
  FOREIGN KEY (bookseries_id) REFERENCES bookseries(bookseries_id)
);

CREATE TABLE has_read
(
  user_id INT NOT NULL,
  book_id INT NOT NULL,
  PRIMARY KEY (user_id, book_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (book_id) REFERENCES books(book_id)
);

CREATE TABLE user_roles
(
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  bookseries_id INT NOT NULL,
  PRIMARY KEY (user_id, bookseries_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (bookseries_id) REFERENCES bookseries(bookseries_id)
);

