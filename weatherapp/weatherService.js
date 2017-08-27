angular.module('weather')
  .factory('weatherService', ['$http', '$q',
    function($http, $q) {
      var lastAccess = null;
      var cache = {};
      
      function getForecastFromCache() {
        if (lastAccess === null) {  // this means first time in
          lastAccess = new Date();  // current Date and Time
          //return mockRetrieve();
          return retrieveFreshData();
        }
        else {  // if we are in here, we have data in cache and lastAcess is a valid time
          var now = new Date();   // current time
          var timeDiffInSeconds = (now.getTime() - lastAccess.getTime())/1000;  // subtract times, get difference in milliseconds, divide by 1000 to get seconds
          if (timeDiffInSeconds > 600) {
            lastAccess = new Date();
            //return mockRetrieve();
            return retrieveFreshData();
          }
          else {    // in this case, we want to simply return cache.data, but we must wrap it with a promise so that we are consistent with the other cases
            var deferred = $q.defer();  
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
            deferred.resolve(result.data);
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
