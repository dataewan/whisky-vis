whisky-vis
==========

Pointed to this [dataset about whisky](https://www.mathstat.strath.ac.uk/outreach/nessie/nessie_whisky.html), via a [nice analysis](http://blog.revolutionanalytics.com/2013/12/k-means-clustering-86-single-malt-scotch-whiskies.html) in R.

I've been looking for a whisky dataset for a while, so very excited to find this.


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

Here are the distributions of each variable.

![distribution plot](https://rawgithub.com/dataewan/whisky-vis/master/plots/distributions.svg)

There are some moderately interesting things there:

- Tobacco only has 0 and 1 ratings
- There are no 4 ratings for spicy, fruity and malty
- Proportionally lots of 4 ratings for body
- Most of the distributions have a peak at 2, the exceptions are smoky/medicinal and winey which have lower peaks.

----

Often when rating systems like this are used,
multiple variables measure the same thing.
For example;
if there were variables called *"Tasty"*, *"Nice"* and *"Good"* in this dataset,
it is likely that whiskies that score highly for tasty are also going to be good and nice as well.

This is called *collinearity*, 
where multiple variables measure pretty much the same effect.
This means that some of the variables are highly correlated.

To take a look for collinearity,
try to find variables which are highly correlated.
This heatmap shows the correlations of each variable against each other variable.
Dark blue means the variables have a strong positive correlation, dark red means the variables have a high negative correlation. 

![correlation plot](https://rawgithub.com/dataewan/whisky-vis/master/plots/correlations.svg)

Looking at this plot, it doesn't appear that there is much collinearity in this dataset.
*Smoky* and *Medicinal* are the most tightly correlated variables, 
but a correlation of `0.7` isn't too bad.
Collinearity isn't much of a problem with this dataset.

-----

I've done a factor analysis on the dataset.
Here is the 6 factor solution:

<!-- html table generated in R 3.0.1 by xtable 1.7-1 package -->
<!-- Sun Jan  5 16:44:21 2014 -->
<TABLE border=1>
<TR> <TH>  </TH> <TH> Factor1 </TH> <TH> Factor2 </TH> <TH> Factor3 </TH> <TH> Factor4 </TH> <TH> Factor5 </TH> <TH> Factor6 </TH>  </TR>
  <TR> <TD align="right"> Body </TD> <TD align="right"> 0.54 </TD> <TD align="right"> 0.52 </TD> <TD align="right"> 0.34 </TD> <TD align="right"> 0.06 </TD> <TD align="right"> 0.09 </TD> <TD align="right"> -0.21 </TD> </TR>
  <TR> <TD align="right"> Sweetness </TD> <TD align="right"> -0.25 </TD> <TD align="right"> 0.21 </TD> <TD align="right"> -0.41 </TD> <TD align="right"> -0.01 </TD> <TD align="right"> -0.02 </TD> <TD align="right"> -0.09 </TD> </TR>
  <TR> <TD align="right"> Smoky </TD> <TD align="right"> 0.50 </TD> <TD align="right"> -0.03 </TD> <TD align="right"> 0.69 </TD> <TD align="right"> -0.23 </TD> <TD align="right"> 0.15 </TD> <TD align="right"> -0.16 </TD> </TR>
  <TR> <TD align="right"> Medicinal </TD> <TD align="right"> 0.64 </TD> <TD align="right"> -0.32 </TD> <TD align="right"> 0.37 </TD> <TD align="right"> -0.17 </TD> <TD align="right"> 0.21 </TD> <TD align="right"> -0.17 </TD> </TR>
  <TR> <TD align="right"> Tobacco </TD> <TD align="right"> 0.18 </TD> <TD align="right"> -0.12 </TD> <TD align="right"> 0.15 </TD> <TD align="right"> -0.11 </TD> <TD align="right"> 0.96 </TD> <TD align="right"> -0.01 </TD> </TR>
  <TR> <TD align="right"> Honey </TD> <TD align="right"> -0.25 </TD> <TD align="right"> 0.55 </TD> <TD align="right"> 0.04 </TD> <TD align="right"> -0.04 </TD> <TD align="right"> -0.18 </TD> <TD align="right"> 0.31 </TD> </TR>
  <TR> <TD align="right"> Spicy </TD> <TD align="right"> -0.07 </TD> <TD align="right"> 0.16 </TD> <TD align="right"> 0.40 </TD> <TD align="right"> 0.10 </TD> <TD align="right"> 0.04 </TD> <TD align="right"> -0.00 </TD> </TR>
  <TR> <TD align="right"> Winey </TD> <TD align="right"> 0.09 </TD> <TD align="right"> 0.72 </TD> <TD align="right"> -0.06 </TD> <TD align="right"> 0.06 </TD> <TD align="right"> 0.10 </TD> <TD align="right"> 0.03 </TD> </TR>
  <TR> <TD align="right"> Nutty </TD> <TD align="right"> -0.00 </TD> <TD align="right"> 0.26 </TD> <TD align="right"> 0.02 </TD> <TD align="right"> 0.03 </TD> <TD align="right"> -0.09 </TD> <TD align="right"> 0.06 </TD> </TR>
  <TR> <TD align="right"> Malty </TD> <TD align="right"> -0.10 </TD> <TD align="right"> 0.15 </TD> <TD align="right"> -0.01 </TD> <TD align="right"> 0.10 </TD> <TD align="right"> -0.00 </TD> <TD align="right"> 0.68 </TD> </TR>
  <TR> <TD align="right"> Fruity </TD> <TD align="right"> -0.18 </TD> <TD align="right"> 0.09 </TD> <TD align="right"> 0.06 </TD> <TD align="right"> 0.96 </TD> <TD align="right"> -0.10 </TD> <TD align="right"> 0.12 </TD> </TR>
  <TR> <TD align="right"> Floral </TD> <TD align="right"> -0.76 </TD> <TD align="right"> -0.08 </TD> <TD align="right"> -0.00 </TD> <TD align="right"> 0.12 </TD> <TD align="right"> -0.08 </TD> <TD align="right"> 0.06 </TD> </TR>
   </TABLE>

Interpretation of the factors

### Factor 1

Smoky, Medicinal, not floral whisky.

Examples: Ardbeg, Lagavulin, Laphroig

### Factor 2

Honey, Winey whisky.

Examples: Glendronach, Macallan, Balmenach

### Factor 3

Smoky whisky.
A bit like factor 1, but spicier and not as medicinal.

Examples: Caol Ila, Ardbeg, Glen Gairloch

### Factor 4

Fruity whisky.

Examples: Royal Brackla, Strathmill, Linkwood

### Factor 5

Tobacco and a bit medicinal.

Examples: Tullibardine, Royal Brackla, Craigallechie

### Factor 6

Malty, honey whisky.
Doesn't score highly for body.

Examples: Old Fettercairn, Deanston, Aberlour
