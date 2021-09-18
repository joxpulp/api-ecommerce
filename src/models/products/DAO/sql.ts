import knex, { Knex } from 'knex';
import dbConfig from '../../../knexfile';
import { Products, newProductI } from '../../interfaces';

export class ProductDAOSQL {
	connection: Knex;

	constructor(mysql: boolean = true) {
		const options = mysql
			? dbConfig['productsmysql']
			: dbConfig['productsqlite'];
		this.connection = knex(options);
	}

	async get(id?: string): Promise<Products[]> {
		if (id) return await this.connection('productos').where('id', id);
		return await this.connection('productos');
	}

	async add(body: newProductI): Promise<Products> {
		const newProduct: Products = await this.connection('productos').insert(body);
		return newProduct;
	}

	async update(id: string, body: newProductI): Promise<Products[]> {
		const item = await this.get(id);
		if (item.length) {
			await this.connection('productos').where('id', id).update(body);
			const updatedProduct = await this.get(id);
			return updatedProduct;
		}
		return item;
	}

	async delete(id: string): Promise<Products[]> {
		const item = await this.get(id);
		if (item.length) {
			const deletedElement: Products[] = [];
			await this.connection('productos').where('id', id).del();
			deletedElement.push(...item);
			return deletedElement;
		}
		return item;
	}
}
