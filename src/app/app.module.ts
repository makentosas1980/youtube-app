import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import { ScrollingModule } from "@angular/cdk/scrolling";
import { YouTubePlayerModule } from "@angular/youtube-player";

import { AppComponent } from './app.component';
import { VideosComponent } from './videos/videos.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

@NgModule({
  declarations: [
    AppComponent,
    VideosComponent,
    VideoPlayerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatListModule,
    ScrollingModule,
    YouTubePlayerModule
  ],
  providers: [VideoPlayerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
