// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, UDPService, FileService, $timeout, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

      /*    $rootScope.files = {};
       UDPService.init();
       FileService.init();
       UDPService.registerReceiveListener(function(info){
       if(info.socketId == 0){
       var dataInfo = FileService.processPackage(info.data);
       var size = FileService.getPackageLength();
       if(!$rootScope.files[dataInfo.id]){
       var file = {};
       file.id = dataInfo.id;
       file.len = dataInfo.len;
       file.positions = {};
       var packageCount = parseInt(file.len / size) + ((file.len % size) > 0 ? 1 : 0);
       for(var i=0; i<packageCount; i++){
       file.positions[i*size] = 0;
       }
       $rootScope.files[dataInfo.id] = file;
       }

       var checkPos = function(id, position){
       alert(id + "--" + position)
       delete $rootScope.files[id].positions[position];
       if(Object.getOwnPropertyNames($rootScope.files[id].positions).length == 0){
       delete $rootScope.files[id];
       alert("�������");
       }
       }

       FileService.writeFile("img" + dataInfo.id + ".png", dataInfo.pos, dataInfo.data, checkPos(dataInfo.id, dataInfo.pos));
       }
       });*/

    navigator.startApp.check("com.yun.teacher", function(message) {
        navigator.startApp.start("com.yun.teacher", function(message) {
                console.log(message); // => OK
            },
            function(error) {
                alert(JSON.stringify(error));
            });
      },
      function(error) {
          alert(JSON.stringify(error));
      });

  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
    url: '/chats',
    views: {
      'tab-chats': {
        templateUrl: 'templates/tab-chats.html',
        controller: 'ChatsCtrl'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

  $ionicConfigProvider.tabs.position("bottom");
  $ionicConfigProvider.tabs.style("standard");

});
