
CREATE OR ALTER PROCEDURE getALLApproved(@type VARCHAR(100))
AS
BEGIN
 IF @type ='approved'
 BEGIN
 SELECT * FROM Landlords WHERE approved =1 AND isDeleted=0
 END
 ELSE
 BEGIN
 SELECT * FROM Landlords WHERE approved =0 AND isDeleted=0
 END
END