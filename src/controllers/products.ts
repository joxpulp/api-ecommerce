import 'regenerator-runtime/runtime';
import { Request, Response } from 'express';
import { productsAPI } from '../apis/productsapi';
import { ProductQuery } from '../models/interfaces';

class ProductController {
	async getProducts(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { title, price, code, stock, priceMax, priceMin, stockMax, stockMin } = req.query;

			if (id) {
				const singleProduct = await productsAPI.getProducts(id);
				if (singleProduct.length === 0) {
					return res
						.status(404)
						.json({ error: 'No existe un producto con este id' });
				}
				return res.json({ product: singleProduct });
			} else {
				const query: ProductQuery = {};

				if (title) {
					let titleLow = title.toString().toLowerCase();
					let titleFinal = titleLow.charAt(0).toUpperCase() + titleLow.slice(1)
					query.title = titleFinal; 
				}

				if (code) query.code = code.toString();

				if (priceMax) query.priceMax = Number(priceMax);

				if (priceMin) query.priceMin = Number(priceMin);

				if (stockMax) query.stockMax = Number(stockMax);

				if (stockMin) query.stockMin = Number(stockMin);

				if (Object.keys(query).length) {
					const productQuery = await productsAPI.query(query);
					if (productQuery.length)
					return res.json({
						products: productQuery,
					});
					return res.status(404).json({ error: 'No hay productos que hagan match con la busqueda'})
				}

				const get = await productsAPI.getProducts();
				if (get.length === 0) {
					return res.status(404).json({ error: 'No hay productos cargados' });
				}
				return res.json({ products: get });
			}
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			}
		}
	}

	async addProducts(req: Request, res: Response) {
		try {
			const body = req.body;
			if (body) {
				await productsAPI.addProduct(body);
				return res.json({ body });
			}
			return res.status(404).json({
				error:
					'Se debe enviar un body con title, description, code, price, thumbnail, stock',
			});
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			}
		}
	}

	async updateProducts(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const body = req.body;
			const updatedProduct = await productsAPI.updateProduct(id, body);
			updatedProduct.length === 0
				? res.status(404).json({ error: 'Producto no encontrado' })
				: res.status(201).json({ product: updatedProduct });
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			}
		}
	}

	async deleteProducts(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const deletedProduct = await productsAPI.deleteProduct(id);
			deletedProduct.length === 0
				? res
						.status(404)
						.json({ error: 'Producto no encontrado o ya eliminado' })
				: res.json({ deletedProduct });
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			}
		}
	}
}

export const productController = new ProductController();
