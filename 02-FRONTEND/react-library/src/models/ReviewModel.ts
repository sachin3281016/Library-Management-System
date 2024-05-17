import exp from "constants";

class ReviewModel{

id:number;
rating:number;
bookId:number;
reviewDescription:string;
userEmail:string;
date:string;

constructor(id:number,
    rating:number,
    bookId:number,
    reviewDescription:string,
    userEmail:string,
    date:string)
    {
        this.id=id;
        this.bookId=bookId;
        this.rating=rating;

        this.userEmail=userEmail;
        this.reviewDescription=reviewDescription;
        this.date=date;
    }

}

export default ReviewModel;