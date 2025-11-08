import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { GridApi, Column } from 'ag-grid-community';
import { GithubIntegrationService } from '../../core/services/github-integration.service';
import { MaterialModule } from "../../material.module";

// Register all AG Grid community modules once so we can use all the features for the grid
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-github-data-viewer',
  standalone: true,
  imports: [AgGridAngular, MaterialModule],
  templateUrl: './github-data-viewer.component.html'
})

export class GithubDataViewerComponent implements OnInit {
  collections: string[] = [];
  selectedCollection: string | null = null;
  rowData: any[] = [];
  columnDefs: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  searchText: string = '';

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  private gridApi!: GridApi;

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  constructor(private githubService: GithubIntegrationService) { }

  ngOnInit(): void {
    this.loadCollections();
  }

  // Load available GitHub collections
  loadCollections(): void {
    this.githubService.getCollections().subscribe({
      next: (cols) => {
        this.collections = cols;
      },
      error: (err) => {
        console.error('Failed to fetch collections:', err);
        this.errorMessage = 'Could not load collections from backend.';
      }
    });
  }

  // Load data for selected collection
  loadData(): void {
    if (!this.selectedCollection) return;
    this.isLoading = true;
    this.rowData = [];
    this.columnDefs = [];
    this.errorMessage = '';

    // Hit the back-end to get the specific collection/table from the dropdown menu
    this.githubService.getCollectionData(this.selectedCollection).subscribe({
      next: (data) => {
        this.rowData = data;
        this.columnDefs = this.generateColumns(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(`Failed to fetch data for ${this.selectedCollection}:`, err);
        this.errorMessage = `Could not load data for ${this.selectedCollection}.`;
        this.isLoading = false;
      }
    });
  }

  // Generate columns dynamically from data keys
  private generateColumns(data: any[]): any[] {
    if (!data.length) {
      return [];
    }
    const sample = data[0];
    return Object.keys(sample).map(key => ({
      headerName: key,
      field: key,
      sortable: true,
      filter: true,
      resizable: true
    }));
  }

  // Allows for quick filtering with the search bar
  onQuickFilter(value: string) {
    this.searchText = value;
    if (this.gridApi) {
      this.gridApi.setGridOption('quickFilterText', value);
    }
  }
}
