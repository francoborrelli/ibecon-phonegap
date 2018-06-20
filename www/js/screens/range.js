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
    this.delegateStartRanging();
  }

  goBack() {
    MainScreen.show();
  }

  stopRanging() {
    this.delegateStopRanging();

    var button = document.getElementById("stop");
    button.innerText = "Back";
    button.removeEventListener("click", this.stopRanging);
    button.addEventListener("click", this.goBack, false);
  }

  delegateStartRanging() {
    delegator.startRanging();
  }

  delegateStopRanging() {
    delegator.stopRanging();
  }
}
