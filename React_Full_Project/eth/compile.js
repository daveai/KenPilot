const path = require('path');
const fs = require('fs');
const solc = require('solc');
const invoiceManagerPath = path.resolve(__dirname,'../contracts','InvoiceManager.sol');
const source = fs.readFileSync(invoiceManagerPath, 'utf8');
module.exports = solc.compile(source,1).contracts[':InvoiceManager'];
