import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IntegrationStatusComponent } from './pages/integration-status/integration-status.component';
import { GithubDataViewerComponent } from './pages/github-data-viewer/github-data-viewer.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'integration-status', component: IntegrationStatusComponent },
  { path: 'github-data', component: GithubDataViewerComponent },
];
