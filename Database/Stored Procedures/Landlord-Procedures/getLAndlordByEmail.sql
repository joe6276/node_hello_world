

CREATE OR ALTER PROCEDURE getLandLordByEmail (@email VARCHAR(100))
AS
BEGIN

SELECT * FROM Landlords WHERE approved =1 AND isDeleted=0 AND email=@email

END