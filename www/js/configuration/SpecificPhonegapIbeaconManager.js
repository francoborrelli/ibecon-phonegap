class SpecificPhonegapIbeaconManager extends PhonegapIbeaconManager {
  constructor() {
    super();
    this._ranger = new IbeaconRanger();
    this._monitor = new IbeaconMonitor();
  }

  didDetermineStateForRegion(result) {
    this._monitor.show(result);
  }

  didRangeBeaconsInRegion(results) {
    this._ranger.show(results.beacons);
  }
}
