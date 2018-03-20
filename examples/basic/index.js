var Hapi = require('hapi');
var Path = require('path');

async function main() {
   const server =  new Hapi.Server({ port: 4000 });
   await server.register([require('vision') ,require('hapi-auth-basic'),require('../../index')]);

   await server.views({
        engines: {
            hbs: require('handlebars')
        },
        path: __dirname,
        isCached: false
    });

    var validate = function (request, username, password) {

        // Just authenticate everyone and store username
        // in credentials

        if (username === 'izmir' && password === 'secret') {
            return {isValid : true,credentials:{ username: username }};

        }
        return {isValid : false};
    };

    server.auth.strategy('simple', 'basic', {
        validate: validate
    });

    server.route([
        {
            config: {
                auth: {
                    strategy: 'simple',
                    mode: 'try'
                }
            },
            method: 'GET',
            path: '/',
            handler: function (request, h) {

                return h.view('home');
            }
        },
        {
            config: {
                auth: {
                    strategy: 'simple'
                }
            },
            method: 'GET',
            path: '/login',
            handler: function (request, h) {
                return h.redirect('/');
            }
        }
    ]);

    await server.start();
    return server;
};

main()
    .then((server) => console.log(`Server listening on ${server.info.uri}`))
.catch((err) => {
    console.error(err);
    process.exit(1);
});