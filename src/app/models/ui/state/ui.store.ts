import { Injectable } from '@angular/core';
import { Ui } from './ui.model';
import { StoreConfig, Store } from '@datorama/akita';
import { ColorHelper } from '@swimlane/ngx-charts';
import { clusterLayerSolo, clusterLayer } from './layers';
import { Filter } from '../../filter/filter.model';
import { state } from '@angular/animations';

// Should contain all variables to describe the state of the ui
export interface UiState {
  colors: ColorHelper,
  activeSensorTypes: any[],
  selectedPheno: any,
  layers: any[],
  dateStamp: Date,
  dateRange: Array<Date>,
  activeTimeMode: string,  // live || timestamp || timerange
  dateRangeChart: Array<Date>,
  selectedDate: Date,
  language: string,
  theme: string,  // dark || light
  baseLayer: any,
  clusterLayers: any,
  fitlerVisible: boolean,
  searchTerm: string,
  searchResults: any[],
  locationAutocompleteResults: any[],
  clustering: boolean,
  cluster: any,
  numbers: boolean,
  circles: boolean,
  infoPheno: string,
  filters: Filter,
  reloadMapData: boolean,
  mapLoading: boolean,
  showDateModal: boolean,
  stats: object,
  activeTab: string,
  chartLoading: boolean,

  selectedPolygon: any,
  selectedPoint: any,
  drawmode: boolean,
}

