class HistoryModel{
    id:number;
    userEmail:string;
    author:string;
    description:string;
    bookId:string;
    title:string;
    img:string;
    checkoutDate:string;
    returnedDate:string;

    constructor(id:number,
        userEmail:string,
        author:string,
        description:string,
        bookId:string,
        title:string,
        img:string,
        checkoutDate:string,
        returnedDate:string){
            this.id=id;
            this.userEmail=userEmail;
            this.author=author;
            this.description=description;
            this.bookId=bookId;
            this.title=title;
            this.img=img;
            this.checkoutDate=checkoutDate;
            this.returnedDate=returnedDate;
        }
}

export default HistoryModel;