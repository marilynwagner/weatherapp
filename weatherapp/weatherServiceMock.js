angular.module('weather')
  .factory('weatherServiceMock', ['$http', '$q',
    function($http, $q) {
      
      function mockRetrieve() {
        var data = {
          "cod": "200",
          "message": 0.0046,
          "cnt": 1,
          "list": [
            {
              "dt": 1503630000,
              "main": {
                "temp": 292.41,
                "temp_min": 291.075,
                "temp_max": 292.41,
                "pressure": 995.66,
                "sea_level": 1029.99,
                "grnd_level": 995.66,
                "humidity": 52,
                "temp_kf": 1.34
              },
              "weather": [
                {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01n"
                }
              ],
              "clouds": {
                "all": 0
              },
              "wind": {
                "speed": 1.87,
                "deg": 317.5
              },
              "rain": {
                
              },
              "sys": {
                "pod": "n"
              },
              "dt_txt": "2017-08-25 03:00:00"
            }
          ]
        };
        
        var deferred = $q.defer();
        setTimeout(function() {
          deferred.resolve(data);
        }, 2000);

        return deferred.promise;
      }
      
      return {
        getForecast: function() {
          return mockRetrieve();
        }
      };
    }
    
    
    ]);