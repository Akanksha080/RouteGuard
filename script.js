document.addEventListener('DOMContentLoaded', function() {
    var mapButton = document.getElementById('mapButton');
    mapButton.addEventListener('click', function() {
        var popup = window.open('map.html', '_blank', 'width=800,height=600');
    });
  });
  