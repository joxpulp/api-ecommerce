import { ProductDAOMEM } from './DAO/memoria';
import { ProductDAOFS } from './DAO/fs';
import { ProductDAOSQL } from './DAO/sql';
import { ProductDAOMONGO } from './DAO/mongodb';
import { ProductDAOFirebase } from './DAO/firebase';

export class FactoryDAO {
	static get(tipo: number) {
		switch (tipo) {
			case 0:
				console.log('RETORNANDO PRODUCTS INSTANCIA DE MEMORIA');
				return new ProductDAOMEM();

			case 1:
				console.log('RETORNANDO PRODUCTS INSTANCIA CLASE FS');
				return new ProductDAOFS();

			case 2:
				console.log('RETORNANDO PRODUCTS INSTANCIA CLASE MYSQL');
				return new ProductDAOSQL(true);

			case 3:
				console.log('RETORNANDO PRODUCTS INSTANCIA CLASE SQLITE');
				return new ProductDAOSQL(false);

			case 4:
				console.log('RETORNANDO PRODUCTS INSTANCIA CLASE MONGO LOCAL');
				return new ProductDAOMONGO(true);

			case 5:
				console.log('RETORNANDO PRODUCTS INSTANCIA CLASE MONGO ATLAS');
				return new ProductDAOMONGO(false);

			case 6:
				console.log('RETORNANDO PRODUCTS INSTANCIA CLASE FIREBASE');
			return new ProductDAOFirebase();

			default:
				console.log('RETORNANDO PRODUCTS INSTANCIA CLASE MEMORIA');
				return new ProductDAOMEM();
		}
	}
}
