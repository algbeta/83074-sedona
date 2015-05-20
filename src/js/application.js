
function showMap(mapObjects, mapIconUrl){
    var centerlat = .0, centerlng = .0;

    for (var i = 0; i < mapObjects.length; i++) {
        centerlat += mapObjects[i].lat;
        centerlng += mapObjects[i].lng;
    }

   /* centerlat = centerlat / mapObjects.length + 0.5;    // +0.5 to fit map
    centerlng = mapObjects.length;*/
    var mapConfOptions = {
        zoom: 6,
        center: new google.maps.LatLng(centerlat, centerlng),
        zoomControl: true,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapConfOptions);

    for (i = 0; i < mapObjects.length; i++) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(mapObjects[i].lat, mapObjects[i].lng),
            map: map,
            icon: mapIconUrl
        });
    }
}