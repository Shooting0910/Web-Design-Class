let map, infoWindow, marker;

function initMap() {

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
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e9e9e9"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dedede"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#333333"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
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
            icon: "./pic/food.svg",
        },
        place:{
            icon:"./pic/location.png"
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
            position: new google.maps.LatLng(22.9936595, 120.1918606),
            type: "place",
        },
        {
            position: new google.maps.LatLng(22.990786, 120.2305143),
            type: "place",
        },
    ];

    // Create markers.
    for (let i = 0; i < features.length; i++) {
        const markers = new google.maps.Marker({
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
                // map.setCenter(pos);

                //--------下面是呼叫一個新marker------
                marker = new google.maps.Marker({
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