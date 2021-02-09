import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  //apiKey: string = 'AIzaSyCafGEuQQE9FjwzT1xABee6AyuG8PAJdH0';
  //apiKey: String = 'AIzaSyC3C75r91rHzg1of1_bM2lpjvfVH4NWPZs';
  //apiKey: String = 'AIzaSyBDZWVoGSfCW5h9mlJwGmwksDWnFDwFsKc';
  apiKey: String = 'AIzaSyDpLPKLbx2KnSr67_2T3ueFBfWAkifuOFo';

  constructor(public http: HttpClient) { }

  getVideosForChanel(maxResults: number): Observable<Object> {
    let url = `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&order=date&part=snippet&type=video,id&maxResults=${maxResults}`;
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }));
  }

  searchVideos(value: string, maxResults: number) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${value}&type=video&key=${this.apiKey}`;
    return this.http.get(url).pipe(map((res) => {
      return res;
    }));
  }

  moreVideos(value: string, maxResults: number, pageToken: string) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${value}&pageToken=${pageToken}&type=video&key=${this.apiKey}`;
    return this.http.get(url).pipe(map((res) => {
      return res;
    }));
  }


}
