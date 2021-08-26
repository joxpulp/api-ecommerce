import { promises as fs } from 'fs';
import path from 'path';
import { Products } from './interfaces';

const filePath = path.resolve(__dirname, './files/productslog.txt');

class Product {
	content: Array<Products>;

	constructor() {
		this.content = [];
	}

	randomId(): string {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	async get(id?: string): Promise<Array<Products>> {
		try {
			const txtFile: Array<Products> = JSON.parse(
				await fs.readFile(filePath, 'utf-8')
			);
			this.content = txtFile;
			return id
				? this.content.filter((product) => product.id === id)
				: this.content;
		} catch (error) {
			console.log(error);
			return this.content;
		}
	}

	async add(
		title: string,
		description: string,
		code: string | number,
		price: number,
		thumbnail: string,
		stock: number
	): Promise<Products | Array<Products>> {
		try {
			this.content = JSON.parse(await fs.readFile(filePath, 'utf-8'));
			const newProduct: Products = {
				id: this.randomId(),
				timestamp: Date.now(),
				title,
				description,
				code,
				price,
				thumbnail,
				stock,
			};
			this.content.push(newProduct);
			await fs.writeFile(filePath, JSON.stringify(this.content, null, 2));
			return newProduct;
		} catch (error) {
			console.log(error);
			return this.content;
		}
	}

	async update(
		id: string,
		title: string,
		description: string,
		code: string | number,
		price: number,
		thumbnail: string,
		stock: number
	): Promise<Products | -1> {
		try {
			const getProducts: Array<Products> = await this.get();
			const arrayPosition: number = getProducts
				.map((product) => product.id)
				.indexOf(id);
			arrayPosition !== -1 &&
				`${(this.content[arrayPosition].title = title)}
				${(this.content[arrayPosition].description = description)}
				${(this.content[arrayPosition].code = code)}
				${(this.content[arrayPosition].price = price)}
				${(this.content[arrayPosition].thumbnail = thumbnail)}
				${(this.content[arrayPosition].stock = stock)}`;
			await fs.writeFile(filePath, JSON.stringify(this.content, null, 2));
			return arrayPosition !== -1 ? this.content[arrayPosition] : arrayPosition;
		} catch (error) {
			console.log(error);
			return -1;
		}
	}

	async delete(id: string): Promise<Array<Products> | -1> {
		try {
			const getProducts: Array<Products> = await this.get();
			const arrayPosition: number = getProducts
				.map((product) => product.id)
				.indexOf(id);
			const deletedProduct: Array<Products> = this.content.filter(
				(product) => product.id == id
			);
			arrayPosition !== -1 && this.content.splice(arrayPosition, 1);
			await fs.writeFile(filePath, JSON.stringify(this.content, null, 2));
			return arrayPosition !== -1 ? deletedProduct : arrayPosition;
		} catch (error) {
			console.log(error);
			return -1;
		}
	}
}

export const products = new Product();
