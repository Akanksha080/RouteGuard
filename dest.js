function initMap() {
    const input = document.getElementById('dest');
    const autocomplete = new google.maps.places.Autocomplete(input);
  
    // Set the Autocomplete options
    autocomplete.setFields(['formatted_address', 'geometry']);
  
    // Add a listener for place changes
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
  
      if (!place.geometry || !place.geometry.location) {
        // Invalid place, handle the error or show an error message
        console.error('Invalid destination');
        return;
      }
  
      const destination = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
  
      // Use the destination for further processing or calculations
      // e.g., calculate the route or display on the map
      console.log('Valid destination:', destination);
    });
  }
  
