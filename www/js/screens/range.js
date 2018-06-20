class RangeScreen extends Screen {
  getTitle() {
    return "Range Beacons";
  }

  setMenu() {
    var space = document.getElementById("main");

    var button = this.createButton("Stop Ranging", "stop", () =>
      this.stopRanging()
    );
    space.appendChild(button);
    var div = document.createElement("div");
    div.id = "results";
    space.appendChild(div);

    ranger.prepareToRange();
    this.delegateStartRanging();
  }

  goBack() {
    MainScreen.show();
  }

  stopRanging() {
    this.delegateStopRanging();

    var button = document.getElementById("stop");
    button.innerText = "back";
    button.removeEventListener("click", this.stopRanging);
    button.addEventListener("click", this.goBack, false);
  }

  delegateStartRanging() {
    cordova.plugins.locationManager
      .startRangingBeaconsInRegion(beaconRegion)
      .fail(function(e) {
        console.error(e);
      })
      .done();
  }

  delegateStopRanging() {
    cordova.plugins.locationManager
      .stopRangingBeaconsInRegion(beaconRegion)
      .fail(function(e) {
        console.error(e);
      })
      .done();
  }
}
