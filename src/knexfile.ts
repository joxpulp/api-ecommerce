// Update with your config settings.

export default {
	productsmysql: {
		client: 'mysql',
		connection: {
			host: '192.168.64.2',
			user: 'josue',
			password: 'josue',
			database: 'e-commerce',
		},
		migrations: { directory: __dirname + '/db/migrations' },
		seeds: { directory: __dirname + '/db/seeds' },
	},
	productsqlite: {
		client: 'sqlite3',
		connection: { filename: './productos' },
		useNullAsDefault: true,
		migrations: { directory: __dirname + '/db/migrations' },
		seeds: { directory: __dirname + '/db/seeds' },
	},
};
