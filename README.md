# ContaAzul Node API
Make requests to contaazul services via Node.js.

# Usage:
* npm install
* npm run build

Once built, the application is ready to offer auth and services objects at **dist/index.js**.

# Importing:
```javascript
const yourContaAzulClientId = 'S9FWM8n0Q3axw6mxXTkcfDP1pagTMnx7';
const yourContaAzulClientSecret = 'fkduWLSHCetlp9D6aSc4MbNRCXTe5HAC';
const yourRedirectUri = 'http://localhost:3000/contaazulCallback';
const contaazul = require("contaazul")(
    yourContaAzulClientId,
    yourContaAzulClientSecret,
    yourRedirectUri
);
```