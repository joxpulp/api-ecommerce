import { Schema, model, connect, Types } from 'mongoose';
import { Products, Cart } from '../../interfaces';
import { productsAPI } from '../../../apis/productsapi';

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
		if (local) this.uri = 'mongodb://josu:josu@127.0.0.1:27017/ecommerce';
		else
			this.uri =
				'mongodb://josu:josu@cluster0-shard-00-00.jbg6c.mongodb.net:27017,cluster0-shard-00-01.jbg6c.mongodb.net:27017,cluster0-shard-00-02.jbg6c.mongodb.net:27017/ecommerce?replicaSet=atlas-ifxfb3-shard-0&ssl=true&authSource=admin';
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
