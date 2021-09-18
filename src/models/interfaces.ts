export interface Carts {
	id: string;
	timestamp: number;
	products: Array<Products>;
}

export interface Products {
	_id: string;
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
	code?: string | number;
	stock?: number;
}
