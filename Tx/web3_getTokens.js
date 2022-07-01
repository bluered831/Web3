
let Web3 = require('web3')
let url = 'https://mainnet.infura.io/v3/ef7f407772ed4f25ac9c7b2a6daaa20d'
let web3 = new Web3(url)

TokensFromTxt()

async function getTokenBalance(someAddress)
{

  //----------------Token-Addresses--------------
  const tokenAddresses = 
  [
    ['ZRX Token  ', '0xe41d2489571d322189246dafa5ebde1f4699f498'],
    ['BNB Token  ', '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'],
    ['Binance USD', '0x4fabb145d64652a948d72533023f6e7a623c7c53'],
    ['STAKE      ', '0x0Ae055097C6d159879521C384F1D2123D1f195e6'],
    ['HEX        ', '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39'],
    
    
  ]
  //--------------------------------------------




  //----------------ABI-------------------------
  const minABI = 
  [{
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },]
  //--------------------------------------------


  
  for (let address of someAddress) 
  {
    console.log('----    Adress   -   ' + address + '\n')
    for (let tokenAddress in tokenAddresses)
    {
      const contract = new web3.eth.Contract(minABI, tokenAddresses[tokenAddress][1])
      const tokenBalance = await contract.methods.balanceOf(address).call()

      //temporary
      let tokenBalance1 = tokenBalance.toLocaleString()
      console.log(tokenAddresses[tokenAddress][0] + '  -   '+ toCommas(tokenBalance1))
      //temporary
    }
      //temporary
      function toCommas(value){  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");   }
      //temporary
    console.log('\n---------------------------------------------------------------\n\n\n')
  }
  
}



function TokensFromTxt() 
{
  let fs = require("fs");
  let text = fs.readFileSync("adresses.txt").toString('utf-8');
  let splitted_adresses = text.split(" ")

  getTokenBalance(splitted_adresses)
}



  