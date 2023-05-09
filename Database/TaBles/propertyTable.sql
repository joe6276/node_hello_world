

CREATE TABLE Properties (
id VARCHAR(200),
name VARCHAR(200),
location VARCHAR(200),
lat VARCHAR(10),
lon VARCHAR(10),
images VARCHAR(1000),
videos VARCHAR(1000),
price INT,
condition VARCHAR(200),
isDeleted INT DEFAULT 0,
owner VARCHAR(200) FOREIGN KEY REFERENCES Landlords(id)
)
