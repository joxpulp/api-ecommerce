export interface Carts {
	id: string;
	timestamp: number;
	products: Array<Products>;
}

export interface Products {
	id: string;
	timestamp: number;
	title: string;
	description: string;
	code: string | number;
	price: number;
	thumbnail: string;
	stock: number;
}
