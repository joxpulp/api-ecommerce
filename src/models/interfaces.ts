export interface IReadMem<T> {
	find(item: T): T[];
}
export interface IWriteMem<T> {
	add(item: T): T;
}
export interface IRead<T> {
	find(item: T): Promise<Messages[]>;
}
export interface IWrite<T> {
	add(item: T): Promise<Messages>;
}

export enum Table {
	Products = 'productos',
	Cart = 'carrito',
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
	_id?: string;
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

export interface Messages {
	id?: string;
	_id?: string;
	email: string;
	message: string;
}
