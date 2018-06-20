//Clase con el comportamiento para mostrar datos ante un monitoreo

class Screen {
  static show() {
    new this().showScreen();
  }

  showScreen() {
    this.refresh();
    this.setTitle();
    this.setMenu();
  }

  createButton(text, id, event) {
    var button = document.createElement("button");
    button.innerText = text;
    button.className = "button";
    button.id = id;
    button.addEventListener("click", event, false);
    return button;
  }

  refresh() {
    document.getElementById("main").innerHTML = "";
  }

  setTitle() {
    document.getElementById("title").innerText = this.getTitle();
  }

  getTitle() {
    return "Beacons Finder";
  }

  setMenu() {
    throw new Error("This method should be implemented");
  }
}
