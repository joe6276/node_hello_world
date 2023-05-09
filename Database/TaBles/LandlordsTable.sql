CREATE TABLE Landlords (
id VARCHAR(200) PRIMARY KEY ,
name VARCHAR(200),
email VARCHAR(200) UNIQUE,
propertyDocs  VARCHAR(200),
isDeleted INT DEFAULT 0,
approved INT DEFAULT 0,
emailSent INT DEFAULT 0,
password VARCHAR(200) 
)
