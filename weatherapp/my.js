angular.module('weather', [])
  .controller("weatherCtrl", ['$scope', 'weatherService', 'weatherServiceMock',
    function($scope, weatherSvc, weatherSvcMock) {
      $scope.weatherResults = [];
      
      $scope.loadWeather = function() {
        weatherSvc.getForecast().then(
          function(data) {
            $scope.message = data.message;
            parseData(data);
          },
          function(error) {
            // error
          }
        );
      };
      
      function parseData(data) {
        $scope.weatherResults = [];
        for (var i = 0; i < data.cnt; i++) {
          var item = data.list[i];  // item is a three hour forecast
          var obj = { 
            datetime: item.dt_txt,
            temp: convertKelvinsToF(item.main.temp),
            humidity: item.main.humidity,
            condition: item.weather[0].main,
            windspeed: item.wind.speed,
            winddir: item.wind.deg,
            pressure: item.main.pressure
          };
          $scope.weatherResults.push(obj);
        }
      }
      
      function convertKelvinsToF(k) {
        var num = (1.8*(k-273))+32;
        return parseFloat(num).toFixed(1);
      }
      
    }
  ]);