whisky-vis
==========

Pointed to this [dataset about whisky](https://www.mathstat.strath.ac.uk/outreach/nessie/nessie_whisky.html), via a [nice analysis](http://blog.revolutionanalytics.com/2013/12/k-means-clustering-86-single-malt-scotch-whiskies.html) in R.

Here's Brian Cox pronouncing whiskies.

https://www.youtube.com/watch?v=t5YeM55l2_0&index=1&list=PL1ABF6820EA98D487

## Initial analysis

The data file contains ratings of whiskies from 86 different distilleries.
There are 12 variables that each whisky is marked on.
Marks can range from 0 to 4.

* Body
* Sweetness
* Smoky
* Medicinal
* Tobacco
* Honey
* Spicy
* Winey
* Nutty
* Malty
* Fruity
* Floral

I've done some [analysis](./analysis/whiskyanalysis.ipynb) on this data.
The most useful thing seems to be performing clustering on the data, to break down the whisky into groups.
These clusters are saved in `whisky-clusters.csv`.

## Geographic data

The lat/longs in the data file are in [British National Grid](https://en.wikipedia.org/wiki/Ordnance_Survey_National_Grid),
which means they need to be transformed.
`process_whiskies.py` does this conversion,
and outputs the data to json for visualisation.

The shape of Scotland comes from [diva-gis.org](http://www.diva-gis.org/datadown).
It is converted to json using instructions from [Mike Bostock](https://medium.com/@mbostock/command-line-cartography-part-1-897aa8f8ca2c).
These instructions can be found in the [Makefile](./Makefile).

The outline of the River Spey is important.
I got this from the [Ordinance Survey OpenRivers](https://www.ordnancesurvey.co.uk/business-and-government/products/os-open-rivers.html) product.
Again, in BNG so needs to be converted before turning into json.
All these instructions are in the `Makefile`.

## Visualisation

Visualising this data in the whisky-vis directory.
This is a react project.
`cd` into that directory and run the following command:

```
npm run start
```

If it is the first time running the project, you'll have to run `npm install` first.
