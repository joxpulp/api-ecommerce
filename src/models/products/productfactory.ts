import { ProductDAOMEM } from './DAO/memoria';
import { ProductDAOFS } from './DAO/fs';
import { ProductDAOSQL } from './DAO/sql';
import { ProductDAOMONGO } from './DAO/mongodb';
import { ProductDAOFirebase } from './DAO/firebase';

export class FactoryDAO {
	static get(tipo: string) {
		switch (tipo) {
			case 'MEMORIA':
				ProductDAOMEM.instance;
				return ProductDAOMEM.instance;

			case 'FS':
				return ProductDAOFS.instance;

			case 'MYSQL':
				return ProductDAOSQL.instanceMYSQL;

			case 'SQLITE':
				return ProductDAOSQL.instanceSQLITE;

			case 'MONGOLOCAL':
				return ProductDAOMONGO.instanceLocal;

			case 'MONGOATLAS':
				return ProductDAOMONGO.instanceAtlas;

			case 'FIREBASE':
			return ProductDAOFirebase.instance;

			default:
				return ProductDAOMEM.instance;
		}
	}
}
