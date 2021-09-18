import { connect } from 'mongoose';

export const mongoose = async (): Promise<void> => {
	try {
		await connect('http://josu:josu@127.0.0.1/ecommerce');
		console.log('Conectado a base de datos');
	} catch (error) {
		console.log(error);
	}
};
