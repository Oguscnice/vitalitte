import {ProductDto} from "./Product";

export interface CreateReview {
  content: string,
  title: string,
  lastname: string,
  firstname: string,
  email: string,
  rating: number,
  productDto: ProductDto
}

export interface ReviewDto extends CreateReview {
  createdAt: Date,
  status: string
}