export function createInitialState(): UiState {
  return {
    colors: null,
    activeSensorTypes: [],
    selectedPheno: null,
    dateStamp: null,
    dateRange: null,
    activeTimeMode: "live",
    dateRangeChart: [new Date("2020-03-27T13:47:54.186Z"), new Date("2020-03-27T14:47:54.186Z")],
    selectedDate: null,
    language: 'de-DE',
    theme: 'light',
    baseLayer:  {
      'id': 'base-layer',
      'type': 'circle',
      'source': 'boxes',
      'filter': ["!=", null, [ "get", "Temperatur", ["object", ["get", "live", ["object", ["get", "sensors"]]]]]],
      'paint': {
        'circle-radius': {
          'base': 2,
          'stops': [[1, 6], [22, 3000]]
        },
        'circle-color': [
          'interpolate',
          ['linear'],
          [ "get", "Temperatur", ["object", ["get", "live", ["object", ["get", "sensors"]]]]],
          -5, '#9900cc',
          0, '#0000ff',
          10, '#0099ff',
          20, '#ffff00',
          30, '#ff0000'
        ]
      },
      'layout' : {
        visibility: 'none'
      }
    },
    layers: [{
      'id': 'base-layer',
      'type': 'circle',
      'source': 'boxes',
      'filter': ["!=", 'old', ["get", "state"]],
      'paint': {
      'circle-radius': {
        'base': 2,
        'stops': [[1,6], [22, 3000]]
      },
      'circle-stroke-width': 1,
      'circle-stroke-color': '#383838',

      // 'circle-blur': 0.8,
      'circle-color': [
        'match',
        ['get', 'state'],
        'active', '#4EAF47',
        'old', '#eb5933',
        /* other */ '#ccc200'
        ]
      }
    }],
    clusterLayers: [clusterLayer, clusterLayerSolo],
    fitlerVisible: true,
    searchTerm: "",
    searchResults: [],
    locationAutocompleteResults: [],
    clustering: false,
    cluster: null,
    numbers: true,
    circles: true,
    infoPheno: null,
    filters: {
      exposure: 'outdoor',
      group: null,
      model: [],
      ids: null
    },
    reloadMapData: false,
    mapLoading: false,
    showDateModal: false,
    stats: {
      totalBoxes: null,
      totalMeasurements: null
    },
    activeTab: 'phenos',
    chartLoading: false,

    selectedPolygon: [],
    selectedPoint: [],
    drawmode: false,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ui' })
export class UiStore extends Store<UiState> {

  constructor() {
    super(createInitialState());
  }

  setActiveSensorTypes(types){
    this.update( state => ({...state, activeSensorTypes: types}));
  }

  // updates the selected Pheno (this is so complicated because all Layers have to be changed if the selected Phenomenon changes)
  updateSelectedPheno(pheno) {
    console.log("updateSelectedPheno")
    this.update( state =>  {
      let circleColorCluster:any =
        ['match',
          ['get', 'model'],
          'custom',
          '#fbb03b',
        /* other */ '#ccc'];
      let circleColorSolo:any =
        ['match',
          ['get', 'model'],
          'custom',
          '#fbb03b',
        /* other */ '#ccc'];
      if(pheno && pheno.title != 'ALL'){
        //DEEP CLONE because immutable, apparently this is the most efficient way to do it
        circleColorCluster =JSON.parse(JSON.stringify(pheno.layer.paint['circle-color']));
        circleColorCluster[2] = JSON.parse(JSON.stringify(state.clusterLayers[0].paint['circle-color']))[2];
        circleColorCluster[2][1][1] = pheno.title;

        circleColorSolo = JSON.parse(JSON.stringify(pheno.layer.paint['circle-color']));
        circleColorSolo[2] = JSON.parse(JSON.stringify(state.clusterLayers[1].paint['circle-color']))[2];
        circleColorSolo[2][1] = pheno.title;
      }

      if(pheno.title != 'ALL'){

        return {
          ...state,
          selectedPheno: pheno,
          baseLayer: {
            ...state.baseLayer,
            filter: pheno.layer.filter,
            paint: {
              ...state.baseLayer.paint,
              'circle-opacity': pheno.layer.paint['circle-opacity'],
              'circle-color': pheno.layer.paint['circle-color'],
              'circle-radius': pheno.layer.paint['circle-radius'],
              'circle-stroke-width': 1
            },
          },
          clusterLayers: [{
            ...state.clusterLayers[0],
            filter: [
              'all',
              ["!=", null, ['get', pheno.title]],
              ['==', ['get', 'cluster'], true],
              ['has', 'point_count']
            ],
            paint: {
              ...state.clusterLayers[0].paint,
              'circle-color': circleColorCluster,
              // 'circle-stroke-width': 1
            }
          },{
            ...state.clusterLayers[1],
            filter:  [
              'all',
              ["!=", null, [ "get", pheno.title, ["object", ["get", "live", ["object", ["get", "sensors"]]]]]],
              ['!', ['has', 'point_count']]
            ],
            paint: {
              ...state.clusterLayers[1].paint,
              'circle-color': circleColorSolo,
              // 'circle-stroke-width': 1
            }
          }
        ]}
      } else {
        return {
          ...state,
          selectedPheno: pheno,
          baseLayer: pheno.layer
        }
      }

    });
  }
  setLayers(layers){
    this.update( state => ( { ...state , layers: layers }));
  }

  updateDateStamp(date: Date){
    this.update( stae => ({...state, dateStamp: date}));
  }

  updateDateRange(dateRange: Array<Date>) {
    this.update( state => ({ ...state ,dateRange: dateRange}) );
  }
  updateStartDate(startDate: Date) {
    this.update( state => ({ ...state ,dateRange: [startDate, state.dateRange[1] ? state.dateRange[1] : null]} ) );
  }
  updateEndDate(endDate: Date) {
    this.update( state => ({ ...state ,dateRange: [state.dateRange[0] ? state.dateRange[0] : null , endDate]}) );
  }
  updateDateRangeChart(dateRange: Array<Date>) {
    this.update( state => ({ ...state ,dateRangeChart: dateRange}) );
  }
  updateStartDateChart(startDate: Date) {
    this.update( state => ({ ...state ,dateRangeChart: [startDate, state.dateRangeChart[1] ? state.dateRangeChart[1] : null]} ) );
  }
  updateEndDateChart(endDate: Date) {
    this.update( state => ({ ...state ,dateRangeChart: [state.dateRangeChart[0] ? state.dateRangeChart[0] : null , endDate]}) );
  }
  updateSelectedDate(date){
    this.update( state => ({ ...state , selectedDate: date }));
  }
  setLanguage(lang){
    this.update( state => ({ ...state , language: lang }));
  }
  setTheme(theme){
    this.update( state => ({ ...state , theme: theme }));
  }

  updateBaseLayer(layer){
    console.log("updateBaseLayer")
    this.update( state => ( {
      baseLayer: {
        ...state.baseLayer,
        filter: layer.filter ? layer.filter : state.baseLayer.filter,
        paint: {
          ...state.baseLayer.paint,
          'circle-stroke-width': layer.paint['circle-stroke-width'] ? layer.paint['circle-stroke-width'] : state.baseLayer.paint['circle-stroke-width'],
          'circle-blur': layer.paint['circle-blur'] != undefined ? layer.paint['circle-blur'] : state.baseLayer.paint['circle-blur'],
          'circle-color': layer.paint['circle-color'] ? layer.paint['circle-color'] : state.baseLayer.paint['circle-color'],
          'circle-radius': layer.paint['circle-radius']
        },
      }
    }))
  }

  updateLegend(steps){
    let newPheno = {
      ...this.getValue().selectedPheno,
      layer: {
        ...this.getValue().selectedPheno.layer,
        paint: {
          ...this.getValue().selectedPheno.layer.paint,
          'circle-color': this.getValue().selectedPheno.layer.paint['circle-color'].slice(0,3).concat(steps)
        }
      }
    }
    this.updateSelectedPheno(newPheno);

  }

}


