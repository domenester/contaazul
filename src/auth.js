import crypto from 'crypto';
import querystring from 'querystring';
import request from 'request';
import configs from './config/configs.json';
import * as helpers from './helpers/index';

// const generateState = size => crypto.randomBytes(size).toString('hex');

class ContaAzulAuth {
    constructor(clientId, clientSecret, redirectUri) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
    }

    generateState(size) {
        return crypto.randomBytes(size).toString('hex');
    }

    getAuthorizeUrl() {
        this.state = this.generateState(16);
        return `${configs.path.authorize}?${querystring.stringify({
            client_id: this.clientId,
            scope: 'sales',
            redirect_uri: this.redirectUri,
            state: this.state,
        })}`;
    }

    async getTokens(req) {
        const code = req.query.code || null;
        const state = req.query.state || null;

        if (!state || state !== this.state) throw new Error('ContaAzul state not valid');

        const authOptions = helpers.request.optionsAuth({
            code,
            redirect_uri: this.redirectUri,
            grant_type: 'authorization_code',
        }, this.clientId, this.clientSecret);

        const tokens = await new Promise((resolve, reject) => {
            request.post(authOptions, (err, res, body) => {
                if (err || res.statusCode !== 200) reject(err);
                else resolve(body);
            });
        });
        return tokens;
    }

    async refreshToken(req) {
        const refreshToken = req.query.refresh_token;

        const authOptions = helpers.request.optionsAuth({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }, this.clientId, this.clientSecret);

        const refreshedTokens = await new Promise((resolve, reject) => {
            request.post(authOptions, (error, response, body) => {
                if (error || response.statusCode !== 200) reject(error);
                else resolve(body);
            });
        });
        return refreshedTokens;
    }
}

export default (clientId, clientSecret, redirectUri) => new ContaAzulAuth(clientId, clientSecret, redirectUri);
