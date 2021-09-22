# E-commerce API 
## _E-commerce API using Express and Typescript_

## Scripts
| Script        | Description                            |
| ------------- |:--------------------------------------:|
| npm install   | Install all dependencies               |
| npm run dev   | Execute TS files with nodemon          | 
| npm run start | Execute transpiled files in dist folder|
## DAOs
DAOs can be changed in `'src/apis'` in `'cartapi.ts'` and `'productsapi.ts'` files.
| Number        | Description                            |
| ------------- |:--------------------------------------:|
| 0 | Memory persistence/database           |
| 1 | Filesystem persistence/database          | 
| 2 | MySQL persistence/database|
| 3 | SQLite persistence/database|
| 4 | MongoDB Local persistence/database|
| 5 | MongoDB Atlas persistence/database|
| 6 | Firebase persistence/database|

## Endpoints:
Products:
| Method       | Route          | Description  |
| ------------- |:-------------:| -----:|
| GET     |*/api/productos/listar*|List all products |
| GET     |*/api/productos/listar/id*|List a product by id, if a product doesn't exist return an error message |
| POST    |*/api/productos/agregar*| Add a product by passing a JSON Body, change `**isAdmin**` boolean in `*'/middleware/isAdmin.js'*` to true (authorized access) or false (unauthorized access)
| PUT     |*api/productos/actualizar/id*| Updates a product by passing the product's id and a JSON Body, change `**isAdmin**` boolean in `*'/middleware/isAdmin.js'*` to true (authorized access) or false (unauthorized access) |
| DELETE |*/api/productos/borrar/id* |Delete a product from the product list by passing the product's id, change  `**isAdmin**` boolean in `*'/middleware/isAdmin.js'*` to true (authorized access) or false (unauthorized access)|

JSON Body template: 
```Typescript
{
    "title": string,
    "description": string,
    "code": string,
    "price": number,
    "thumbnail": string,
    "stock": number
}
```


Cart:
| Method       | Route          | Description  |
| ------------- |:-------------:| -----:|
| GET     |*/api/carrito/listar*|List a cart with all the products|
| GET     |*/api/carrito/listar/id*|List a product from the cart by id, if a product does not exist return an error message|
| POST    |*/api/carrito/agregar/id*| Add a product from the product list to the cart by passing the product's id|
| DELETE |*/api/carrito/borrar/id*|Delete a product from the cart by passing the product's id|

## Products Queries:


| Query      | Type          | Description  |
| ------------- |:-------------:| -----:|
| title     |_string_|Filter products by the title|
| priceMin     |_number_| Filter products between prices, `*priceMax*` is nedeed in order to work|
| priceMax   |_number_| Filter products between prices, `*priceMin*` is nedeed in order to work|
| code |_string_|Filters products by the code|
| stockMin |_number_|Filter products between stocks, `*stockMax*` is nedeed in order to work|
| stockMax |_number_|Filter products between stocks, `*stockMin*` is nedeed in order to work|

## Query Examples:
Method: `GET`

Route: _`/api/productos/listar?`_

Example 1 (Single query paramater):
```Typescript
/api/productos/listar?title=anana
````

Queries can be combined with `&`.

Example 2 (Multiple query paramaters): 
```Typescript
/api/productos/listar?title=anana&priceMin=1000&priceMax=5000
```