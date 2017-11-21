import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  options: any = {
    controls: {
      compass: false,
      myLocationButton: true,
      indoorPicker: true,
      zoom: true
    }
  };

  onMapClick(e) {
    console.log('map was clicked', e);
  }

  onMapReady(e) {
    console.log('map is ready', e);
  }

}
