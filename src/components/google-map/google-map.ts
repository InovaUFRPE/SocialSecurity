import { Component, Input, Renderer, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Platform } from "ionic-angular";
import {GoogleMap, GoogleMapsEvent, GoogleMaps, LatLng, GoogleMapOptions, MarkerCluster} from "@ionic-native/google-maps";
import { CoordinatesProvider } from '../../providers/ocorrencias/coordinates/coordinates';

@Component({
  selector: 'google-map',
  template: '<ng-content></ng-content>',
  providers: [
    CoordinatesProvider,
  ]
})

export class GoogleMapComponent implements AfterViewInit {
  private mapContainer: HTMLElement;
  map: GoogleMap;
  myLocation: LatLng;
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
    private coordinates: CoordinatesProvider
  ) {
    this.mapContainer = el.nativeElement;
  }

  ngAfterViewInit() {
    this.setupContainer();
    this.platform.ready().then(() => {
      this.map = this.googleMaps.create(this.mapContainer, this.options);
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        this.mapReady.emit(this.map);
        this.isInit = true;
        this.map.setOptions({
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
        });        
        this.map.setMyLocationEnabled(true);
        let location = this.map.getMyLocation();
        location.then((res) => {
          this.myLocation = new LatLng(res.latLng.lat, res.latLng.lng);          
          this.map.animateCamera({
            target: this.myLocation,
            zoom: 15,
            tilt: 20,
            duration: 3000
          });
        });
        // Add Cluster Marker
        var label = document.getElementById("label");
        this.map.addMarkerCluster({
          boundsDraw: true,
          markers: this.coordinates.getCoordinates(),
          icons: [
              {min: 2, max: 10, url: "assets/icon/blue.png", anchor: {x: 16, y: 16}},
              {min: 10, max: 20, url: "assets/icon/yellow.png", anchor: {x: 16, y: 16}},
              {min: 20, max: 60, url: "assets/icon/red.png", anchor: {x: 24, y: 24}},
              {min: 60, url: "assets/icon/black.png",anchor: {x: 32,y: 32}}
          ]
        }).then ((markerCluster) => {
            markerCluster.on("resolution_changed", function (prev, newResolution) {
                var self = this;
                label.innerHTML = "&lt;b&gt;zoom = " + self.get("zoom").toFixed(0) + ", resolution = " + self.get("resolution") + "&lt;/b&gt;";
            });
            markerCluster.trigger("resolution_changed");
        });
      });
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
