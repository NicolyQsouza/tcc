CREATE DATABASE CRUD;

USE CRUD;

CREATE TABLE usuario (
    cod INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE clientes (
   
    cod INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    genero VARCHAR(10),
    endereco VARCHAR(100),
    fone VARCHAR(15),
    email VARCHAR(255),
    data_de_nascimento DATE
);

CREATE TABLE procedimentos (

    cod INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    descricao VARCHAR(100),
    valor DECIMAL(10, 2)
);

CREATE TABLE produtos (

    cod INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    valor DECIMAL(10, 2),
    marca VARCHAR(50),
    descricao VARCHAR(100),
    foto VARCHAR(200)
);

CREATE TABLE feedbacks (

    cod INT PRIMARY KEY AUTO_INCREMENT,
    clientes INT,
    foto VARCHAR(200),
    comentario VARCHAR(200),
    avaliacao INT, 
    FOREIGN KEY (clientes) REFERENCES clientes(cod)
);

CREATE TABLE agenda (

    cod INT PRIMARY KEY AUTO_INCREMENT, 
    clientes INT,
    procedimentos INT,
    profissional VARCHAR(50),
    forma_pag VARCHAR(15),
    data DATE,
    hora TIME,
    FOREIGN KEY (clientes) REFERENCES clientes(cod),
    FOREIGN KEY (procedimentos) REFERENCES procedimentos(cod)
);

CREATE TABLE items_proce (

    cod INT PRIMARY KEY AUTO_INCREMENT, 
    procedimentos INT,
    produtos INT,
    quantidade INT,  -- Removido o CHECK aqui
    FOREIGN KEY (procedimentos) REFERENCES procedimentos(cod),
    FOREIGN KEY (produtos) REFERENCES produtos(cod)
);
