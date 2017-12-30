import { Platform }            from "ionic-angular";
import { CoordinatesProvider } from '../../providers/ocorrencias/coordinates/coordinates';
import { OcurrenceController } from '../../providers/ocorrencias/ocurrence-controller/ocurrence-controller';
import { Component, Input, Renderer, ElementRef, Output, EventEmitter, AfterViewInit }    from '@angular/core';
import { GoogleMap, GoogleMapsEvent, GoogleMaps, LatLng, GoogleMapOptions, MarkerCluster} from "@ionic-native/google-maps";
import { MapsStyles } from "../../providers/ocorrencias/maps/mapsStyles";


@Component({
  selector: 'google-map',
  template: '<ng-content></ng-content>',
  providers: [

    OcurrenceController,
    CoordinatesProvider,

  ]
})


export class GoogleMapComponent implements AfterViewInit {

  private mapContainer : HTMLElement;
  private map          : GoogleMap;
  private myLocation   : LatLng;
  private isInit       : boolean = false;
  private _height      : string = '100%';
  private _width       : string = '100%';


  @Input()
  set height(val: string) {
    this._height = val;
    this.isInit && this.setHeight();
  }


  @Input()
  set width(val: string) {
    this._width = val;
    this.isInit && this.setWidth();
  }


  get width() {
    return this._width;
  }


  get height(): string {
    return this._height;
  }


  @Input()  options : GoogleMapOptions = {};


  @Output() mapClick: EventEmitter<LatLng> = new EventEmitter<any>();
  @Output() mapReady: EventEmitter<GoogleMap> = new EventEmitter<GoogleMap>();


  constructor(
    private ocurrenceController: OcurrenceController,
    private coordinates: CoordinatesProvider,
    private googleMaps:  GoogleMaps,
    private platform:    Platform,
    private renderer:    Renderer,
    private styles:      MapsStyles,
    private el:          ElementRef) {
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
          styles: this.styles.getStyles()
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
        this.ocurrenceController.getOcurrencesMap().then( (res:any) => {
          this.map.addMarkerCluster({
            boundsDraw: true,
            markers: res.data,
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
          }).catch( err => {
            alert(err)
          });
  
        })
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
