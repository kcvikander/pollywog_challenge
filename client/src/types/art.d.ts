interface Artwork {
  id: string;
  title: string;
  medium: string;
  classification: string;
  dimension: string;
  object_name: string;
  continent: string;
  country: string;
  culture: null;
  dated: string;
  room: string;
  style: string;
  inscription: string;
  signed: string;
  markings: string;
  text: string;
  description: string;
  creditline: string;
  accession_number: string;
  artist: string;
  role: string;
  nationality: string;
  life_date: string;
  image_copyright: string;
  department: string;
  rights_type: string;
  image: string;
  image_width: number;
  image_height: number;
  restricted: boolean;
  related: RelatedObjct[];
}
interface ISearchResult {
  hits: IHitObject;
}
interface IHitObject {
  hits: IHit[],
  max_score: number,
  total: number
}
interface IHit {
  _id:string,
  _index: string, 
  _score: number, 
  _source: Artwork,
  _type: string,
}