import { ProductDAOMEM } from './DAO/memoria';
import { ProductDAOFS } from './DAO/fs';
import { ProductDAOSQL } from './DAO/sql';
import { ProductDAOMONGO } from './DAO/mongodb';
import { ProductDAOFirebase } from './DAO/firebase';

export class FactoryDAO {
	static get(tipo: number) {
		switch (tipo) {
			case 0:
				console.log('RETORNA INSTANCIA DE MEMORIA');
				return new ProductDAOMEM();

			case 1:
				console.log('RETORNANDO INSTANCIA CLASE FS');
				return new ProductDAOFS();

			case 2:
				console.log('RETORNANDO INSTANCIA CLASE MYSQL');
				return new ProductDAOSQL(true);

			case 3:
				console.log('RETORNANDO INSTANCIA CLASE SQLITE');
				return new ProductDAOSQL(false);

			case 4:
				console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
				return new ProductDAOMONGO(true);

			case 5:
				console.log('RETORNANDO INSTANCIA CLASE MONGO ATLAS');
				return new ProductDAOMONGO(false);

			case 6:
				console.log('RETORNANDO INSTANCIA CLASE FIREBASE');
			return new ProductDAOFirebase();

			default:
				console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
				return new ProductDAOMEM();
		}
	}
}
