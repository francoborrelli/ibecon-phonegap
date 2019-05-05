class IbeaconDelegator extends Delegator {
  constructor() {
    super();
    this._beaconsRegion = this.createBeaconRegion();
    this._ranger = new IbeaconRanger();
    this._monitor = new IbeaconMonitor();
    this.init();
  }

  startRanging() {
    cordova.plugins.locationManager
      .startRangingBeaconsInRegion(this._beaconsRegion)
      .fail(this.couldntStartRanging)
      .done(this.didStartRanging);
  }

  stopRanging() {
    cordova.plugins.locationManager
      .stopRangingBeaconsInRegion(this._beaconsRegion)
      .fail(this.couldntStopRanging)
      .done(this.didStopRanging);
  }

  startMonitoring() {
    cordova.plugins.locationManager
      .startMonitoringForRegion(this._beaconsRegion)
      .fail(this.couldntStartMonitoring)
      .done(this.didStartMonitoring);
  }

  stopMonitoring() {
    cordova.plugins.locationManager
      .stopMonitoringForRegion(this._beaconsRegion)
      .fail(this.couldntStopMonitoring)
      .done(this.didStopMonitoring);
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
    delegate.didDetermineStateForRegion = result => {
      //Retorna dos posibles estados: CLRegionStateInside y CLRegionStateOutside
      this.didDetermineStateForRegion(result);
      this._monitor.show(result);
    };

    //Ante un Range
    delegate.didRangeBeaconsInRegion = results => {
      this._ranger.show(pluginResult.beacons);
      this.didRangeBeaconsInRegion(results);
    };

    //Otros eventos de monitoreo son: (No usados en esta aplicación)
    delegate.didEnterRegion = result => {
      if (result) {
        this.didEnterRegion(result);
      }
      // EjemploENTERED REGION:
      // {"eventType":"didEnterRegion","region":{"identifier":"SomeIdentifier","typeNam
      // e":"BeaconRegion"}}
    };
    delegate.didExitRegion = result => {
      this.didExitRegion(result);
      // Ejemplo: EXITED REGION:
      // {"eventType":"didExitRegion","region":{"identifier":"SomeIdentifier","typeName
      // ":"BeaconRegion"}}
    };

    cordova.plugins.locationManager.setDelegate(delegate);
  }

  // hook methods
  didStartRanging() {}

  didStopRanging() {}

  didStartMonitoring() {}

  couldntStopMonitoring() {}

  couldntStartRanging(e) {}

  couldntStopRanging(e) {}

  couldntStartMonitoring(e) {}

  couldntStopMonitoring(e) {}

  didDetermineStateForRegion(results) {}

  didRangeBeaconsInRegion(results) {}

  didEnterRegion(results) {}

  didExitRegion(results) {}
}
