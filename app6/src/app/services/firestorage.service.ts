import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User, UserId } from '../interfaces/user';

const PATH = 'userLogin';

@Injectable({
  providedIn: 'root',
})
export class FirestorageService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  getUsers() {
    return collectionData(this._collection, { idField: 'id' }) as Observable<
      UserId[]
    >;
  }

  async getUser(id: string) {
    try {
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as UserId;
    } catch (error) {
      return undefined;
    }
  }
  createUser(user: User) {
    return addDoc(this._collection, user);
  }
  updateUser(id: string, user: User) {
    return updateDoc(this.document(id), { ...user });
  }
  deleteUser(id: string) {
    return deleteDoc(this.document(id));
  }
  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }
}
