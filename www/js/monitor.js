//Genero la pantalla de Monitoreo
showMonitor = function () {
    refresh()
    document
        .getElementById("title")
        .innerText = "Monitor Beacons"
    var space = document.getElementById("main")
    var button = createButton('Start Monitoring', 'start', startMonitoring)
    space.appendChild(button)
    button = createButton('Back', 'back', showMain)
    space.appendChild(button)
}

//Accion ante start monitoring
startMonitoring = function () {
    refresh()
    var space = document.getElementById("main")
    var button = createButton('Stop Monitoring', 'stop', stopMonitoring)
    space.appendChild(button)

    var div = document.createElement('div')
    div.className = "center"

    var image = document.createElement('img')
    image.setAttribute("src", "img/beacon.png");
    image.id = "beaconImg"
    image.className = "out"
    div.appendChild(image)
    space.appendChild(div)

    div = document.createElement('div')
    div.id = "results"
    space.appendChild(div)

    cordova
        .plugins
        .locationManager
        .startMonitoringForRegion(beaconRegion)
        .fail(function (e) {
            console.error(e);
        })
        .done();
}

stopMonitoring = function () {
    cordova
        .plugins
        .locationManager
        .stopMonitoringForRegion(beaconRegion)
        .fail(function (e) {
            console.error(e);
        })
        .done();

    showMonitor()
}