// Global variables
var a = 0;
var b = 0;
var c = 0;
var n = 0;
var x = new Array();
var y = new Array();
var v = new Array();

function calculateY(a, b, c, x) {
    return a * Math.sin(b * x + c);
}

function calculate() {
    a = Number($('#a').val());
    b = Number($('#b').val());
    c = Number($('#c').val());
    var xmin = Number($('#xmin').val());
    var xmax = Number($('#xmax').val());
    var xt = 0;

    var i = 0;
    for (xt = xmin; xt <= xmax; xt++) {
        x[i] = xt;
        y[i] = calculateY(a, b, c, xt);
        v[i] = [x[i], y[i]];
        i++;
    }
    n = i - 1;

}

function displayValues()
{
   var s = "";

    s = "Y = " + a + "sin(";
    s+= b + "x + " + c + ")<br/><br/>";

    for (var i = 0; i <= n; i++)
    {
        s += " X = " + x[i] + " Y = " + y[i].toFixed(2) + "<br/>";
    }


        output.innerHTML = s;
}

function plotValues()
{
   calculate();
   chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'line',
                marginRight: 130,
                marginBottom: 25
            },
            title: {
                text: 'Sine Wave Equation: y = a sin(bx + c)',
                x: -20 //center
            },
            xAxis: {
                title: {
                    text: 'Frequency'
                }
            },
            yAxis: {
                title: {
                    text: 'Amplitude'
                }
            },

       plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: '#000000'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    }
                }
            },

       series: [{
                name: 'Sine Wave Values',
                color: '#000000',
                data: v
       }]
   })
}


function calculateFunction(){

calculate();
displayValues();

}

function plotFunction(){

  calculate();
  plotValues();
}


/*
document.getElementById("calculate").addEventListener("click", function(){
  calculate();
  displayValues();
} );

document.getElementById("plot").addEventListener("click", function(){
  calculate();
  plotValues();
} );

*/

/*
$('#calculate').click( function() {
     calculate();
     displayValues();
});

$('#plot').click( function() {
     calculate();
     plotValues();
});
*/
