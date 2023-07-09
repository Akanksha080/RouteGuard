let watchId; // variable to hold the geolocation watch id

function startMonitoring() {
  // Clear any existing geolocation watch
  if (watchId) {
    clearInterval(watchId);
  }

  // Start watching the user's location
  watchId = setInterval(trackLocation, 30 * 1000);
}

function onPositionUpdate(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const currentLocation = { lat: latitude, lng: longitude };

  // Use the current location for further processing
  console.log('Current location:', currentLocation);

  // Call a function to compare the current location with the route and display warnings if off route
  checkOffRoute(currentLocation);
}

function onPositionError(error) {
  console.error('Error:', error.message);
}

function checkOffRoute(currentLocation) {
  const destination = document.getElementById('dest').value;

  // Use the Distance Matrix API to calculate the distance and travel time between current location and destination
  const distanceMatrixService = new google.maps.DistanceMatrixService();
  distanceMatrixService.getDistanceMatrix(
    {
      origins: [currentLocation],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING
    },
    (response, status) => {
      if (status === google.maps.DistanceMatrixStatus.OK) {
        const distance = response.rows[0].elements[0].distance.value;
        const duration = response.rows[0].elements[0].duration.value;

        // Set your own threshold values based on distance and duration
        const distanceThreshold = 1000; // in meters
        const durationThreshold = 300; // in seconds

        if (distance > distanceThreshold || duration > durationThreshold) {
          // User is off route, show a warning or take appropriate action
          showOffRouteWarning();
        }
      } else {
        console.error('Distance Matrix Error:', status);
      }
    }
  );
}

function showOffRouteWarning() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';
}

function ignoreRoute() {
  alert('You chose to ignore the off route warning.');
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
}

function shareLocation() {
  alert('You chose to share your location.');
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
}

function panicButton() {
  alert('You activated the panic button!');
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
}

function falseAlarm() {
  alert('You triggered a false alarm.');
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
}

function showMap() {
  const source = document.getElementById('source').value;
  const destination = document.getElementById('dest').value;
  window.open(`map.html?source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}`, '_blank');
}
  