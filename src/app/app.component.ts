import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { YoutubeService } from "./services/youtube.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('demoYouTubePlayer') demoYouTubePlayer: ElementRef<HTMLDivElement> | undefined;
  selectedVideo = '';
  videoWidth: number | undefined;
  videoHeight: number | undefined;

  pageToken = 'CAIQAA';
  perPage = 20;
  searchValue: string = '';
  videos: Array<any> = [];
  videoId: string = '';

  constructor(
    private youTubeService: YoutubeService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.selectedVideo = 'nYTrIcn4rjg';
    this.loadVideos();
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  onResize = (): void => {
    if(this.demoYouTubePlayer !== undefined) {
    this.videoWidth = Math.min(this.demoYouTubePlayer.nativeElement.clientWidth, 1200);
    this.videoHeight = this.videoWidth * 0.6;
    this.changeDetectorRef.detectChanges();
    }
  }

  keyPressCharacterOnly(event: any) {
    var input = String.fromCharCode(event.keyCode);
    if (/^[a-zA-Z\s]+$/.test(input)) {
      return true;
    } else {
      event.preventDefault();
      return false
    }
  }

  loadVideos() {
    this.youTubeService
      .getVideosForChanel(this.perPage)
      .pipe()
      .subscribe((videoList: any) => {
        for (let element of videoList['items']) {
          this.videos.push(element);
        }
      },
        (err) => {
          return;
        });
  }

  searchVideos() {
    this.youTubeService.searchVideos(this.searchValue, this.perPage)
      .pipe()
      .subscribe((videoList: any) => {
        this.videos = [];
        for (let item of videoList['items']) {
          this.videos.push(item);
        }
        this.pageToken = videoList.nextPageToken;
      },
        (err) => {
          return;
        });
  }

  loadMoreSearchedVideos() {
    this.youTubeService.moreVideos(this.searchValue, this.perPage, this.pageToken)
      .pipe()
      .subscribe((videoList: any) => {
        for (let item of videoList['items']) {
          this.videos.push(item);
        }
        this.pageToken = videoList.nextPageToken;
      }, (err) => {
        return;
      });
  }

  @HostListener("window:scroll", ["$event"])
  onScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop)
      + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max) {
      this.loadMoreSearchedVideos();
    }
  }

  selectVideo(videoId: string) {
    this.selectedVideo = videoId;
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }

}

