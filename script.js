// Load required modules from the ArcGIS API for JavaScript
require(["esri/Map", "esri/layers/CSVLayer", "esri/views/MapView", "esri/widgets/Legend"], (
  Map,
  CSVLayer,
  MapView,
  Legend
) => {
   // Define the URL for the CSV data
  var url = "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%202/stl_crime_wgs_84.csv";
  
 // Define the popup template for the heatmap layer
  const template = {
   title: "Crime committed at {ILEADSStreet}"
};
 // Define the renderer for the heatmap layer
  const renderer = {
  type: "heatmap",
  colorStops: [
    { color: "rgba(0, 0, 255, 0)", ratio: 0 },  // Blue (low)
    { color: "rgba(0, 255, 0, 0.5)", ratio: 0.5 },  // Green (medium)
    { color: "rgba(255, 0, 0, 1)", ratio: 1 }  // Red (high)
  ],
  maxDensity: 0.01,
  minDensity: 0
};

 // Create a CSV layer with the specified URL, popup template, and renderer
  const layer = new CSVLayer({
    url: url,
    title: "St. Louis Crime Heatmap",
    copyright: "St. Louis Police Department",
    latitudeField:"Lat",
        longitudeField:"Lon",
    popupTemplate: template,
    renderer: renderer,
    labelsVisible: true,
    labelingInfo: [
      {
        // Define text symbol properties for labeling high crime area points
        symbol: {
          type: "text",
          color: "white",
          font: {
            family: "Noto Sans",
            size: 8
          },
          haloColor: "#472b77",
          haloSize: 0.75
        },
        labelPlacement: "center-center",
        labelExpressionInfo: {
           // Display Crime with one decimal place
          //expression: "Text($feature.Crime, '#.0')"
        },
       
      }
    ]
  });

  const map = new Map({
    basemap: "streets",// basemaps to streets
    layers: [layer]
  });

  const view = new MapView({
    container: "viewDiv",
    center: [-90.1994, 38.6270], // St louis Coordinates
    zoom: 15,
    map: map
  });

  view.ui.add(
    new Legend({
      view: view
    }),
    "bottom-left"
  );
});