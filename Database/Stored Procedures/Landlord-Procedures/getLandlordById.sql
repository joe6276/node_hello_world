



CREATE OR ALTER PROCEDURE getLandLordById (@id VARCHAR(100))
AS
BEGIN

SELECT * FROM Landlords WHERE approved =1 AND isDeleted=0 AND id=@id

END