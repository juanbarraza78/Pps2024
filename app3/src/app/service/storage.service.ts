import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { imgIdInterface, imgInterface } from '../interface/img-interface';

const PATH = 'img';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  getImgs() {
    return collectionData(this._collection, { idField: 'id' }) as Observable<
      imgIdInterface[]
    >;
  }

  async getImg(id: string) {
    try {
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as imgIdInterface;
    } catch (error) {
      //catch error
      return undefined;
    }
  }

  async searchImgByQuery(name: string) {
    const q = query(
      this._collection,
      where('fullName', '>=', name),
      where('fullName', '<=', name + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);
    let imgs: imgIdInterface[] = [];
    querySnapshot.forEach((doc) => {
      imgs = [...imgs, { id: doc.id, ...doc.data() } as imgIdInterface];
    });
    return imgs;
  }

  createImg(img: imgInterface) {
    return addDoc(this._collection, img);
  }

  updateImg(id: string, img: imgInterface) {
    return updateDoc(this.document(id), { ...img });
  }

  deleteImg(id: string) {
    return deleteDoc(this.document(id));
  }

  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }
}
