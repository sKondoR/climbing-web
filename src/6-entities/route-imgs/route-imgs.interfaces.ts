export interface IRouteImg {
  url?: string;
  imgUrl?: string;
  imageData?: Buffer;
  error?: string;
  isFetching: boolean;
}

export interface ISearchRoute {
  name: string;
  region: string;
}