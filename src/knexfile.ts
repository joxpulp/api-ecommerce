// Update with your config settings.

import CONFIG from './config/config'

export default {
	servermysql: {
		client: 'mysql',
		connection: {
			host: `${CONFIG.MYSQL_HOST}`,
			user: `${CONFIG.MYSQL_USER}`,
			password: `${CONFIG.MYSQL_PASSWORD}`,
			database: 'e-commerce',
		},
		migrations: { directory: __dirname + '/db/migrations' },
		seeds: { directory: __dirname + '/db/seeds' },
	},
	sqlite: {
		client: 'sqlite3',
		connection: { filename: './e-commerce' },
		useNullAsDefault: true,
		migrations: { directory: __dirname + '/db/migrations' },
		seeds: { directory: __dirname + '/db/seeds' },
	},
};
