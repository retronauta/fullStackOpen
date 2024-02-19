CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('Juan Perez', 'www.juanperez.com', 'La maravillosa vida de Juan Perez', 2 );
INSERT INTO blogs (author, url, title, likes) VALUES ('Juana Perez', 'www.juanaperez.com', 'La maravillosa vida de Juana Perez', 5 );

SELECT * FROM blogs;
