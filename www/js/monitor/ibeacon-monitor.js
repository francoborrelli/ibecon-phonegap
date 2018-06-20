class IbeaconMonitor extends Monitor {
    isIn(result){
        return result.state === "CLRegionStateInside";
    }
  }
  