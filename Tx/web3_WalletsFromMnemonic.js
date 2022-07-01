
let fs = require('fs');
let count = 1000
const mnemonic = 'tag volcano eight thank tide danger coast health above argue embrace heavy'

function generateAddressesFromSeed(mnemonic, count) 
{
    const HDWallet = require('ethereum-hdwallet')
    const hdwallet = HDWallet.fromMnemonic(mnemonic)
    //console.log(`0x${hdwallet.derive(`m/44'/60'/0'/0/0`).getAddress().toString('hex')}`) 

    let accounts = [];
    for (let i = 0; i < count; i++) 
    {
        let address = `0x${hdwallet.derive(`m/44'/60'/0'/0/` + i).getAddress().toString('hex')}`
        let privateKey = hdwallet.derive(`m/44'/60'/0'/0/` + i).getPrivateKey().toString('hex')
        accounts[i] = address + ';' + privateKey
    }
    console.log(accounts)

    for (let i = 0; i < count; i++) 
    {
    fs.appendFile("accountsfrommnemonic.txt", accounts[i]+ '\n', function(error){
        if(error) throw error; // если возникла ошибка
    
    })
    }
}

 generateAddressesFromSeed(mnemonic, count)

