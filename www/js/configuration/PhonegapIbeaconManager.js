class PhonegapIbeaconManager extends IbeaconManager {
  constructor() {
    super();
    this._beaconsRegion = this.setRegion();
    this.init();
  }

  // Inicia la actividad de Ranging
  startRanging() {
    cordova.plugins.locationManager
      .startRangingBeaconsInRegion(this._beaconsRegion)
      .fail(this.couldntStartRanging)
      .done(this.didStartRanging);
  }

  // Detiene la actividad de Ranging
  stopRanging() {
    cordova.plugins.locationManager
      .stopRangingBeaconsInRegion(this._beaconsRegion)
      .fail(this.couldntStopRanging)
      .done(this.didStopRanging);
  }

  // Inicia la actividad de Monitoreo
  startMonitoring() {
    cordova.plugins.locationManager
      .startMonitoringForRegion(this._beaconsRegion)
      .fail(this.couldntStartMonitoring)
      .done(this.didStartMonitoring);
  }

  // Detiene la actividad de Monitoreo
  stopMonitoring() {
    cordova.plugins.locationManager
      .stopMonitoringForRegion(this._beaconsRegion)
      .fail(this.couldntStopMonitoring)
      .done(this.didStopMonitoring);
  }

  requestWhenInUseAuthorization() {
    cordova.plugins.locationManager.requestWhenInUseAuthorization();
  }

  requestAlwaysAuthorization() {
    cordova.plugins.locationManager.requestAlwaysAuthorization();
  }

  // Define una una region a manejar
  setRegion(uuid, id, minor, major) {
    // Wildcard_uuid permite detectar cualquier beacons. (Solo para Android) Podria
    // haberse especificado un beacon en particular, indicando los respectivos
    // datos pedidos más abajo

    var beacon_uuid =
      uuid || cordova.plugins.locationManager.BeaconRegion.WILDCARD_UUID; //wildcard

    //Puede ser cualquier nombre
    var identifier = id || "SomeIdentifier";

    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(
      identifier,
      major,
      minor,
      beacon_uuid
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
    };

    //Ante un Range
    delegate.didRangeBeaconsInRegion = results => {
      this.didRangeBeaconsInRegion(results);
    };

    //Otros eventos de monitoreo son: (No usados en esta aplicación)
    delegate.didEnterRegion = result => {
      if (result) {
        this.didEnterRegion(result);
      }

      // Ejemplo: ENTERED REGION:
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
