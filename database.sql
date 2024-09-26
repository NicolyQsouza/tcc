CREATE DATABASE CRUD;

USE CRUD;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE clientes (
    foto BLOB NULL,
    genero varchar(10),
    endereco varchar(40),
    cod INT(4) PRIMARY KEY,
    nome varchar(25),
    fone varchar(15),
    email varchar(25),
    feedback int,
    agenda int,
    data_de_nascimento DATE,
    FOREIGN KEY (feedback)  REFERENCES feedbacks (cod),
    FOREIGN KEY (agenda) REFERENCES agendas (cod)
);

CREATE TABLE procedimentos (
    duracao varchar(10),
    restricao varchar(40),
    descricao varchar(40),
    cod INT(4) PRIMARY KEY,
    nome varchar(40),
    valor REAL,
    agenda int,
    usa int,
    FOREIGN KEY (agenda) REFERENCES agenda (cod),
    FOREIGN KEY (usa) REFERENCES items_proce (cod)
);

CREATE TABLE produtos (
    foto BLOB,
    restricao varchar(40),
    valor FLOAT,
    indicacao varchar(25),
    marca varchar(25),
    descricao varchar(40),
    cod INT(4) PRIMARY KEY,
    items_proce int,
    FOREIGN KEY (usa) REFERENCES items_proce (cod)
);

CREATE TABLE feedbacks (
    foto BLOB,
    comentario VARCHAR(200),
    cod INT(4) PRIMARY KEY,
    avaliacao INT(1),
    cliente INT(4),
    FOREIGN KEY (cliente)  REFERENCES cliente (cod)
);

CREATE TABLE agenda (
    cliente INT(4),
    procedimento INT(4),
    profissional varchar(25),
    forma_pag varchar(10),
    data DATE,
    hora TIME,
    cliente int,
    procedimento int,
    FOREIGN KEY (cliente) REFERENCES cliente (cod),
    FOREIGN KEY (procedimento) REFERENCES procedimento (cod)
);

CREATE TABLE items_proce (
    procedimento INT(4),
    produto INT(4),
    quantidade INT(3),
    procedimento int,
    produto int,
    FOREIGN KEY (procedimento) REFERENCES procedimento (cod),
    FOREIGN KEY (produto) REFERENCES produto (cod)
);