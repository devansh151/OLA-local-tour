declare function require(name:string);
const loadGoogleMapsApi = require('load-google-maps-api');

class GMap {
  static loadGoogleMapsApi() {
    return loadGoogleMapsApi({ client: 'gme-anitechnologiespvt',libraries:['geometry'] });
  }

  static createMap(googleMaps, mapElement) {
    return new googleMaps.Map(mapElement, {
      center: { lat: 13.085553, lng:77.644428 },
      zoom: 14,
      disableDefaultUI: true
    });
  }
}

export { GMap };