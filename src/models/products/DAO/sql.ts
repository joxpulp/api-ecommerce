import knex, { Knex } from 'knex';
import dbConfig from '../../../knexfile';
import { Products, newProductI, Table, ProductQuery } from '../../interfaces';

export class ProductDAOSQL {
	connection: Knex;

	constructor(mysql: boolean = true) {
		const options = mysql ? dbConfig['servermysql'] : dbConfig['sqlite'];
		this.connection = knex(options);
	}

	async get(id?: string): Promise<Products[]> {
		if (id) return await this.connection(Table.Products).where('id', id);
		return await this.connection(Table.Products);
	}

	async add(body: newProductI): Promise<Products> {
		const newProduct: Products = await this.connection(Table.Products).insert(
			body
		);
		return newProduct;
	}

	async update(id: string, body: newProductI): Promise<Products[]> {
		const item = await this.get(id);
		if (item.length) {
			await this.connection(Table.Products).where('id', id).update(body);
			const updatedProduct = await this.get(id);
			return updatedProduct;
		}
		return item;
	}

	async delete(id: string): Promise<Products[]> {
		const item = await this.get(id);
		if (item.length) {
			const deletedElement: Products[] = [];
			await this.connection(Table.Products).where('id', id).del();
			deletedElement.push(...item);
			return deletedElement;
		}
		return item;
	}

	async query(options: ProductQuery): Promise<Products[]> {
		const query = await this.connection(Table.Products).modify(
			(queryBuilder) => {
				if (options.title) queryBuilder.where('title', options.title);
				if (options.priceMin && options.priceMax)
					queryBuilder.whereBetween('price', [
						options.priceMin!,
						options.priceMax!,
					]);
				if (options.stockMin && options.stockMax)
					queryBuilder.whereBetween('stock', [
						options.stockMin!,
						options.stockMax!,
					]);
				if (options.code) queryBuilder.where('code', options.code);
			}
		);

		return query;
	}
}
