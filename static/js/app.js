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

    buildDashboard(names[0])

    });


// create a  function key to update graphs
 function buildDashboard (name){ 
    d3.json("samples.json").then(function(data) {
      
    
    // filter samples
        var samples = data.samples.filter(sample => sample.id == name)[0]
    //  console.log(samples)
        var metadata = data.metadata.filter(sample => sample.id == name)[0]
        // console.log(metadata) 
    
        // get  top 10 sample values to plot
    var sampleValues = samples.sample_values.slice(0,10).reverse()
       // console.log(samples[0])
    
    // get top 10 OTU id's  to plot
    var topIdvalues = samples.otu_ids.slice(0,10)
    // console.log(`topIdvalues:${topIdvalues}`)
    
    // get OTUids
        var otuIds = topIdvalues.map(data=> "OTU " + data).reverse()
    // console.log(`otu_ids:${otuIds}`)
    
    // get labels
     var labels = samples.otu_labels.slice(0,10).reverse()
        
    // / Create the Trace
      var trace = {
      x: sampleValues,
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
      tickmode:"auto",
    
      },
      
    }
    
    // Plot the chart to a div tag with id "bar"
    Plotly.newPlot("bar", data, layout);
        
    
    // create bubble chart
    // create the trace for the bubble chart
    var otu_Ids = samples.otu_ids
    var samples_Values = samples.sample_values
    var labelOtu = samples.otu_labels
    var trace1 = {
        x:  otu_Ids,
        y: samples_Values,
        mode: "markers",
        marker: {
            size:samples_Values,
            // opacity:[0.6,0.7,0.8],
            color: otu_Ids,
            autocolorscale:true
          },
        text: labelOtu
        // type:'scatter'
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

    // use d3 to select the panel with id of metadata
    var  demoInfo = d3.select("#sample-metadata");

    // clear existing metadata
    demoInfo.html("");

 // use  Object.entries to add each key and value pair to the panel
    Object.entries(metadata).forEach(function([key,value]) {
        demoInfo.append("p").text(`${key}:${value} \n`);
     
    })

 }

 )};
   
function optionChanged (name){
    buildDashboard(name)
}



