import firebase from 'firebase-admin';
import serviceAccount from '../../../firebasekey/fir-crud-254ad-firebase-adminsdk-mqgvd-eadcca8c0d.json';
import { newProductI, Products } from '../../interfaces';

export class ProductDAOFirebase {
	private db;
	private query;

	constructor() {
		firebase.initializeApp({
			credential: firebase.credential.cert({
				privateKey: serviceAccount.private_key,
				clientEmail: serviceAccount.client_email,
				projectId: serviceAccount.project_id,
			}),
			databaseURL: 'https://fir-crud-254ad.iam.gserviceaccount.com',
		});

		this.db = firebase.firestore();
		this.query = this.db.collection('productos');
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

	async add(body: newProductI): Promise<FirebaseFirestore.WriteResult> {
		const doc = this.query.doc();
		return await doc.create(body);
	}

	async update(id: string, body: newProductI): Promise<Products[]> {
		const getProduct = await this.get(id);
		const updatedProduct = [];
		if (getProduct.length) {
			await this.query.doc(id).update(body);
			const product = await this.get(id);
			updatedProduct.push(...product);
			return updatedProduct;
		}
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
