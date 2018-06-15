import request from 'request';
import querystring from 'querystring';
import * as helpers from '../helpers/index';

export default class ContaAzulApi {
    constructor(url) {
        this.url = url;
    }

    async trigger(method, path, accessToken, data) {
        const trigger = await new Promise((resolve, reject) => {
            request(
                helpers.request.options(method, path, accessToken, JSON.stringify(data)),
                (err, res, body) => {
                    // console.log('e', err, (body ? body : res));
                    if (err || res.statusCode !== 200) reject(err);
                    else resolve(body);
                },
            );
        });
        return trigger;
    }

    async list(accessToken) {
        const list = await this.trigger('GET', this.url, accessToken);
        return list;
    }

    async create(accessToken, body) {
        const create = await this.trigger('POST', this.url, accessToken, body);
        return create;
    }

    async getByFilter(accessToken, filter) {
        const list = await this.trigger(
            'GET',
            `${this.url}?${querystring.stringify(filter)}`,
            accessToken,
        );
        return list;
    }
}
