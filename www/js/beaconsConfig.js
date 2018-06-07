var createBeaconRegion = function () {

    // Wildcard_uuid permite detectar cualquier beacons. (Solo para Android) Podria
    // haberse especificado un beacon en particular, indicando los respectivos
    // datos pedidos más abajo

    var uuid = cordova.plugins.locationManager.BeaconRegion.WILDCARD_UUID; //wildcard
    var major = undefined;
    var minor = undefined;

    //Puede ser cualquier nombre
    var identifier = 'SomeIdentifier';

    var beaconRegion = new cordova
        .plugins
        .locationManager
        .BeaconRegion(identifier, uuid, major, minor);

    //Se debe indicar al delegate sobre que región se quiere trabajar
    return beaconRegion
}

var monitorShow = function (result) {
    var inside = result.state === "CLRegionStateInside"

    var image = document.getElementById('beaconImg')
    if (inside) {
        image.className = ""
    } else {
        image.className = "out"
    }

    var div = document.createElement('div')
    div.className = "center"
    var h3 = document.createElement('h3')
    h3.innerText = inside
        ? "Inside Region"
        : "Outside Region"

    div.appendChild(h3)

    var results = document.getElementById("results")
    results.innerHTML = ""
    results.appendChild(div)
};

//A partir del uuid obtengo el nombre del beacon.
var getName = function (uuid) {
    switch (true) {
            case uuid
                .toUpperCase()
                .includes('CBF53FBE'):
            return "beetroot"
        case uuid
                .toUpperCase()
                .includes('98D127CF'):
            return "lemon"
        case uuid
                .toUpperCase()
                .includes('ADEFCF'):
            return "coconut"
        case uuid
                .toUpperCase()
                .includes('BBBE733'):
            return "candy"
        default:
            return "?"
    }
}

// Format data
var toString = function (beacon) {
    return ('Color: <span class="dot ' + getName(beacon.uuid) + '"></span> (' + getName(beacon.uuid) + ') <br> UUID: ' + beacon.uuid + '<br> major: ' + beacon.major + '<br> minor: ' + beacon.minor + '<br> TX: ' + beacon.tx + '<br> Proximity: ' + beacon.proximity + '<br> rssi: ' + beacon.rssi + '<br> Accuracy: ' + beacon.accuracy)
}

//Accion a tomar ante la llegada de un nuevo paquete durante un Range
var rangeShow = function (beacons) {
    var results = document.getElementById("results")
    beacons.forEach(beacon => {
        var name = getName(beacon.uuid)
        var div = document.getElementById(name)
        if (div) {
            div.innerHTML = toString(beacon)
        } else {
            div = document.createElement('div')
            div.id = getName(beacon.uuid)
            div.innerHTML = toString(beacon)
            results.appendChild(div)
            results.appendChild(document.createElement('hr'))
        }
    });
}

var delegateAction = function () {

    //Al delegate se le indica que acciones tomar ante diferentes eventos.
    var delegate = new cordova
        .plugins
        .locationManager
        .Delegate();

    //Ante un Monitoreo
    delegate.didDetermineStateForRegion = function (pluginResult) {
        //Retorna dos posibles estados: CLRegionStateInside y CLRegionStateOutside
        monitorShow(pluginResult);
        cordova
            .plugins
            .locationManager
            .appendToDeviceLog('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
    };

    //Otros eventos
    delegate.didEnterRegion = function (result) {
        if (result) {
            console.log("ENTERED REGION: " + JSON.stringify(result));
        }
        // EjemploENTERED REGION:
        // {"eventType":"didEnterRegion","region":{"identifier":"SomeIdentifier","typeNam
        // e":"BeaconRegion"}}
    };

    delegate.didExitRegion = function (result) {
        console.log("EXITED REGION: " + JSON.stringify(result));
        // Ejemplo: EXITED REGION:
        // {"eventType":"didExitRegion","region":{"identifier":"SomeIdentifier","typeName
        // ":"BeaconRegion"}}
    };

    //Ante un Range
    delegate.didRangeBeaconsInRegion = function (pluginResult) {
        rangeShow(pluginResult.beacons);
    };

    cordova
        .plugins
        .locationManager
        .setDelegate(delegate);

    return delegate
}
