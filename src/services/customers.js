import ContaAzulApi from './api';

class ContaAzulCustomers extends ContaAzulApi {
    constructor(url) {
        super();
        this.url = url;
    }
}

export default new ContaAzulCustomers('/customers');
