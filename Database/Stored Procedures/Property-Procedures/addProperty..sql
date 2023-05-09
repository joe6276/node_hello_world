

CREATE PROCEDURE insertProperty ( @id VARCHAR(100) , @name VARCHAR(200), @location VARCHAR(200), @lat VARCHAR(10), @lon VARCHAR(20),
@images VARCHAR(1000), @videos VARCHAR(1000), @price INT , @condition VARCHAR(200),@Owner VARCHAR(200))
AS
BEGIN

INSERT INTO Properties(id,name,location,lat, lon, images, videos,price,condition,owner)
VALUES(@id,@name,@location,@lat,@lon,@images, @videos,@price,@condition,@Owner)

END




