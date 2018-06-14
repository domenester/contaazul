import api from './api';

class ContaAzulCustomers {
    async list(accessToken) {
        const list = await api.trigger('GET', '/customers', accessToken);
        return list;
    }

    async create(costumer, accessToken) {
        const create = await api.trigger('GET', '/sales', accessToken, costumer);
        return create;
    }
}

export default new ContaAzulCustomers();
