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
};

(function(){

    //navbar menu actions
    var toggleButtons = document.querySelectorAll(".navbar__toggle-btn, .navbar__close");
    if(toggleButtons && toggleButtons.length > 0){
        //no foreach for nodelist :(
        for (var i = 0; i < toggleButtons.length; ++i){
            toggleButtons[i].addEventListener('click', function(){
                document.querySelector(".navbar__menu").classList.toggle('navbar__menu--expanded');
            });
        }
    }

    //form complex fields actions
    var complexValues = document.querySelectorAll(".survey-complex-value__decrease, .survey-complex-value__increase");
    if(complexValues && complexValues.length > 0){
        for(var i = 0; i < complexValues.length; ++i){
            complexValues[i].addEventListener('click', function(){
                //we always have only one input in complex value but not sure if min/max are always set so adding additional check
                var input = this.parentElement.querySelector('input');
                if(this.classList.contains('survey-complex-value__decrease') &&
                    ( input.attributes.min ? input.value >input.attributes.min.value : input.value > 0)){
                        input.value= Number(input.value) - 1;
                }else if(this.classList.contains('survey-complex-value__increase') &&
                        (input.attributes.max ? input.value < input.attributes.max.value : true)){
                        input.value = Number(input.value) +  1;
                }
            });
        }
    }


}());