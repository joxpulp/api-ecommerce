import { Products } from '../../interfaces';

export default class CartDTO {
	id: string;
	title: string;
	description: string;
	code: string;
	price: number;
	thumbnail: string;
	stock: number;
	FyH: string;

	constructor(data: Products) {
		this.id = data.id!;
		this.title = data.title!;
		this.description = data.description!;
		this.code = data.code!;
		this.price = data.price!;
		this.thumbnail = data.thumbnail!;
		this.stock = data.stock!;
		this.FyH = new Date().toLocaleString();
	}

}
