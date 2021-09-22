import { CartFactoryDAO } from '../models/cart/cartfactory';
import { Cart, Products } from '../models/interfaces';

const tipo = 5;

class CartAPI {
	private cart;

	constructor() {
		this.cart = CartFactoryDAO.get(tipo);
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
