let windowWidth = document.documentElement["clientWidth"];

window.onresize = function() {
    location.reload();
}

queue()
    .defer(d3.csv, "racedata.csv")
    .await(makeGraph);

function makeGraph(error, transactionsData) {
    let ndx = crossfilter(transactionsData);

    let chartWidth = 300;

    if (windowWidth < 768) {
        chartWidth = windowWidth;
    }
    else {
        chartWidth = windowWidth / 5;
    }

    let jockeyWinnersDim = ndx.dimension(dc.pluck("jockey"));

    let jockeyWinnersGroup = jockeyWinnersDim.group();

    let jockeyWinnersPie = dc.pieChart("#winningJockey");

    jockeyWinnersPie
        .width(chartWidth)
        .radius(chartWidth / 2)
        .group(jockeyWinnersGroup)
        .dimension(jockeyWinnersDim);

    let trainerWinnersDim = ndx.dimension(dc.pluck("trainer"));

    let trainerWinnersGroup = trainerWinnersDim.group();

    let trainerWinnersPie = dc.pieChart("#winningTrainer");

    trainerWinnersPie
        .width(chartWidth)
        .radius(chartWidth / 2)
        .group(trainerWinnersGroup)
        .dimension(trainerWinnersDim);

    let raceGradeDim = ndx.dimension(dc.pluck("grade"));

    let raceGradeGroup = raceGradeDim.group();

    let raceGradePie = dc.pieChart("#raceGrade");

    raceGradePie
        .width(chartWidth)
        .radius(chartWidth / 2)
        .group(raceGradeGroup)
        .dimension(raceGradeDim);


    dc.renderAll();
}
