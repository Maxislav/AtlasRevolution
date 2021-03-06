app.directive('marker', function(canvasRender){
    return {
        restrict: 'EA',
        scope: {
            name:'@name',
            device: '=device'
        },
        replace: true,
        template: '<canvas width="30" height="30"></canvas>',
        controller: function($scope, $element, $attrs){

            var canvas = $element[0]
            var context = canvas.getContext('2d');
            $scope.device._context = context;
            switch ($scope.device._state){
                case 'MOVE':
                    canvasRender.move(context,$scope.device.azimuth)
                    break;
                case 'NO_SIGNAL':
                    canvasRender.no_signal(context,$scope.device._colorState)
                    break;
                case 'STOP':
                    canvasRender.stop(context,$scope.device._colorState)
                    break;
            }
        }
    }
})
