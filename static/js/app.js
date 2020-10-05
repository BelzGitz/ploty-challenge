// Fetch the JSON data and console log it
d3.json("samples.json").then(function(data) {
    //   console.log(data);
    var names = data["names"]
    // console.log(names)

    var dropdown = d3.select("#selDataset")

    names.forEach(name => {
    //    console.log(name)
        dropdown.append("option").text(name)
        .property("value",name)
    })


// filter samples
    var samples = data.samples
//  console.log(samples)


// d3.json(`samples.${sample}`).then(function(data){

// get  top 10 sample values to plot
var sampleValues = samples[0].sample_values.slice(0,10)
console.log(`SampleValues:${sampleValues}`)

// get top 10 OTU id's  to plot
var topIdvalues = samples[0].otu_ids.slice(0,10)
// console.log(`topIdvalues:${topIdvalues}`)

// get OTUids
// array.map(function(currentValue, index, arr), thisValue)

var otuIds = topIdvalues.map(data=> "otu_ids" + topIdvalues)
// console.log(`otu_ids:${otuIds}`)

// get labels
 var labels = samples[0].otu_labels.slice(0,10)

 var otuIds = ["OTU 1167","OTU 2859","OTU 482","OTU 2264","OTU 41", "OTU 1189", "OTU 352","OTU 189","OTU 2318","OTU 1977"]
//  var sampleValues = [0, 50, 100, 150]

// / Create the Trace
  var trace = {
  x:sampleValues,
  y:otuIds,
  text:labels,
  type: "bar",
  marker:{
      color:"blue"},
      orientation:"h",
};

// Create the data array for the plot
var data = [trace];

// Define the plot layout
var layout = {
  title: "Top 10 OTU",
  yaxis: {
  tickmode:"linear",

  },
  
}

// Plot the chart to a div tag with id "bar"
Plotly.newPlot("bar", data, layout);

// });

// create the trace for the bubble chart
var trace1 = {
    x: otuIds,
    y: sampleValues,
    mode: "markers",
    marker: {
        size: sampleValues,
        opacity:[0.6,0.7,0.8],

        color: otuIds
    },
    text: labels,
    type:'bubble'
};

// set the layout for the bubble plot
var layout = {
    xaxis:{title: "OTU ID"},
    height: 600,
    width: 1200
};

// create the data variable 
var data1 = [trace1];

// create the bubble plot
Plotly.newPlot("bubble", data1, layout); 

});












// create bubble chart

