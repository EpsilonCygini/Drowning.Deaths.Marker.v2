// Function to check if coordinates are within Uttar Pradesh boundaries
function isWithinUttarPradesh(lat, lng) {
    return lat >= 24.396308 && lat <= 31.100096 && lng >= 80.058479 && lng <= 88.202021;
}

// Initialize the map
var map = L.map('map').setView([27.5, 80.5], 7); // Centered on Uttar Pradesh, India

// Load the base map layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Function to add markers
function addMarkers(data, markerIcon) {
    data.forEach(function(item) {
        var lat = parseFloat(item.Latitude);
        var lng = parseFloat(item.Longitude);

        // Check if the coordinates are within Uttar Pradesh
        if (isWithinUttarPradesh(lat, lng)) {
            var marker = L.marker([lat, lng], {icon: markerIcon}).addTo(map);
            marker.bindPopup("<b>" + item.Name + "</b><br>Reason: " + item.Reason + "<br>Place: " + item.Place + "<br>Time: " + item.Time);
        } else {
            console.log("Location outside Uttar Pradesh: ", [lat, lng]);
        }
    });
}

// Create icon objects for red and blue markers
var redIcon = L.icon({
    iconUrl: 'red.png',
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
});

var blueIcon = L.icon({
    iconUrl: 'blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

// Fetch and parse the first CSV file
Papa.parse('data1.csv', {
    download: true,
    header: true,
    complete: function(results) {
        addMarkers(results.data, redIcon);
    }
});

// Fetch and parse the second CSV file
Papa.parse('data2.csv', {
    download: true,
    header: true,
    complete: function(results) {
        addMarkers(results.data, blueIcon);
    }
});
