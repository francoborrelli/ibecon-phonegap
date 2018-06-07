createButton = function (text, id, event) {
    var button = document.createElement('button')
    button.innerText = text
    button.className = "button"
    button.id = id
    button.addEventListener('click', event, false)
    return button
}

refresh = function () {
    document
        .getElementById("main")
        .innerHTML = ""
}

goBack = function () {
    refresh()
    showMain()
}

showMain = function () {
    refresh()
    document
        .getElementById("title")
        .innerText = "Beacons Finder"

    var space = document.getElementById("main")
    var button = createButton('Range Beacons', "range", showRange)
    space.appendChild(button)
    button = createButton('Monitor Beacons', "monitor", showMonitor)
    space.appendChild(button)
}

var delegate
var beaconRegion

var app = {
    initialize: function () {
        this.bindEvents();
    },

    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {

        //Bluethooth plugin
        cordova
            .plugins
            .BluetoothStatus
            .initPlugin();
        cordova
            .plugins
            .BluetoothStatus
            .promptForBT();

        //Generate menu
        showMain()

        //Una vez que todo esta listo, genero el delegate y el beaconRegion
        delegate = delegateAction()
        console.log(delegate)
        beaconRegion = createBeaconRegion()
    }
};
