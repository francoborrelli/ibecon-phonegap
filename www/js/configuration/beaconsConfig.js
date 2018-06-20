var createBeaconRegion = function() {
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
};

var delegateAction = function(monitor, ranger) {
  //Al delegate se le indica que acciones tomar ante diferentes eventos.
  var delegate = new cordova.plugins.locationManager.Delegate();

  //Ante un Monitoreo
  delegate.didDetermineStateForRegion = function(pluginResult) {
    //Retorna dos posibles estados: CLRegionStateInside y CLRegionStateOutside
    monitor.show(pluginResult);
    cordova.plugins.locationManager.appendToDeviceLog(
      "[DOM] didDetermineStateForRegion: " + JSON.stringify(pluginResult)
    );
  };

  //Otros eventos
  delegate.didEnterRegion = function(result) {
    if (result) {
      console.log("ENTERED REGION: " + JSON.stringify(result));
    }
    // EjemploENTERED REGION:
    // {"eventType":"didEnterRegion","region":{"identifier":"SomeIdentifier","typeNam
    // e":"BeaconRegion"}}
  };

  delegate.didExitRegion = function(result) {
    console.log("EXITED REGION: " + JSON.stringify(result));
    // Ejemplo: EXITED REGION:
    // {"eventType":"didExitRegion","region":{"identifier":"SomeIdentifier","typeName
    // ":"BeaconRegion"}}
  };

  //Ante un Range
  delegate.didRangeBeaconsInRegion = function(pluginResult) {
    ranger.show(pluginResult.beacons);
  };

  cordova.plugins.locationManager.setDelegate(delegate);

  return delegate;
};
