// Select the dropdown
var dropDownAges = d3.select("#selectionAges");
var dropDownSurvival = d3.select("#selectionSurvival");

// color for bar charts
var firstClassColor = "rgb(0, 1, 102)";
var secondClassColor = "rgb(73, 134, 24)";
var thirdClassColor = "rgb(224, 224, 21)";

// Create event handlers 
dropDownAges.on("change", plotAgeByClass);
dropDownSurvival.on("change", plotSurvivedyClass);

// function to plot histogram for passenger ages by class
function plotHist() {
    // retrieve all ages of passengers by class
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
            opacity: 0.5,
            marker: {
                color: firstClassColor
            }
        };

        var trace2 = {
            x: secondClass,
            type: "histogram",
            name: "Second Class Passengers",
            opacity: 0.5,
            marker: {
                color: secondClassColor
            }
        };

        var trace3 = {
            x: thirdClass,
            type: "histogram",
            name: "Third Class Passengers",
            opacity: 0.5,
            marker: {
                color: thirdClassColor
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

// Event handler function for the dropdown menu for Passenger Ages by Class
function plotAgeByClass() {
    // find the dropdown selection
    var selection = dropDownAges.property("value");
    console.log(selection);

    if (selection === "all") {
        init();
    } else {
        // retrieve the liat of passenger ages for selected class
        d3.json(`/age/${selection}`).then((data) => {
            // Grab values from the data json object to build the plots
            console.log(data);
            switch (selection) {
                case "1st":
                    var trace1 = {
                        x: data,
                        type: "histogram",
                        name: "First Class Passengers",
                        opacity: 0.5,
                        marker: {
                            color: firstClassColor
                        }
                    };
                    break;
                case "2nd":
                    var trace1 = {
                        x: data,
                        type: "histogram",
                        name: "Second Class Passengers",
                        opacity: 0.5,
                        marker: {
                            color: secondClassColor
                        }
                    };
                    break;
                case "3rd":
                    var trace1 = {
                        x: data,
                        type: "histogram",
                        name: "Third Class Passengers",
                        opacity: 0.5,
                        marker: {
                            color: thirdClassColor
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

// function to draw a bar graph for passengers survival by class
function plotBar() {
    // retrieve the count of passenger survival by class
    d3.json("/survived").then((data) => {
        // Grab values from the data json object to build the plots
        console.log(data);
        var firstClass = data["1st"];
        var secondClass = data["2nd"];
        var thirdClass = data["3rd"];
        var survivedArray = ["survived", "did not survive"];
        var y = [];

        var trace1 = {
            x: survivedArray,
            y: firstClass,
            type: "bar",
            name: "First Class Passengers",
            opacity: 0.5,
            marker: {
                color: firstClassColor
            }
        };

        var trace2 = {
            x: survivedArray,
            y: secondClass,
            type: "bar",
            name: "Second Class Passengers",
            opacity: 0.5,
            marker: {
                color: secondClassColor
            }
        };

        var trace3 = {
            x: survivedArray,
            y: thirdClass,
            type: "bar",
            name: "Third Class Passengers",
            opacity: 0.5,
            marker: {
                color: thirdClassColor
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

// Event handler function for the dropdown menu for Passenger Survival by Class
function plotSurvivedyClass() {
    var selection = dropDownSurvival.property("value");
    console.log(selection);

    if (selection === "all") {
        init();
    } else {
        // retrieve the count of passenger survival by class
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
                        opacity: 0.5,
                        marker: {
                            color: firstClassColor
                        }
                    };
                    break;
                case "2nd":
                    var trace1 = {
                        x: survivedArray,
                        y: data,
                        type: "bar",
                        name: "Second Class Passengers",
                        opacity: 0.5,
                        marker: {
                            color: secondClassColor
                        }
                    };
                    break;
                case "3rd":
                    var trace1 = {
                        x: survivedArray,
                        y: data,
                        type: "bar",
                        name: "Third Class Passengers",
                        opacity: 0.5,
                        marker: {
                            color: thirdClassColor
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

// function to plot pie chart of passenger survival by class and gender
function plotPie() {
    // retrieve count of passenger survival by class and gender
    d3.json("/gender-class").then((data) => {
        var allLabels = ['Female did not survive', 'Female survived', 'Male did not survive', 'Male survived'];
        console.log(`plotPie ${data}`)
        var allValues = [
            data["1st"],
            data["2nd"],
            data["3rd"]
        ];

        var ultimateColors = [
        ['rgb(128,0,0)', 'rgb(205, 152, 36)', 'rgb(34, 53, 101)', 'rgb(0, 70, 204)'],
        ['rgb(128,0,0)', 'rgb(205, 152, 36)', 'rgb(34, 53, 101)', 'rgb(0, 70, 204)'],
        ['rgb(128,0,0)', 'rgb(205, 152, 36)', 'rgb(34, 53, 101)', 'rgb(0, 70, 204)']
        ];

        var data = [{
            values: allValues[0],
            labels: allLabels,
            type: 'pie',
            name: 'First Class',
            marker: {
                colors: ultimateColors[0]
            },
            domain: {
                row: 0,
                column: 0
            },
            hoverinfo: 'label+percent+name',
            textinfo: 'none',
            title: "First Class",
            "titlefont": {
                "size": 30,
            }
            },{
            values: allValues[1],
            labels: allLabels,
            type: 'pie',
            name: 'Second Class',
            marker: {
                colors: ultimateColors[1]
            },
            domain: {
                row: 0,
                column: 1
            },
            hoverinfo: 'label+percent+name',
            textinfo: 'none',
            title: "Second Class",
            "titlefont": {
                "size": 30,
            }
            },{
            values: allValues[2],
            labels: allLabels,
            type: 'pie',
            name: 'Third Class',
            marker: {
                colors: ultimateColors[2]
            },
            domain: {
                row: 0,
                column: 2
            },
            hoverinfo: 'label+percent+name',
            textinfo: 'none',
            title: "Third Class",
            "titlefont": {
                "size": 30,
            }
        }];

        var layout = {
            height: 400,
            width: 1000,
            grid: {rows: 1, columns: 3},
            legend: {
                yanchor: "bottom",
                y: 0.3,
                xanchor: "bottom",
                x: 0.99
            }
        };

        Plotly.newPlot('pie', data, layout);
    });
}

// initial function
function init() {
    plotHist();
    plotBar();
    plotPie();
}

init();