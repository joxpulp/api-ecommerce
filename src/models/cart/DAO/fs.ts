import { promises as fs } from 'fs';
import path from 'path';
import { Cart, Products, ProductQuery } from '../../interfaces';

const filePath = path.resolve(__dirname, '../../files/productslog.txt');
const filePathCart = path.resolve(__dirname, '../../files/cartlog.txt');

export class CartDAOFS {
	content: Cart[];

	constructor() {
		this.content = [
			{
				id: this.randomId(),
				timestamp: Date.now(),
				products: [],
			},
		];
	}

	randomId(): string {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	async get(id?: string): Promise<Cart[] | Products[]> {
		// Reads cart's file
		const txtFile: Cart[] = JSON.parse(
			await fs.readFile(filePathCart, 'utf-8')
		);

		// Replace the current array in content with the cart's file
		this.content = txtFile.length === 0 ? this.content : txtFile;

		// If id exist filter product by id, else return the whole cart's array
		const result = id
			? this.content[0].products.filter((product) => product._id === id)
			: this.content;
		return result;
	}

	async add(id: string): Promise<Products[]> {
		// Reads cart's file
		const txtFileC: Cart[] = JSON.parse(
			await fs.readFile(filePathCart, 'utf-8')
		);

		// Reads cart's file
		this.content = txtFileC.length === 0 ? this.content : txtFileC;

		// Reads the products file
		const txtFile: Products[] = JSON.parse(
			await fs.readFile(filePath, 'utf-8')
		);

		// Filtering a single product from product file by passed id
		const newProduct = txtFile.filter((product) => product._id === id);

		// Pushing the filtered product into the cart's products array
		this.content[0].products.push(...newProduct);

		// Re-write the cart's file
		await fs.writeFile(filePathCart, JSON.stringify(this.content, null, 2));

		// Return an empty array if the product does not exist, else return the array with the matched product
		return newProduct.length === 0 ? [] : newProduct;
	}

	async delete(id: string): Promise<Products[]> {
		// Reads cart's file
		this.content = JSON.parse(await fs.readFile(filePathCart, 'utf-8'));

		// Mapping a new array by id if exists returns an the id else returns -1
		const arrayPosition: number = this.content[0].products
			.map((product) => product._id)
			.indexOf(id);

		// Filtering the deleted product into a new Array
		const deletedProduct: Products[] = this.content[0].products.filter(
			(product) => product._id == id
		);

		// If the product exists, remove the product from the cart's products array
		arrayPosition !== -1 && this.content[0].products.splice(arrayPosition, 1);

		// Re-write the cart's file
		await fs.writeFile(filePathCart, JSON.stringify(this.content, null, 2));

		// Return the deleted product if the product exist else return []
		return arrayPosition === -1 ? [] : deletedProduct;
	}

}
