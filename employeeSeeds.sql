DROP DATABASE IF EXISTS employee;

CREATE DATABASE employee ON employee;

USE employee;

CREATE TABLE employee (
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER
);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', '1123', '002');