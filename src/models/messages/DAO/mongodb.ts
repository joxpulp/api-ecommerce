import { BaseMongo } from '../../../baseRepository/mongodb';
import { Messages } from '../../interfaces';

export class MessageDAOMONGO extends BaseMongo<Messages> {
	// Private instance of the class to use singleton pattern
	private static _instance: MessageDAOMONGO;

	// Getter to call the instance with singleton pattern.
	public static get instance() {
		if (this._instance) {
			console.log(
				'La instancia MONGODB ATLAS MESSAGES ya fue inicializada, se retorna la misma instancia que ya fue inicializada'
			);
			return this._instance;
		} else {
			console.log(
				'Intancia MONGODB ATLAS MESSAGES inicializada por primera vez'
			);
			return (this._instance = new this());
		}
	}
}
