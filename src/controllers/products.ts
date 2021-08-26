import 'regenerator-runtime/runtime';
import { Request, Response } from 'express';
import { products } from '../persistence/productclass';

class ProductController {
	async getProducts(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (id) {
				const singleProduct = await products.get(id);
				if (singleProduct.length === 0) {
					return res.status(404).json({ error: 'No existe un producto con este id' });
				}
				return res.json({ product: singleProduct });
			} else {
				const get = await products.get();
				if (get.length === 0) {
					return res.status(404).json({ error: 'No hay productos cargados' });
				}
				return res.json({ products: get });
			}
		} catch (error) {
			console.error(error);
		}
	}

	async addProducts(req: Request, res: Response) {
		try {
			const body = req.body;
			if (body) {
				await products.add(
					body.title,
					body.description,
					body.code,
					body.price,
					body.thumbnail,
					body.stock
				);
				return res.json({ body });
			}
			return res.status(404).json({error: 'Se debe enviar un body con title, description, code, price, thumbnail, stock'})
		} catch (error) {
			console.log(error);
		}
	}

	async updateProducts(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const body = req.body;
			const updatedProduct = await products.update(
				id,
				body.title,
				body.description,
				body.code,
				body.price,
				body.thumbnail,
				body.stock
			);
			updatedProduct === -1
				? res.status(404).json({ error: 'Producto no encontrado' })
				: res.status(201).json({ product: updatedProduct });
		} catch (error) {
			console.log(error);
		}
	}

	async deleteProducts(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const deletedProduct = await products.delete(id);
			deletedProduct === -1
				? res
						.status(404)
						.json({ error: 'Producto no encontrado o ya eliminado' })
				: res.json({ deletedProduct });
		} catch (error) {
			console.log(error);
		}
	}
}

export const productController = new ProductController();
