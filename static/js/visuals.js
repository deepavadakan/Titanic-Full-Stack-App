// Select the dropdown
var dropDown = d3.select("#selection");

// Create event handlers 
dropDown.on("change", runChange);

// Complete the event handler function for the form
function runChange() {

    var selection = d3.select("#selection").property("value");
    console.log(selection);

    if (selection === "all") {
        init();
    } else {
        d3.json(`/age/${selection}`).then((data) => {
            // Grab values from the data json object to build the plots
            console.log(data);
            switch (selection) {
                case "1st":
                    var trace1 = {
                        x: data,
                        type: "histogram",
                        name: "First Class Passeengers",
                        marker: {
                            color: "#17BECF"
                        }
                    };
                    break;
                case "2nd":
                    var trace1 = {
                        x: data,
                        type: "histogram",
                        name: "Second Class Passeengers",
                        marker: {
                            color: "#17BECF"
                        }
                    };
                    break;
                case "3rd":
                    var trace1 = {
                        x: data,
                        type: "histogram",
                        name: "Third Class Passeengers",
                        marker: {
                            color: "#17BECF"
                        }
                    };
                    break;
            }
    
            var data = [trace1];
    
            var layout = {
                bargap: 0.01,
                bargroupgap: 0.01,
                barmode: "overlay",
                title: "Passenger Ages",
                xaxis: {
                    title: "Age"
                },
                yaxis: {
                    title: "Count"
                }
            };
    
            // Set chart to be responsive 
            var config = {
                responsive: true
            }
    
            Plotly.newPlot("hist", data, layout, config);
        });
    }


}

function init() {
    d3.json("/age").then((data) => {
        // Grab values from the data json object to build the plots
        console.log(data);
        var firstClass = data["1st"];
        var secondClass = data["2nd"];
        var thirdClass = data["3rd"];

        var trace1 = {
            x: firstClass,
            type: "histogram",
            name: "First Class Passeengers",
            marker: {
                color: "#17BECF"
            }
        };

        var trace2 = {
            x: secondClass,
            type: "histogram",
            name: "Second Class Passeengers",
            marker: {
                color: "grey"
            }
        };

        var trace3 = {
            x: thirdClass,
            type: "histogram",
            name: "Third Class Passeengers",
            marker: {
                color: "brown"
            }
        };

        var data = [trace1, trace2, trace3];

        var layout = {
            bargap: 0.01,
            bargroupgap: 0.01,
            barmode: "overlay",
            title: "Passenger Ages",
            xaxis: {
                title: "Age"
            },
            yaxis: {
                title: "Count"
            }
        };

        // Set chart to be responsive 
        var config = {
            responsive: true
        }

        Plotly.newPlot("hist", data, layout, config);
    });
}

init();