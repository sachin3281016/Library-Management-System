class ReviewRequestModel {
  bookId: number;
  reviewDescription: string;
  rating: number;

  constructor(bookId: number, reviewDescription: string, rating: number) {
    this.bookId = bookId;
    this.reviewDescription = reviewDescription;
    this.rating = rating;
  }
}

export default ReviewRequestModel;