class MainScreen extends Screen {
  setMenu() {
    var space = document.getElementById("main");
    var button = this.createButton("Range Beacons", "range", this.goRange);
    space.appendChild(button);
    button = this.createButton("Monitor Beacons", "monitor", this.goMonitor);
    space.appendChild(button);
  }

  goRange() {
    RangeScreen.show();
  }

  goMonitor() {
    MonitorScreen.show();
  }
}
