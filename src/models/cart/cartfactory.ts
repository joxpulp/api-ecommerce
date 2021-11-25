import { CartDAOMEM } from './DAO/memoria';
import { CartDAOFS } from './DAO/fs';
import { CartDAOSQL } from './DAO/sql';
import { CartDAOMONGO } from './DAO/mongodb';
import { CartDAOFirebase } from './DAO/firebase';

export class CartFactoryDAO {
	static get(tipo: string) {
		switch (tipo) {
			case 'MEMORIA':
				CartDAOMEM.instance;
				return CartDAOMEM.instance;

			case 'FS':
				return CartDAOFS.instance;

			case 'MYSQL':
				return CartDAOSQL.instanceMYSQL;

			case 'SQLITE':
				return CartDAOSQL.instanceSQLITE;

			case 'MONGOLOCAL':
				return CartDAOMONGO.instanceLocal;

			case 'MONGOATLAS':
				return CartDAOMONGO.instanceAtlas;

			case 'FIREBASE':
				return CartDAOFirebase.instance;

			default:
				return CartDAOMEM.instance;
		}
	}
}
