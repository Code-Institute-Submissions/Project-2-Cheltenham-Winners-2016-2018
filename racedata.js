let windowWidth = document.documentElement["clientWidth"];

window.onresize = function() {
    location.reload();
}

queue()
    .defer(d3.csv, "racedata1.csv")
    .await(makeGraph);

function makeGraph(error, transactionsData) {
    let ndx = crossfilter(transactionsData);

    let pieWidth = 600;

    if (windowWidth < 768) {
        pieWidth = windowWidth;
    }
    else {
        pieWidth = windowWidth/2.5;
    }

    let jockeyWinnersDim = ndx.dimension(dc.pluck("jockey"));

    let jockeyWinnersGroup = jockeyWinnersDim.group();

    let jockeyWinnersPie = dc.pieChart("#winningJockey");

    jockeyWinnersPie
        .height(350)
        .width(pieWidth)
        .radius(pieWidth/3)
        .group(jockeyWinnersGroup)
        .dimension(jockeyWinnersDim);

    let trainerWinnersDim = ndx.dimension(dc.pluck("trainer"));

    let trainerWinnersGroup = trainerWinnersDim.group();

    let trainerWinnersPie = dc.pieChart("#winningTrainer");

    trainerWinnersPie
        .height(350)
        .width(pieWidth)
        .radius(pieWidth/3)
        .group(trainerWinnersGroup)
        .dimension(trainerWinnersDim);

        
    let raceNameDim = ndx.dimension(dc.pluck("raceknownas"));

    let raceNameGroup = raceNameDim.group();

    let raceNamePie = dc.pieChart("#raceName");

    raceNamePie
        .height(350)
        .width(pieWidth)
        .radius(pieWidth/3)
        .group(raceNameGroup)
        .dimension(raceNameDim);
        
        
    
    
    //---------Winning Horse--------//    
    var horseNames = ndx.dimension(function(d) {
        return d["winner"];
    });
    var numHorseNames = horseNames.group();

    selectField = dc.selectMenu('#horse-select')
        .dimension(horseNames)
        .group(numHorseNames);  
      
        
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
        
    
    //---------Year--------//    
    var year = ndx.dimension(function(d) {
        return d["year"];
    });
    var numYear = year.group();

    selectField = dc.selectMenu('#year-select')
        .dimension(year)
        .group(numYear);
        
    







    dc.renderAll();
}
