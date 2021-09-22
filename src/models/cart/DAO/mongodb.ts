import { Schema, model, connect, Types } from 'mongoose';
import { Products, Cart } from '../../interfaces';
import { productsAPI } from '../../../apis/productsapi';
import CONFIG from '../../../config/config';


const cartSchema = new Schema<Cart>(
	{
		timestamp: { type: Number, default: Date.now() },
		cartProducts: [{ type: Schema.Types.ObjectId, ref: 'productoscarritos' }],
	},
	{ versionKey: false }
);

const cartProdutcsSchema = new Schema<Products>(
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

export class CartDAOMONGO {
	private uri: string;
	private cart;
	private cartProduct;

	constructor(local: boolean = true) {
		if (local) this.uri = `mongodb://${CONFIG.MONGO_USER}:${CONFIG.MONGO_PASSWORD}@127.0.0.1:27017/${CONFIG.MONGO_DBNAME}`;
		else
			this.uri = `mongodb+srv://${CONFIG.MONGO_USER}:${CONFIG.MONGO_PASSWORD}@${CONFIG.MONGO_ATLAS_CLUSTER}/${CONFIG.MONGO_DBNAME}?retryWrites=true&w=majority`;
		connect(this.uri);
		this.cart = model<Cart>('carritos', cartSchema);
		this.cartProduct = model<Products>('productoscarritos', cartProdutcsSchema);
	}

	async get(id?: string): Promise<Cart[] | Products[]> {
		let outputGet: Products[] = [];

		if (id) {
			const singleProduct = await this.cartProduct.findById(id);
			singleProduct && outputGet.push(singleProduct);
		} else {
			outputGet = await this.cart.find().populate('cartProducts');
		}
		return outputGet;
	}

	async add(id: string): Promise<Products[]> {
		const findProduct = await productsAPI.getProducts(id);
		const ouputNew: Products[] = [];
		const checkCart = await this.cart.find();

		if (checkCart.length === 0) {
			const newCart = new this.cart();
			await newCart.save();
		}

		if (findProduct.length) {
			const readCart = await this.cart.find();
			readCart[0].cartProducts = readCart[0].cartProducts.concat(id);
			await readCart[0].save();

			const newProduct = new this.cartProduct(...findProduct);
			newProduct.isNew = true;
			await newProduct.save();
			ouputNew.push(newProduct);

			return ouputNew;
		}
		return ouputNew;
	}

	async delete(id: string) {
		const outputDelete: Products[] = [];
		const deletedProduct = await this.cartProduct.findByIdAndDelete(id);
		deletedProduct && outputDelete.push(deletedProduct);
		return outputDelete;
	}
}
