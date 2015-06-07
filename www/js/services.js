angular.module('starter.services', [])

    .service('UDPService', function($q) {

      var UDPService = function(){
        this.sockets = []; //0Ω” ’£¨ 1∑¢ÀÕ
        this.addr = '0.0.0.0';
        this.broadcastAddr = '255.255.255.255';
        this.port = 7758;

        this.createSockets(2, function(){
          this.bindRecv();
        });
      }

      UDPService.prototype = {
        createSocket : function(properties, callback){
          if (typeof properties == 'function') {
            callback = properties;
            properties = {};
          }
          chrome.sockets.udp.create(properties, function(createInfo) {
            this.sockets.push(createInfo);
            callback();
          });
        },

        createSockets : function(count, callback){
          if (!count)
            return setTimeout(callback, 0);
          this.createSocket(this.createSockets.bind(null, count-1, callback));
        },

        bindRecv : function(){
          chrome.sockets.udp.bind(this.sockets[0].socketId, this.addr, this.port, function(bindResult) {

          });
        },

        registerReceiveListener: function(fn){
          chrome.sockets.udp.onReceive.addListener(fn);
        },

        registerReceiveErrorListener: function(fn){
          chrome.sockets.udp.onReceiveError.addListener(fn);
        },

        sendBroadcast: function(data) {
          chrome.sockets.udp.send(this.sockets[1].socketId, data, this.broadcastAddr, this.port, function(result) {
            if (result < 0) {
              console.log('send fail: ' + result);
            } else {
              console.log('sendTo: success ' + port);
            }
          });
        },

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
        }
      }

      return UDPService;
    })

    .service('FileService', function($q) {

      var onError = function (e) {
        console.log('[ERROR] Problem setting up root filesystem for test running! Error to follow.');
        console.log(JSON.stringify(e));
      };

      var FileService = function(){
        this.packageLength = 1024 * 50 -11;

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
          this.root = fileSystem.root;
        }, onError);
      };

      FileService.prototype = {

        processPackage : function(data){
          var pack = {

          }

          return pack;
        },

        writeFile : function(filename, position, data, lastPackage){
          // creates file, then write content
          this.createFile(fileName, function (fileEntry) {
            // writes file content
            fileEntry.createWriter(function (writer) {
              var verifier = function () {
                if(lastPackage){
                  alert(this.root.toURL() + '/' + fileName)
                }
              };
              //Write process
              writer.onwriteend = verifier;
              writer.seek(position);
              writer.write(data);
            }, function(){});
          }, function(){});
        },

        createFile : function (fileName, success, error) {
          root.getFile(fileName, {
            create : true
          }, success, error);
        },

        deleteEntry : function(name, success, error){
          // deletes entry, if it exists
          success = success || function() {};
          error = error || function() {};

          window.resolveLocalFileSystemURL(this.root.toURL() + '/' + name, function (entry) {
            if (entry.isDirectory === true) {
              entry.removeRecursively(success, error);
            } else {
              entry.remove(success, error);
            }
          }, success);
        }
      }

      return FileService;
    })
