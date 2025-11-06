console.log(2+2);
// const http=require('http');
// http.createServer(function (req,res){
//     res.writeHead(200,{'Content-Type':'text/plain'}),
//     res.end('Hello bro');
// }).listen(8080,()=>{
//     console.log('server running at http://localhost:8080/');
// });
// http.createServer(function (req,res){
//     res.writeHead(200,{'Content-Type':'text/plain'}),
//     res.end('Hello World');
// }).listen(8180,()=>{
//     console.log('server running at http://localhost:8180/');
// });
const uswr={
    name:'jagan',
    age:24,
    greet(){
        console.log('hi');
    }
};
const colors=['red'];
colors.forEach(i=>console.log(i));

const http=require('http');
const dataset=[
    {
        name:'jagan',
        age:34
    },
    {
        name:'patra',
        age:35
    }
];
http.createServer(function(req,res){
    console.log(req);
    res.setHeader("Content-Type","application/json")
    res.write(JSON.stringify(dataset));
    res.end();
}).listen(1000);

