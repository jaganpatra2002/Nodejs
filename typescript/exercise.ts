function greet(name:string):string{
    return `Hello ${name}`;
}
const message:string=greet("World");
console.log(message);

/*
2 ways to for declarjg tpes
1) explicit
2) type intertence
*/
// const user={
//     name:"Jagan",
//     age:30,
//     isadmin:true
// };
// console.log(user.name);
let user ={name:"hi",age:19};
console.log(user.name);
// types in ts no string boolean null undefines void object arry tuples never unknown any
let greeting:string ="hello";
let mynum=6;
greeting.toUpperCase();
console.log(greeting, mynum);

// number
let userId:number=334466.000999;

// boolean
let isLoggedIn:boolean =false;

let no=45;
// no="hi" 

// any keyword
//  any varibale fi we dont wknwo its type so we use any it will turn off type checking

let hereo:any;
function getHero(){
    return "User";
}
hereo=getHero();
hereo=2;


// functions

function addTwo(no:number){
    // number.toUpperCase;
    console.log( no+2);
}
addTwo(6);

function signUp(name:string,email:string,isPaid:boolean){

}

function getValue(myVal:number){
    if(myVal>5){
        return true;
    }
    return "200 ok";
}

const getHello=(s:string):string=>{
    return "";
}

const hero=["thor","spiderman","ironman"];
hero.map((hero)=>{
    return `hero is ${hero}`
})

function consoleError(errormsg:string):void{
    console.log(errormsg);
    // return 1;
}

// const User={
//     name:"hitesh",
//     email:"test@gmail.com",
//     isActive:true
// }
// function createUser({name:string, isPaid:boolean}){}
// createUser({name:"hi", isPaid:false});

// type alias

type Data={
    name: string;
    email:string;
    isActive:boolean
}
function createUser(user:Data){
    console.log(user.name, user.email);
}
createUser({ name: "Alice", email: "alice@example.com", isActive: true });

type User={
    readonly _id:string
    name: string;
    email:string;
    isActive:boolean
}

let myUser:User={
    _id:"123",
    name: "Alice", 
    email: "alice@example.com",
    isActive: true
}

const arr:any=[];
const herko:Array<number>=[];

arr.push(1);
console.log(arr);

// enum
enum Info{
    "hello"
}

console.log(Info.hello);

// interface
interface user {
    id:number;
    email:string;
};
// const newUser:user={
//     id:1,
//     email:'test@gmail.com'
// };

// types used for union intersection
// below is custom type
type ApiResponse={
    status:"success" | "failure";
    message:string;
    data?:any;
};

const successReponse:ApiResponse={
    status:'success',
    message: "user created",
    data:{id:1,name:'jagan'},
};

// generic function
function identity<T>(value:T):T{
    return value;
}
console.log(identity<string>("Hello"));
console.log(identity<number>(100));

// generic interface
interface ApiResponsses<T>{
    status:"success"|"error";
    message:string;
    data:T;
}
// const stringResponse:ApiResponses<string>={
//     status:"success",
//     message:"got message",
//     data:"hello world",
// };

// generic function with arrays
// function getFirstItem<T>(items:T[]):T{
//     return items[0];
// }
// const numbers = [10, 20, 30];
// const names = ["Jagan", "Patra"];

// console.log(getFirstItem(numbers)); // 10
// console.log(getFirstItem(names));

interface ApiResponses<T>{
    success:boolean;
    message:string;
    data:T;
    status:number;
}
interface user{
    id:number;
    name:string;
    email:string;
}
interface Produkts{
    id:number;
    pname:string;
}

function createResponse<T>(endpoint:string):ApiResponses<T>{
      console.log(`Fetching data from: ${endpoint}`);
    return {
        success:true,
        message:'fetched data',
        data:{} as T,
        status:200,
    };
}
const userResult=createResponse<User>("api/users");
console.log(userResult);
const productResult=createResponse<Produkts>("api/products");
console.log(productResult);