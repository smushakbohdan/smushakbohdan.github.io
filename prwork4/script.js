let watchId = null;
let map = null;
let currentMarker = null;
let locationMarkers = [];
let collegeMarker = null;
let destinationMarker = null;
let firstLocation = true;
const collegeCoords = {
    latitude: 48.9226,
    longitude: 24.7111
};
function showStatus(message, type) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = message;
    statusDiv.className = 'status-' + type;
    statusDiv.style.display = 'block';

    if (type !== 'error') {
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 5000);
    }
}
function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}
function computeDistance(startCoords, destCoords) {
    const startLatRads = degreesToRadians(startCoords.latitude);
    const startLongRads = degreesToRadians(startCoords.longitude);
    const destLatRads = degreesToRadians(destCoords.latitude);
    const destLongRads = degreesToRadians(destCoords.longitude);
    const Radius = 6371; 
    const distance = Math.acos(
        Math.sin(startLatRads) * Math.sin(destLatRads) + 
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)
    ) * Radius;
    return distance;
}
function displayLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy;
    const timestamp = new Date(position.timestamp);
    console.log('Нова позиція отримана:', latitude, longitude);
    document.getElementById("latitude").textContent = latitude.toFixed(6);
    document.getElementById("longitude").textContent = longitude.toFixed(6);
    document.getElementById("accuracy").textContent = accuracy.toFixed(2) + " метрів";
    document.getElementById("lastUpdate").textContent = timestamp.toLocaleTimeString('uk-UA');
    const distance = computeDistance(position.coords, collegeCoords);
    document.getElementById("distance").textContent = distance.toFixed(2) + " км";
    showStatus('Локацію оновлено: ' + timestamp.toLocaleTimeString('uk-UA'), 'success');
    updateMap(latitude, longitude, accuracy, timestamp);
}
function displayError(error) {
    const errorMessages = {
        0: "Невідома помилка при визначенні локації",
        1: "Ви заборонили доступ до геолокації. Дозвольте доступ у налаштуваннях браузера.",
        2: "Локацію неможливо визначити. Перевірте підключення до інтернету.",
        3: "Час очікування визначення локації вичерпано. Спробуйте ще раз."
    };
    const errorMessage = errorMessages[error.code] || "Помилка визначення локації";
    showStatus(errorMessage, 'error');
    console.error("Geolocation error:", error);
}
function initMap() {
    map = L.map('map').setView([collegeCoords.latitude, collegeCoords.longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    collegeMarker = L.marker([collegeCoords.latitude, collegeCoords.longitude], {
        icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })
    }).addTo(map);
    collegeMarker.bindPopup(`
        <b>🏫 Коледж (Референсна точка)</b><br>
        Широта: ${collegeCoords.latitude}<br>
        Довгота: ${collegeCoords.longitude}
    `);
    showStatus('Карту ініціалізовано. Натисніть "Почати відстеження" для визначення вашої позиції', 'info');
}
function updateMap(latitude, longitude, accuracy, timestamp) {
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }
    currentMarker = L.marker([latitude, longitude], {
        icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })
    }).addTo(map);
    const distance = computeDistance({latitude, longitude}, collegeCoords);
    currentMarker.bindPopup(`
        <b>📍 Ваша поточна позиція</b><br>
        Широта: ${latitude.toFixed(6)}<br>
        Довгота: ${longitude.toFixed(6)}<br>
        Точність: ${accuracy.toFixed(2)} м<br>
        Час: ${timestamp.toLocaleTimeString('uk-UA')}<br>
        Відстань до коледжу: ${distance.toFixed(2)} км
    `).openPopup();
    const historyMarker = L.circleMarker([latitude, longitude], {
        radius: 6,
        fillColor: "#4CAF50",
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.7
    }).addTo(map);
    historyMarker.bindPopup(`
        <b>⏰ Історична точка</b><br>
        Координати: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}<br>
        Час: ${timestamp.toLocaleTimeString('uk-UA')}
    `);
    locationMarkers.push(historyMarker);
    if (firstLocation) {
        map.setView([latitude, longitude], 15);
        firstLocation = false;
    } else {
        map.panTo([latitude, longitude]);
    }
}
function watchLocation() {
    if (!navigator.geolocation) {
        showStatus('Ваш браузер не підтримує Geolocation API', 'error');
        return;
    }
    const options = {
        enableHighAccuracy: true, 
        timeout: 10000, 
        maximumAge: 0 
    };
    watchId = navigator.geolocation.watchPosition(
        displayLocation,
        displayError,
        options
    );
    document.getElementById("watchButton").disabled = true;
    document.getElementById("clearWatchButton").disabled = false;
    showStatus('Відстеження розпочато. Очікування GPS сигналу...', 'info');
}
function clearWatch() {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        document.getElementById("watchButton").disabled = false;
        document.getElementById("clearWatchButton").disabled = true;
        showStatus('Відстеження зупинено', 'info');
    }
}
function goToDestination() {
    const lat = parseFloat(document.getElementById('destLat').value);
    const lng = parseFloat(document.getElementById('destLng').value);
    if (isNaN(lat) || isNaN(lng)) {
        showStatus('Будь ласка, введіть коректні координати!', 'error');
        return;
    }
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        showStatus('Координати поза допустимими межами!', 'error');
        return;
    }
    if (destinationMarker) {
        map.removeLayer(destinationMarker);
    }
    destinationMarker = L.marker([lat, lng], {
        icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })
    }).addTo(map);
    destinationMarker.bindPopup(`
        <b>🎯 Пункт призначення</b><br>
        Широта: ${lat.toFixed(6)}<br>
        Довгота: ${lng.toFixed(6)}
    `).openPopup();
    map.setView([lat, lng], 15);
    showStatus('Переміщено до пункту призначення', 'success');
}
window.onload = function() {
    console.log("Сторінка завантажена, ініціалізація...");
    initMap();
    document.getElementById("watchButton").addEventListener("click", watchLocation);
    document.getElementById("clearWatchButton").addEventListener("click", clearWatch);
    document.getElementById("goToDestination").addEventListener("click", goToDestination);
    console.log("Ініціалізація завершена");
};
