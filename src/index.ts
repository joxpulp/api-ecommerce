import Server from './services/server';
import { ioServer } from './services/socket';

const port = process.env.PORT || 8080;

ioServer(Server);
Server.listen(port, () => console.log(`Server running in port: ${port}`));
Server.on('error', (error) => console.error(`There was an error: ${error}`));
