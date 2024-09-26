CREATE DATABASE CRUD;

USE CRUD;

CREATE TABLE Cliente (
    foto BLOB NULL,
    genero varchar(10),
    endereco varchar(40),
    cod INT(4) PRIMARY KEY,
    nome varchar(25),
    fone varchar(15),
    email varchar(25),
    data_de_nascimento DATE,
    FOREIGN KEY (Feedback)  REFERENCES Feedback (cod),
    FOREIGN KEY (agenda) REFERENCES agenda (cod)
);

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE Procedimento (
    duracao varchar(10),
    restricao varchar(40),
    descricao varchar(40),
    cod INT(4) PRIMARY KEY,
    nome varchar(40),
    valor REAL,
    FOREIGN KEY (agenda) REFERENCES agenda (cod),
    FOREIGN KEY (usa) REFERENCES usa (cod)
);

CREATE TABLE Produto (
    foto BLOB,
    restricao varchar(40),
    valor FLOAT,
    indicacao varchar(25),
    marca varchar(25),
    descricao varchar(40),
    cod INT(4) PRIMARY KEY,
    FOREIGN KEY (usa) REFERENCES usa (cod)
);

CREATE TABLE Feedback (
    foto BLOB,
    comentario VARCHAR(200),
    cod INT(4) PRIMARY KEY,
    avaliacao INT(1),
    cliente INT(4),
    FOREIGN KEY (cliente)  REFERENCES Cliente (cod)
);

CREATE TABLE agenda (
    cliente INT(4),
    procedimento INT(4),
    profissional varchar(25),
    forma_pag varchar(10),
    data DATE,
    hora TIME,
    FOREIGN KEY (cliente) REFERENCES Cliente (cod),
    FOREIGN KEY (procedimento) REFERENCES Procedimento (cod)
);

CREATE TABLE usa (
    procedimento INT(4),
    produto INT(4),
    quantidade INT(3),
    FOREIGN KEY (procedimento) REFERENCES Procedimento (cod),
    FOREIGN KEY (produto) REFERENCES Produto (cod)
);