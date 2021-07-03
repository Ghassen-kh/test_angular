import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import Video from '../video.model';
import { VideoService } from '../video.service';


@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.css']
})
export class VideosListComponent implements OnInit {


  videos?: Video[];
  currentVideo?: Video;
  currentIndex = -1;
  title = '';

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    this.retrieveVideos();
  }

  refreshList(): void {
    this.currentVideo = undefined;
    this.currentIndex = -1;
    this.retrieveVideos();
  }

  retrieveVideos(): void {
    this.videoService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.videos = data;
    });
  }

  setActiveVideo(video: Video, index: number): void {
    this.currentVideo = video;
    this.currentIndex = index;
  }

}
