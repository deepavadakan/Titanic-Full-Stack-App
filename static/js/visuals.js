// Select the dropdown
var dropDownAges = d3.select('#selectionAges');
var dropDownSurvival = d3.select('#selectionSurvival');

// color for bar charts
var firstClassColor = 'rgba(93, 164, 214, 0.5)';
var secondClassColor = 'rgba(255, 144, 14, 0.5)';
var thirdClassColor = 'rgba(44, 160, 101, 0.5)';

// Create event handlers 
dropDownAges.on('change', plotAgeByClass);
dropDownSurvival.on('change', plotSurvivedyClass);

// function to plot histogram for passenger ages by class
function plotHist() {
    // retrieve all ages of passengers by class
    d3.json('/age').then((weAPIdata) => {
        // Grab values from the data json object to build the plots
        console.log(weAPIdata);
        var firstClass = weAPIdata['1st'];
        var secondClass = weAPIdata['2nd'];
        var thirdClass = weAPIdata['3rd'];

        var trace1 = {
            x: firstClass,
            type: 'histogram',
            name: 'First Class Passengers',
            marker: {
                color: firstClassColor
            }
        };

        var trace2 = {
            x: secondClass,
            type: 'histogram',
            name: 'Second Class Passengers',
            marker: {
                color: secondClassColor
            }
        };

        var trace3 = {
            x: thirdClass,
            type: 'histogram',
            name: 'Third Class Passengers',
            marker: {
                color: thirdClassColor
            }
        };

        var data = [trace1, trace2, trace3];

        var layout = {
            bargap: 0.01,
            bargroupgap: 0.01,
            barmode: 'overlay',
            title: 'Passenger Ages by Class',
            xaxis: {
                title: 'Age'
            },
            yaxis: {
                title: 'Number of Passengers'
            }
        };

        // Set chart to be responsive 
        var config = {
            responsive: true
        }

        Plotly.newPlot('hist-passenger', data, layout, config);
    });
}

