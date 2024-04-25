<div  align="center">
<img src="https://github.com/francoborrelli/ibecon-phonegap/assets/17908233/92a5ddbc-cf1c-4e80-891d-5af41abb23d1" height="300"/>
</div>


# Beacon Finder

![cordova](https://img.shields.io/badge/Apache%20Cordova-black?style=for-the-badge&logo=apachecordova&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)

Application developed in Phonegap for conducting tests using Estimote beacons for location estimation. This app utilizes the [plugin](https://github.com/petermetz/cordova-plugin-ibeacon) created by [petermetz](https://github.com/petermetz), recommended on the Estimote website.


## Description

The plugin offers two functionalities for Android:

1. `Ranging Beacons`: Constantly receives packets under the iBeacons protocol. It allows obtaining information about each of the beacons within range. Further details about the obtained information will be discussed below.
2. `Monitoring Beacons`: Allows detecting whether we are inside or outside the range or region of the beacons.
These functionalities can be performed by specifying which beacon we want to work with (its UUID is indicated), or opting for it to automatically detect nearby beacons.

The `configBeacons.js` file shows in detail how these functionalities are achieved.

## Ranging

There is 1 event to consider: `didRangeBeaconsInRegion`.

From the Ranging, we can obtain the following data:

| Field     |  Type   |
| --------- | :-----: |
| UUID      | String  |
| Major     | Integer |
| Minor     | Integer |
| Accuracy  | Double  |
| Proximity | String  |
| RSSI      | Double  |
| TX        | Double  |

Additionally, the distance data is included. It is [calculated](https://gist.github.com/eklimcz/446b56c0cb9cfe61d575) based on the values of RSSI and TX.

## Monitoring

There are 3 events to consider:

* `didEnterRegion`: Triggered when the device enters the specified region.
* `didExitRegion`: Triggered when the device exits the specified region. It takes approximately 10 seconds to detect that the device has exited the region.
* `didDetermineStateForRegion`: This event has two possible results: "CLRegionStateInside" and "CLRegionStateOutside". It indicates whether the device is inside or outside the specified region.

Upon entering the region, detection is instantaneous.


## Steps to test the app

### Add the following plugins

```sh
phonegap plugin add cordova-plugin-bluetooth-status
phonegap plugin add cordova-plugin-statusbar
phonegap plugin add https://github.com/petermetz/cordova-plugin-ibeacon.git
```

## Steps to Follow to Test the App

### Preparation

#### Add the following plugins

#### Add Android platform

```bash
phonegap platform add android
```

### Generate APK

```bash
phonegap build android --verbose
```

Once this is done, you will find the APK at the following path:

```bash
/platform/android/app/build/outputs/apk/debug/app-debug.apk
```

## Usage

Ensure that the beacons have the iBeacon mode turned on. To verify, access the beacon settings through the Estimote app.

# References

[Ibeacon - Plugin](https://github.com/petermetz/cordova-plugin-ibeacon)
