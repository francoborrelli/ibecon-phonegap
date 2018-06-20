class MonitorScreen extends Screen {
  getTitle() {
    return "Monitor Beacons";
  }

  setMenu() {
    var space = document.getElementById("main");
    var button = this.createButton("Stop Monitoring", "stop", () =>
      this.stopMonitoring()
    );
    space.appendChild(button);

    var div = document.createElement("div");
    div.className = "center";

    var image = document.createElement("img");
    image.setAttribute("src", "img/beacon.png");
    image.id = "beaconImg";
    image.className = "out";
    div.appendChild(image);
    space.appendChild(div);

    div = document.createElement("div");
    div.id = "results";
    space.appendChild(div);

    this.delegateStartMonitoring();
  }

  goBack() {
    MainScreen.show();
  }

  stopMonitoring() {
    this.delegateStopMonitoring();
    this.goBack();
  }

  delegateStartMonitoring() {
    delegator.startMonitoring();
  }

  delegateStopMonitoring() {
    delegator.stopMonitoring();
  }
}
