var app = angular.module("test", []);
app.directive("myDirective", function () {
    return {
        restrict: "EA",
        scope: true,
        link: function (scope, elem, attr) {
            // code goes here ...
        }
    }
});