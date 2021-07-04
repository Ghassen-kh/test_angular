import { Component, OnInit } from '@angular/core';
import { GetThumbnailService } from 'src/app/get-thumbnail.service';
import { VideoProcessingService } from '../video-processing.service';

@Component({
  selector: 'thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent{
  public thumbnailData: string;

  constructor(
    private videoService: VideoProcessingService, private thumbnailService: GetThumbnailService
  ) { }

  public add(): void {
    this.videoService.promptForVideo().then(videoFile => {
      return this.videoService.generateThumbnail(videoFile);
    }).then(thumbnailData => {
      this.thumbnailData = thumbnailData;
      this.thumbnailService.storeThumbnail(thumbnailData);
    })
  }

}
