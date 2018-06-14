import querystring from 'querystring';
import api from './api';

class ContaAzulServices {
    async list(accessToken) {
        const list = await api.trigger('GET', '/services', accessToken);
        return list;
    }

    async getByFilter(accessToken, filter) {
        const list = await api.trigger(
            'GET',
            `/services?${querystring.stringify(filter)}`,
            accessToken,
        );
        return list;
    }
}

export default new ContaAzulServices();
