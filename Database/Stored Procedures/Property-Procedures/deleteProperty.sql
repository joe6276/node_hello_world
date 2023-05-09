
CREATE OR ALTER  PROCEDURE deleteProperty(@id VARCHAR(200))
AS
BEGIN

UPDATE Properties SET isDeleted=1 WHERE id=@id AND isDeleted =1

END