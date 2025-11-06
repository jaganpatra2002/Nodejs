
export interface Post{
    _id?: string;
    title:string;
    body:string;
    author:string; 
    tags?:string[];
    likes?:number;
    createdAt?:Date;
}