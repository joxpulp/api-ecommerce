import { Products } from "../../interfaces";

export default class ProductsDTO {
	id: string;
	title: string;
	description: string;
	code: string;
	price: number;
	thumbnail: string;
	stock: number;
	FyH: string;

	constructor(data: Products) {
		this.id = this.randomId();
		this.title = data.title!;
		this.description = data.description!;
		this.code = data.code!;
		this.price = data.price!;
		this.thumbnail = data.thumbnail!;
		this.stock = data.stock!;
		this.FyH = new Date().toLocaleString();
	}

	randomId(): string {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
}
