showRange = function () {
    refresh()
    document
        .getElementById("title")
        .innerText = "Range Beacons"
    var space = document.getElementById("main")
    var button = createButton('Start Ranging', "start", startRanging)
    space.appendChild(button)
    button = createButton('Back', "back", showMain)
    space.appendChild(button)
}

startRanging = function () {
    refresh()
    var space = document.getElementById("main")
    var button = createButton('Stop Ranging', "stop", stopRanging)
    space.appendChild(button)
    var div = document.createElement('div')
    div.id = "results"
    space.appendChild(div)

    cordova
        .plugins
        .locationManager
        .startRangingBeaconsInRegion(beaconRegion)
        .fail(function (e) {
            console.error(e);
        })
        .done();
}

goBack = function () {
    refresh()
    showMain()
}

stopRanging = function () {
    cordova
    .plugins
    .locationManager
    .stopRangingBeaconsInRegion(beaconRegion)
    .fail(function (e) {
        console.error(e);
    })
    .done();
    
    var button = document.getElementById('stop')
    button.innerText = "back"
    button.removeEventListener('click', stopRanging)
    button.addEventListener('click', goBack, false)

}