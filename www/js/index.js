var delegate
var beaconRegion
var ranger
var monitor

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
        MainScreen.show()

        //Una vez que todo esta listo, genero el delegate y el beaconRegion

        ranger = new IbeaconRanger();
        monitor = new IbeaconMonitor();
        delegate = delegateAction(monitor, ranger)

        beaconRegion = createBeaconRegion()
    }
};
