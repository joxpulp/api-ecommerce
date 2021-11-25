import dotenv from 'dotenv';
import args from 'args';

args.option('DAO', 'Sets the DB to use')
export const flags = args.parse(process.argv);

dotenv.config();

const env = {
	MYSQL_HOST: process.env.MYSQL_HOST || 'urlhost',
	MYSQL_USER: process.env.MYSQL_USER || 'user',
	MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'password',
	MONGO_USER: process.env.MONGO_USER || 'user',
	MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'password',
	MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'clusterUrl',
	MONGO_DBNAME: process.env.MONGO_DBNAME || 'dbName',
	FIREBASE_PRIVATEKEY: process.env.FIREBASE_PRIVATEKEY || 'privatekey',
	FIREBASE_CLIENTEMAIL: process.env.FIREBASE_CLIENTEMAIL || 'clientemail',
	FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID || 'projectid',
	FIREBASE_DBURL: process.env.FIREBASE_DBURL || 'dbUrl',
};

export default env;
