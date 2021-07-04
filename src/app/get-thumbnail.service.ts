import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetThumbnailService {
  public thumbnailData: string;

  constructor() { }
  public storeThumbnail(data){
    this.thumbnailData = data;
  }
  public getThumbnail(){
    return this.thumbnailData;
  }
}
