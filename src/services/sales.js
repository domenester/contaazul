import api from './api';

class ContaAzulSales {
    async list(accessToken) {
        const list = await api.trigger('GET', '/sales', accessToken);
        return list;
    }
    async create(accessToken, sale) {
        const created = await api.trigger('POST', '/sales', accessToken, sale);
        return created;
    }
}

export default new ContaAzulSales();
