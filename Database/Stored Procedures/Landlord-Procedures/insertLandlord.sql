

CREATE OR ALTER PROCEDURE insertLandLord  (@id VARCHAR(200) , @name VARCHAR(200)
,@email VARCHAR(200), @propertyDocs VARCHAR(200), @password VARCHAR(200))
AS
BEGIN
INSERT INTO Landlords (id,name,email,propertyDocs,password)
VALUES(@id,@name,@email,@propertyDocs,@password)
END