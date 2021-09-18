import knex from 'knex';

export async function seed(knex) {
	const initProducts = [
		{
			title: 'Naranjita',
			description: 'sdjasdjoasjdoasdojasd',
			code: 'codeigo_1254',
			price: 100,
			thumbnail: 'https://imagenes.com',
			stock: 45,
		},
	];
	return knex('products')
		.del()
		.then(() => knex('products').insert(initProducts));
}
