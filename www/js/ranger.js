//Clase con el comportamiento para mostrar datos ante un range

class Range {
  constructor(delay = 5) {
    this._beaconsArray = [];
    this._delay = delay;
  }

  prepareToRange(){
    this._beaconsArray = []
  }

  show(beacons) {
    beacons.forEach(beacon => {
      var div = document.getElementById(beacon.uuid);
      if (!div) {
        div = document.createElement("div");
        div.id = beacon.uuid;
        document.getElementById("results").appendChild(div);
      }
      div.innerHTML = this.toString(beacon);
      this.addOrUpdateBeacon(beacon);
    });

    this.removeBeacons();
  }

  addOrUpdateBeacon(beacon) {
    var moment = new Date();
    moment.setSeconds(moment.getSeconds() + this._delay);

    var result = { ...beacon, updated: moment };

    var index = this._beaconsArray.findIndex(x => x.uuid == beacon.uuid);
    if (index !== -1) {
      this._beaconsArray[index] = result;
    } else {
      this._beaconsArray.push(beacon);
    }
  }

  getName(uuid) {
    switch (true) {
      case uuid.toUpperCase().includes("CBF53FBE"):
        return "beetroot";
      case uuid.toUpperCase().includes("98D127CF"):
        return "lemon";
      case uuid.toUpperCase().includes("ADEFCF"):
        return "coconut";
      case uuid.toUpperCase().includes("BBBE733"):
        return "candy";
      default:
        return "?";
    }
  }

  toString(beacon) {
    throw new Error("This method should be implemented");
  }

  removeBeacons() {
    var array = Array.from(this._beaconsArray);

    this._beaconsArray.forEach(beacon => {
      if (beacon.updated < new Date()) {
        var div = document.getElementById(beacon.uuid);
        div.innerHTML = "";
        array = array.filter(b => b.uuid !== beacon.uuid);
      }
    });

    this._beaconsArray = array;
  }
}
