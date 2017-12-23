This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


# Components

The different components that make up this analysis.

## App

Contains a react router with links off to a bunch of other components.

### Overview

This is a wrapper for a few other components.

Also holds in state a `selected` value,
which is updated through the `onHover` function.

This value is a member of the `whisky` array, which is loaded from json.
Here's an element of that array.

```javascript
{  
   "RowID":"1",
   "Distillery":"Aberfeldy",
   "Body":"2",
   "Sweetness":"2",
   "Smoky":"2",
   "Medicinal":"0",
   "Tobacco":"0",
   "Honey":"2",
   "Spicy":"1",
   "Winey":"2",
   "Nutty":"2",
   "Malty":"2",
   "Fruity":"2",
   "Floral":"2",
   "Postcode":"PH15 2EB",
   " Latitude":"286580",
   " Longitude":"749680",
   "cluster":"1",
   "lat":56.625181,
   "long":-3.85019515,
   "formatname":"Aberfeldy",
   "x":286.82086392025224,
   "y":543.8492446212067
}
```

Child components of `Overview`: 

#### InformationTable

Displays the postcode and the `formatname` of the selected distillery.
`selected` is passed in from parent's state as a property.

#### Radial

A display of the different dimensions that whiskies are scored on.

Takes in the following properties:

 - `width` and `height`, the dimensions of the svg
 - `whisky`, the array of whiskies
 - `selected`, the whisky that is currently selected
 - `cluster`, if passed in then provide an overview of this cluster at the overall level

There's a fair amount of geometry in this one, as the arcs are a bit complex.

#### Map

Geographical display of the locations of the distilleries.

Takes in the following properties:

 - `width` and `height`, the dimensions of the svg
 - `whisky`, the array of whiskies
 - `onHover`, callback function for when a point is hovered over
 - `cluster`, number of the cluster to display
 - `center0`, `center1`, `rotate0`, `rotate1`, `scale`: components to form the geographic projection
 - `colourcluster`, boolean saying if you should colour code the points by their cluster membership
 - `spey`, boolean saying if the river spey should be outlined on the map



### VariableProjection

A close relative of the `Overview` component,
but provides some controls for changing the projection that is used.
