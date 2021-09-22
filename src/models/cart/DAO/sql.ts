import knex, { Knex } from 'knex';
import dbConfig from '../../../knexfile';
import { Products, Cart, Table } from '../../interfaces';

export class CartDAOSQL {
	connection: Knex;

	constructor(mysql: boolean = true) {
		const options = mysql ? dbConfig['servermysql'] : dbConfig['sqlite'];
		this.connection = knex(options);
	}

	async get(id?: string): Promise<Cart[] | Products[]> {
		if (id) return await this.connection(Table.Cart).where('id', id);
		return await this.connection(Table.Cart);
	}

	async add(id: string): Promise<Products[]> {
		const findProduct: Products[] = await this.connection(Table.Products).where(
			'id',
			id
		);
		if (findProduct.length) {
			await this.connection(Table.Cart).insert({
				id: findProduct[0].id,
				title: findProduct[0].title,
				description: findProduct[0].description,
				code: findProduct[0].code,
				price: findProduct[0].price,
				thumbnail: findProduct[0].thumbnail,
				stock: findProduct[0].stock,
			});
		}
		return findProduct;
	}

	async delete(id: string) {
		const item = await this.get(id);
		if (item.length) {
			const deletedProduct = [];
			await this.connection(Table.Cart).where('id', id).del();
			deletedProduct.push(...item);
			return deletedProduct;
		}
		return item;
	}
}
