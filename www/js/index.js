var delegator;

var app = {
  initialize: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    document.addEventListener("deviceready", this.onDeviceReady, false);
  },
  onDeviceReady: function() {
    //Bluethooth plugin
    cordova.plugins.BluetoothStatus.initPlugin();
    cordova.plugins.BluetoothStatus.promptForBT();

    //Generate menu
    MainScreen.show();

    //Una vez que todo esta listo, genero el Delegator
    delegator = new IbeaconDelegator();
  }
};
