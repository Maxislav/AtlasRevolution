app.factory('factoryReportMarker', ['$compile', 'map', 'factoryGetOptions','factoryFormatDate', function ($compile, map, factoryGetOptions, factoryFormatDate) {
    var f = parseFloat;
    function getRadianAngle(degreeValue) {
        degreeValue = f(degreeValue);
        return degreeValue * Math.PI / 180;
    }
    function render(context, parms) {
        var color = getColor(parms.speed)
        if(parms.speed && 0<f(parms.speed)){
            context.translate(10,10);
            context.rotate(getRadianAngle(parseFloat(parms.azimuth)));
            context.beginPath();
            context.moveTo(0, -5);
            context.lineTo(4,5);
            context.lineTo(-4,5);
            context.fillStyle = color;
            context.fill();
            context.closePath();
            context.lineWidth = 1;
            context.strokeStyle = '#003300';
            context.stroke();
        }else{
            context.clearRect(0, 0, 20, 20);
            context.beginPath();
            context.arc(20 / 2, 20 / 2, 5, 0, 2 * Math.PI, false);
            context.fillStyle = color;
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = '#003300';
            context.stroke();
        }
    }

    function getColor(speed) {
        var limit = f(factoryGetOptions.limitSpeed);
        var step = limit / 5;
        speed = f(speed)
        var c,s;

        if (speed < step) { //(255,255,0) -> (0,255,0)
            c = 255 - (255 / step) * speed;
            c = c.toFixed(0);
            return 'rgb(' + c + ',255,0)';
        } else if (speed < 2 * step) { //(0,255,0) -> (0,255,255)
            s = speed - step
            c = (255 / step) * s;
            c = c.toFixed(0);
            return 'rgb(0,255,' + c + ')'
        } else if (speed < 3 * step) { //(0,255,255) - >(0,0,255)
            s = speed - (2 * step)
            c = 255 - (255 / step) * s;
            c = c.toFixed(0);
            return 'rgb(0,' + c + ',255)'
        } else if (speed < 4 * step) { //(0,0,255) - >(255,0,255)
            s = speed - (3 * step)
            c = (255 / step) * s;
            c = c.toFixed(0);
            return 'rgb(' + c + ',0,255)'
        } else if (speed < 5 * step) {//(255,0,255) - >(255,0,0)
            s = speed - (4 * step)
            c = 255 - (255 / step) * s;
            c = c.toFixed(0);
            return 'rgb(255,0,' + c + ')'
        } else {
            return 'rgb(255,0,0)'
        }
    }

    function divIcon(parms, device) {
        parms.imei = device.imei;
        parms.name = device.text;
        var dateString = factoryFormatDate.stringToGetTime(parms.dateTime)

        parms._time = angular.format.date(new Date(dateString), 'HH:mm:ss');
        parms._date = angular.format.date(new Date(dateString), 'dd:MM:yyyy');
        parms._dateString = dateString;
        var stringParrams = JSON.stringify(parms);
        var template = '<canvas width="20" height="20" marker-report='+stringParrams+'></canvas>';
        var linkFn = $compile(template);
        var content = linkFn(map.scope);
        var context = content[0].getContext('2d');

        render(context, parms)

        var icon = L.divIcon({
            className: 'my-div',
            iconAnchor: [10, 10],
            html: content
        });
        return icon
    }



    function addMarker(arr, device) {
        var arrMarkers = []
        for (var i = 0; i < arr.length; i++) {
            var marker = L.marker([f(arr[i].lat), f(arr[i].lng)], {icon: divIcon(arr[i], device)})
            arrMarkers.push(marker)
        }

        return  arrMarkers
    }

    return {
        addMarker: addMarker
    }
}])
