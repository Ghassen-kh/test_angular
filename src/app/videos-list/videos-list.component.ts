import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private videoService: VideoService, private modalService: NgbModal) { }

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
  
  closeResult = '';

  setActiveVideo(video: Video, index: number): void {
    this.currentVideo = video;
    this.currentIndex = index;
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
