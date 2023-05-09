


CREATE OR ALTER PROCEDURE updateLandlord  (@id VARCHAR(200) , @name VARCHAR(200)
,@email VARCHAR(200), @propertyDocs VARCHAR(200))
AS
BEGIN
UPDATE Landlords SET name=@name , email=@email, propertyDocs=@propertyDocs
WHERE id=@id AND isDeleted=0 AND approved=1
END