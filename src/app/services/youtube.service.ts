import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  //Register with youtube services and get your own API_Key
  apiKey: String = '';

  constructor(public http: HttpClient) { }

  getVideosForChanel(maxResults: number): Observable<Object> {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&order=date&part=snippet&type=video,id&maxResults=${maxResults}`;
    return this.getResults(url);
  }

  searchVideos(value: string, maxResults: number) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${value}&type=video&key=${this.apiKey}`;
    return this.getResults(url);
  }

  moreVideos(value: string, maxResults: number, pageToken: string) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${value}&pageToken=${pageToken}&type=video&key=${this.apiKey}`;
    return this.getResults(url);
  }

  getResults(url: string) {
    const result = this.http.get(url)
      .pipe(map((res) => {
        return res;
      }));
    return result;
  }

}
