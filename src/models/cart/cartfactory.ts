import { CartDAOMEM } from "./DAO/memoria";
import { CartDAOFS } from "./DAO/fs";
import { CartDAOSQL } from "./DAO/sql";
import { CartDAOMONGO } from "./DAO/mongodb";
import { CartDAOFirebase } from "./DAO/firebase";

export class CartFactoryDAO {
	static get(tipo: number) {
		switch (tipo) {
			case 0:
				console.log('RETORNANDO CART INSTANCIA DE MEMORIA');
				return new CartDAOMEM();

			case 1:
				console.log('RETORNANDO CART INSTANCIA CLASE FS');
				return new CartDAOFS();

			case 2:
				console.log('RETORNANDO INSTANCIA CLASE MYSQL');
				return new CartDAOSQL(true);

			case 3:
				console.log('RETORNANDO INSTANCIA CLASE SQLITE');
				return new CartDAOSQL(false);

			case 4:
				console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
				return new CartDAOMONGO(true);

			case 5:
				console.log('RETORNANDO INSTANCIA CLASE MONGO ATLAS');
				return new CartDAOMONGO(false);

			case 6:
				console.log('RETORNANDO INSTANCIA CLASE FIREBASE');
				return new CartDAOFirebase();

			default:
				console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
				return new CartDAOMEM();
		}
	}
}
