import { Injectable, inject } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {
  messageInterface,
  messageInterfaceId,
} from '../interface/message.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseChatService {
  firestore = inject(Firestore);

  saveAll4A(message: messageInterface) {
    const col = collection(this.firestore, 'chat4A');
    return addDoc(col, message);
  }

  getAll4A(): Observable<messageInterface[]> {
    const col = collection(this.firestore, 'chat4A');
    return collectionData(col, { idField: 'id' }) as Observable<
      messageInterface[]
    >;
  }

  saveAll4B(message: messageInterface) {
    const col = collection(this.firestore, 'chat4B');
    return addDoc(col, message);
  }

  getAll4B(): Observable<messageInterface[]> {
    const col = collection(this.firestore, 'chat4B');
    return collectionData(col, { idField: 'id' }) as Observable<
      messageInterface[]
    >;
  }
}
