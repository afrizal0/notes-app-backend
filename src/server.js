const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 8080,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'], // an array of origins or 'ignore'
      },
    },
  });
  server.route(routes);
  await server.start();
  console.log(`Server running on port ${server.info.uri}`);
};
init();
