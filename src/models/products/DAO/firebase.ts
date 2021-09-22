import firebase from 'firebase-admin';
import { newProductI, Products, ProductQuery } from '../../interfaces';
import CONFIG from '../../../config/config'

export class ProductDAOFirebase {
	private db;
	private querys;

	constructor() {
		firebase.initializeApp({
			credential: firebase.credential.cert({
				privateKey: `${CONFIG.FIREBASE_PRIVATEKEY}`,
				clientEmail: `${CONFIG.FIREBASE_CLIENTEMAIL}`,
				projectId: `${CONFIG.FIREBASE_PROJECTID}`,
			}),
			databaseURL: 'https://fir-crud-254ad.iam.gserviceaccount.com',
		});

		this.db = firebase.firestore();
		this.querys = this.db.collection('productos');
	}

	async get(id?: string): Promise<Products[]> {
		if (id) {
			const getSpecific = await this.querys.doc(id).get();
			const specific = getSpecific.data();
			const product: Products[] = [];
			if (specific) {
				product.push({ _id: getSpecific.id, ...specific });
				return product;
			}
			return product;
		} else {
			const getAll = await this.querys.get();
			let docs = getAll.docs;
			const output = docs.map((doc) => ({
				_id: doc.id,
				...doc.data(),
			}));
			return output;
		}
	}

	async add(body: newProductI): Promise<FirebaseFirestore.WriteResult> {
		const doc = this.querys.doc();
		return await doc.create(body);
	}

	async update(id: string, body: newProductI): Promise<Products[]> {
		const getProduct = await this.get(id);
		const updatedProduct = [];
		if (getProduct.length) {
			await this.querys.doc(id).update(body);
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
			await this.querys.doc(id).delete();
			deletedProduct.push(...getProduct);
			return deletedProduct;
		}
		return getProduct;
	}

	async query(options: ProductQuery): Promise<Products[]> {
		const getAll = await this.querys.get();
		let docs = getAll.docs;
		const output = docs.map((doc) => ({
			_id: doc.id,
			...doc.data(),
		}));
		type Conditions = (Product: Products) => boolean;

		const query: Conditions[] = [];

		if (options.title)
			query.push((product: Products) => product.title == options.title);

		if (options.price)
			query.push((product: Products) => product.price == options.price);

		if (options.code)
			query.push((product: Products) => product.code == options.code);

		if (options.priceMin)
			query.push((product: Products) => product.price! >= options.priceMin!);

		if (options.priceMax)
			query.push((product: Products) => product.price! <= options.priceMax!);

		if (options.stockMin)
			query.push((product: Products) => product.stock! >= options.stockMin!);

		if (options.stockMax)
			query.push((product: Products) => product.stock! <= options.stockMax!);

		return output.filter((product) => query.every((x) => x(product)));
	}
}
