require(rgdal)
require(maptools)

# read the csv file from the previous step
data <- read.csv("whiskies_w_factors.csv")

# convert the coordinates from ordinance survey grid to the WGS 84 coordinates
# http://spatialreference.org/ref/epsg/27700/
# http://spatialreference.org/ref/epsg/4326/
coords <- data.frame(data$Latitude, data$Longitude)
coordinates(coords) = ~data.Latitude + data.Longitude
proj4string(coords) = CRS("+init=epsg:27700")
coords <- spTransform(coords, CRS("+init=epsg:4326"))

# make the converted coordinates into a data frame
coords <- data.frame(coords)
names(coords) <- c("Latitude", "Longitude")

# append it to the existing data and write out to csv
data <- subset(data, select = -c(Latitude, Longitude))
data <- cbind(data, coords)
write.table(data, file = "whiskies_geocoded.csv", sep=",", row.names=FALSE)