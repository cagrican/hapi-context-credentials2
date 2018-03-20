module.exports = {
    name :'hapi-context-credentials2',
    version : '1.0.0',
    register : function (server, options) {
        server.ext({
            type : 'onPreResponse',
            method : function (request,h) {
                var response = request.response;
                if (response.variety && response.variety === 'view') {
                    response.source.context = response.source.context || {};
                    response.source.context.credentials = request.auth.isAuthenticated ? request.auth.credentials : null;
                    console.log(request.auth.isAuthenticated);

                }
                return h.continue;
            }
        });
    }
};