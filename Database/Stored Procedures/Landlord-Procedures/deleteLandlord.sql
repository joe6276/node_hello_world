

CREATE OR ALTER PROCEDURE deleteLandlord (@id VARCHAR(200))
AS
BEGIN

UPDATE Landlords SET isDeleted=1
WHERE id=@id AND isDeleted=0

END