-- 1. Tablas Maestras
CREATE TABLE Sucursales (
    idsubsidiary INT PRIMARY KEY,
    description VARCHAR(100) NOT NULL,
    status INT,
    createdat DATE,
    updatedat DATE
);

CREATE TABLE NivelAcademico (
    idstudy INT PRIMARY KEY,
    description VARCHAR(100) NOT NULL,
    status INT,
    createdat DATE,
    updatedat DATE
);

CREATE TABLE Ocupacion (
    idocupation INT PRIMARY KEY,
    description VARCHAR(100) NOT NULL,
    status INT,
    createdat DATE,
    updatedat DATE
);

CREATE TABLE Categorias (
    idcategory INT PRIMARY KEY,
    description VARCHAR(100) NOT NULL,
    status INT,
    createdat DATE,
    updatedat DATE
);

CREATE TABLE ProductosFinancieros (
    idproduct INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    status INT,
    bankInterest DECIMAL(5, 2),-- Tasa de interés
    createdat DATE,
    updatedat DATE
);

-- 2. Tabla Clientes
CREATE TABLE Clientes (
    idclient INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50),
    age INT,
    address VARCHAR(200),
    city VARCHAR(100),
    idsubsidiary INT,
    seniority INT, -- Antigüedad laboral o en la empresa
    maritalStatus VARCHAR(50),
    idstudy INT,
    idocupation INT,
    income INT,
    idcategory INT,
    score INT,
    initdate DATE,
    createdat DATE,
    updatedat DATE,
    FOREIGN KEY (idsubsidiary) REFERENCES Sucursales(idsubsidiary),
    FOREIGN KEY (idstudy) REFERENCES NivelAcademico(idstudy),
    FOREIGN KEY (idocupation) REFERENCES Ocupacion(idocupation),
    FOREIGN KEY (idcategory) REFERENCES Categorias(idcategory)
);

-- 3. Tabla FormularioPrestamo (Se agregó una clave primaria autoincremental)
CREATE TABLE FormularioPrestamo (
    idloanform INT PRIMARY KEY AUTO_INCREMENT, -- Clave primaria propia de la solicitud
    idclient INT,
    idproduct INT,
    value DECIMAL(10, 2) NOT NULL, -- Monto solicitado (ajustado de DATE a DECIMAL)
    cuotes INT NOT NULL,
    initdate DATE,
    status INT,
    score INT,
    createdat DATE,
    createdat DATE,
    updatedat DATE,
    FOREIGN KEY (idclient) REFERENCES Clientes(idclient),
    FOREIGN KEY (idproduct) REFERENCES ProductosFinancieros(idproduct)
);