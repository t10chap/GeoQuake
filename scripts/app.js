var quakes_endpoint = "http://geocoder.default.dev.gswkbook.com";
var mapTitles;
var minimumMag = 0;

$(document).ready(function() {
  $.ajax({
    url: quakes_endpoint,
    method: 'GET',
    success: mapSuccess,
    error: mapError
  });

  $("#find").submit(function(event) {
    event.preventDefault();
    $.ajax({
      url: quakes_endpoint,
      method: 'GET',
      success: remap,
      error: mapError
    });
  });

  function initMap(response, minimumMag) {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.78, lng: -122.44},
      zoom: 2
    });
    for(let i = 0; i < response.length; i++){
      minimumMag = $(".mag").val();
      var magnitude = response[i].mag;
      if(magnitude >= minimumMag) {
        var latLng = new google.maps.LatLng(response[i].lat,response[i].lon);
        var image = {
          url: './images/earthquake.png',
          size: new google.maps.Size(20, 32),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 32),
          scaledSize: new google.maps.Size(25, 25)
        };
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          icon: image,
        });
      };
    };
  };

  function mapSuccess(response) {

    var response = response.sort(function(a, b) {
      return (a.mag > b.mag) ? -1 : ((b.mag > a.mag) ? 1 : 0)
    });
    
    console.log(response.length);
    for(let i = 0; i < response.length; i++){
      mapTitles = JSON.parse(response[i].address).address
      var magnitude = response[i].mag;
      var id = response[i].id;
      $('#info').append(`<p id=${id}> (${magnitude}) ${mapTitles} </p>`)
    };
    initMap(response, minimumMag);
    console.log(response);
  };

  function mapError(error1, error2, error3) {
    console.log(error1);
    console.log(error2);
    console.log(error3);
  };

  function remap(response) {
    $("#info").empty();
    minimumMag = $(".mag").val();
    for(let i = 0; i < response.length; i++){
      mapTitles = JSON.parse(response[i].address).address
      var magnitude = response[i].mag;
      if(magnitude >= minimumMag) {
        $('#info').append(`<p id=${magnitude}> ${mapTitles} </p>`)
      };
    };
    initMap(response, minimumMag);
    console.log(response);
  }
});