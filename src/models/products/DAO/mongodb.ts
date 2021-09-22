import { Schema, model, connect } from 'mongoose';
import { Products, newProductI, ProductQuery } from '../../interfaces';
import CONFIG from '../../../config/config';

const productsSchema = new Schema<Products>(
	{
		title: { type: String, required: true, max: 100 },
		description: { type: String, required: true, max: 300 },
		code: { type: String || Number, required: true },
		price: {
			type: Number,
			required: true,
			min: [100, `El valor es {VALUE}, debe ser como minimo 100`],
			max: [5000, `El valor es {VALUE}, debe ser como maximo 5000`],
		},
		thumbnail: { type: String, required: true, max: 100 },
		stock: { type: Number, required: true },
	},
	{ versionKey: false }
);

export class ProductDAOMONGO {
	private uri: string;
	private products;

	constructor(local: boolean = true) {
		if (local) this.uri = `mongodb://${CONFIG.MONGO_USER}:${CONFIG.MONGO_PASSWORD}@127.0.0.1:27017/${CONFIG.MONGO_DBNAME}`;
		else
			this.uri = `mongodb+srv://${CONFIG.MONGO_USER}:${CONFIG.MONGO_PASSWORD}@${CONFIG.MONGO_ATLAS_CLUSTER}/${CONFIG.MONGO_DBNAME}?retryWrites=true&w=majority`;
		connect(this.uri);
		this.products = model<Products>('finalproductos', productsSchema);
	}

	async get(id?: string): Promise<Products[]> {
		let outputGet: Products[] = [];

		if (id) {
			const singleProduct = await this.products.findById(id);
			singleProduct && outputGet.push(singleProduct);
		} else {
			outputGet = await this.products.find();
		}
		return outputGet;
	}

	async add(data: newProductI): Promise<Products> {
		const newProduct = new this.products(data);
		await newProduct.save();
		return newProduct;
	}

	async update(id: string, data: newProductI): Promise<Products[]> {
		let outputUpdate: Products[] = [];
		await this.products.findByIdAndUpdate(
			id,
			{ $set: data },
			{ runValidators: true }
		);

		const updatedProduct = await this.products.findById(id);
		updatedProduct && outputUpdate.push(updatedProduct);

		return outputUpdate;
	}

	async delete(id: string): Promise<Products[]> {
		let outputDelete: Products[] = [];
		const deletedProduct = await this.products.findByIdAndDelete(id);
		deletedProduct && outputDelete.push(deletedProduct);
		return outputDelete;
	}

	async query(options: ProductQuery): Promise<Products[]> {
		const query: any = {};
		if (options.title) query.title = options.title;

		if (options.priceMin && options.priceMax)
			query.price = { $gte: options.priceMin, $lte: options.priceMax };

		if (options.stockMin && options.stockMax)
			query.stock = { $gte: options.stockMin, $lte: options.stockMax };

		if (options.code) query.code = options.code;

		return await this.products.find(query);
	}
}
