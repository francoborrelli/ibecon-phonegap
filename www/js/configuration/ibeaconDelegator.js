class IbeaconDelegator extends Delegator {
  constructor() {
    super();
    this._beaconsRegion = this.createBeaconRegion();
    this._ranger = new IbeaconRanger();
    this._monitor = new IbeaconMonitor();
    this.init();
  }

  startRanging() {
    this._ranger.prepareToRange();

    cordova.plugins.locationManager
      .startRangingBeaconsInRegion(this._beaconsRegion)
      .fail(function(e) {
        console.error(e);
      })
      .done();
  }

  stopRanging() {
    cordova.plugins.locationManager
      .stopRangingBeaconsInRegion(this._beaconsRegion)
      .fail(function(e) {
        console.error(e);
      })
      .done();
  }

  startMonitoring() {
    cordova.plugins.locationManager
      .startMonitoringForRegion(this._beaconsRegion)
      .fail(function(e) {
        console.error(e);
      })
      .done();
  }

  stopMonitoring() {
    cordova.plugins.locationManager
      .stopMonitoringForRegion(this._beaconsRegion)
      .fail(function(e) {
        console.error(e);
      })
      .done();
  }

  createBeaconRegion() {
    // Wildcard_uuid permite detectar cualquier beacons. (Solo para Android) Podria
    // haberse especificado un beacon en particular, indicando los respectivos
    // datos pedidos más abajo

    var uuid = cordova.plugins.locationManager.BeaconRegion.WILDCARD_UUID; //wildcard
    var major = undefined;
    var minor = undefined;

    //Puede ser cualquier nombre
    var identifier = "SomeIdentifier";

    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(
      identifier,
      uuid,
      major,
      minor
    );

    //Se debe indicar al delegate sobre que región se quiere trabajar
    return beaconRegion;
  }

  init() {
    var delegate = new cordova.plugins.locationManager.Delegate();

    //Ante un Monitoreo
    delegate.didDetermineStateForRegion = pluginResult => {
      //Retorna dos posibles estados: CLRegionStateInside y CLRegionStateOutside
      this._monitor.show(pluginResult);
      cordova.plugins.locationManager.appendToDeviceLog(
        "[DOM] didDetermineStateForRegion: " + JSON.stringify(pluginResult)
      );
    };

    //Ante un Range
    delegate.didRangeBeaconsInRegion = pluginResult => {
      this._ranger.show(pluginResult.beacons);
    };

    //Otros eventos de monitoreo son: (No usados en esta aplicación)
    delegate.didEnterRegion = result => {
      if (result) {
        console.log("ENTERED REGION: " + JSON.stringify(result));
      }
      // EjemploENTERED REGION:
      // {"eventType":"didEnterRegion","region":{"identifier":"SomeIdentifier","typeNam
      // e":"BeaconRegion"}}
    };
    delegate.didExitRegion = result => {
      console.log("EXITED REGION: " + JSON.stringify(result));
      // Ejemplo: EXITED REGION:
      // {"eventType":"didExitRegion","region":{"identifier":"SomeIdentifier","typeName
      // ":"BeaconRegion"}}
    };

    cordova.plugins.locationManager.setDelegate(delegate);
  }
}
