"""Process the whisky data into a format suitable for visualisation."""

import csv
import json
from convertbng.util import convert_lonlat


def formreader(filename):
    """Create a csv reader to go through the data

    :filename: string filename
    :returns: tuple of the file and a csv dictreader

    """
    f = open(filename, 'r')
    reader = csv.DictReader(f)
    return f, reader

def getLatLong(row):
    """Convert the postcode to a lat and long for the row

    :row: row object from the dict reader
    :returns: object containing the lat/long

    """
    easting = int(row[' Latitude'].strip())
    northing = int(row[' Longitude'].strip())
    lonlat = convert_lonlat([easting], [northing])
    return {
        'lat': lonlat[1][0],
        'long': lonlat[0][0]
    }

def parserow(row):
    """Extract the useful elements from the row

    :row: row from the dict reader
    :returns: object containing all the interesting parts of the data

    """
    latlong = getLatLong(row)
    return {**row, **latlong}


def parsedata(reader):
    """Crunch the data into a useful format

    :reader: filereader
    :returns: python object for conversion to json

    """
    return [parserow(i) for i in reader]

def outputjson(parsed, filename='whisky-vis/src/whisky.json'):
    """Output the data to json format

    :parsed: parsed data
    :filename: filename to output to

    """
    with open(filename, 'w') as f:
        json.dump(parsed, f)

if __name__ == "__main__":
    f, reader = formreader('./whiskies.txt')
    parsed = parsedata(reader)
    outputjson(parsed)
    f.close()
