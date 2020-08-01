//SERVER SIDE CODING
//BACKEND CODING

//Neccessary Express Coding
let express = require('express');
let app = express();
app.use(express.static('public'));
app.use(express.json());

//Initializing product array and id

let products=[];
let id = 1;

app.get('/products',(req,resp)=>{
    resp.send(products);
})

app.post('/products/',(req,resp)=>{
    let newProduct= req.body ;
    newProduct.id= id;
    id++;
    products.push(newProduct);
    resp.send('Created...!!');
})

app.put('/products/:id',(req,resp)=>{
    let productId = +req.params.id;
    let productForUpdate;
    for(let i=0;i<products.length;i++)
    {
        if(products[i].id === productId){
            productForUpdate = products[i];
            break;
        }
    }
    if(productForUpdate){
        productForUpdate.price=req.body.price;
        resp.send("UPDATED !!!");
    }
    else{
        resp.send('Rejected');
    }
})

app.delete('/products/:id',(req,resp)=>{
    let productId = +req.params.id;
    for(let i=0;i<products.length;i++)
    {
        if(products[i].id === productId){
            products.splice(i,1);
            resp.send("DELETED!!");
        }
    }
    resp.send("NOT FOUND!!");
})
let port = process.env.PORT || 3000 ;
app.listen(port, ()=>console.log(`LISTENING ${port}.....`) );


