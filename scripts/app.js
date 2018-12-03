// define globals
var weekly_quakes_endpoint = "http://geocoder.default.dev.gswkbook.com"

$(document).ready(function() {
  console.log("Let's get coding!");

  $.ajax({
    url: weekly_quakes_endpoint,
    method: 'GET',
    success: mapSuccess,
    error: mapError
  })

  var mapTitles;
  var pinLocation;

  // //functions
  function initMap(response) {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.78, lng: -122.44},
      zoom: 2
    });
    for(let i = 0; i < response.length; i++){
      var latLng = new google.maps.LatLng(response[i].lat,response[i].lon);
      var image = {
        url: './images/earthquake.png',
        size: new google.maps.Size(20, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32),
        scaledSize: new google.maps.Size(25, 25)
      }
      var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        icon: image,
      });
    };
  }

  function mapSuccess(response){
    for(let i = 0; i < response.length; i++){
    mapTitles = JSON.parse(response[i].address).address
    $('#info').append("<p>" + mapTitles +"</p>")
    }
    initMap(response);
    console.log(response);
  };

  function mapError(error1, error2, error3){
    console.log(error1);
    console.log(error2);
    console.log(error3);
  };
});
