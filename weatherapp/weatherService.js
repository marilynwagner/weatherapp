angular.module('weather')
  .factory('weatherService', ['$http', '$q',
    function($http, $q) {
      var lastAccess = null;
      var cache = {};
      
      function getForecastFromCache() {
        if (lastAccess === null) {
          lastAccess = new Date();
          //return mockRetrieve();
          return retrieveFreshData();
        }
        else {
          var now = new Date();
          var timeDiffInSeconds = (now.getTime() - lastAccess.getTime())/1000;
          lastAccess = new Date();
          if (timeDiffInSeconds > 600) {
            //return mockRetrieve();
            return retrieveFreshData();
          }
          else {
            var deferred = $q.defer();
            cache.data.message = cache.data.message + 1;
            setTimeout(function() {
              deferred.resolve(cache.data);
            }, 0);

            return deferred.promise;
          }
        }
          
      }
      
      function mockRetrieve() {
        cache.data = {
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
          deferred.resolve(cache.data);
        }, 2000);

        return deferred.promise;
      }
      
      function retrieveFreshData() {    // return a promise
        var apikey = '9ff374767fea87d4d3a55b5b6e70dab4';
        var deferred = $q.defer();
        $http.get('http://api.openweathermap.org/data/2.5/forecast?id=5746545&APPID='+apikey).then(
          function(result) {
            cache.data = result.data;  // leave the value in the cache, besides feeding it into deferred.resolve
            deferred.resolve(cache.data);
          },
          function(error) {
            // error case
          }
          );
        return deferred.promise;
      }
      
      return {
        getForecast: function() {
          return getForecastFromCache();
        }
      };
    }
    
    
    ]);