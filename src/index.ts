import Server from './services/server';

const port = process.env.PORT || 8080;

Server.listen(port, () => console.log(`Server running in port: ${port}`));
Server.on('error', (error) => console.error(`There was an error: ${error}`));
