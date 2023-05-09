


CREATE OR ALTER PROCEDURE approveLandlord  (@id VARCHAR(200))
AS
BEGIN
UPDATE Landlords SET approved=1
WHERE id=@id AND isDeleted=0 
END