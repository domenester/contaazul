import crypto from 'crypto';
import querystring from 'querystring';
import request from 'request';

// const generateState = size => crypto.randomBytes(size).toString('hex');

class ContaAzul {
    constructor(clientId, clientSecret, redirectUri) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.endpoints = {
            authorize: 'https://api.contaazul.com/auth/authorize',
            oauth: 'https://api.contaazul.com/oauth2/token',
        };
    }
    /* eslint-disable class-methods-use-this */
    generateState(size) {
        return crypto.randomBytes(size).toString('hex');
    }

    generateAuthorization() {
        return `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`;
    }

    generateAuthOptions(form) {
        return {
            url: this.endpoints.oauth,
            form,
            headers: {
                Authorization: this.generateAuthorization(),
            },
            json: true,
        };
    }
    getAuthorizeUrl() {
        this.state = this.generateState(16);
        return `${this.endpoints.authorize}?${querystring.stringify({
            client_id: this.clientId,
            scope: 'sales',
            redirect_uri: this.redirectUri,
            state: this.state,
        })}`;
    }

    async getTokens(req) {
        const code = req.query.code || null;
        const state = req.query.state || null;
        if (!state || state !== this.state) {
            throw new Error('ContaAzul state not valid');
        } else {
            const authOptions = this.generateAuthOptions({
                code,
                redirect_uri: this.redirectUri,
                grant_type: 'authorization_code',
            });
            /* eslint-disable no-return-await */
            return await new Promise((resolve, reject) => {
                request.post(authOptions, (err, res, body) => {
                    if (err || res.statusCode !== 200) reject(err);
                    resolve(body);
                });
            });
        }
    }

    refreshToken(req, res) {
        const refreshToken = req.query.refresh_token;
        const authOptions = this.generateAuthOptions({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });

        request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                res.send({ access_token: body.access_token, refresh_token: body.refresh_token });
            } else {
                res.send({ error });
            }
        });
    }
}

export default (clientId, clientSecret, redirectUri) => new ContaAzul(clientId, clientSecret, redirectUri);
