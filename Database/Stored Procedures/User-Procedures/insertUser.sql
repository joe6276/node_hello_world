
CREATE OR ALTER PROCEDURE insertUser(@id VARCHAR(200) , @name VARCHAR(200), 
@email VARCHAR(200) ,@password VARCHAR(100)
)

AS
BEGIN 


INSERT INTO Users(id,name,email,password)
VALUES( @id, @name,@email, @password)

END