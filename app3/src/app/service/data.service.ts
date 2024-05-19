import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';

interface likes {
  name: string;
  value: number;
  extra?: any;
}

interface dislikes {
  name: string;
  value: number;
  extra?: any;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  firestorage = inject(StorageService);

  private likes: likes[] = [];

  private dislikes: dislikes[] = [];

  get likesData() {
    return this.likes;
  }

  get dislikesData() {
    return this.dislikes;
  }

  agregarLikes() {
    this.firestorage.getImgs().subscribe((imgs) => {
      const arrayLikes: likes[] = [];
      imgs.map((img) => {
        const objAux = {
          name: img.user,
          value: img.likes,
          extra: {
            url: img.url,
          },
        };
        arrayLikes.push(objAux);
      });
      this.likes = arrayLikes;
    });
  }

  agregarDislikes() {
    this.firestorage.getImgs().subscribe((imgs) => {
      const arrayLikes: dislikes[] = [];
      imgs.map((img) => {
        const objAux = {
          name: img.user,
          value: img.dislikes,
          extra: {
            url: img.url,
          },
        };
        arrayLikes.push(objAux);
      });
      this.dislikes = arrayLikes;
    });
  }
}
