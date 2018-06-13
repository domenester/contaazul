// var contaazul = require("contaazul")(
//     'S9FWM8n0Q3axw6mxXTkcfDP1pagTMnx7',
//     'fkduWLSHCetlp9D6aSc4MbNRCXTe5HAC',
//     'http://localhost:3000/contaazulCallback'
// );

// var express = require('express');
// var app = express();
// var cookieParser = require('cookie-parser');

// app.use(cookieParser());

// app.get('/home', (req, res) => {
//     const authorizeUrl = contaazul.getAuthorizeUrl();
//     res.redirect(authorizeUrl);
// });
// app.get('/contaazulCallback', async (req, res) => {
//     try {
//         const tokens = await contaazul.getTokens(req);
//         console.log("tokens", tokens);
//         res.send(tokens);
//     } catch (err) {
//         console.log(err);
//         res.send(err);
//     }
// });

// app.listen(3000, () => {
//     console.log('Listening port 3000');
// });
