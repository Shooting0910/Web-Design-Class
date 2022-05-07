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
    // const icons = {
    //     scooter: {
    //         icon: "./pic/scooter_icon.svg",
    //     },
    //     food: {
    //         icon: "./pic/Group 400.svg",
    //     },
    //     place:{
    //         icon:"./pic/Group 397.svg"
    //     },
    //     park:{
    //         icon:"./pic/Group 398.svg"
    //     }
    // };

    // const features = [
    //     {
    //         position: new google.maps.LatLng(22.9969253, 120.2222067),
    //         type: "scooter",
    //     },
    //     {
    //         position: new google.maps.LatLng(22.9849686, 120.2168692),
    //         type: "food",
    //     },
    //     {
    //         position: new google.maps.LatLng(23.0058263, 120.2174345),
    //         type: "food",
    //     },
    //     {
    //         position: new google.maps.LatLng(22.9864615, 120.2146283),
    //         type: "food",
    //     },
    //     {
    //         position: new google.maps.LatLng(23.0087593, 120.2093936),
    //         type: "food",
    //     },
    //     {
    //         position: new google.maps.LatLng(22.9930141, 120.2267743),
    //         type: "food",
    //     },
    //     {
    //         position: new google.maps.LatLng(22.9882692, 120.212799),
    //         type: "food",
    //     },
    //     {
    //         position: new google.maps.LatLng(22.9936595, 120.1918606),
    //         type: "place",
    //     },
    //     {
    //         position: new google.maps.LatLng(22.9973518, 120.2005071),
    //         type: "place",
    //     },
    //     {
    //         position: new google.maps.LatLng(22.9917925, 120.2003345),
    //         type: "place",
    //     },
    //     {
    //         position: new google.maps.LatLng(23.0015754, 120.2138934),
    //         type: "park",
    //     },
    //     {
    //         position: new google.maps.LatLng(23.0023909, 120.2184348),
    //         type: "park",
    //     },
    //     {
    //         position: new google.maps.LatLng(23.002052, 120.2204054),
    //         type: "park",
    //     },
    //     {
    //         position: new google.maps.LatLng(23.0006228, 120.2141547),
    //         type: "park",
    //     },
    //     {
    //         position: new google.maps.LatLng(22.9989394, 120.2144953),
    //         type: "park",
    //     },
    //     {
    //         position: new google.maps.LatLng(22.996328, 120.2199842),
    //         type: "park",
    //     },
    //     {
    //         position: new google.maps.LatLng(22.9956073, 120.2022019),
    //         type: "park",
    //     },
    //     {
    //         position: new google.maps.LatLng(22.9922232, 120.2215161),
    //         type: "park",
    //     },
    // ];

    // Create markers.
    // for (let i = 0; i < features.length; i++) {
    //     const marker = new google.maps.Marker({
    //     position: features[i].position,
    //     icon: icons[features[i].type].icon,
    //     map: map,
    //     });
    // }

    //Loading data
    var ob={
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [120.1950812, 22.999562]
                },
                "properties": {
                    "id": 1,
                    "type":"food",
                    "icon": "./pic/Group 444.svg",
                    "name": "喝我咖啡 Hold My Cafe‘ ",
                    "starrate": "4.8",
                    "pic": "./pic/img 1.jpeg",
                    "site":"700 台南市中西區康樂街 282 巷 23 號",
                    "distance":"Nearest Wara station 4.1 km",
                    "phone":"-"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [120.1943521, 22.9975715]
                },
                "properties": {
                    "id": 2,
                    "type":"place",
                    "icon": "./pic/Group 456.svg",
                    "name": "神農街",
                    "starrate": "4.5",
                    "pic": "./pic/img 2.jpeg",
                    "site":"700 台南市中西區神農街",
                    "distance":"Nearest Wara station 1.8 km",
                    "phone":"-"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [120.1932231, 22.9961912]
                },
                "properties": {
                    "id": 3,
                    "type":"food",
                    "icon": "./pic/Group 444.svg",
                    "name": "品果原萃鍋燒專賣 ",
                    "starrate": "4.8",
                    "pic": "./pic/img 3.png",
                    "site":"700 台南市中西區康樂街 253 號",
                    "distance":"Nearest Wara station 3.1 km",
                    "phone":"0981779090"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [120.1933809, 22.9959239]
                },
                "properties": {
                    "id": 4,
                    "type":"food",
                    "icon": "./pic/Group 444.svg",
                    "name": "一緒二咖啡",
                    "starrate": "4.5",
                    "pic": "./pic/img 4.jpeg",
                    "site":"700 台南市中西區康樂街 160 號",
                    "distance":"Nearest Wara station 1.1 km",
                    "phone":"062216813"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [120.194715, 22.993862]
                },
                "properties": {
                    "id": 5,
                    "type":"hide"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [120.1893777, 22.9934593]
                },
                "properties": {
                    "id": 6,
                    "type":"place",
                    "icon": "./pic/Group 446.svg",
                    "name": "河樂廣場 The Spring",
                    "starrate": "4.4",
                    "pic": "./pic/img 5.jpeg",
                    "site":"700 台南市中西區中正路 343-20 號",
                    "distance":"Nearest Wara station 2 km",
                    "phone":"-"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [120.1988343, 22.9932687]
                },
                "properties": {
                    "id": 7,
                    "type":"place",
                    "icon": "./pic/Group 446.svg",
                    "name": "蝸牛巷",
                    "starrate": "4.0",
                    "pic": "./pic/img 6.jpeg",
                    "site":"700 台南市中西區永福路二段",
                    "distance":"Nearest Wara station 0.5 km",
                    "phone":"-"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [120.200893, 22.992257]
                },
                "properties": {
                    "id": 8,
                    "type":"hide"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [120.2011744, 22.9946627]
                },
                "properties": {
                    "id": 9,
                    "type":"food",
                    "icon": "./pic/Group 441.svg",
                    "name": "小赤佬干鍋 忠義店",
                    "starrate": "4.4",
                    "pic": "./pic/img 7.jpeg",
                    "site":"700 台南市中西區忠義路二段 139 號",
                    "distance":"Nearest Wara station 0.2 km",
                    "phone":"-"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [120.1982165, 22.9973567]
                },
                "properties": {
                    "id": 10,
                    "type":"place",
                    "icon": "./pic/Group 446.svg",
                    "name": "赤崁樓",
                    "starrate": "4.3",
                    "pic": "./pic/img 8.jpeg",
                    "site":"700 台南市中西區民族路二段 212 號",
                    "distance":"Nearest Wara station 0.5 km",
                    "phone":"062205647"
                }
            }
        ]
    }

    map.data.addGeoJson(ob);
    // map.data.addGeoJson(ob);
    // Data.setStyle() 方法來指定資料外觀
    map.data.setStyle(function(feature) {
        return { 'icon': feature.getProperty('icon') };
    });
    
    map.data.addListener('click', function(event) {
        document.getElementById('cardback').style.height=" 55% " ;
        document.getElementById('name').textContent =
        event.feature.getProperty('name');
        document.getElementById('starrate').textContent =
        event.feature.getProperty('starrate');
        document.getElementById('address').textContent =
        event.feature.getProperty('site');
        document.getElementById('parkinfo').textContent =
        event.feature.getProperty('distance');
        document.getElementById('phone').textContent =
        event.feature.getProperty('phone');
        document.getElementById('pic').src =
        event.feature.getProperty('pic');
    });



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