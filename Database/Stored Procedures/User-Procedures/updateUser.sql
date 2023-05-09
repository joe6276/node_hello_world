


CREATE OR ALTER PROCEDURE updateUSer(@id VARCHAR(200) , @name VARCHAR(200), 
@email VARCHAR(200) ,@password VARCHAR(100)
)
AS
BEGIN 
 
 UPDATE Users SET name=@name , email=@email , password=@password
 WHERE id=@id AND isDeleted=0

END