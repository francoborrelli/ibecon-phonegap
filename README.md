# Beacon Finder

## Descripción

### Introducción

Aplicación hecha en Phonegap para la realización de pruebas utilizando los location estimote beacons. Este app utiliza el plugin de [petermetz](https://github.com/petermetz), recomendado desde la página de Estimote.

### Funcionalidad

El plugin cuenta con dos funcionalidades para Android:

1.  Ranging Beacons: Recibe constantemente paquetes bajo el protocolo de ibeacons. Permite obtener información sobre cada uno de los beacons que se encuentran al alcance. Más abajo se hablará en detalle de la información obtenida.
2.  Monitoring Beacons: Permite detectar si nos encontramos o no dentro del radio o región de los beacons.

Estas funcionalidades se pueden realizar especificando sobre que beacon queremos trabajar (se indica su UUID), u optar para que detecte aquellos cercanos de forma automática.

En el archivo configBeacons.js se muestra en detalle como se logran estas funcionalidades.

### Ranging

Hay 1 eventos a considerar: didRangeBeaconsInRegion.

A partir del Ranging podemos obtener los siguientes datos:

| Datos     |  Tipo   |
| --------- | :-----: |
| UUID      | String  |
| Major     | Integer |
| Minor     | Integer |
| Accuracy  | Double  |
| Proximity | String  |
| RSSI      | Double  |
| TX        | Double  |

Adicionalmente se agrega el dato de distancia. El mismo se [calcula](https://gist.github.com/eklimcz/446b56c0cb9cfe61d575) gracias al valor de rssi y tx.

### Monitoring

Hay 3 eventos a considerar: didEnterRegion, didExitRegion, didDetermineStateForRegion.

didDetermineStateForRegion posee dos posibles resultados: "CLRegionStateInside" y "CLRegionStateOutside"

Tarda aproximadamente 10 segundos en detectar que se salió de la región. Al entrar, la detección es instantanea.

## Pasos a seguir para probar la app

### Preparación

#### Agregar los siguientes plugins

```
phonegap plugin add cordova-plugin-bluetooth-status
phonegap plugin add cordova-plugin-statusbar
phonegap plugin add https://github.com/petermetz/cordova-plugin-ibeacon.git
```

#### Agregar plataforma Android

```
phonegap platform add android
```

### Generar APK

```
phonegap build android --verbose
```

Luego de que termine esto, encontraremos la apk en la siguiente ruta:

```
/platform/android/app/build/outputs/apk/debug/app-debug.apk
```

## Uso

Asegurarse que los beacons tengan encendido el modo ibeacon. Para comprobarlo se debe acceder a la configuracion del beacon desde la app de estimote.

# Referencias

[Ibeacon - Plugin](https://github.com/petermetz/cordova-plugin-ibeacon)
