import ContaAzulApi from './api';

class ContaAzulSales extends ContaAzulApi {
    constructor(url) {
        super();
        this.url = url;
    }
}

export default new ContaAzulSales('/sales');
