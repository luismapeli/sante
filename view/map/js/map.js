mapboxgl.accessToken = 'pk.eyJ1IjoibXUxMjMiLCJhIjoiY2tvZXBvZ3I3MDBhaTJ2bnNraTV1MjJlbCJ9.EmhtHQ56ddv8bkOT8gIEUw';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
zoom: 10,
center: [-46.6388, -23.5489]
});

// Fetch stores from API
async function getStores() {
    const res = await fetch('/api/v1/stores');
    const data = await res.json();
  
    const stores = data.data.map(store => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            store.location.coordinates[0],
            store.location.coordinates[1]
          ]
        },
        properties: {
          'storeId': store.storeId,
          'icon': 'hospital',
          'description':
          `<strong>${store.storeId}</strong><p>${store.description}</p>`,
          
        }
      };
    });
  
    loadMap(stores);
  }
// Load map with stores
function loadMap(stores) {
    map.on('load', function() {
      map.addSource('places', {
      
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: stores,
            
          }
        });
        map.addLayer({
          id: 'places',
          type: 'symbol',
          source: 'places',
        layout: {
          'icon-image': '{icon}-15',
          'icon-size': 1.5,
          'text-field': '{storeId}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.9],
          'text-anchor': 'top'
        }
      });
      
      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
       });
  
       map.on('mouseenter', 'places', function (e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
  
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;
  
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
  
        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });
  
    map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
      
    });
    
  
  }

  getStores();