import knex, { Knex } from 'knex';
import dbConfig from '../../../knexfile';
import { Products, newProductI, Table, ProductQuery } from '../../interfaces';

export class ProductDAOSQL {
	// Private instance of the class to use singleton pattern
	private static _instanceMYSQL: ProductDAOSQL;
	private static _instanceSQLITE: ProductDAOSQL;
	connection: Knex;

	constructor(mysql: boolean = true) {
		const options = mysql ? dbConfig['servermysql'] : dbConfig['sqlite'];
		this.connection = knex(options);
	}

	// Getter to call the instance with singleton pattern.
	public static get instanceMYSQL() {
		if (this._instanceMYSQL) {
			console.log(
				'La instancia MYSQL PRODUCT ya fue inicializada, se retorna la misma instancia que ya fue inicializada'
			);
			return this._instanceMYSQL;
		} else {
			console.log('Intancia MYSQL PRODUCT inicializada por primera vez');
			return (this._instanceMYSQL = new this());
		}
	}

	// Getter to call the instance with singleton pattern.
	public static get instanceSQLITE() {
		if (this._instanceSQLITE) {
			console.log(
				'La instancia SQLITE PRODUCT ya fue inicializada, se retorna la misma instancia que ya fue inicializada'
			);
			return this._instanceSQLITE;
		} else {
			console.log('Intancia SQLITE PRODUCT inicializada por primera vez');
			return (this._instanceSQLITE = new this(false));
		}
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
