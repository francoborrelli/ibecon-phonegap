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
      "<br> rssi: " +
      beacon.rssi +
      "<br> Accuracy: " +
      beacon.accuracy +
      "<hr>"
    );
  }
}
