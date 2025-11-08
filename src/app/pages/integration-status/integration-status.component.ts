import { Component, OnInit } from '@angular/core';
import { GithubIntegrationService } from '../../core/services/github-integration.service';
import { DatePipe } from "@angular/common";
import { MaterialModule } from "../../material.module";

@Component({
  selector: 'app-integration-status',
  standalone: true,
  templateUrl: './integration-status.component.html',
  styleUrls: ['./integration-status.component.scss'],
  imports: [MaterialModule, DatePipe]
})

export class IntegrationStatusComponent implements OnInit {
  isConnected: boolean = false;
  connectionDate: Date | null = null;
  user: any = null;
  isSyncing: boolean = false;

  constructor(private githubService: GithubIntegrationService) { }

  ngOnInit(): void {
    this.checkIntegrationStatus();
  }

  // Check if the current user is already integrated with GitHub
  checkIntegrationStatus() {
    this.githubService.getIntegrationStatus().subscribe({
      next: (status) => {
        this.isConnected = status.connected;
        this.connectionDate = status.connectedAt ? new Date(status.connectedAt) : null;
        this.user = status.user || null;
      },
      error: (err) => console.error('Error fetching integration status', err)
    });
  }

  // Called when the "Connect to GitHub" button is selected. Hits the back-end URL to authenticate.
  connectGithub() {
    window.location.href = this.githubService.getOAuthUrl();
  }

  // Removes the GitHub integration. The back-end will delete it from the db.
  removeIntegration() {
    this.githubService.removeIntegration().subscribe(() => {
      this.isConnected = false;
      this.connectionDate = null;
    });
  }

  // Syncs up the user's info from GitHub and will input it into the DB.
  // I didn't run this at the start as it is a long load, so it can be run after the first connection.
  resyncIntegration() {
    if (!confirm('This will fetch new data from GitHub and replace the old data. Continue?')) return;
    this.isSyncing = true; // Toggles a loading circle
    
    this.githubService.resyncIntegration().subscribe({
      next: (res) => {
        console.log('Re-sync successful:', res);
        alert('GitHub data re-synced successfully!');
        this.isSyncing = false;
      },
      error: (err) => {
        console.error('Error during re-sync:', err);
        alert('Failed to re-sync GitHub data.');
        this.isSyncing = false;
      }
    });
  }
}
