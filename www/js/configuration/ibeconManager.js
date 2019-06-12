class IbeaconManager {
  // Ranging Related Methods

  startRanging() {
    throw new Error("This method should be implemented");
  }

  stopRanging() {
    throw new Error("This method should be implemented");
  }

  // Monitoring Related Methods

  startMonitoring() {
    throw new Error("This method should be implemented");
  }

  stopMonitoring() {
    throw new Error("This method should be implemented");
  }

  // Authorization Methods

  requestWhenInUseAuthorization() {
    throw new Error("This method should be implemented");
  }

  requestAlwaysAuthorization() {
    throw new Error("This method should be implemented");
  }

  // Set Region Method

  setRegion(uuid, id, minor, major) {
    throw new Error("This method should be implemented");
  }

  // hookable methods

  didStartRanging() {
    throw new Error("This method should be implemented");
  }

  didStopRanging() {
    throw new Error("This method should be implemented");
  }

  didStartMonitoring() {
    throw new Error("This method should be implemented");
  }

  didStopMonitoring() {
    throw new Error("This method should be implemented");
  }

  couldntStartRanging(e) {
    throw new Error("This method should be implemented");
  }

  couldntStopRanging(e) {
    throw new Error("This method should be implemented");
  }

  couldntStartMonitoring(e) {
    throw new Error("This method should be implemented");
  }

  couldntStopMonitoring(e) {
    throw new Error("This method should be implemented");
  }

  didDetermineStateForRegion(state) {
    throw new Error("This method should be implemented");
  }

  didRangeBeaconsInRegion(result) {
    throw new Error("This method should be implemented");
  }

  didEnterRegion(region) {
    throw new Error("This method should be implemented");
  }

  didExitRegion(region) {
    throw new Error("This method should be implemented");
  }
}
