export enum Table {
	Products = 'productos',
	Cart = 'carrito'
}

export interface ProductsCart {
	_id: string;
}

export interface Cart {
	_id?: string;
	id?: string;
	timestamp: number;
	products: Products[];
	cartProducts?: any;
}
export interface Products {
	_id: string;
	id?: string;
	title?: string;
	description?: string;
	code?: string;
	price?: number;
	thumbnail?: string;
	stock?: number;
}

export interface newProductI {
	title: string;
	description: string;
	code: string;
	price: number;
	thumbnail: string;
	stock: number;
}

export interface ProductQuery {
	title?: string;
	price?: number;
	code?: string;
	stock?: number;
	priceMax?: number;
	priceMin?: number;
	stockMax?: number;
	stockMin?: number;
}
