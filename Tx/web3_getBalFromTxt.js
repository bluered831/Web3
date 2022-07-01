
let Web3 = require('web3')
let url = 'https://mainnet.infura.io/v3/ef7f407772ed4f25ac9c7b2a6daaa20d'
let web3 = new Web3(url)

BalFromTxt()

function getBalance(myaddress) 
{
    let address = myaddress
    web3.eth.getBalance(address, function(err, result) 
    {
        if (err) 
        {
          console.log(err)
        } 
        else 
        {
          console.log( address + '   balance: ' +parseFloat(web3.utils.fromWei(result, 'ether')))
        }
    })
}

function BalFromTxt() 
{
    let fs = require("fs");
    let text = fs.readFileSync("adresses.txt").toString('utf-8');
    let splitted_adresses = text.split(" ")

    let adresses_count = 1000
    for(let i = 1; i < adresses_count; i++)
    {
      getBalance(splitted_adresses[i])
    }
}





  