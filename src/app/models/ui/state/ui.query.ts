import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UiStore, UiState } from './ui.store';

@Injectable({ providedIn: 'root' })
export class UiQuery extends Query<UiState> {

  selectColors$ = this.select(state => state.colors);
  selectActiveSensorTypes$ = this.select(state => state.activeSensorTypes);
  selectSelectedPheno$ = this.select(state => state.selectedPheno);
  selectDateRange$ = this.select(state => state.dateRange);
  selectDateStamp$ = this.select(state => state.dateStamp);
  selectDateRangeChart$ = this.select(state => state.dateRangeChart);
  selectActiveTimeMode$ = this.select(state => state.activeTimeMode);
  selectSelectedDate$ = this.select(state => state.selectedDate);
  selectFilterVisible$ = this.select(state => state.fitlerVisible);
  selectSearchTerm$ = this.select(state => state.searchTerm);
  selectSearchResults$ = this.select(state => state.searchResults);
  selectLocationAutocompleteResults$ = this.select(state => state.locationAutocompleteResults);
  selectClustering$ = this.select(state => state.clustering);
  selectNumbers$ = this.select(state => state.numbers);
  selectCircles$ = this.select(state => state.circles);
  selectCluster$ = this.select(state => state.cluster);
  selectInfoPheno$ = this.select(state => state.infoPheno);
  selectFilters$ = this.select(state => state.filters);
  selectReloadMapData$ = this.select(state => state.reloadMapData);
  selectShowDateModal$ = this.select(state => state.showDateModal);
  selectStats$ = this.select(state => state.stats);

  selectLanguage$ = this.select(state => state.language);
  selectTheme$ = this.select(state => state.theme);
  selectActiveTab$ = this.select(state => state.activeTab);
  selectChartLoading$ = this.select(state => state.chartLoading);

  selectedPolygon$ = this.select(state => state.selectedPolygon);
  selectedPoint$ = this.select(state => state.selectedPoint);
  drawmode$ = this.select(state => state.drawmode);

  constructor(protected store: UiStore) {
    super(store);
  }

}
