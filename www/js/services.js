angular.module('starter.services', [])

    .service('UDPService', function($q) {
      return {
        createAndBind: function(port) {
          var deferred = $q.defer();
          var promise = deferred.promise;

          chrome.sockets.udp.create(function(createInfo) {
            chrome.sockets.udp.bind(createInfo.socketId, '0.0.0.0', port, function(result) {
              deferred.resolve(createInfo.socketId);
            }, function(){
              deferred.reject();
            });
          });

          promise.success = function(fn) {
            promise.then(fn);
            return promise;
          }
          promise.error = function(fn) {
            promise.then(null, fn);
            return promise;
          }
          return promise;
        },

        registerReceiveListener: function(fn){
          chrome.sockets.udp.onReceive.addListener(fn);
        },

        sendBroadcast: function(soid, port, data) {
            chrome.sockets.udp.send(soid, data, '255.255.255.255', port, function(result) {
              if (result < 0) {
                console.log('send fail: ' + result);
              } else {
                console.log('sendTo: success ' + port);
              }
            });
        }
      }
    })
