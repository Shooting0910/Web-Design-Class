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
    mapTypeControl: false,
    fullscreenControl: false,
    zoomControl: false,
    streetViewControl: false,
    //設定地圖樣式
    styles: [
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
    ],
  });

  const locationButton = document.getElementById("currentloc");
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

          map.setCenter(pos);

          //--------下面是呼叫一個新marker------
          currentPositionMarker = new google.maps.Marker({
            //marker的放置位置
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            icon: "./pic/my location.svg",
            map: map,
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

  //Loading data
  var attractinfo = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [120.19729234873174, 22.999375716846764],
        },
        properties: {
          id: 1,
          type: "food",
          icon: "./pic/Group 444.svg",
          name: "喝我咖啡 Hold My Cafe‘ ",
          starrate: "4.8",
          pic: "./pic/img 1.jpeg",
          site: "700 台南市中西區康樂街 282 巷 23 號",
          distance: "Nearest Wara station 4.1 km",
          phone: "-",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [120.19655692597934, 22.9977838594342],
        },
        properties: {
          id: 2,
          type: "place",
          icon: "./pic/attr_user.svg",
          name: "神農街",
          starrate: "4.5",
          pic: "./pic/img 2.jpeg",
          site: "700 台南市中西區神農街",
          distance: "Nearest Wara station 1.8 km",
          phone: "-",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [120.19581416407567, 22.996383809237784],
        },
        properties: {
          id: 3,
          type: "food",
          icon: "./pic/Group 444.svg",
          name: "品果原萃鍋燒專賣 ",
          starrate: "4.8",
          pic: "./pic/img 3.png",
          site: "700 台南市中西區康樂街 253 號",
          distance: "Nearest Wara station 3.1 km",
          phone: "0981779090",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [120.19546770878311, 22.996195519442722],
        },
        properties: {
          id: 4,
          type: "food",
          icon: "./pic/Group 444.svg",
          name: "一緒二咖啡",
          starrate: "4.5",
          pic: "./pic/img 4.jpeg",
          site: "700 台南市中西區康樂街 160 號",
          distance: "Nearest Wara station 1.1 km",
          phone: "062216813",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [120.1947177892477, 22.994116711919787],
        },
        properties: {
          id: 5,
          type: "hide",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [120.1940385683072, 22.993876765724156],
        },
        properties: {
          id: 6,
          type: "place",
          icon: "./pic/Group 446.svg",
          name: "河樂廣場 The Spring",
          starrate: "4.4",
          pic: "./pic/img 5.jpeg",
          site: "700 台南市中西區中正路 343-20 號",
          distance: "Nearest Wara station 2 km",
          phone: "-",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [120.20106058365114, 22.993510695625],
        },
        properties: {
          id: 7,
          type: "place",
          icon: "./pic/Group 446.svg",
          name: "蝸牛巷",
          starrate: "4.0",
          pic: "./pic/img 6.jpeg",
          site: "700 台南市中西區永福路二段",
          distance: "Nearest Wara station 0.5 km",
          phone: "-",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [120.20084197575547, 22.992474096640272],
        },
        properties: {
          id: 8,
          type: "hide",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [120.20335985439367, 22.99484543518141],
        },
        properties: {
          id: 9,
          type: "food",
          icon: "./pic/food_user.svg",
          name: "小赤佬干鍋 忠義店",
          starrate: "4.4",
          pic: "./pic/img 7.jpeg",
          site: "700 台南市中西區忠義路二段 139 號",
          distance: "Nearest Wara station 0.2 km",
          phone: "-",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [120.20306045515333, 22.997638953249623],
        },
        properties: {
          id: 10,
          type: "place",
          icon: "./pic/Group 446.svg",
          name: "赤崁樓",
          starrate: "4.3",
          pic: "./pic/img 8.jpeg",
          site: "700 台南市中西區民族路二段 212 號",
          distance: "Nearest Wara station 0.5 km",
          phone: "062205647",
        },
      },
    ],
  };

  var scooterinfo = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [120.21628594486737, 23.00177290134948],
        },
        properties: {
          id: 1,
          icon: "./pic/scooter_25.svg",
          number: "A234",
          statusicon: "./pic/Group 423.svg",
          status: "Can be reserved",
          battery: "25%",
          km: "12km",
          location: "綠色魔法學校站",
          area: "成功大學 力行校區",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [120.21941836179954, 23.002219873305844],
        },
        properties: {
          id: 2,
          icon: "./pic/scooter_busy_55.svg",
          number: "A264",
          statusicon: "./pic/Group 312.svg",
          status: "Busy",
          battery: "55%",
          km: "12km",
          location: "醫學院附設醫院站",
          area: "成功大學 成杏校區",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [120.22342021730526, 23.002259376432242],
        },
        properties: {
          id: 3,
          icon: "./pic/scooter_60.svg",
          number: "B134",
          statusicon: "./pic/Group 423.svg",
          status: "Can be reserved",
          battery: "60%",
          km: "12km",
          location: "新K館站",
          area: "成功大學 敬業校區",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [120.21677250040514, 23.000435142661768],
        },
        properties: {
          id: 4,
          icon: "./pic/scooter_100.svg",
          number: "A149",
          statusicon: "./pic/Group 423.svg",
          status: "Can be reserved",
          battery: "100%",
          km: "12km",
          location: "榕園站",
          area: "成功大學 光復校區",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [120.22011723325117, 23.000262820168697],
        },
        properties: {
          id: 5,
          icon: "./pic/scooter_busy_25.svg",
          number: "C878",
          statusicon: "./pic/Group 312.svg",
          status: "Busy",
          battery: "25%",
          km: "12km",
          location: "圖書館站",
          area: "成功大學 成功校區",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [120.22247330438341, 22.996545261428338],
        },
        properties: {
          id: 6,
          icon: "./pic/scooter_55.svg",
          number: "A894",
          statusicon: "./pic/Group 423.svg",
          status: "Can be reserved",
          battery: "55%",
          km: "12km",
          location: "奇美咖啡館站",
          area: "成功大學 自強校區",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [120.22039932341585, 22.994646435429356],
        },
        properties: {
          id: 7,
          icon: "./pic/scooter_60.svg",
          number: "A217",
          statusicon: "./pic/Group 423.svg",
          status: "Can be reserved",
          battery: "60%",
          km: "12km",
          location: "D24 站",
          area: "成功大學 勝利校區",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [120.22446654429422, 22.992489850519547],
        },
        properties: {
          id: 8,
          icon: "./pic/scooter_busy_100.svg",
          number: "A487",
          statusicon: "./pic/Group 312.svg",
          status: "Busy",
          battery: "100%",
          km: "12km",
          location: "幼兒園站",
          area: "成功大學 東寧校區",
        },
      },
    ],
  };

  // ---------------- attraction layer ----------------
  var layer1 = new google.maps.Data();
  layer1.addGeoJson(attractinfo);

  // setStyle() 方法來指定資料外觀
  layer1.setStyle(function (feature) {
    if (feature.getProperty("type") == "hide") {
      return {
        visible: false,
      };
    } else {
      return {
        icon: feature.getProperty("icon"),
      };
    }
  });

  layer1.setMap(map);
  layer1.addListener("click", function (event) {
    document.getElementById("attractcard").classList.toggle("acshow");
    document.getElementById("name").textContent =
      event.feature.getProperty("name");
    document.getElementById("starrate").textContent =
      event.feature.getProperty("starrate");
    document.getElementById("address").textContent =
      event.feature.getProperty("site");
    document.getElementById("parkinfo").textContent =
      event.feature.getProperty("distance");
    document.getElementById("phone").textContent =
      event.feature.getProperty("phone");
    document.getElementById("pic").src = event.feature.getProperty("pic");
  });

  // ---------------- scooter layer ----------------
  var layer2 = new google.maps.Data();
  layer2.addGeoJson(scooterinfo);
  layer2.setStyle(function (feature) {
    return { icon: feature.getProperty("icon") };
  });
  layer2.setMap(map);
  layer2.addListener("click", function (event) {
    // document.getElementById('attractcard').style.height=" 0% " ;
    document.getElementById("bottomcontainer").classList.toggle("bcshow");
    document.getElementById("scootercard").classList.toggle("scshow");
    document.getElementById("number").textContent =
      event.feature.getProperty("number");
    document.getElementById("status-icon").src =
      event.feature.getProperty("statusicon");
    document.getElementById("status").textContent =
      event.feature.getProperty("status");
    document.getElementById("battery").textContent =
      event.feature.getProperty("battery");
    document.getElementById("km").textContent = event.feature.getProperty("km");
    document.getElementById("location").textContent =
      event.feature.getProperty("location");
    document.getElementById("area").textContent =
      event.feature.getProperty("area");
  });

  const reserveButton = document.getElementById("reservation");
  reserveButton.addEventListener("click", function (event) {
    document.getElementById("bottomcontainer").classList.toggle("bcshow2");
    document.getElementById("reservecontainer").style.visibility = "visible";
    document.getElementById("number2").textContent =
      event.feature.getProperty("number");
    document.getElementById("battery").textContent =
      event.feature.getProperty("battery");
    document.getElementById("location2").textContent =
      event.feature.getProperty("location");
    document.getElementById("area2").textContent =
      event.feature.getProperty("area");
  });
}

window.initMap = initMap;