// Event handler function for the dropdown menu for Passenger Ages by Class
function plotAgeByClass() {
    // find the dropdown selection
    var selection = dropDownAges.property('value');
    console.log(selection);

    if (selection === 'all') {
        init();
    } else {
        // retrieve the liat of passenger ages for selected class
        d3.json(`/age/${selection}`).then((weAPIdata) => {
            // Grab values from the data json object to build the plots
            console.log(weAPIdata);
            switch (selection) {
                case '1st':
                    var trace1 = {
                        x: weAPIdata,
                        type: 'histogram',
                        name: 'First Class Passengers',
                        marker: {
                            color: firstClassColor
                        }
                    };
                    break;
                case '2nd':
                    var trace1 = {
                        x: weAPIdata,
                        type: 'histogram',
                        name: 'Second Class Passengers',
                        marker: {
                            color: secondClassColor
                        }
                    };
                    break;
                case '3rd':
                    var trace1 = {
                        x: weAPIdata,
                        type: 'histogram',
                        name: 'Third Class Passengers',
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
                barmode: 'overlay',
                title: 'Passenger Ages by Class',
                xaxis: {
                    title: 'Age'
                },
                yaxis: {
                    title: 'Number of Passengers'
                }
            };
    
            // Set chart to be responsive 
            var config = {
                responsive: true
            }
    
            Plotly.newPlot('hist-passenger', data, layout, config);
        });
    }
}

// function to draw a bar graph for passengers survival by class
function plotBar() {
    // retrieve the count of passenger survival by class
    d3.json('/survived').then((weAPIdata) => {
        // Grab values from the data json object to build the plots
        console.log(weAPIdata);
        var firstClass = weAPIdata['1st'];
        var secondClass = weAPIdata['2nd'];
        var thirdClass = weAPIdata['3rd'];
        var survivedArray = ['did not survive', 'survived'];
        var y = [];

        var trace1 = {
            x: survivedArray,
            y: firstClass,
            type: 'bar',
            name: 'First Class Passengers',
            marker: {
                color: firstClassColor
            }
        };

        var trace2 = {
            x: survivedArray,
            y: secondClass,
            type: 'bar',
            name: 'Second Class Passengers',
            marker: {
                color: secondClassColor
            }
        };

        var trace3 = {
            x: survivedArray,
            y: thirdClass,
            type: 'bar',
            name: 'Third Class Passengers',
            marker: {
                color: thirdClassColor
            }
        };

        var data = [trace1, trace2, trace3];

        var layout = {
            bargap: 0.01,
            bargroupgap: 0.01,
            barmode: 'overlay',
            title: 'Passenger Survival by Class',
            yaxis: {
                title: 'Number of Passengers'
            }
        };

        // Set chart to be responsive 
        var config = {
            responsive: true
        }

        Plotly.newPlot('bar-passenger', data, layout, config);
    });
}

// Event handler function for the dropdown menu for Passenger Survival by Class
function plotSurvivedyClass() {
    var selection = dropDownSurvival.property('value');
    console.log(selection);

    if (selection === 'all') {
        init();
    } else {
        // retrieve the count of passenger survival by class
        d3.json(`/survived/${selection}`).then((weAPIdata) => {
            // Grab values from the data json object to build the plots
            console.log(weAPIdata);
            var survivedArray = ['did not survive', 'survived'];
            switch (selection) {
                case '1st':
                    var trace1 = {
                        x: survivedArray,
                        y: weAPIdata,
                        type: 'bar',
                        name: 'First Class Passengers',
                        marker: {
                            color: firstClassColor
                        }
                    };
                    break;
                case '2nd':
                    var trace1 = {
                        x: survivedArray,
                        y: weAPIdata,
                        type: 'bar',
                        name: 'Second Class Passengers',
                        marker: {
                            color: secondClassColor
                        }
                    };
                    break;
                case '3rd':
                    var trace1 = {
                        x: survivedArray,
                        y: weAPIdata,
                        type: 'bar',
                        name: 'Third Class Passengers',
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
                barmode: 'overlay',
                title: 'Passenger Survival by Class',
                yaxis: {
                    title: 'Number of Passengers'
                }
            };
    
            // Set chart to be responsive 
            var config = {
                responsive: true
            }
    
            Plotly.newPlot('bar-passenger', data, layout, config);
        });
    }
}

// function to plot pie chart of passenger survival by class and gender
function plotPie() {
    // retrieve count of passenger survival by class and gender
    d3.json('/gender-class').then((weAPIdata) => {
        var allLabels = ['Female did not survive', 'Female survived', 'Male did not survive', 'Male survived'];
        console.log(`plotPie ${weAPIdata}`)
        var allValues = [
            weAPIdata['1st'],
            weAPIdata['2nd'],
            weAPIdata['3rd']
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
            title: 'First Class',
            'titlefont': {
                'size': 24
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
            title: 'Second Class',
            'titlefont': {
                'size': 24
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
            title: 'Third Class',
            'titlefont': {
                'size': 24
            }
        }];

        var layout = {
            height: 400,
            width: 1100,
            grid: {rows: 1, columns: 3},
            legend: {
                yanchor: 'bottom',
                y: 0.3,
                xanchor: 'bottom',
                x: 0.99
            }
        };

        Plotly.newPlot('pie-passenger', data, layout);
    });
}

function plotBoxPlot() {
    // retrieve count of passenger survival by class and age
    d3.json('/class-age').then((weAPIdata) => {
        var xData = ['First Class<br>Survived', 'First Class<br>Did not Survive',
        'Second Class<br>Survived', 'Second Class<br>Did not Survive',
        'Third Class<br>Survived', 'Third Class<br>Did not Survive'];

        var yData = [
            weAPIdata['1st 0'],
            weAPIdata['1st 1'],
            weAPIdata['2nd 0'],
            weAPIdata['2nd 1'],
            weAPIdata['3rd 0'],
            weAPIdata['3rd 1']
            ];
        var colors = [firstClassColor, firstClassColor, secondClassColor, secondClassColor, thirdClassColor, thirdClassColor];

        var data = [];

        for ( var i = 0; i < xData.length; i ++ ) {
            var result = {
                type: 'box',
                y: yData[i],
                name: xData[i],
                boxpoints: 'all',
                jitter: 0.5,
                whiskerwidth: 0.2,
                fillcolor: colors[i],
                marker: {
                    size: 2,
                    color: colors[i]
                },
                line: {
                    width: 1
                }
            };
            data.push(result);
        };

        layout = {
            title: 'Passenger Survival by Age and Class',
            yaxis: {
                title: 'Age',
                autorange: true,
                showgrid: true,
                zeroline: true,
                dtick: 5,
                gridcolor: 'rgb(255, 255, 255)',
                gridwidth: 1,
                zerolinecolor: 'rgb(255, 255, 255)',
                zerolinewidth: 2
            },
            
            paper_bgcolor: 'rgb(243, 243, 243)',
            plot_bgcolor: 'rgb(243, 243, 243)',
            showlegend: false
        };

        Plotly.newPlot('boxplot-passenger', data, layout);
    });
}

// initial function
function init() {
    plotHist();
    plotBar();
    plotPie();
    plotBoxPlot();
}

init();