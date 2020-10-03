export class News {
  _id: string;
  title: string;
  url: string;
  description?: string;
  featuredImage?: string;
  shortDescription?: string;
  gallery?: string[];
  createdAt?: Date;
}
