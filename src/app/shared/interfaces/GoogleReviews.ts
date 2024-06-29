export interface Reviewer {
  "profilePhotoUrl": string,
  "displayName": string,
  "isAnonymous": boolean
}

enum StarRating {
  STAR_RATING_UNSPECIFIED = 'Non spécifié',
  ONE = 'Une étoile sur cinq',
  TWO = 'Deux étoiles sur cinq',
  THREE = 'Trois étoiles sur cinq',
  FOUR = 'Quatre étoiles sur cinq',
  FIVE = 'Cinq étoiles sur cinq'
}

export interface Review {
  "name": string,
  "reviewId": string,
  "reviewer": Reviewer,
  "starRating": StarRating,
  "comment": string,
  "createTime": string,
  "updateTime": string,
  "reviewReply": ReviewReply
}

export interface GoogleReviews {
  "reviews": Review[],
  "averageRating": number,
  "totalReviewCount": number,
  "nextPageToken": string
}

export interface ReviewReply {
  "comment": string,
  "updateTime": string
}