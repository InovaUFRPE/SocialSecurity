import { Injectable, ElementRef } from '@angular/core';
import { Geolocation }            from '@ionic-native/geolocation';
import { Http }                   from '@angular/http';
import 'rxjs/add/operator/map';
import { MapsStyles } from './mapsStyles';

declare var google: any;
declare var map: any;

@Injectable()
export class MapsProvider {

  constructor(
    private position: Geolocation,
    private http:     Http,
    private styles:   MapsStyles) {
  }

  
  showMap(mapRef: any) {
    this.position.getCurrentPosition().then((position) => {
      alert(JSON.stringify(position));
      const location = new google.maps.LatLng(37.779996, -122.406939);
      const options = {center: location,zoom: 13,mapTypeId: 'roadmap', styles: this.styles.getStyles()};
      const map = new google.maps.Map(mapRef.nativeElement, options);
      this.addMarker(location, map);

    });

  }

  private addMarker(position, map) {
    return new google.maps.Marker({
      position,
      map,
    })
  }

    
}