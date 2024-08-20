let autocomplete;
var auto_fields = ['a', 'b'];
var map;
var markerA, markerB;
var destina 
//= {lat: -6.111446780582118, lng: -38.20508043347166};
var destinb 
//= {lat: -6.112569414188123, lng: -38.20376537960393};


function initAutocomplete() {
  
  // Create the autocomplete object, restricting the search predictions to
  // addresses in the US and Canada.
  for (i = 0; i < auto_fields.length; i++) {
    var field = auto_fields[i]
  
    window['autocomplete_'+field] = new google.maps.places.Autocomplete(
      document.getElementById('address-' + field),
    {
       types: ['address'],
       fields: ["address_components", "geometry"],
       componentRestrictions: {'country': ["br"] },
    })
    }

  
  // When the user selects an address from the drop-down, populate the
  // address fields in the form.

  autocomplete_a.addListener("place_changed", function(){obterCoordenadas('a')});
  autocomplete_b.addListener("place_changed", function(){obterCoordenadas('b')});

  

}


function obterCoordenadas(addy) {
  // Obtenha o endereço do usuário
  
  //var point = 'point'+addy;
  var el_id = 'address-'+addy;
  var address = document.getElementById(el_id).value;
  //document.getElementById(point).innerHTML = address;

  // Crie um objeto Geocoder para converter o endereço em coordenadas
  var geocoder = new google.maps.Geocoder();

  // Use o Geocoder para converter o endereço em coordenadas
  geocoder.geocode({ address: address }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      // Se o Geocoder encontrar as coordenadas, exiba-as na página
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();

      window['destin'+addy] = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
      
    }
    
    initMap();
    
    if (destinb != "" && destina != ""){
      calcularRota();
    }

  });
  
}

function initMap() {

  
    // Crie um objeto LatLng para definir as coordenadas do centro do mapa
  //var center = new google.maps.LatLng(destina.lat(), destina.lng());

    

    map = new google.maps.Map(document.getElementById("map"), {
      center: destina,
      zoom: 16,
    });


    markerA = new google.maps.Marker({
      map: map,
      position: destina,
      label: "A",
      draggable: true, //torna o marcador arrastavel
      
    })

    markerB = new google.maps.Marker({
      map: map,
      position: destinb,
      label:"B",
      
      draggable: true, //torna o marcador arrastavel
      
    })

    markerA.addListener("dragend", function(event){

      
      var coordMarker = event.latLng;
      var latlng = new google.maps.LatLng(coordMarker);

      destina = latlng;
      //destinb = markerB.getPosition();

      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              //document.getElementById("pointa").innerHTML = results[0].formatted_address;
              markerA.setTitle(results[0].formatted_address);

              // seleciona o elemento input pelo ID
              var input = document.getElementById("address-a");
              // define o valor do atributo "value" do input
              input.value = results[0].formatted_address;

    }
  }
  })
      if(destinb != "") {
        calcularRota()};
    });

    markerB.addListener("dragend", function(event){

      
      var coordMarker = event.latLng;
      var latlng = new google.maps.LatLng(coordMarker);

      destinb = latlng;
      //destina = markerA.getPosition();

      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              //document.getElementById("pointb").innerHTML = results[0].formatted_address;
              markerB.setTitle(results[0].formatted_address);
              // seleciona o elemento input pelo ID
              var input = document.getElementById("address-b");
              // define o valor do atributo "value" do input
              input.value = results[0].formatted_address;
    }
  }
  })
    if(destina != "") {
    calcularRota()};
    });

    // Crie um objeto Map e associe-o ao elemento div #map
    
    //calcularRota();
  }



function calcularRota(){
  initMap();
  // Crie um objeto DirectionsService para calcular a rota
  var directionsService = new google.maps.DirectionsService();

  // Crie um objeto DirectionsRenderer para exibir a rota no mapa
  var directionsRenderer = new google.maps.DirectionsRenderer({
    //draggable: true,
    
  });

  // Associe o DirectionsRenderer ao mapa
  directionsRenderer.setMap(map);
  

  // Defina as coordenadas de origem e destino
  var origin = destina;
  var destination = destinb;

  // Crie um objeto DirectionsRequest para enviar a solicitação de rota
  var request = {
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING
  };

  markerA.setPosition(origin);
  markerB.setPosition(destination);
  
  
  // Envie a solicitação de rota para o DirectionsService
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsRenderer.setOptions( { suppressMarkers: true } );
      // Exiba a rota no mapa
      directionsRenderer.setDirections(result);
      // Obtenha as referências dos marcadores A e B
      
/*
      // Adicione o evento directions_changed para ser acionado quando a rota for alterada
      google.maps.event.addListener(directionsRenderer, "directions_changed", function () {
        var newResult = directionsRenderer.getDirections();
        var newMarkers = directionsRenderer.getMarkers();
        markerA = newMarkers[0];
        markerB = newMarkers[1];

      });
*/
      
      var distancia = result.routes[0].legs[0].distance.text;
      var duracao = result.routes[0].legs[0].duration.text;
      var valor = (result.routes[0].legs[0].distance.value /1000) * 2; 
      var inputVar = document.getElementById("valor");
      inputVar.value=valor.toFixed(2);
      var inputDis = document.getElementById("distancia");
      inputDis.value=distancia;
      var inputDur = document.getElementById("duracao");
      inputDur.value = duracao;
    }
  });
}



function CurrentLocation(){

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
    };
    destina = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //enableHighAccuracy: true;
    //maximumAge: 0;
    //timeout: 5000;
    var latlng = new google.maps.LatLng(pos.lat,pos.lng);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {

                var input = document.getElementById("address-a");
                // define o valor do atributo "value" do input
                input.defaultValue = results[0].formatted_address;
                input.value = results[0].formatted_address;
                document.getElementById("address-a").innerHTML = results[0].formatted_address;
            } else {
                document.getElementById("address-a").innerHTML = "Não foi possível encontrar sua localização.";
            }
          }
      });
      initMap();
      markerA.setPosition(destina);
      if(destinb != "") {
        calcularRota()};
    });

  
}
    
    
  }

  


window.initMap = initMap;
//window.onload = CurrentLocation;
window.initAutocomplete = initAutocomplete;