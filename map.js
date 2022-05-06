let map, infoWindow, currentPositionMarker;

function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    // ---------------- 初始化地圖，並將地圖載入指定的 div 內 ----------------
    map = new google.maps.Map(document.getElementById("map"), {
        //可更改 latitude 緯度與 longitude 經度數值
        // 成大的經緯度
        center: { lat: 22.99891, lng: 120.21695 },
        //預設縮放大小，zoom 的數值可從 0 到 21
        zoom: 16,
        //移除控制項 ex:全螢幕按鈕
        mapTypeControl:false,
        fullscreenControl:false,
        zoomControl:false,
        streetViewControl:false,
        //設定地圖樣式
        styles:[
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            }
        ]
    });

    // ---------------- Customized Markers ----------------
    const icons = {
        scooter: {
            icon: "./pic/scooter_icon.svg",
        },
        food: {
            icon: "./pic/Group 400.svg",
        },
        place:{
            icon:"./pic/Group 397.svg"
        },
        park:{
            icon:"./pic/Group 398.svg"
        }
    };

    const features = [
        {
            position: new google.maps.LatLng(22.9969253, 120.2222067),
            type: "scooter",
        },
        {
            position: new google.maps.LatLng(22.9849686, 120.2168692),
            type: "food",
        },
        {
            position: new google.maps.LatLng(23.0058263, 120.2174345),
            type: "food",
        },
        {
            position: new google.maps.LatLng(22.9864615, 120.2146283),
            type: "food",
        },
        {
            position: new google.maps.LatLng(23.0087593, 120.2093936),
            type: "food",
        },
        {
            position: new google.maps.LatLng(22.9930141, 120.2267743),
            type: "food",
        },
        {
            position: new google.maps.LatLng(22.9882692, 120.212799),
            type: "food",
        },
        {
            position: new google.maps.LatLng(22.9936595, 120.1918606),
            type: "place",
        },
        {
            position: new google.maps.LatLng(22.9973518, 120.2005071),
            type: "place",
        },
        {
            position: new google.maps.LatLng(22.9917925, 120.2003345),
            type: "place",
        },
        {
            position: new google.maps.LatLng(23.0015754, 120.2138934),
            type: "park",
        },
        {
            position: new google.maps.LatLng(23.0023909, 120.2184348),
            type: "park",
        },
        {
            position: new google.maps.LatLng(23.002052, 120.2204054),
            type: "park",
        },
        {
            position: new google.maps.LatLng(23.0006228, 120.2141547),
            type: "park",
        },
        {
            position: new google.maps.LatLng(22.9989394, 120.2144953),
            type: "park",
        },
        {
            position: new google.maps.LatLng(22.996328, 120.2199842),
            type: "park",
        },
        {
            position: new google.maps.LatLng(22.9956073, 120.2022019),
            type: "park",
        },
        {
            position: new google.maps.LatLng(22.9922232, 120.2215161),
            type: "park",
        },
    ];

    // Create markers.
    for (let i = 0; i < features.length; i++) {
        const marker = new google.maps.Marker({
        position: features[i].position,
        icon: icons[features[i].type].icon,
        map: map,
        });
    }

    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");
    // locationButton.textContent = "Show Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // 先確認使用者裝置能不能抓地點
        if (navigator.geolocation) {
            //呼叫 JS 的 Geolocation API，跟使用者拿所在位置的經緯度，
            navigator.geolocation.getCurrentPosition(
                (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // infoWindow.setPosition(pos);
                // infoWindow.setContent("Location found.");
                // infoWindow.open(map);
                map.setCenter(pos);

                //--------下面是呼叫一個新marker------
                currentPositionMarker = new google.maps.Marker({
                    //marker的放置位置
                    position: { 
                        lat: position.coords.latitude, 
                        lng: position.coords.longitude,
                    },
                    icon:"./pic/my location.svg",
                    map: map
                }); 
                },
                () => {
                handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
        }
    
    });

    //call renderer to display directions
    directionsRenderer.setMap(map);

    const onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    };

    document.getElementById("start").addEventListener("change", onChangeHandler);
    document.getElementById("end").addEventListener("change", onChangeHandler);
    }

    function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService
        .route({
        // origin: {
        //     query: document.getElementById("start").value,
        // },
        // destination: {
        //     query: document.getElementById("end").value,
        // },
        origin: {
            query: features[i].position ,
        },
        destination: {
            query: features[i].position ,
        },
        // origin: features[i].position ,
        // destination: features[i].position,
        travelMode: google.maps.TravelMode.BICYCLING,
        })
        .then((response) => {
        directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed due to " + status));
        
}

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//     infoWindow.setPosition(pos);
//     infoWindow.setContent(
//         browserHasGeolocation
//         ? "Error: The Geolocation service failed."
//         : "Error: Your browser doesn't support geolocation."
//     );
//     infoWindow.open(map);
// }

window.initMap = initMap;