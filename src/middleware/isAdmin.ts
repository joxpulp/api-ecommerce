import { Request, Response, NextFunction } from 'express';

const isAdmin = true;

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
	//If admin is true access to the next method, else return a response
	isAdmin ? next() : res.status(401).json({ error: -1, descripcion: `Ruta ${req.originalUrl}, metodo ${req.method} no autorizado`}); 
};
