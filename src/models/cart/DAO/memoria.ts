import { Cart, Products } from '../../interfaces';
import { productsAPI } from '../../../apis/productsapi';
export class CartDAOMEM {
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

	get(id?: string): Cart[] | Products[] {
		// If id exist filter product by id, else return the whole cart's array
		const result = id
			? this.content[0].products.filter((product) => product._id === id)
			: this.content;
		return result;
	}

	async add(id: string): Promise<Products[]> {
		// Reads the products file
		const getProducts = await productsAPI.getProducts();

		// Filtering a single product from product file by passed id
		const newProduct = getProducts.filter((product) => product._id === id);

		// Pushing the filtered product into the cart's products array
		this.content[0].products.push(...newProduct);

		// Return an empty array if the product does not exist, else return the array with the matched product
		return newProduct.length === 0 ? [] : newProduct;
	}

	delete(id: string): Products[] {
		// Mapping a new array by id if exists returns an the id else returns -1
		const arrayPosition: number = this.content[0].products
			.map((product) => product._id)
			.indexOf(id);

		// Filtering the deleted product into a new Array
		const deletedProduct = this.content[0].products.filter((product) => product._id == id);

		// If the product exists, remove the product from the cart's products array
		arrayPosition !== -1 && this.content[0].products.splice(arrayPosition, 1);

		// Return the deleted product if the product exist else return []
		return arrayPosition === -1 ? [] : deletedProduct;
	}
}
