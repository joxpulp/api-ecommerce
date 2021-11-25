import { promises as fs } from 'fs';
import path from 'path';
import { Products, newProductI, ProductQuery } from '../../interfaces';

const filePath = path.resolve(__dirname, '../../files/productslog.txt');

export class ProductDAOFS {
	// Private instance of the class to use singleton pattern
	private static _instance: ProductDAOFS;
	private content: Array<Products>;

	constructor() {
		this.content = [];
	}

	// Getter to call the instance with singleton pattern.
	public static get instance() {
		if (this._instance) {
			console.log(
				'La instancia FS PRODUCT ya fue inicializada, se retorna la instancia ya inicializada'
			);
			return this._instance;
		} else {
			console.log('Intancia FS PRODUCT inicializada por primera vez');
			return (this._instance = new this());
		}
	}

	randomId(): string {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	async get(id?: string): Promise<Products[]> {
		try {
			const txtFile: Array<Products> = JSON.parse(
				await fs.readFile(filePath, 'utf-8')
			);
			this.content = txtFile;
			return id
				? this.content.filter((product) => product._id === id)
				: this.content;
		} catch (error) {
			console.log(error);
			return this.content;
		}
	}

	async add(data: newProductI): Promise<Products> {
		this.content = JSON.parse(await fs.readFile(filePath, 'utf-8'));
		const newProduct: Products = {
			_id: this.randomId(),
			...data,
		};
		this.content.push(newProduct);
		await fs.writeFile(filePath, JSON.stringify(this.content, null, 2));
		return newProduct;
	}

	async update(id: string, data: newProductI): Promise<Products[]> {
		const getProducts: Array<Products> = await this.get();
		const arrayPosition: number = getProducts
			.map((product) => product._id)
			.indexOf(id);
		arrayPosition !== -1 &&
			`${(this.content[arrayPosition].title = data.title)}
				${(this.content[arrayPosition].description = data.description)}
				${(this.content[arrayPosition].code = data.code)}
				${(this.content[arrayPosition].price = data.price)}
				${(this.content[arrayPosition].thumbnail = data.thumbnail)}
				${(this.content[arrayPosition].stock = data.stock)}`;
		await fs.writeFile(filePath, JSON.stringify(this.content, null, 2));
		// FIXME FIX THIS RETURN, WRAP THE UPDATED OBJECT INSIDE VARIABLE WITH A .PUSH
		return arrayPosition !== -1 ? [this.content[arrayPosition]] : [];
	}

	async delete(id: string): Promise<Products[]> {
		const getProducts: Array<Products> = await this.get();
		const arrayPosition: number = getProducts
			.map((product) => product._id)
			.indexOf(id);
		const deletedProduct: Array<Products> = this.content.filter(
			(product) => product._id == id
		);
		arrayPosition !== -1 && this.content.splice(arrayPosition, 1);
		await fs.writeFile(filePath, JSON.stringify(this.content, null, 2));
		return arrayPosition !== -1 ? deletedProduct : [];
	}

	async query(options: ProductQuery): Promise<Products[]> {
		const readFile = await this.get();
		type Conditions = (Product: Products) => boolean;

		const query: Conditions[] = [];

		if (options.title)
			query.push((product: Products) => product.title == options.title);

		if (options.price)
			query.push((product: Products) => product.price == options.price);

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

		return readFile.filter((product) => query.every((x) => x(product)));
	}
}
