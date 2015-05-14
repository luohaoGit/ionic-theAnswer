angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.data = {};
  $scope.data.slides = [

  ];

  $scope.generateData = function(){
    $scope.data.slides = [];
    var picUrl = [
        "http://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/fashion-backless.jpg",
        "http://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/fashion-front.jpg",
        "http://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/fashion-pair.jpg"
    ];
    for(var i=0; i<picUrl.length; i++){
      var item = {
        title : "Slide " + i,
        data  : picUrl[i]
      }
      $scope.data.slides.push(item);
    }
  }

  $scope.$on("$ionicView.loaded", function(){
    $scope.generateData();
  });

})

.controller('ChatsCtrl', function($scope) {

})

.controller('SettingsCtrl', function($scope) {

});
