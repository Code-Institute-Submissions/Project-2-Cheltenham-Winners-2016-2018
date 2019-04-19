let windowWidth = document.documentElement["clientWidth"];

window.onresize = function() {
    location.reload();
}

queue()
    .defer(d3.csv, "racedata.csv")
    .await(makeGraph);

function makeGraph(error, transactionsData) {
    let ndx = crossfilter(transactionsData);

    let pieWidth = 600;

    if (windowWidth < 768) {
        pieWidth = windowWidth;
    }
    else {
        chartWidth = windowWidth/2.5;
    }

    let jockeyWinnersDim = ndx.dimension(dc.pluck("jockey"));

    let jockeyWinnersGroup = jockeyWinnersDim.group();

    let jockeyWinnersPie = dc.pieChart("#winningJockey");

    jockeyWinnersPie
        .height(350)
        .width(pieWidth)
        .radius(pieWidth/2)
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

    // let raceGradeDim = ndx.dimension(dc.pluck("favourite"));

    // let raceGradeGroup = raceGradeDim.group();

    // let raceGradePie = dc.pieChart("#raceFavourite");

    // raceGradePie
    //     .width(chartWidth)
    //     .radius(chartWidth / 2)
    //     .group(raceGradeGroup)
    //     .dimension(raceGradeDim);
        
    // let raceNameDim = ndx.dimension(dc.pluck("raceknownas"));

    // let raceNameGroup = raceNameDim.group();

    // let raceNamePie = dc.pieChart("#raceName");

    // raceNamePie
    //     .width(chartWidth)
    //     .radius(chartWidth / 2)
    //     .group(raceNameGroup)
    //     .dimension(raceNameDim);
        
        
        
    
    
    
        //---------Winning Jockey--------//
    var jockeyNames = ndx.dimension(function(d) {
        return d["jockey"];
    });
    var numJockeyNames = jockeyNames.group();

    selectField = dc.selectMenu('#jockey-select')
        .dimension(jockeyNames)
        .group(numJockeyNames);
    
    
    //---------Winning Trainer--------//    
    var trainerNames = ndx.dimension(function(d) {
        return d["trainer"];
    });
    var numTrainerNames = trainerNames.group();

    selectField = dc.selectMenu('#trainer-select')
        .dimension(trainerNames)
        .group(numTrainerNames);  
      
        
    //---------Race Name--------//    
    var raceNames = ndx.dimension(function(d) {
        return d["raceknownas"];
    });
    var numRaceNames = raceNames.group();

    selectField = dc.selectMenu('#raceName-select')
        .dimension(raceNames)
        .group(numRaceNames);  
    
    
    //---------Grade of Race--------//    
    var raceGrade = ndx.dimension(function(d) {
        return d["grade"];
    });
    var numRaceGrade = raceGrade.group();

    selectField = dc.selectMenu('#grade-select')
        .dimension(raceGrade)
        .group(numRaceGrade);
        
    
    //---------Winning Favourite--------//    
    var winningFav = ndx.dimension(function(d) {
        return d["favourite"];
    });
    var numWinningFav = winningFav.group();

    selectField = dc.selectMenu('#favourite-select')
        .dimension(winningFav)
        .group(numWinningFav);
        
        
     //---------Age--------//    
    var age = ndx.dimension(function(d) {
        return d["age"];
    });
    var numAge = age.group();

    selectField = dc.selectMenu('#age-select')
        .dimension(age)
        .group(numAge);
        
    







    dc.renderAll();
}
