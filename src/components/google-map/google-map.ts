import { Component, Input, Renderer, OnInit, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Platform } from "ionic-angular";
import {
  GoogleMap, GoogleMapsEvent, HtmlInfoWindow, GoogleMaps, LatLng, GoogleMapOptions,
} from "@ionic-native/google-maps";
declare var google: any;

@Component({
  selector: 'google-map',
  template: '<ng-content></ng-content>'
})

export class GoogleMapComponent implements AfterViewInit {
  private mapContainer: HTMLElement;
  map: GoogleMap;
  myLocation: LatLng;
  private isInit: boolean = false;




  //exportar para um provider
  private heatmapData = [
    new LatLng(37.782745, -122.444586),
    new LatLng(37.782842, -122.443688),
    new LatLng(37.782919, -122.442815),
    new LatLng(37.782992, -122.442112),
    new LatLng(37.783100, -122.441461),
    new LatLng(37.783206, -122.440829),
    new LatLng(37.783273, -122.440324),
    new LatLng(37.783316, -122.440023),
    new LatLng(37.783357, -122.439794),
    new LatLng(37.783371, -122.439687),
    new LatLng(37.783368, -122.439666),
    new LatLng(37.783383, -122.439594),
    new LatLng(37.783508, -122.439525),
    new LatLng(37.783842, -122.439591),
    new LatLng(37.784147, -122.439668),
    new LatLng(37.784206, -122.439686),
    new LatLng(37.784386, -122.439790),
    new LatLng(37.784701, -122.439902),
    new LatLng(37.784965, -122.439938),
    new LatLng(37.785010, -122.439947),
    new LatLng(37.785360, -122.439952),
    new LatLng(37.785715, -122.440030),
    new LatLng(37.786117, -122.440119),
    new LatLng(37.786564, -122.440209),
    new LatLng(37.786905, -122.440270),
    new LatLng(37.786956, -122.440279),
    new LatLng(37.800224, -122.433520),
    new LatLng(37.800155, -122.434101),
    new LatLng(37.800160, -122.434430),
    new LatLng(37.800378, -122.434527),
    new LatLng(37.800738, -122.434598),
    new LatLng(37.800938, -122.434650),
    new LatLng(37.801024, -122.434889),
    new LatLng(37.800955, -122.435392),
    new LatLng(37.800886, -122.435959),
    new LatLng(37.800811, -122.436275),
    new LatLng(37.800788, -122.436299),
    new LatLng(37.800719, -122.436302),
    new LatLng(37.800702, -122.436298),
    new LatLng(37.800661, -122.436273),
    new LatLng(37.800395, -122.436172),
    new LatLng(37.800228, -122.436116),
    new LatLng(37.800169, -122.436130),
    new LatLng(37.800066, -122.436167),
    new LatLng(37.784345, -122.422922),
    new LatLng(37.784389, -122.422926),
    new LatLng(37.784437, -122.422924),
    new LatLng(37.784746, -122.422818),
    new LatLng(37.785436, -122.422959),
    new LatLng(37.786120, -122.423112),
    new LatLng(37.786433, -122.423029),
    new LatLng(37.786631, -122.421213),
    new LatLng(37.786660, -122.421033),
    new LatLng(37.786801, -122.420141),
    new LatLng(37.786823, -122.420034),
    new LatLng(37.786831, -122.419916),
    new LatLng(37.787034, -122.418208),
    new LatLng(37.787056, -122.418034),
    new LatLng(37.787169, -122.417145),
    new LatLng(37.787217, -122.416715),
    new LatLng(37.786144, -122.416403),
    new LatLng(37.785292, -122.416257),
    new LatLng(37.780666, -122.390374),
    new LatLng(37.780501, -122.391281),
    new LatLng(37.780148, -122.392052),
    new LatLng(37.780173, -122.391148),
    new LatLng(37.780693, -122.390592),
    new LatLng(37.781261, -122.391142),
    new LatLng(37.781808, -122.391730),
    new LatLng(37.782340, -122.392341),
    new LatLng(37.782812, -122.393022),
    new LatLng(37.783300, -122.393672),
    new LatLng(37.783809, -122.394275),
    new LatLng(37.784246, -122.394979),
    new LatLng(37.784791, -122.395958),
    new LatLng(37.785675, -122.396746),
    new LatLng(37.786262, -122.395780),
    new LatLng(37.786776, -122.395093),
    new LatLng(37.787282, -122.394426),
    new LatLng(37.787783, -122.393767),
    new LatLng(37.788343, -122.393184),
    new LatLng(37.788895, -122.392506),
    new LatLng(37.789371, -122.391701),
    new LatLng(37.789722, -122.390952),
    new LatLng(37.790315, -122.390305),
    new LatLng(37.790738, -122.389616),
    new LatLng(37.779448, -122.438702),
    new LatLng(37.779023, -122.438585),
    new LatLng(37.778542, -122.438492),
    new LatLng(37.778100, -122.438411),
    new LatLng(37.777986, -122.438376),
    new LatLng(37.777680, -122.438313),
    new LatLng(37.777316, -122.438273),
    new LatLng(37.777135, -122.438254),
    new LatLng(37.776987, -122.438303),
    new LatLng(37.776946, -122.438404),
    new LatLng(37.776944, -122.438467),
    new LatLng(37.776892, -122.438459),
    new LatLng(37.776842, -122.438442),
    new LatLng(37.776822, -122.438391),
    new LatLng(37.776814, -122.438412),
    new LatLng(37.776787, -122.438628),
    new LatLng(37.776729, -122.438650),
    new LatLng(37.776759, -122.438677),
    new LatLng(37.776772, -122.438498),
    new LatLng(37.776787, -122.438389),
    new LatLng(37.776848, -122.438283),
    new LatLng(37.776870, -122.438239),
    new LatLng(37.777015, -122.438198),
    new LatLng(37.777333, -122.438256),
    new LatLng(37.777595, -122.438308),
    new LatLng(37.777797, -122.438344),
    new LatLng(37.778160, -122.438442),
    new LatLng(37.778414, -122.438508),
    new LatLng(37.778445, -122.438516),
    new LatLng(37.778503, -122.438529),
    new LatLng(37.778607, -122.438549),
    new LatLng(37.778670, -122.438644),
    new LatLng(37.778847, -122.438706),
    new LatLng(37.779240, -122.438744),
    new LatLng(37.779738, -122.438822),
    new LatLng(37.780201, -122.438882),
    new LatLng(37.780400, -122.438905),
    new LatLng(37.780501, -122.438921),
    new LatLng(37.780892, -122.438986),
    new LatLng(37.781446, -122.439087),
    new LatLng(37.781985, -122.439199),
    new LatLng(37.782239, -122.439249),
    new LatLng(37.782286, -122.439266),
    new LatLng(37.797847, -122.429388),
    new LatLng(37.797874, -122.429180),
    new LatLng(37.797885, -122.429069),
    new LatLng(37.797887, -122.429050),
    new LatLng(37.797933, -122.428954),
    new LatLng(37.798242, -122.428990),
    new LatLng(37.798617, -122.429075),
    new LatLng(37.798719, -122.429092),
    new LatLng(37.798944, -122.429145),
    new LatLng(37.799320, -122.429251),
    new LatLng(37.799590, -122.429309),
    new LatLng(37.799677, -122.429324),
    new LatLng(37.799966, -122.429360),
    new LatLng(37.800288, -122.429430),
    new LatLng(37.800443, -122.429461),
    new LatLng(37.800465, -122.429474),
    new LatLng(37.800644, -122.429540),
    new LatLng(37.800948, -122.429620),
    new LatLng(37.801242, -122.429685),
    new LatLng(37.801375, -122.429702),
    new LatLng(37.801400, -122.429703),
    new LatLng(37.801453, -122.429707),
    new LatLng(37.801473, -122.429709),
    new LatLng(37.801532, -122.429707),
    new LatLng(37.801852, -122.429729),
    new LatLng(37.802173, -122.429789),
    new LatLng(37.802459, -122.429847),
    new LatLng(37.802554, -122.429825),
    new LatLng(37.802647, -122.429549),
    new LatLng(37.802693, -122.429179),
    new LatLng(37.802729, -122.428751),
    new LatLng(37.766104, -122.409291),
    new LatLng(37.766103, -122.409268),
    new LatLng(37.766138, -122.409229),
    new LatLng(37.766183, -122.409231),
    new LatLng(37.766153, -122.409276),
    new LatLng(37.766005, -122.409365),
    new LatLng(37.765897, -122.409570),
    new LatLng(37.765767, -122.409739),
    new LatLng(37.765693, -122.410389),
    new LatLng(37.765615, -122.411201),
    new LatLng(37.765533, -122.412121),
    new LatLng(37.765467, -122.412939),
    new LatLng(37.765444, -122.414821),
    new LatLng(37.765444, -122.414964),
    new LatLng(37.765318, -122.415424),
    new LatLng(37.763961, -122.415296),
    new LatLng(37.763115, -122.415196),
    new LatLng(37.762967, -122.415183),
    new LatLng(37.762278, -122.415127),
    new LatLng(37.761675, -122.415055),
    new LatLng(37.760932, -122.414988),
    new LatLng(37.759337, -122.414862),
    new LatLng(37.773187, -122.421922),
    new LatLng(37.773043, -122.422118),
    new LatLng(37.773007, -122.422165),
    new LatLng(37.772979, -122.422219),
    new LatLng(37.772865, -122.422394),
    new LatLng(37.772779, -122.422503),
    new LatLng(37.772676, -122.422701),
    new LatLng(37.772606, -122.422806),
    new LatLng(37.772566, -122.422840),
    new LatLng(37.772508, -122.422852),
    new LatLng(37.772387, -122.423011),
    new LatLng(37.772099, -122.423328),
    new LatLng(37.771704, -122.423783),
    new LatLng(37.771481, -122.424081),
    new LatLng(37.771400, -122.424179),
    new LatLng(37.771352, -122.424220),
    new LatLng(37.771248, -122.424327),
    new LatLng(37.770904, -122.424781),
    new LatLng(37.770520, -122.425283),
    new LatLng(37.770337, -122.425553),
    new LatLng(37.770128, -122.425832),
    new LatLng(37.769756, -122.426331),
    new LatLng(37.769300, -122.426902),
    new LatLng(37.769132, -122.427065),
    new LatLng(37.769092, -122.427103),
    new LatLng(37.768979, -122.427172),
    new LatLng(37.768595, -122.427634),
    new LatLng(37.768372, -122.427913),
    new LatLng(37.768337, -122.427961),
    new LatLng(37.768244, -122.428138),
    new LatLng(37.767942, -122.428581),
    new LatLng(37.767482, -122.429094),
    new LatLng(37.767031, -122.429606),
    new LatLng(37.766732, -122.429986),
    new LatLng(37.766680, -122.430058),
    new LatLng(37.766633, -122.430109),
    new LatLng(37.766580, -122.430211),
    new LatLng(37.766367, -122.430594),
    new LatLng(37.765910, -122.431137),
    new LatLng(37.765353, -122.431806),
    new LatLng(37.764962, -122.432298),
    new LatLng(37.764868, -122.432486),
    new LatLng(37.764518, -122.432913),
    new LatLng(37.763435, -122.434173),
    new LatLng(37.762847, -122.434953),
    new LatLng(37.762291, -122.435935),
    new LatLng(37.762224, -122.436074),
    new LatLng(37.761957, -122.436892),
    new LatLng(37.761652, -122.438886),
    new LatLng(37.761284, -122.439955),
    new LatLng(37.761210, -122.440068),
    new LatLng(37.761064, -122.440720),
    new LatLng(37.761040, -122.441411),
    new LatLng(37.761048, -122.442324),
    new LatLng(37.760851, -122.443118),
    new LatLng(37.759977, -122.444591),
    new LatLng(37.759913, -122.444698),
    new LatLng(37.759623, -122.445065),
    new LatLng(37.758902, -122.445158),
    new LatLng(37.758428, -122.444570),
    new LatLng(37.757687, -122.443340),
    new LatLng(37.757583, -122.443240),
    new LatLng(37.757019, -122.442787),
    new LatLng(37.756603, -122.442322),
    new LatLng(37.756380, -122.441602),
    new LatLng(37.755790, -122.441382),
    new LatLng(37.754493, -122.442133),
    new LatLng(37.754361, -122.442206),
    new LatLng(37.753719, -122.442650),
    new LatLng(37.753096, -122.442915),
    new LatLng(37.751617, -122.443211),
    new LatLng(37.751496, -122.443246),
    new LatLng(37.750733, -122.443428),
    new LatLng(37.750126, -122.443536),
    new LatLng(37.750103, -122.443784),
    new LatLng(37.750390, -122.444010),
    new LatLng(37.750448, -122.444013),
    new LatLng(37.750536, -122.444040),
    new LatLng(37.750493, -122.444141),
    new LatLng(37.790859, -122.402808),
    new LatLng(37.790864, -122.402768),
    new LatLng(37.790995, -122.402539),
    new LatLng(37.791148, -122.402172),
    new LatLng(37.791385, -122.401312),
    new LatLng(37.791405, -122.400776),
    new LatLng(37.791288, -122.400528),
    new LatLng(37.791113, -122.400441),
    new LatLng(37.791027, -122.400395),
    new LatLng(37.791094, -122.400311),
    new LatLng(37.791211, -122.400183),
    new LatLng(37.791060, -122.399334),
    new LatLng(37.790538, -122.398718),
    new LatLng(37.790095, -122.398086),
    new LatLng(37.789644, -122.397360),
    new LatLng(37.789254, -122.396844),
    new LatLng(37.788855, -122.396397),
    new LatLng(37.788483, -122.395963),
    new LatLng(37.788015, -122.395365),
    new LatLng(37.787558, -122.394735),
    new LatLng(37.787472, -122.394323),
    new LatLng(37.787630, -122.394025),
    new LatLng(37.787767, -122.393987),
    new LatLng(37.787486, -122.394452),
    new LatLng(37.786977, -122.395043),
    new LatLng(37.786583, -122.395552),
    new LatLng(37.786540, -122.395610),
    new LatLng(37.786516, -122.395659),
    new LatLng(37.786378, -122.395707),
    new LatLng(37.786044, -122.395362),
    new LatLng(37.785598, -122.394715),
    new LatLng(37.785321, -122.394361),
    new LatLng(37.785207, -122.394236),
    new LatLng(37.785751, -122.394062),
    new LatLng(37.785996, -122.393881),
    new LatLng(37.786092, -122.393830),
    new LatLng(37.785998, -122.393899),
    new LatLng(37.785114, -122.394365),
    new LatLng(37.785022, -122.394441),
    new LatLng(37.784823, -122.394635),
    new LatLng(37.784719, -122.394629),
    new LatLng(37.785069, -122.394176),
    new LatLng(37.785500, -122.393650),
    new LatLng(37.785770, -122.393291),
    new LatLng(37.785839, -122.393159),
    new LatLng(37.782651, -122.400628),
    new LatLng(37.782616, -122.400599),
    new LatLng(37.782702, -122.400470),
    new LatLng(37.782915, -122.400192),
    new LatLng(37.783137, -122.399887),
    new LatLng(37.783414, -122.399519),
    new LatLng(37.783629, -122.399237),
    new LatLng(37.783688, -122.399157),
    new LatLng(37.783716, -122.399106),
    new LatLng(37.783798, -122.399072),
    new LatLng(37.783997, -122.399186),
    new LatLng(37.784271, -122.399538),
    new LatLng(37.784577, -122.399948),
    new LatLng(37.784828, -122.400260),
    new LatLng(37.784999, -122.400477),
    new LatLng(37.785113, -122.400651),
    new LatLng(37.785155, -122.400703),
    new LatLng(37.785192, -122.400749),
    new LatLng(37.785278, -122.400839),
    new LatLng(37.785387, -122.400857),
    new LatLng(37.785478, -122.400890),
    new LatLng(37.785526, -122.401022),
    new LatLng(37.785598, -122.401148),
    new LatLng(37.785631, -122.401202),
    new LatLng(37.785660, -122.401267),
    new LatLng(37.803986, -122.426035),
    new LatLng(37.804102, -122.425089),
    new LatLng(37.804211, -122.424156),
    new LatLng(37.803861, -122.423385),
    new LatLng(37.803151, -122.423214),
    new LatLng(37.802439, -122.423077),
    new LatLng(37.801740, -122.422905),
    new LatLng(37.801069, -122.422785),
    new LatLng(37.800345, -122.422649),
    new LatLng(37.799633, -122.422603),
    new LatLng(37.799750, -122.421700),
    new LatLng(37.799885, -122.420854),
    new LatLng(37.799209, -122.420607),
    new LatLng(37.795656, -122.400395),
    new LatLng(37.795203, -122.400304),
    new LatLng(37.778738, -122.415584),
    new LatLng(37.778812, -122.415189),
    new LatLng(37.778824, -122.415092),
    new LatLng(37.778833, -122.414932),
    new LatLng(37.778834, -122.414898),
    new LatLng(37.778740, -122.414757),
    new LatLng(37.778501, -122.414433),
    new LatLng(37.778182, -122.414026),
    new LatLng(37.777851, -122.413623),
    new LatLng(37.777486, -122.413166),
    new LatLng(37.777109, -122.412674),
    new LatLng(37.776743, -122.412186),
    new LatLng(37.776440, -122.411800),
    new LatLng(37.776295, -122.411614),
    new LatLng(37.776158, -122.411440),
    new LatLng(37.775806, -122.410997),
    new LatLng(37.775422, -122.410484),
    new LatLng(37.775126, -122.410087),
    new LatLng(37.775012, -122.409854),
    new LatLng(37.775164, -122.409573),
    new LatLng(37.775498, -122.409180),
    new LatLng(37.775868, -122.408730),
    new LatLng(37.776256, -122.408240),
    new LatLng(37.776519, -122.407928),
    new LatLng(37.776539, -122.407904),
    new LatLng(37.776595, -122.407854),
    new LatLng(37.776853, -122.407547),
    new LatLng(37.777234, -122.407087),
    new LatLng(37.777644, -122.406558),
    new LatLng(37.778066, -122.406017),
    new LatLng(37.778468, -122.405499),
    new LatLng(37.778866, -122.404995),
    new LatLng(37.779295, -122.404455),
    new LatLng(37.779695, -122.403950),
    new LatLng(37.779982, -122.403584),
    new LatLng(37.780295, -122.403223),
    new LatLng(37.780664, -122.402766),
    new LatLng(37.781043, -122.402288),
    new LatLng(37.781399, -122.401823),
    new LatLng(37.781727, -122.401407),
    new LatLng(37.781853, -122.401247),
    new LatLng(37.781894, -122.401195),
    new LatLng(37.782076, -122.400977),
    new LatLng(37.782338, -122.400603),
    new LatLng(37.782666, -122.400133),
    new LatLng(37.783048, -122.399634),
    new LatLng(37.783450, -122.399198),
    new LatLng(37.783791, -122.398998),
    new LatLng(37.784177, -122.398959),
    new LatLng(37.784388, -122.398971),
    new LatLng(37.784404, -122.399128),
    new LatLng(37.784586, -122.399524),
    new LatLng(37.784835, -122.399927),
    new LatLng(37.785116, -122.400307),
    new LatLng(37.785282, -122.400539),
    new LatLng(37.785346, -122.400692),
    new LatLng(37.765769, -122.407201),
    new LatLng(37.765790, -122.407414),
    new LatLng(37.765802, -122.407755),
    new LatLng(37.765791, -122.408219),
    new LatLng(37.765763, -122.408759),
    new LatLng(37.765726, -122.409348),
    new LatLng(37.765716, -122.409882),
    new LatLng(37.765708, -122.410202),
    new LatLng(37.765705, -122.410253),
    new LatLng(37.765707, -122.410369),
    new LatLng(37.765692, -122.410720),
    new LatLng(37.765699, -122.411215),
    new LatLng(37.765687, -122.411789),
    new LatLng(37.765666, -122.412373),
    new LatLng(37.765598, -122.412883),
    new LatLng(37.765543, -122.413039),
    new LatLng(37.765532, -122.413125),
    new LatLng(37.765500, -122.413553),
    new LatLng(37.765448, -122.414053),
    new LatLng(37.765388, -122.414645),
    new LatLng(37.765323, -122.415250),
    new LatLng(37.765303, -122.415847),
    new LatLng(37.765251, -122.416439),
    new LatLng(37.765204, -122.417020),
    new LatLng(37.765172, -122.417556),
    new LatLng(37.765164, -122.418075),
    new LatLng(37.765153, -122.418618),
    new LatLng(37.765136, -122.419112),
    new LatLng(37.765129, -122.419378),
    new LatLng(37.765119, -122.419481),
    new LatLng(37.765100, -122.419852),
    new LatLng(37.765083, -122.420349),
    new LatLng(37.765045, -122.420930),
    new LatLng(37.764992, -122.421481),
    new LatLng(37.764980, -122.421695),
    new LatLng(37.764993, -122.421843),
    new LatLng(37.764986, -122.422255),
    new LatLng(37.764975, -122.422823),
    new LatLng(37.764939, -122.423411),
    new LatLng(37.764902, -122.424014),
    new LatLng(37.764853, -122.424576),
    new LatLng(37.764826, -122.424922),
    new LatLng(37.764796, -122.425375),
    new LatLng(37.764782, -122.425869),
    new LatLng(37.764768, -122.426089),
    new LatLng(37.764766, -122.426117),
    new LatLng(37.764723, -122.426276),
    new LatLng(37.764681, -122.426649),
    new LatLng(37.782012, -122.404200),
    new LatLng(37.781574, -122.404911),
    new LatLng(37.781055, -122.405597),
    new LatLng(37.780479, -122.406341),
    new LatLng(37.779996, -122.406939),
    new LatLng(37.779459, -122.407613),
    new LatLng(37.778953, -122.408228),
    new LatLng(37.778409, -122.408839),
    new LatLng(37.777842, -122.409501),
    new LatLng(37.777334, -122.410181),
    new LatLng(37.776809, -122.410836),
    new LatLng(37.776240, -122.411514),
    new LatLng(37.775725, -122.412145),
    new LatLng(37.775190, -122.412805),
    new LatLng(37.774672, -122.413464),
    new LatLng(37.774084, -122.414186),
    new LatLng(37.773533, -122.413636),
    new LatLng(37.773021, -122.413009),
    new LatLng(37.772501, -122.412371),
    new LatLng(37.771964, -122.411681),
    new LatLng(37.771479, -122.411078),
    new LatLng(37.770992, -122.410477),
    new LatLng(37.770467, -122.409801),
    new LatLng(37.770090, -122.408904),
    new LatLng(37.769657, -122.408103),
    new LatLng(37.769132, -122.407276),
    new LatLng(37.768564, -122.406469),
    new LatLng(37.767980, -122.405745),
    new LatLng(37.767380, -122.405299),
    new LatLng(37.766604, -122.405297),
    new LatLng(37.765838, -122.405200),
    new LatLng(37.765139, -122.405139),
    new LatLng(37.764457, -122.405094),
    new LatLng(37.763716, -122.405142),
    new LatLng(37.762932, -122.405398),
    new LatLng(37.762126, -122.405813),
    new LatLng(37.761344, -122.406215),
    new LatLng(37.760556, -122.406495),
    new LatLng(37.759732, -122.406484),
    new LatLng(37.758910, -122.406228),
    new LatLng(37.758182, -122.405695),
    new LatLng(37.757676, -122.405118),
    new LatLng(37.757039, -122.404346),
    new LatLng(37.756335, -122.403719),
    new LatLng(37.755503, -122.403406),
    new LatLng(37.754665, -122.403242),
    new LatLng(37.753837, -122.403172),
    new LatLng(37.752986, -122.403112),
    new LatLng(37.751266, -122.403355)
  ];





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
    private googleMaps: GoogleMaps
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
            //target: this.myLocation,
            target: {
              lat:  21.6507,
              lng: -158.0652
            },
            zoom: 15,
            tilt: 20,
            duration: 3000
          });
        });
        // Add Cluster Marker
        var label = document.getElementById("label");
        this.map.addMarkerCluster({
          boundsDraw: true,
          markers: dummyData(),
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
        function dummyData() {
          return [
            {
              "position": {
                "lat": 21.382314,
                "lng": -157.933097
              },
              "name": "Starbucks - HI - Aiea  03641",
              "address": "Aiea Shopping Center_99-115 Aiea Heights Drive #125_Aiea, Hawaii 96701",
              "phone": "808-484-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.3871,
                "lng": -157.9482
              },
              "name": "Starbucks - HI - Aiea  03642",
              "address": "Pearlridge Center_98-125 Kaonohi Street_Aiea, Hawaii 96701",
              "phone": "808-484-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.363402,
                "lng": -157.928275
              },
              "name": "Starbucks - HI - Aiea  03643",
              "address": "Stadium Marketplace_4561 Salt Lake Boulevard_Aiea, Hawaii 96818",
              "phone": "808-488-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.3884,
                "lng": -157.9431
              },
              "name": "Starbucks - HI - Aiea  03644",
              "address": "Pearlridge Mall_98-1005 Moanalua Road_Aiea, Hawaii 96701",
              "phone": "808-484-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.6507,
                "lng": -158.0652
              },
              "name": "Starbucks - HI - Haleiwa  03645",
              "address": "Pupukea_59-720 Kamehameha Highway_Haleiwa, Hawaii 96712",
              "phone": "808-638-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 19.699335,
                "lng": -155.06566
              },
              "name": "Starbucks - HI - Hilo  03646",
              "address": "Border Waiakea Center_315-325 Makaala Street_Hilo, Hawaii 96720",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 19.698399,
                "lng": -155.064864
              },
              "name": "Starbucks - HI - Hilo  03647",
              "address": "Prince Kuhio Plaza_111 East Puainako Street_Hilo, Hawaii 96720",
              "phone": "808-959-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 19.722763,
                "lng": -155.085598
              },
              "name": "Starbucks - HI - Hilo [D]  03648",
              "address": "Hilo_438 Kilauea Ave_Hilo, Hawaii 96720",
              "phone": "808-933-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.338183,
                "lng": -157.917579
              },
              "name": "Starbucks - HI - Honolulu  03649",
              "address": "Airport Trade Center_550 Paiea Street_Honolulu, Hawaii 96819",
              "phone": "808-833-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.3074,
                "lng": -157.865199
              },
              "name": "Starbucks - HI - Honolulu  03650",
              "address": "Aloha Tower_1 Aloha Tower Drive_Honolulu, Hawaii 96813",
              "phone": "808-522-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.30846253,
                "lng": -157.8614898
              },
              "name": "Starbucks - HI - Honolulu  03651",
              "address": "Bishop_1000 Bishop Street #104_Honolulu, Hawaii 96813",
              "phone": "808-599-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.311363,
                "lng": -157.863751
              },
              "name": "Starbucks - HI - Honolulu  03652",
              "address": "Central Pacific Bank_220 South King Street_Honolulu, Hawaii 96813",
              "phone": "808-538-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.28507546,
                "lng": -157.838214
              },
              "name": "Starbucks - HI - Honolulu  03653",
              "address": "Discovery Bay_1778 Ala Moana Boulevard_Honolulu, Hawaii 96815",
              "phone": "808-946-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.342733,
                "lng": -158.027408
              },
              "name": "Starbucks - HI - Honolulu  03654",
              "address": "Ewa Beach_91-1401 Fort Weaver Road_Honolulu, Hawaii 96706",
              "phone": "808-685-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.28005068,
                "lng": -157.8285093
              },
              "name": "Starbucks - HI - Honolulu  03655",
              "address": "Duty Free Shopper_330 Royal Hawaiian Avenue_Honolulu, Hawaii 96815",
              "phone": "808-926-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.3115,
                "lng": -157.8649
              },
              "name": "Starbucks - HI - Honolulu  03656",
              "address": "Financial Plaza_130 Merchant Street #111_Honolulu, Hawaii 96813",
              "phone": "808-585-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.282048,
                "lng": -157.713041
              },
              "name": "Starbucks - HI - Honolulu  03657",
              "address": "Hawaii Kai Town Center_6700 Kalanianaole Highway_Honolulu, Hawaii 96825",
              "phone": "808-396-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.291345,
                "lng": -157.848791
              },
              "name": "Starbucks - HI - Honolulu  03658",
              "address": "Hokua_1288 Ala Moana Blvd_Honolulu, Hawaii 96814",
              "phone": "808-591-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.335164,
                "lng": -157.868742
              },
              "name": "Starbucks - HI - Honolulu  03659",
              "address": "Kamehameha Shopping Center_1620 North School Street_Honolulu, Hawaii 96817",
              "phone": "808-832-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.27852422,
                "lng": -157.7875773
              },
              "name": "Starbucks - HI - Honolulu  03660",
              "address": "Kahala Mall_4211 Waialae Avenue_Honolulu, Hawaii 96816",
              "phone": "808-737-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.294372,
                "lng": -157.841963
              },
              "name": "Starbucks - HI - Honolulu  03661",
              "address": "Keeaumoku_678 Keeamoku Street #106_Honolulu, Hawaii 96814",
              "phone": "808-946-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.2819,
                "lng": -157.8163
              },
              "name": "Starbucks - HI - Honolulu  03662",
              "address": "Kapahulu Avenue_625 Kapahulu Avenue_Honolulu, Hawaii 96815",
              "phone": "808-734-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.27608195,
                "lng": -157.7049835
              },
              "name": "Starbucks - HI - Honolulu  03663",
              "address": "Koko Marina_7192 Kalanianaole Highway_Honolulu, Hawaii 96825",
              "phone": "808-394-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.3129,
                "lng": -157.8129
              },
              "name": "Starbucks - HI - Honolulu  03664",
              "address": "Manoa Valley_2902 East Manoa Road_Honolulu, Hawaii 96822",
              "phone": "808-988-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.293082,
                "lng": -157.847092
              },
              "name": "Starbucks - HI - Honolulu  03665",
              "address": "Macys Ala Moana_1450 Ala Moan Boulevard_Honolulu, Hawaii 96814",
              "phone": "808-943-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.341957,
                "lng": -157.929089
              },
              "name": "Starbucks - HI - Honolulu  03666",
              "address": "Moanalua Shopping Center_930 Valkenburgh Street_Honolulu, Hawaii 96818",
              "phone": "808-422-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.279503,
                "lng": -157.833101
              },
              "name": "Starbucks - HI - Honolulu  03667",
              "address": "Outrigger Reef_2169 Kalia Road #102_Honolulu, Hawaii 96815",
              "phone": "808-922-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.282251,
                "lng": -157.828172
              },
              "name": "Starbucks - HI - Honolulu  03668",
              "address": "Ohana Waikiki West_2330 Kuhio Avenue_Honolulu, Hawaii 96815",
              "phone": "808-922-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.323602,
                "lng": -157.890904
              },
              "name": "Starbucks - HI - Honolulu  03669",
              "address": "Sand Island_120 Sand Island Access Road #4_Honolulu, Hawaii 96819",
              "phone": "808-832-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.270016,
                "lng": -157.82381
              },
              "name": "Starbucks - HI - Honolulu  03670",
              "address": "Park Shore Hotel_2856 Kalakaua Avenue_Honolulu, Hawaii 96815",
              "phone": "808-923-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.289497,
                "lng": -157.842832
              },
              "name": "Starbucks - HI - Honolulu  03671",
              "address": "Sears Ala Moana Center_1450 Ala Moana Blvd._Honolulu, Hawaii 96814",
              "phone": "808-943-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.28201,
                "lng": -157.831087
              },
              "name": "Starbucks - HI - Honolulu  03672",
              "address": "Waikiki Shopping Plaza_2270 Kalakaua Avenue #1800_Honolulu, Hawaii 96815",
              "phone": "808-922-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.2833,
                "lng": -157.8298
              },
              "name": "Starbucks - HI - Honolulu  03673",
              "address": "Waikiki Trade Center_2255 Kuhio Avenue S-1_Honolulu, Hawaii 96815",
              "phone": "808-921-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.297,
                "lng": -157.8555
              },
              "name": "Starbucks - HI - Honolulu  03674",
              "address": "Ward Entertainment Center_310 Kamakee Street #6_Honolulu, Hawaii 96814",
              "phone": "808-593-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.406095,
                "lng": -157.800761
              },
              "name": "Starbucks - HI - Honolulu  03675",
              "address": "Windward City Shopping Center_45-480 Kaneohe Bay Drive_Honolulu, Hawaii 96744",
              "phone": "808-234-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.2829,
                "lng": -157.8318
              },
              "name": "Starbucks - HI - Honolulu  03676",
              "address": "Waikiki Walk_2222 Kalakaua Avenue_Honolulu, Hawaii 96815",
              "phone": "808-926-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.293045,
                "lng": -157.852223
              },
              "name": "Starbucks - HI - Honolulu  03677",
              "address": "Ward Gateway_1142 Auahi Street_Honolulu, Hawaii 96814",
              "phone": "808-589-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.3067,
                "lng": -157.858444
              },
              "name": "Starbucks - HI - Honolulu [A]  03678",
              "address": "HNL Honolulu Airport_300 Rogers Blvd_Honolulu, Hawaii 96820",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 20.891963,
                "lng": -156.477614
              },
              "name": "Starbucks - HI - Kahului  03679",
              "address": "Queen Kaahumanu Center_275 West Kaahuman Avenue #1200 F5_Kahului, Hawaii 96732",
              "phone": "808-871-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 20.8843,
                "lng": -156.4583
              },
              "name": "Starbucks - HI - Kahului  03680",
              "address": "Maui Marketplace_270 Dairy Road_Kahului, Hawaii 96732",
              "phone": "808-871-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.39356972,
                "lng": -157.7403334
              },
              "name": "Starbucks - HI - Kailua  03681",
              "address": "Kailua Village_539 Kailua Road_Kailua, Hawaii 96734",
              "phone": "808-263-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 19.6512,
                "lng": -155.9944
              },
              "name": "Starbucks - HI - Kailua-Kona  03682",
              "address": "Kona Coast Shopping Center_74-5588 Palani Road_Kailua-Kona, Hawaii 96740",
              "phone": "808-329-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 19.8434,
                "lng": -155.7652
              },
              "name": "Starbucks - HI - Kamuela  03683",
              "address": "Parker Ranch Center_67-1185 Mamalahoa Highway D108_Kamuela, Hawaii 96743",
              "phone": "808-887-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.34306,
                "lng": -158.078906
              },
              "name": "Starbucks - HI - Kapolei  03684",
              "address": "Halekuai Center_563 Farrington Highway #101_Kapolei, Hawaii 96707",
              "phone": "808-674-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.336,
                "lng": -158.0802
              },
              "name": "Starbucks - HI - Kapolei [D]  03685",
              "address": "Kapolei Parkway_338 Kamokila Boulevard #108_Kapolei, Hawaii 96797",
              "phone": "808-674-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 20.740343,
                "lng": -156.456218
              },
              "name": "Starbucks - HI - Kihei  03686",
              "address": "Kukui Mall_1819 South Kihei Road_Kihei, Hawaii 96738",
              "phone": "808-891-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 20.7575,
                "lng": -156.4559
              },
              "name": "Starbucks - HI - Kihei  03687",
              "address": "Piilani Village Shopping Center_247 Piikea Avenue #106_Kihei, Hawaii 96753",
              "phone": "808-891-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 19.9338,
                "lng": -155.8422
              },
              "name": "Starbucks - HI - Kohala Coast  03688",
              "address": "Mauna Lani_68-1330 Mauna Lani Drive H-101b_Kohala Coast, Hawaii 96743",
              "phone": "808-885-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 20.886244,
                "lng": -156.684697
              },
              "name": "Starbucks - HI - Lahaina  03689",
              "address": "Lahaina Cannery Mall_1221 Honoapiilani Highway_Lahaina, Hawaii 96761",
              "phone": "808-661-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 20.8804,
                "lng": -156.6816
              },
              "name": "Starbucks - HI - Lahaina  03690",
              "address": "Lahaina_845 Wainee Street_Lahaina, Hawaii 96761",
              "phone": "808-667-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.970661,
                "lng": -159.396274
              },
              "name": "Starbucks - HI - Lihue  03691",
              "address": "Kukui Grove_3-2600 Kaumualii Highway #A8_Lihue, Hawaii 96766",
              "phone": "808-241-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 20.8818,
                "lng": -156.4633
              },
              "name": "Starbucks - HI - Maui [A]  03692",
              "address": "OGG Kahului Main Concourse_New Terminal Bldg @ Bldg 340_Maui, Hawaii 96732",
              "phone": "808-877-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.4585,
                "lng": -158.0178
              },
              "name": "Starbucks - HI - Mililani  03693",
              "address": "Mililani Shopping Center_95-221 Kipapa Drive_Mililani, Hawaii 96789",
              "phone": "808-625-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.474341,
                "lng": -158.001864
              },
              "name": "Starbucks - HI - Mililani  03694",
              "address": "Mililani Town Center_95-1249 Meheula Parkway_Mililani, Hawaii 96789",
              "phone": "808-627-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 20.838965,
                "lng": -156.34192
              },
              "name": "Starbucks - HI - Pukalani  03695",
              "address": "Pukalani Foodland_55 Pukalani Street_Pukalani, Hawaii 96768",
              "phone": "808-573-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.378675,
                "lng": -157.728499
              },
              "name": "Starbucks - HI - Waipahu  03696",
              "address": "Enchanted Lakes_1020 Keolu Drive_Waipahu, Hawaii 96734",
              "phone": "808-263-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.39662113,
                "lng": -158.0317397
              },
              "name": "Starbucks - HI - Waipahu  03697",
              "address": "Kunia Shopping Center_94-673 Kupuohi Street_Waipahu, Hawaii 96797",
              "phone": "808-680-0000",
              "icon": "./img/starbucks.png"
            },
            {
              "position": {
                "lat": 21.403688,
                "lng": -158.006128
              },
              "name": "Starbucks - HI - Waipahu  03698",
              "address": "Waikele_94-799 Lumiaina Street_Waipahu, Hawaii 96797",
              "phone": "808-678-0000",
              "icon": "./img/starbucks.png"
            }
          ];
        }
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
