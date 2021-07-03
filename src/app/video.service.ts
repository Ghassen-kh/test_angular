import { Injectable } from '@angular/core';
import Video from './video.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private dbPath = '/files';

  videosRef: AngularFirestoreCollection<Video>;

  constructor(private db: AngularFirestore) {
    this.videosRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Video> {
    return this.videosRef;
  }
}