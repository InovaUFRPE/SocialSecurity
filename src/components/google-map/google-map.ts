import { Component, Input, Renderer, OnInit, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Platform } from "ionic-angular";
import {
  GoogleMap, GoogleMapsEvent, GoogleMaps, LatLng, CameraPosition, GeocoderRequest, GoogleMapOptions, ILatLng
} from "@ionic-native/google-maps";
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'google-map',
  template: '<ng-content></ng-content>'
})

export class GoogleMapComponent implements AfterViewInit {
  private mapContainer: HTMLElement;
  map: GoogleMap;
  private isInit: boolean = false;

  _height: string = '100%';
  @Input()
  set height(val: string) {
    this._height = val;
    this.isInit && this.setHeight();
  }

  get height(): string {
    return this._height;
  }

  _width: string = '100%';
  @Input()
  set width(val: string) {
    this._width = val;
    this.isInit && this.setWidth();
  }

  get width() {
    return this._width;
  }

  @Input()
  options: GoogleMapOptions = {
    camera: {
      target: {
        lat: 43.0741904,
        lng: -89.3809802
      },
      zoom: 18,
      tilt: 30
    }
  };

  @Output()
  mapClick: EventEmitter<LatLng> = new EventEmitter<any>();

  @Output()
  mapReady: EventEmitter<GoogleMap> = new EventEmitter<GoogleMap>();

  constructor(
    private platform: Platform,
    private renderer: Renderer,
    private el: ElementRef,
    private googleMaps: GoogleMaps,
    private geolocation: Geolocation,
  ) {
    this.mapContainer = el.nativeElement;
  }

  ionViewDidLoad() {

  }

  ngAfterViewInit() {
    this.geolocation.getCurrentPosition().then((position) => {
      //let lat = position.coords.latitude
      //let long = position.coords.longitude
    }).catch((err) => {
      alert('Error getting location');
    });
    this.setupContainer();

    this.platform.ready().then(() => {
      this.map = this.googleMaps.create(this.mapContainer);
      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
          this.mapReady.emit(this.map);
          this.isInit = true;
          this.map.setOptions({
            camera: {
              target: {
                lat: 43.0741904,
                lng: -89.3809802
              },
              zoom: 13,
              tilt: 30
            },
            styles: [
              {
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#212121"
                  }
                ]
              },
              {
                "elementType": "labels",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "elementType": "labels.icon",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#757575"
                  }
                ]
              },
              {
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#212121"
                  }
                ]
              },
              {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#757575"
                  }
                ]
              },
              {
                "featureType": "administrative.country",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#9e9e9e"
                  }
                ]
              },
              {
                "featureType": "administrative.land_parcel",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#bdbdbd"
                  }
                ]
              },
              {
                "featureType": "administrative.neighborhood",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#757575"
                  }
                ]
              },
              {
                "featureType": "poi.medical",
                "stylers": [
                  {
                    "visibility": "simplified"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#181818"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#23592c"
                  },
                  {
                    "saturation": -45
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#616161"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#1b1b1b"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#2c2c2c"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#8a8a8a"
                  }
                ]
              },
              {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#373737"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#3c3c3c"
                  }
                ]
              },
              {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#4e4e4e"
                  }
                ]
              },
              {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#616161"
                  }
                ]
              },
              {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#757575"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#000000"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#241469"
                  },
                  {
                    "saturation": 10
                  },
                  {
                    "lightness": -65
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#3d3d3d"
                  }
                ]
              }
            ]
          })
        });

      this.map.on(GoogleMapsEvent.MAP_CLICK)
        .subscribe(data => this.mapClick.emit(data));

    });

  }

  ngOnDestroy() {
    this.map.remove();
  }

  private setupContainer() {
    this.setWidth();
    this.setHeight();

    // set display block
    this.renderer.setElementStyle(this.mapContainer, 'z-index', '1000');
    this.renderer.setElementStyle(this.mapContainer, 'display', 'block');
  }

  private setWidth() {
    this.renderer.setElementStyle(this.mapContainer, 'width', this._width);
  }

  private setHeight() {
    this.renderer.setElementStyle(this.mapContainer, 'height', this._height);
  }
}
