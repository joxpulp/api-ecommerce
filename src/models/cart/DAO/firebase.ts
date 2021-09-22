import firebase from 'firebase-admin';
import serviceAccount from '../../../firebasekey/fir-crud-254ad-firebase-adminsdk-mqgvd-eadcca8c0d.json';
import { newProductI, Products, Cart } from '../../interfaces';
import { productsAPI } from '../../../apis/productsapi';

export class CartDAOFirebase {
	private db;
	private query;

	constructor() {
		this.db = firebase.firestore();
		this.query = this.db.collection('carrito');
	}

	async get(id?: string): Promise<Products[]> {
		if (id) {
			const getSpecific = await this.query.doc(id).get();
			const specific = getSpecific.data();
			const product: Products[] = [];
			if (specific) {
				product.push({ _id: getSpecific.id, ...specific });
				return product;
			}
			return product;
		} else {
			const getAll = await this.query.get();
			let docs = getAll.docs;
			const output = docs.map((doc) => ({
				_id: doc.id,
				...doc.data(),
			}));
			return output;
		}
	}

	async add(id: string): Promise<Products[]> {
		const getProduct = await productsAPI.getProducts(id);

		const doc = this.query.doc(id);
		await doc.create(getProduct[0]);
		return getProduct;
	}

	async delete(id: string): Promise<Products[]> {
		const getProduct = await this.get(id);
		const deletedProduct = [];

		if (getProduct.length) {
			await this.query.doc(id).delete();
			deletedProduct.push(...getProduct);
			return deletedProduct;
		}
		return getProduct;
	}
}
