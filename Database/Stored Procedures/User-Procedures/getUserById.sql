


CREATE OR ALTER PROCEDURE getUserById(@id VARCHAR(200))
AS
BEGIN
SELECT * FROM Users WHERE  id=@id AND isDeleted=0
END