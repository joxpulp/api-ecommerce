import { Knex } from 'knex';

export async function up(knex: Knex) {
	return knex.schema
		.createTable('productos', (productsTable) => {
			productsTable.increments();
			productsTable.string('title').notNullable();
			productsTable.string('description').notNullable();
			productsTable.string('code').notNullable;
			productsTable.decimal('price', 5, 2);
			productsTable.string('thumbnail').notNullable();
			productsTable.integer('stock');
		})
		.createTable('carrito', (cartTable) => {
			cartTable.increments();
			cartTable.string('title').notNullable();
			cartTable.string('description').notNullable();
			cartTable.string('code').notNullable;
			cartTable.decimal('price', 5, 2);
			cartTable.string('thumbnail').notNullable();
			cartTable.integer('stock');
		});
}

export async function down(knex: Knex) {
	return knex.schema.dropTable('productos').dropTable('carrito');
}
