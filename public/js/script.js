// //CLIENT SIDE CODING

let showBtn = document.querySelector('.show-products');
let list = document.querySelector('.product-list');
let addForm = document.querySelector('.add-product-form');
let updateForm = document.querySelector('.update-product-form');
let deleteForm = document.querySelector('.delete-product-form');
 
showBtn.addEventListener('click',function(){
    let list= document.querySelector('.product-list');
    list.innerHTML='';
    fetch('/products')
            .then((response)=>response.json())
            .then((data)=>{
                data.forEach((product) => {
                    let li = document.createElement('li');
                    li.textContent = `${product.id} - ${product.name} - $${product.price}`;
                    list.appendChild(li);
                });
            })
})


addForm.addEventListener('submit',function(e){
    e.preventDefault();
    fetch('/products',{
        method:'POST',
        headers:{
                'Content-type':'application/json'
        },
        body:JSON.stringify({
                name: document.getElementById('add-product-name').value,
                price: document.getElementById('add-product-price').value,
        })
    }).then((response)=>response.text())
        .then((data)=> {
            console.log(data);
            document.getElementById('add-product-name').value='';
            document.getElementById('add-product-price').value='';
        });
})
    
updateForm.addEventListener('submit',function(e){
    e.preventDefault();
    let id =document.getElementById('update-product-id').value;
    fetch('/products/'+id,{
        method:'PUT',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            price: document.getElementById('update-product-price').value
        })
        }).then((response)=>response.text())
        .then((data)=> {
            console.log(data);
            document.getElementById('update-product-id').value='';
            document.getElementById('update-product-price').value='';
        });
    })

deleteForm.addEventListener('submit',function(e){
    e.preventDefault();
    let id =document.getElementById('delete-product-id').value;
    fetch('/products/'+id,
    {
        method:'DELETE',
        }).then((response)=>response.text())
        .then((data)=> {
            console.log(data);
            document.getElementById('delete-product-id').value='';
        })
    })



