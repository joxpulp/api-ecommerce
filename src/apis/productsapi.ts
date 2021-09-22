import { FactoryDAO } from '../models/products/productfactory';
import { Products, newProductI, ProductQuery } from '../models/interfaces';

const tipo = 2;

class prodAPI {
	private products;

	constructor() {
		this.products = FactoryDAO.get(tipo);
	}

	async getProducts(id?: string): Promise<Products[]> {
		if (id) return await this.products.get(id);
		return await this.products.get();
	}

	async addProduct(
		productData: newProductI
	): Promise<Products | FirebaseFirestore.WriteResult> {
		const newProduct = await this.products.add(productData);
		return newProduct;
	}

	async updateProduct(
		id: string,
		productData: newProductI
	): Promise<Products[]> {
		const updatedProduct = await this.products.update(id, productData);
		return updatedProduct;
	}

	async deleteProduct(id: string): Promise<Products[]> {
		return await this.products.delete(id);
	}

	async query(options: ProductQuery) {
		return await this.products.query(options);
	}
}

export const productsAPI = new prodAPI();
