// Select the dropdown
var dropDownAges = d3.select("#selectionAges");
var dropDownSurvival = d3.select("#selectionSurvival");

// Create event handlers 
dropDownAges.on("change", plotAgeByClass);
dropDownSurvival.on("change", plotSurvivedyClass);

function plotHist() {
    d3.json("/age").then((data) => {
        // Grab values from the data json object to build the plots
        console.log(data);
        var firstClass = data["1st"];
        var secondClass = data["2nd"];
        var thirdClass = data["3rd"];

        var trace1 = {
            x: firstClass,
            type: "histogram",
            name: "First Class Passengers",
            marker: {
                color: "#4682B4"
            }
        };

        var trace2 = {
            x: secondClass,
            type: "histogram",
            name: "Second Class Passengers",
            marker: {
                color: "#808000"
            }
        };

        var trace3 = {
            x: thirdClass,
            type: "histogram",
            name: "Third Class Passengers",
            marker: {
                color: "#B22222"
            }
        };

        var data = [trace1, trace2, trace3];

        var layout = {
            bargap: 0.01,
            bargroupgap: 0.01,
            barmode: "overlay",
            title: "Passenger Ages by Class",
            xaxis: {
                title: "Age"
            },
            yaxis: {
                title: "Number of Passengers"
            }
        };

        // Set chart to be responsive 
        var config = {
            responsive: true
        }

        Plotly.newPlot("hist", data, layout, config);
    });
}

// Complete the event handler function for the form
function plotAgeByClass() {

    var selection = dropDownAges.property("value");
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
                        name: "First Class Passengers",
                        marker: {
                            color: "#4682B4"
                        }
                    };
                    break;
                case "2nd":
                    var trace1 = {
                        x: data,
                        type: "histogram",
                        name: "Second Class Passengers",
                        marker: {
                            color: "#808000"
                        }
                    };
                    break;
                case "3rd":
                    var trace1 = {
                        x: data,
                        type: "histogram",
                        name: "Third Class Passengers",
                        marker: {
                            color: "#B22222"
                        }
                    };
                    break;
            }
    
            var data = [trace1];
    
            var layout = {
                bargap: 0.01,
                bargroupgap: 0.01,
                barmode: "overlay",
                title: "Passenger Ages by Class",
                xaxis: {
                    title: "Age"
                },
                yaxis: {
                    title: "Number of Passengers"
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

function plotBar() {
    d3.json("/survived").then((data) => {
        // Grab values from the data json object to build the plots
        console.log(data);
        var firstClass = data["1st"];
        var secondClass = data["2nd"];
        var thirdClass = data["3rd"];
        var survivedArray = ["survived", "didnot survive"];
        var y = [];

        var trace1 = {
            x: survivedArray,
            y: firstClass,
            type: "bar",
            name: "First Class Passengers",
            marker: {
                color: "#4682B4"
            }
        };

        var trace2 = {
            x: survivedArray,
            y: secondClass,
            type: "bar",
            name: "Second Class Passengers",
            marker: {
                color: "#808000"
            }
        };

        var trace3 = {
            x: survivedArray,
            y: thirdClass,
            type: "bar",
            name: "Third Class Passengers",
            marker: {
                color: "#B22222"
            }
        };

        var data = [trace1, trace2, trace3];

        var layout = {
            bargap: 0.01,
            bargroupgap: 0.01,
            barmode: "overlay",
            title: "Passenger Survival by Class",
            xaxis: {
                title: "Survived"
            },
            yaxis: {
                title: "Number of Passengers"
            }
        };

        // Set chart to be responsive 
        var config = {
            responsive: true
        }

        Plotly.newPlot("bar", data, layout, config);
    });
}


function plotSurvivedyClass() {
    var selection = dropDownSurvival.property("value");
    console.log(selection);

    if (selection === "all") {
        init();
    } else {
        d3.json(`/survived/${selection}`).then((data) => {
            // Grab values from the data json object to build the plots
            console.log(data);
            var survivedArray = [0, 1];
            switch (selection) {
                case "1st":
                    var trace1 = {
                        x: survivedArray,
                        y: data,
                        type: "bar",
                        name: "First Class Passengers",
                        marker: {
                            color: "#4682B4"
                        }
                    };
                    break;
                case "2nd":
                    var trace1 = {
                        x: survivedArray,
                        y: data,
                        type: "bar",
                        name: "Second Class Passengers",
                        marker: {
                            color: "#808000"
                        }
                    };
                    break;
                case "3rd":
                    var trace1 = {
                        x: survivedArray,
                        y: data,
                        type: "bar",
                        name: "Third Class Passengers",
                        marker: {
                            color: "#B22222"
                        }
                    };
                    break;
            }
    
            var data = [trace1];
    
            var layout = {
                bargap: 0.01,
                bargroupgap: 0.01,
                barmode: "overlay",
                title: "Passenger Survival by Class",
                xaxis: {
                    title: "Survived"
                },
                yaxis: {
                    title: "Number of Passengers"
                }
            };
    
            // Set chart to be responsive 
            var config = {
                responsive: true
            }
    
            Plotly.newPlot("bar", data, layout, config);
        });
    }
}




function init() {
    plotHist();
    plotBar();
}

init();