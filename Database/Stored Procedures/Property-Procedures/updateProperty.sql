

CREATE OR ALTER  PROCEDURE updateProperty ( @id VARCHAR(100) ,
@name VARCHAR(200), @location VARCHAR(200), 
@lat VARCHAR(10), @lon VARCHAR(20),
@images VARCHAR(1000), @videos VARCHAR(1000), @price INT ,
@condition VARCHAR(200),@Owner VARCHAR(200))
AS
BEGIN

UPDATE Properties SET name=@name, location=@location, lat=@lat,
lon=@lon, images=@images, videos=@videos,price=@price, condition=@condition,
owner=@Owner WHERE id=@id AND isDeleted=0

END