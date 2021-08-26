# E-commerce API 
## _E-commerce API using Express and Typescript_

Link: [https://apiproducts.glitch.me/](https://apiproducts.glitch.me/api/productos/listar/)


## Scripts
| Script        | Description                            |
| ------------- |:--------------------------------------:|
| npm install   | Install all dependencies               |
| npm run dev   | Execute TS files with nodemon          | 
| npm run start | Execute transpiled files in dist folder|
## Endpoints:
Products:
| Method       | Route          | Description  |
| ------------- |:-------------:| -----:|
| GET     |[https://apiproducts.glitch.me/api/productos/listar/](https://apiproducts.glitch.me/api/productos/listar/)|List all products |
| GET     |[https://apiproducts.glitch.me/api/productos/listar/id](https://apiproducts.glitch.me/api/productos/listar/id)|List a product by id, if a product doesn't exist return an error message |
| POST    |[https://apiproducts.glitch.me/api/productos/agregar/](https://apiproducts.glitch.me/api/productos/agregar/)| Add a product by passing a JSON Body, change **isAdmin** boolean in *'/middleware/isAdmin.js'* to true (authorized access) or false (unauthorized access)|
| PUT     |[https://apiproducts.glitch.me/api/productos/actualizar/id](https://apiproducts.glitch.me/api/productos/actualizar/id)| Updates a product by passing the product's id and a JSON Body, change **isAdmin** boolean in *'/middleware/isAdmin.js'* to true (authorized access) or false (unauthorized access) |
| DELETE |[https://apiproducts.glitch.me/api/productos/borrar/id](https://apiproducts.glitch.me/api/productos/borrar/id)|Delete a product from the product list by passing the product's id, change  **isAdmin** boolean in *'/middleware/isAdmin.js'* to true (authorized access) or false (unauthorized access)|

JSON Body template: 
```Typescript
{
    "title": string,
    "description": string,
    "code": string || number,
    "price": number,
    "thumbnail": string,
    "stock": number
}
```


Cart:
| Method       | Route          | Description  |
| ------------- |:-------------:| -----:|
| GET     |[https://apiproducts.glitch.me/api/carrito/listar/](https://apiproducts.glitch.me/api/carrito/listar/)|List a cart with all the products|
| GET     |[https://apiproducts.glitch.me/api/carrito/listar/id](https://apiproducts.glitch.me/api/carrito/listar/id)|List a product from the cart by id, if a product does not exist return an error message|
| POST    |[https://apiproducts.glitch.me/api/carrito/agregar/id](https://apiproducts.glitch.me/api/carrito/agregar/id)| Add a product from the product list to the cart by passing the product's id|
| DELETE |[https://apiproducts.glitch.me/api/carrito/borrar/id](https://apiproducts.glitch.me/api/carrito/borrar/id)|Delete a product from the cart by passing the product's id|


