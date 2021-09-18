import { promises as fs } from 'fs';
import path from 'path';
import { Carts, Products } from '../interfaces';

const filePath = path.resolve(__dirname, './files/productslog.txt');
const filePathCart = path.resolve(__dirname, './files/cartlog.txt');

class Cart {
	content: Array<Carts>;

	constructor() {
		this.content = [
			{
				id: this.randomId(),
				timestamp: Date.now(),
				products: [],
			}
		];
	}

	randomId(): string {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	async get(id?: string): Promise<Array<Carts> | Array<Products>> {
		try {
			const txtFile: Array<Carts> = JSON.parse(await fs.readFile(filePathCart, 'utf-8')); // Reads cart's file
			this.content = txtFile.length === 0 ? this.content : txtFile; // Replace the current array in content with the cart's file
			const result: Array<Carts> | Array<Products> = id
				? this.content[0].products.filter((product) => product._id === id)
				: this.content; // If id exist filter product by id, else return the whole cart's array
			return result;
		} catch (error) {
			console.log(error);
			return this.content;
		}
	}

	async add(id: string): Promise<Array<Products>> {
		try {
			const txtFileC: Array<Carts> = JSON.parse(await fs.readFile(filePathCart, 'utf-8')); // Reads cart's file
			this.content = txtFileC.length === 0 ? this.content : txtFileC; // Reads cart's file
			const txtFile: Array<Products> = JSON.parse(await fs.readFile(filePath, 'utf-8')); // Reads the products file
			const newProduct: Array<Products> = txtFile.filter((product) => product._id === id); // Filtering a single product from product file by passed id
			this.content[0].products.push(...newProduct); // Pushing the filtered product into the cart's products array 
			await fs.writeFile(filePathCart, JSON.stringify(this.content, null, 2)); // Re-write the cart's file
			return newProduct.length === 0 ? [] : newProduct; // Return an empty array if the product does not exist, else return the array with the matched product
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	async delete(id: string): Promise<Array<Products> | -1> {
		try {
			this.content = JSON.parse(await fs.readFile(filePathCart, 'utf-8')); // Reads cart's file
			const arrayPosition: number = this.content[0].products.map((product) => product._id).indexOf(id); // Mapping a new array by id if exists returns an the id else returns -1
			const deletedProduct: Array<Products> = this.content[0].products.filter((product) => product._id == id); // Filtering the deleted product into a new Array
			arrayPosition !== -1 && this.content[0].products.splice(arrayPosition, 1); // If the product exists, remove the product from the cart's products array
			await fs.writeFile(filePathCart, JSON.stringify(this.content, null, 2)); // Re-write the cart's file
			return arrayPosition !== -1 ? deletedProduct : arrayPosition; // Return the deleted product if the product exist else return -1
		} catch (error) {
			console.log(error);
			return -1;
		}
	}
}

export const cart = new Cart();
