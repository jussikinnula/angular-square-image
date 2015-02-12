(function(){

var module = angular.module("angular-square-image", []);

module.directive('squareImage', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<img ng-src="{{ squareImage }}">',
    scope: {
      'image': '@'
    },
    link: function(scope, elem, attrs) {
      var img = new Image();
      img.crossOrigin = 'Anonymous';

      img.onload = function() {
        if (img.width === img.height) {
          console.log("Image width is the same as height");
          scope.squareImage = img.src;
        } else {
          var canvas = document.createElement('canvas');
          if (img.width > img.height) {
            canvas.width = img.height;
            canvas.height = img.height;
          } else {
            canvas.width = img.width;
            canvas.height = img.width;
          }
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          scope.squareImage = canvas.toDataURL('image/jpeg',1);
          scope.$apply();
        }
      };
      
      scope.$watch('image', function(value) {
        img.src = value;
      });
    }
  };
});

})();
