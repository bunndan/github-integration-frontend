import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GithubIntegrationService {
  private baseUrl = 'http://localhost:3000/api/github'; // backend endpoint

  constructor(private http: HttpClient) { }

  /** -----------  OAUTH & INTEGRATION STATUS  ----------- **/

  // Get OAuth redirect URL
  getOAuthUrl(): string {
    return `${this.baseUrl}/auth`;
  }

  // Check if GitHub is connected
  getIntegrationStatus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/status`);
  }

  // Remove GitHub integration
  removeIntegration(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove`);
  }

  // Re-sync GitHub data
  resyncIntegration(): Observable<any> {
    return this.http.post(`${this.baseUrl}/resync`, {});
  }


  /** -----------  GRAB DATA ENDPOINTS  ----------- **/

  // Get list of all collections (orgs, repos, commits, etc.)
  getCollections(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/collections`);
  }

  // Get all documents from a specific collection
  getCollectionData(collectionName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/collections/${collectionName}`);
  }
}
