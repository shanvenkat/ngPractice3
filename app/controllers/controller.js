
myapp.controller('driversController', function ($scope, $resource) {

    init();
    function init() {
        getPlaces();
    }

    function getPlaces() {
        var resource = $resource("http://ergast.com/api/f1/2013/driverStandings.json", { callback: "JSON_CALLBACK" }, { getDrivers: { method: "JSONP"} });

        resource.getDrivers().$promise.then(
                            function (response) {
                                $scope.drivers = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                                $scope.totalRecordsCount = response.MRData.StandingsTable.StandingsLists[0].DriverStandings.length;
                            },
                            function (error) {
                                console.log(error);
                            }
                        );
    };

});



myapp.controller('driverIDController', function ($scope, $routeParams, $http) {

    var driverId = $routeParams.driverId;
    var constructorId = $routeParams.constructorId;

    init();
    function init() {
        getDriverDetails();
        getDriverRaces();       
    }

    function getDriverDetails() {
        return $http({ method: 'JSONP', url: 'http://ergast.com/api/f1/2013/drivers/' + driverId + '/driverStandings.json?callback=JSON_CALLBACK' })
            .success(function (response) {
                $scope.driverDetails = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
            })
            .error(function () {
                console.log(error);
            });
    }

    function getDriverRaces() {
        return $http({ method: 'JSONP', url: 'http://ergast.com/api/f1/2013/drivers/' + driverId + '/results.json?callback=JSON_CALLBACK' })
            .success(function (response) {
                $scope.Races = response.MRData.RaceTable.Races;
            })
            .error(function () {
                console.log(error);
            });
    }

    


    /*function getTeams() {
    return $http({ method: 'JSONP', url: 'http://ergast.com/api/f1/2013/constructorStandings.json?callback=JSON_CALLBACK' })
    .success(function (response) {
    //$scope.Races = response.MRData.RaceTable.Races
    })
    .error(function () {
    console.log(error);
    });
    }

    function getTeamDetails() {
    return $http({ method: 'JSONP', url: 'http://ergast.com/api/f1/2013/constructors/' + id + '/constructorStandings.json?callback=JSON_CALLBACK' })
    .success(function (response) {
    //$scope.Races = response.MRData.RaceTable.Races
    })
    .error(function () {
    console.log(error);
    });
    }


    function getTeamRaces() {
    return $http({ method: 'JSONP', url: 'http://ergast.com/api/f1/2013/constructors/' + id + '/results.json?callback=JSON_CALLBACK' })
    .success(function (response) {
    //$scope.Races = response.MRData.RaceTable.Races
    })
    .error(function () {
    console.log(error);
    });
    }


    function getRaceWinners() {
    return $http({ method: 'JSONP', url: 'http://ergast.com/api/f1/2013/results/1.json?callback=JSON_CALLBACK' })
    .success(function (response) {
    //$scope.Races = response.MRData.RaceTable.Races
    })
    .error(function () {
    console.log(error);
    });
    }


    function getRaces() {
    return $http({ method: 'JSONP', url: 'http://ergast.com/api/f1/2013.json?callback=JSON_CALLBACK' })
    .success(function (response) {
    //$scope.Races = response.MRData.RaceTable.Races
    })
    .error(function () {
    console.log(error);
    });
    }*/
});



myapp.controller('roundIDController', function ($scope, $routeParams, $http) {

    var roundId = $routeParams.roundId;
    init();
    function init() {
        getRaceDetails();
        getQualiDetails();

    }

    function getRaceDetails() {
        return $http({ method: 'JSONP', url: 'http://ergast.com/api/f1/2013/' + roundId + '/results.json?callback=JSON_CALLBACK' })
            .success(function (response) {
                $scope.raceDetails = response.MRData.RaceTable.Races[0].Results;
            })
            .error(function () {
                console.log(error);
            });
    }


    function getQualiDetails() {
        return $http({ method: 'JSONP', url: 'http://ergast.com/api/f1/2013/' + roundId + '/qualifying.json?callback=JSON_CALLBACK' })
            .success(function (response) {
                //console.log(response.MRData.RaceTable.Races[0].QualifyingResults);
                $scope.qualifyingResults = response.MRData.RaceTable.Races[0].QualifyingResults;

            })
            .error(function () {
                console.log(error);
            });
    }

    $scope.pickTime = function (qval) {
        if (qval.hasOwnProperty("Q3")) {
            $scope.retval = qval.Q3;
        }
        else if (qval.hasOwnProperty("Q2")) {
            $scope.retval = qval.Q2;
        }
        else if (qval.hasOwnProperty("Q1")) {
            $scope.retval = qval.Q1;
        }
        return $scope.retval;
    }


});


myapp.controller('teamRacesController', function ($scope, $routeParams, $http) {
    var constructorId = $routeParams.constructorId;
    var headerNames = [];
    var headerCount = 0;
    
    init();
    function init() {

        getTeamRaces();
    }

    function getTeamRaces() {
        return $http({ method: 'JSONP', url: 'http://ergast.com/api/f1/2013/constructors/' + constructorId + '/results.json?callback=JSON_CALLBACK' })
            .success(function (response) {
                $scope.TeamRaces = response.MRData.RaceTable.Races;
                headerCount = response.MRData.RaceTable.Races[0].Results.length;
                if (headerCount == 2) {
                    $scope.headerFirst = response.MRData.RaceTable.Races[0].Results[0].Driver.familyName;
                    $scope.headerSecond = response.MRData.RaceTable.Races[0].Results[1].Driver.familyName;
                }
                else {
                    $scope.headerFirst = "No Title";
                    $scope.headerSecond = "No Title";
                }
            })
            .error(function () {
                console.log(error);
            });
    }

    $scope.totalPoints = function (p1, p2) {         
        retval = parseInt(p1) + parseInt(p2);        
        return $scope.retval = retval;
    }

})