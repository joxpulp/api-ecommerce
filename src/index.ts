import { flags } from './config/config';
import Server from './services/server';
import { ioServer } from './services/socket';

ioServer(Server);
Server.listen(flags.P, () => console.log(`Server running in port: ${flags.P}`));
Server.on('error', (error) => console.error(`There was an error: ${error}`));
