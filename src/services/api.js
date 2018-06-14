import request from 'request';
import * as helpers from '../helpers/index';

class ContaAzulApi {
    async trigger(method, path, accessToken, data) {
        const trigger = await new Promise((resolve, reject) => {
            request(
                helpers.request.options(method, path, accessToken, JSON.stringify(data)),
                (err, res, body) => {
                    if (method === 'POST') console.log('e', err, res);
                    if (err || res.statusCode !== 200) reject(err);
                    else resolve(body);
                },
            );
        });
        return trigger;
    }
}

export default new ContaAzulApi();
