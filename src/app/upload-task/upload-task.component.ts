import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
    selector: 'upload-task',
    templateUrl: './upload-task.component.html',
    styleUrls: ['./upload-task.component.css']
})
export class UploadTaskComponent implements OnInit {

    @Input() file: File;
    task: AngularFireUploadTask;                                        // this does the uploading for us

    percentage: Observable<number>;
    snapshot: Observable<any>;
    downloadURL: string;

    constructor(private storage: AngularFireStorage, private db: AngularFirestore) {  }

    ngOnInit(): void {
        this.startUpload();
    }

    startUpload() {
        console.log('uploading file', this.file);

        let safeName = this.file.name.replace(/([^a-z0-9.]+)/gi, '');
        let timestamp = Date.now();
        const uniqueSafeName = timestamp + '_' + safeName;
        const path = 'uploads/' + uniqueSafeName;
        const ref = this.storage.ref(path);

        this.task = this.storage.upload(path, this.file);
        this.percentage = this.task.percentageChanges();
        this.snapshot = this.task.snapshotChanges().pipe(
            tap(console.log),
            finalize(async () => {
                this.downloadURL = await ref.getDownloadURL().toPromise();

                this.db.collection('files').doc(uniqueSafeName).set({
                    storagePath: path,
                    downloadURL: this.downloadURL,
                    originalName: this.file.name,
                    timestamp: timestamp
                })
                    .then(function () {
                        console.log('document written!');
                    })
                    .catch(function (error) {
                        console.error('Error writing document:', error);
                    });
            }),
        );
    }

    isActive(snapshot) {
        return (snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes);
    }

}
