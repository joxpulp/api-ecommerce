import knex from 'knex';

export async function up(knex) {
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
}

export async function down(knex) {
	return knex.schema.dropTable('productos');
}
