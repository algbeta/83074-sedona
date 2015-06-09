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
    //picturefill snippet
    document.createElement( "picture" );

    //svg injection
    var svgs = document.querySelectorAll('.page-footer__copyright-author-link img, .page-footer__link img');
    SVGInjector(svgs);

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
                        if(this.classList.contains('survey-complex-value__decrease--travel'))removeTraveler();
                }else if(this.classList.contains('survey-complex-value__increase') &&
                        (input.attributes.max ? input.value < input.attributes.max.value : true)){
                        input.value = Number(input.value) +  1;
                        if(this.classList.contains('survey-complex-value__increase--travel'))addTraveler(template.innerHTML);
                }
            });
        }
    }
    initFormPreview();

}());

function addTraveler(html){
    var li = document.createElement('li')
    li.classList.add('survey-travelers__item');
    li.innerHTML = html;
    document.querySelector("#travelers").appendChild(li);
};

function removeTraveler(){
    document.querySelector("#travelers").removeChild(
        document.querySelector('#travelers li:last-child'));
}

function initPopups(){
    var submitBtn = document.querySelector(".survey__field-value-submit");

    submitBtn.addEventListener('click', function(e){
        document.querySelector('.popup--failure').classList.add('popup--visible');
    });

    document.querySelector('.popup--failure .popup__btn').addEventListener('click',function(e){
        document.querySelector('.popup--failure').classList.remove('popup--visible');
        document.querySelector('.popup--success').classList.add('popup--visible');
    });

    document.querySelector('.popup--success .popup__btn').addEventListener('click', function(e){
        document.querySelector('.popup--success').classList.remove('popup--visible');
    });
};

function initFormPreview(){
    if (!("FormData" in window) || !("FileReader" in window)) {
        return;
    }

    var form = document.querySelector("#survey");
    if(form) {
        form.querySelector("#fileInput").addEventListener("change", function () {
            var files = this.files;
            for (var i = 0; i < files.length; i++) {
                preview(files[i]);
            }
        });
    }

};

function preview(file){
    if(file.type.match(/image.*/)){
        var reader = new FileReader();
        reader.addEventListener('load', function(event){

            var li = document.createElement('li');
            li.classList.add('survey-gallery__item');
            li.innerHTML = document.querySelector('#imagePreview').innerHTML;

            var img = document.createElement("img");
            img.src = event.target.result;
            img.alt = file.name;
            img.classList.add('survey-galley__item-image');

            li.appendChild(img);

            li.querySelector('.survey-gallery__item-close').addEventListener('click', function(e){
                document.querySelector(".survey-gallery").removeChild(e.target.parentNode);
            });

            li.querySelector('.survey-gallery__item-name').innerHTML = file.name;

            document.querySelector('.survey-gallery').appendChild(li);

        });

        reader.readAsDataURL(file);
    }
}
