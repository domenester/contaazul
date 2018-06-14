import auth from './auth';
import * as services from './services/index';

module.exports = (clientId, clientSecret, redirectUri) => {
    const contaazul = {
        auth: auth(clientId, clientSecret, redirectUri),
        services,
    };
    return contaazul;
};
