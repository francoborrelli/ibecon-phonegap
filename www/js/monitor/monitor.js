//Clase con el comportamiento para mostrar datos ante un monitoreo

class Monitor {

  show(result) {

    var inside = this.isIn(result)

    var image = document.getElementById("beaconImg");
    if (inside) {
      image.className = "";
    } else {
      image.className = "out";
    }

    var div = document.createElement("div");
    div.className = "center";
    var h3 = document.createElement("h3");
    h3.innerText = inside ? "Inside Region" : "Outside Region";

    div.appendChild(h3);

    var results = document.getElementById("results");
    results.innerHTML = "";
    results.appendChild(div);
  }

  isIn(beacon) {
    throw new Error("This method should be implemented");
  }
  
}
