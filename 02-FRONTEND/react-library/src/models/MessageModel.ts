class MessageModal{
    id?:number;
    userEmail?:string;
    adminEmail?:string;
    question?:string;
    response?:string;
    closed?:boolean;
    title?:string;

    constructor(title:string, question:string){
        this.question=question;
        this.title=title;
    }
}

export default MessageModal;