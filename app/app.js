/* Register angular module with custom name myapp, all other Angular objects will add it to this custom angular module, 
Here Other Anulag objects used are Controller, Service, RouteProvider etc. */

var myapp = angular.module('myapp', ['ngRoute', 'ngResource'])
myapp.config(function ($routeProvider) {
    $routeProvider.
                when('/races/:roundId', {
                    templateUrl: 'app/views/racedetails.html',
                    controller: 'roundIDController'
                }).

                when('/drivers/:driverId', {
                    templateUrl: 'app/views/driverdetails.html',
                    controller: 'driverIDController'
                }).

                when('/teams/:constructorId', {
                    templateUrl: 'app/views/teamRaces.html',
                    controller: 'teamRacesController'
                }).

                when('/', {
                    templateUrl: 'app/views/drivers.html',
                    controller: 'driversController'
                }).  
                
                         
                otherwise({
                    redirectTo: '/'

                });
});


            
           
            

           