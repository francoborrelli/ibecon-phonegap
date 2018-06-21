class IbeaconRanger extends Range {
  toString(beacon) {
    return (
      'Color: <span class="dot ' +
      this.getName(beacon.uuid) +
      '"></span> (' +
      this.getName(beacon.uuid) +
      ") <br> UUID: " +
      beacon.uuid +
      "<br> major: " +
      beacon.major +
      "<br> minor: " +
      beacon.minor +
      "<br> TX: " +
      beacon.tx +
      "<br> Proximity: " +
      beacon.proximity +
      "<br> Distance: " +
      this.calculateDistance(beacon) +
      " meters <br> rssi: " +
      beacon.rssi +
      "<br> Accuracy: " +
      beacon.accuracy +
      "<hr>"
    );
  }

  calculateDistance(beacon) {
    if (beacon.rssi == 0) {
      return -1.0;
    }
    var ratio = (beacon.rssi * 1.0) / beacon.tx;
    if (ratio < 1.0) {
      var distance = Math.pow(ratio, 10);
    } else {
      var distance = 0.89976 * Math.pow(ratio, 7.7095) + 0.111;
    }
    return this.roundNumber(distance);
  }

  roundNumber(number) {
    const decimals = 100000;
    return Math.round(number * decimals) / decimals;
  }
}
