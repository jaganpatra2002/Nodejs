export interface Comment{
    user:string; // username or userid
    text:string;
    createdAt:Date;
}
export interface Post{
    _id?: string;
    title:string;
    body:string;
    authorId:string; //references user._id
    tags?:string[];
    comments?:Comment[]; //embedded comments
    createdAt?:Date;
}