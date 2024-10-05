CREATE DATABASE CRUD;

USE CRUD;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE clientes (
    foto BLOB NULL,
    genero VARCHAR(10),
    endereco VARCHAR(100),
    cod INT(4) PRIMARY KEY,
    nome VARCHAR(50),
    fone VARCHAR(15),
    email VARCHAR(255),
    feedback INT,
    agenda INT,
    data_de_nascimento DATE,
    FOREIGN KEY (feedback) REFERENCES feedbacks(cod),
    FOREIGN KEY (agenda) REFERENCES agenda(cod)
);

CREATE TABLE procedimentos (
    duracao VARCHAR(15),
    restricao VARCHAR(100),
    descricao VARCHAR(100),
    cod INT(4) PRIMARY KEY,
    nome VARCHAR(50),
    valor DECIMAL(10, 2),
    agenda INT,
    items_proce INT,
    FOREIGN KEY (agenda) REFERENCES agenda(cod),
    FOREIGN KEY (items_proce) REFERENCES items_proce(cod)
);

CREATE TABLE produtos (
    foto BLOB,
    restricao VARCHAR(100),
    valor DECIMAL(10, 2),
    indicacao VARCHAR(50),
    marca VARCHAR(50),
    descricao VARCHAR(100),
    cod INT(4) PRIMARY KEY,
    items_proce INT,
    FOREIGN KEY (items_proce) REFERENCES items_proce(cod)
);

CREATE TABLE feedbacks (
    foto BLOB,
    comentario VARCHAR(200),
    cod INT(4) PRIMARY KEY,
    avaliacao INT CHECK(avaliacao BETWEEN 1 AND 5),
    cliente INT,
    FOREIGN KEY (cliente) REFERENCES clientes(cod)
);

CREATE TABLE agenda (
    cliente INT,
    procedimento INT,
    profissional VARCHAR(50),
    forma_pag VARCHAR(15),
    data DATE,
    hora TIME,
    FOREIGN KEY (cliente) REFERENCES clientes(cod),
    FOREIGN KEY (procedimento) REFERENCES procedimentos(cod)
);

CREATE TABLE items_proce (
    procedimento INT,
    produto INT,
    quantidade INT CHECK(quantidade > 0),
    FOREIGN KEY (procedimento) REFERENCES procedimentos(cod),
    FOREIGN KEY (produto) REFERENCES produtos(cod)
);
