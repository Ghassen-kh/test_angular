import { Component, OnInit } from '@angular/core';
import { VideoProcessingService } from '../videos-list/video-processing.service';

@Component({
    selector: 'upload-manager',
    templateUrl: './upload-manager.component.html',
    styleUrls: ['./upload-manager.component.css']
})
export class UploadManagerComponent implements OnInit {

    isHovering: boolean;
    files: File[] = [];

    constructor(private videoService: VideoProcessingService) { }

    ngOnInit(): void {
    }

    toggleHover(event: boolean) {
        this.isHovering = event;
    }

    onDrop(files: FileList) {
        for (let i = 0; i < files.length; i++) {
            console.log('uploadManager adding file: ', files.item(i));
            this.files.push(files.item(i));
        }
    }

}
