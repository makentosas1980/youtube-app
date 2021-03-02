import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerComponent implements OnInit {

  @ViewChild('demoYouTubePlayer') demoYouTubePlayer: ElementRef<HTMLDivElement> | undefined;
  @Input() data: Observable<any> | undefined;
  _newVideoId = '';
  subscription: Subscription = new Subscription;
  videoWidth: number | undefined;
  videoHeight: number | undefined;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.data?.subscribe((value) => {
      this._newVideoId = value.id;
      this.changeDetectorRef.markForCheck();
    })
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  onResize = (): void => {
    if (this.demoYouTubePlayer !== undefined) {
      this.videoWidth = Math.min(this.demoYouTubePlayer.nativeElement.clientWidth, 1200);
      this.videoHeight = this.videoWidth * 0.6;
      this.changeDetectorRef.detectChanges();
    } else {
      return;
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }

}
