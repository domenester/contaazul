import configs from '../config/configs.json';

class RequestHelper {
    options(method, path, authorization, bodyContent) {
        return {
            url: `${configs.path.url}${path}`,
            method,
            headers: {
                Authorization: `Bearer ${authorization}`,
                'content-type': 'application/json',
            },
            body: bodyContent,
        };
    }

    optionsAuth(form, clientId, clientSecret) {
        return {
            url: configs.path.oauth,
            form,
            headers: {
                Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            },
            json: true,
        };
    }
}
export default new RequestHelper();
