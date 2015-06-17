angular.module('starter.services', [])

    .service('UDPService', function() {

      var self = this;
      self.sockets = []; //0Ω” ’£¨ 1∑¢ÀÕ
      self.addr = '0.0.0.0';
      self.broadcastAddr = '255.255.255.255';
      self.port = 7758;

      self.init = function(){
        self.createSockets(2, function(){
          chrome.sockets.udp.bind(self.sockets[0].socketId, self.addr, self.port, function(bindResult) {});
          chrome.sockets.udp.bind(self.sockets[1].socketId, self.addr, self.port, function(bindResult) {});
        });
      }

      self.createSocket = function(properties, callback){
        if (typeof properties == 'function') {
          callback = properties;
          properties = {};
        }
        chrome.sockets.udp.create(properties, function(createInfo) {
          self.sockets.push(createInfo);
          callback();
        });
      }

      self.createSockets = function(count, callback){
        if (!count)
          return setTimeout(callback, 0);
        self.createSocket(self.createSockets.bind(null, count-1, callback));
      }

      self.registerReceiveListener = function(fn, error){
        chrome.sockets.udp.onReceive.addListener(fn);
        if (typeof error == 'function') {
          chrome.sockets.udp.onReceiveError.addListener(error);
        }
      }

      self.sendBroadcast = function(data) {
        chrome.sockets.udp.send(self.sockets[1].socketId, data, self.broadcastAddr, self.port, function(result) {
          if (result < 0) {
            console.log('send fail: ' + result);
          } else {
            console.log('sendTo: success ' + port);
          }
        });
      }
    })

    .service('FileService', function($q) {

      var onError = function (e) {
        console.log('[ERROR] Problem setting up root filesystem for test running! Error to follow.');
        console.log(JSON.stringify(e));
      };

      var self = this;

      self.init = function(){
        self.packageLength = 1470 - 11;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
          self.root = fileSystem.root;
        }, onError);
      }

      self.processPackage = function(buffer){
        var dv = new DataView(buffer);alert(dv)
        var type = dv.getInt8(0);alert(type)
        var id = dv.getInt8(1),
            pos = dv.getInt8(2),
            len = dv.getFloat64(3),
            data = buffer.subarray(11, buffer.length);

        //alert(type + "-" + id + "-" + pos + "-" + len)

        return {
          type : type,
          id : id,
          pos : pos,
          len : len,
          data : data
        }
      }

      self.createFile = function(fileName, success, error){
        self.root.getFile(fileName, {
          create : true
        }, success, error);
      }

      self.writeFile = function(fileName, position, data, onwriteend){
        // creates file, then write content
        self.createFile(fileName, function (fileEntry) {
          // writes file content
          fileEntry.createWriter(function (writer) {
            var verifier = function () {
              onwriteend && onwriteend();
            };
            //Write process
            writer.onwriteend = verifier;
            writer.seek(position);
            writer.write(data);
          }, function(){});
        }, function(){});
      }

      self.deleteEntry = function(name, success, error){
        // deletes entry, if it exists
        success = success || function() {};
        error = error || function() {};

        window.resolveLocalFileSystemURL(self.root.toURL() + '/' + name, function (entry) {
          if (entry.isDirectory === true) {
            entry.removeRecursively(success, error);
          } else {
            entry.remove(success, error);
          }
        }, success);
      }

    })
