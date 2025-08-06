export interface ViewReview {
  userId: string;
  reviewText: string;
  rate: number;
  createdAt: Date;
  userFullName : string;
  userProfilePicUrl : string;
}