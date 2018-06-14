// var contaazul = require("contaazul")(
//     'S9FWM8n0Q3axw6mxXTkcfDP1pagTMnx7',
//     'fkduWLSHCetlp9D6aSc4MbNRCXTe5HAC',
//     'http://localhost:3000/contaazulCallback'
// );

// var express = require('express');
// var app = express();
// var cookieParser = require('cookie-parser');
// var fs = require('fs');
// let refreshToken;
// var util = require('util');
// const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);

// app.use(cookieParser());

// app.get('/home', (req, res) => {
//     const authorizeUrl = contaazul.auth.getAuthorizeUrl();
//     res.redirect(authorizeUrl);
// });

// app.get('/contaazulCallback', async (req, res) => {
//     try {
//         const tokens = await contaazul.auth.getTokens(req.query.code, req.query.state);
//         console.log("tokens", tokens);
//         await writeFile('tokens.json', JSON.stringify(tokens), 'utf8');
        
//         if (tokens.access_token) {
//             //const salesList = await contaazul.services.sales.list(tokens.access_token);
//             const servicesList = await contaazul.services.services.list(
//                 tokens.access_token,
//             );

//             // const saleCreated = await contaazul.services.sales.create(
//             //     tokens.access_token,
//             //     {
//             //         "emission": new Date(),
//             //         "costumer_id": "44dfb5a1-6766-4868-acc1-beeefd6a67c2",
//             //         "payment": {
//             //             "type": "CASH",
//             //             "installments": [
//             //                 {
//             //                 "number": 0,
//             //                 "value": 0,
//             //                 "due_date": new Date(),
//             //                 "status": "ACQUITTED"
//             //                 }
//             //             ]
//             //         },
//             //         "status": "COMMITTED",
//             //         "services": [
//             //             {
//             //                 "description": "Intercâmbio de Bitcoin",
//             //                 "quantity": 1,
//             //                 "service_id": "e33d2ff9-3e37-40c3-a946-91f61106609a",
//             //                 "value": 5
//             //             }
//             //         ],
//             //     }
//             // )
//             // console.dir(servicesList, {depth: null, colors: true});
//             // console.dir(customersList, {depth: null, colors: true});
//             // console.dir(salesList, {depth: null, colors: true});
//             console.dir({}, {depth: null, colors: true});
//         }     
//         res.send(tokens);
//     } catch (err) {
//         console.log(err);
//         res.send(err);
//     }
// });

// app.get('/createSale', async (req, res) => {
//     try {
//         const tokenFileContent = JSON.parse( (await readFile('tokens.json')).toString() );
//         const newAccesToken = await contaazul.auth.refreshToken(tokenFileContent.refresh_token);
        
//         await writeFile('tokens.json', JSON.stringify(newAccesToken), 'utf8');

//         const salesList = await contaazul.services.sales.list(newAccesToken.access_token);
//         const servicesList = await contaazul.services.services.list(newAccesToken.access_token);        
//         const saleCreated = await contaazul.services.sales.create(
//             newAccesToken.access_token,
//             {
//                 "number": 12,
//                 "emission": new Date(),
//                 "status": "COMMITTED",
//                 "customer_id": "44dfb5a1-6766-4868-acc1-beeefd6a67c2",
//                 "services": [
//                   {
//                     "description": "Intercâmbio de Bitcoin",
//                     "quantity": 2,
//                     "service_id": "e33d2ff9-3e37-40c3-a946-91f61106609a",
//                     "value": 1
//                   }
//                 ],
//                 "payment": {
//                   "type": "CASH",
//                   "installments": [
//                     {
//                       "number": 1,
//                       "value": 2,
//                       "due_date": new Date(),
//                       "status": "ACQUITTED"
//                     }
//                   ]
//                 },
//                 "notes": "Sale made by noon"
//               }
//         )        
//         console.dir(saleCreated, {depth: null, colors: true});
//         console.dir(servicesList);
//         res.send(servicesList);
//     } catch (err) {
//         console.log(err);
//         res.send(err);
//     }
// });

// app.listen(3000, () => {
//     console.log('Listening port 3000');
// });
