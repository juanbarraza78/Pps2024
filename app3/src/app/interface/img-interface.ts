export interface imgIdInterface extends imgInterface {
  id: string;
}

export interface imgInterface {
  date: Date;
  likes: number;
  dislikes: number;
  listaLikes: string[];
  listaDislikes: string[];
  user: string;
  url: string;
  lindoFeo: string;
}
