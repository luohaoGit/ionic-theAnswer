angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.data = {};
  $scope.data.slides = [

  ];

  $scope.generateData = function(){
    $scope.data.slides = [];
    for(var i=1; i<=5; i++){
      var item = {
        title : "Slide " + i,
        data  : "http://d.hiphotos.baidu.com/zhidao/pic/item/562c11dfa9ec8a13e028c4c0f603918fa0ecc0e4.jpg"
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
