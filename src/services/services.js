import ContaAzulApi from './api';

class ContaAzulServices extends ContaAzulApi {
    constructor(url) {
        super();
        this.url = url;
    }
}

export default new ContaAzulServices('/services');
