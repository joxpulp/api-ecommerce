import 'regenerator-runtime/runtime';
import { Request, Response } from 'express';
import { cart } from '../persistence/cartclass';

class CartController {
	async getProducts(req: Request, res: Response) {
		try {
			const { id_producto } = req.params;
			if (id_producto) {
				const singleProduct = await cart.get(id_producto);
				if (singleProduct.length === 0) {
					return res
						.status(404)
						.json({ error: 'No existe un producto con este id' });
				}
				return res.json({ product: singleProduct });
			} else {
				const get = await cart.get();
				if (get.length === 0) {
					return res.status(404).json({ error: 'No hay un carrito creado' });
				}
				return res.json({ cart: get });
			}
		} catch (error) {
			console.error(error);
		}
	}

	async addProducts(req: Request, res: Response) {
		try {
			const { id_producto } = req.params;
			if (id_producto) {
				const productAdded = await cart.add(id_producto);
				return productAdded.length === 0
					? res.status(404).json({ error: 'No existe producto con ese id' })
					: res.json({ productAdded });
			}
		} catch (error) {
			console.log(error);
		}
	}

	async deleteProducts(req: Request, res: Response) {
		try {
			const { id_producto } = req.params;
			const deletedProduct = await cart.delete(id_producto);
			return deletedProduct === -1
				? res.status(404).json({ error: 'Producto no encontrado o ya eliminado' })
				: res.json({ deletedProduct });
		} catch (error) {
			console.log(error);
		}
	}
}

export const cartController = new CartController();
