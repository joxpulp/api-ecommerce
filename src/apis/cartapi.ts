import { flags } from '../config/config';
import { CartFactoryDAO } from '../models/cart/cartfactory';
import { Cart, Products } from '../models/interfaces';

class CartAPI {
	private cart;

	constructor() {
		this.cart = CartFactoryDAO.get(flags.D);
	}

	async getProducts(id?: string): Promise<Cart[] | Products[]> {
		if (id) return await this.cart.get(id);
		return await this.cart.get();
	}

	async addProduct(id: string): Promise<Products[]> {
		const newProduct = await this.cart.add(id);
		return newProduct;
	}

	async deleteProduct(id: string) {
		return await this.cart.delete(id);
	}
}

export const cartAPI = new CartAPI();
