import { Products, newProductI, ProductQuery } from '../../interfaces';

export class ProductDAOMEM {
	private content: Products[];

	constructor() {
		this.content = [];
	}

	randomId(): string {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	finIndex(id: string): number {
		return this.content.map((product) => product._id).indexOf(id);
	}

	get(id?: string): Products[] {
		return id
			? this.content.filter((product) => product._id === id)
			: this.content;
	}

	add(data: newProductI): Products {
		const newProduct: Products = {
			_id: this.randomId(),
			...data,
		};
		this.content.push(newProduct);
		return newProduct;
	}

	update(id: string, data: newProductI): Products[] {
		const arrayPosition = this.finIndex(id);
		this.finIndex(id) !== -1 &&
			`${(this.content[arrayPosition].title = data.title)}
				${(this.content[arrayPosition].description = data.description)}
				${(this.content[arrayPosition].code = data.code)}
				${(this.content[arrayPosition].price = data.price)}
				${(this.content[arrayPosition].thumbnail = data.thumbnail)}
				${(this.content[arrayPosition].stock = data.stock)}`;
		return arrayPosition !== -1 ? [this.content[arrayPosition]] : [];
	}

	delete(id: string): Products[] {
		const arrayPosition = this.finIndex(id);
		const deletedProduct = this.content.filter((product) => product._id == id);
		arrayPosition !== -1 && this.content.splice(arrayPosition, 1);
		return arrayPosition !== -1 ? deletedProduct : [];
	}

	query(options: ProductQuery): Products[] {
		type Conditions = (product: Products) => boolean;
		const query: Conditions[] = [];

		if (options.title)
			query.push((product: Products) => product.title == options.title);

		if (options.code)
			query.push((product: Products) => product.code == options.code);

		if (options.priceMin)
			query.push((product: Products) => product.price! >= options.priceMin!);

		if (options.priceMax)
			query.push((product: Products) => product.price! <= options.priceMax!);

		if (options.stockMin)
			query.push((product: Products) => product.stock! >= options.stockMin!);

		if (options.stockMax)
			query.push((product: Products) => product.stock! <= options.stockMax!);

		return this.content.filter((product) => query.every((x) => x(product)));
	}
}
