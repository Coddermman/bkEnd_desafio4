import fs from "fs"

class CartsManager {
    constructor (){
        this.path = "./src/General/cartsFiles.json";
        this.carts=[]
    }

getCarts = async()=>{
    if(fs.existsSync(this.path)){
        const content = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(content)
    }
    return []
}

createCart = async () =>{

    this.carts = await this.getCarts();
    const cart = {
        products : []
    }

    if(this.carts.length===0){
        cart.id =1;
    }else{
        cart.id = this.carts[this.cart.length-1].id+1;
    }
    this.carts.push(cart)
    await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, "\t"))
}

getCartById = async(id) =>{
    this.carts = await this.getCarts();
    const cartId = this.carts.find(item => item.id === id)
    if(cartId === undefined){
        return "Not found"
    }else {
        return cartId.products
    }
}
//agregar productos al carrito:
addProductCart = async(id, producto) =>{
    const cartIdProd = await this.getCartById(id);
//validar si existe el carrito solicitado (*)   
    if(cartIdProd !== "Not found"){
        this.carts = await this.getCarts();
// obtiene el carrito con el id (index) a modificar        
        const indexAgregar = this.carts.findIndex((item) => item.id  === id); 
    // se fija si el producto ya existe en ese carrito         
        const productoCarritoIndex = cartIdProd.findIndex((prod) => prod.product === producto.product) 
        if (productoCarritoIndex===-1){   
    // si no existe lo agrega al final 
            cartIdProd.push(producto)
            this.carts[indexAgregar].products = cartIdProd;  
            await fs.promises.writeFile(this.path,JSON.stringify(this.carts,null,'\t')) 
            return "The product was added agregado"
        }else{     
    //si el producto existe en el carrito se le suma la cantidad (quantity)                     
            cartIdProd[productoCarritoIndex].quantity += producto.quantity; 
            this.carts[indexAgregar].products = cartIdProd;
            await fs.promises.writeFile(this.path,JSON.stringify(this.carts,null,'\t')) 
            return "The product was added"
        }         
    }
//si no existe el carrito(*)    
    else {
        return "cart not found"
    }
}
}

export default CartsManager;