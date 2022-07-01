
require('dotenv').config( { path: './.env' } )

const prompt = require('prompt-sync')();


console.log('\n-----------------------------------------\n');



const MY_ADRESS = '0xCd54A50EFEb41211fe05C443a8B70113220752f3'
const RCV_ADRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'

console.log('My adress:            ', MY_ADRESS)
console.log('Reciever adress:      ', RCV_ADRESS +'\n')


let ETH_SEND_VAL = prompt('Input ETH value to send: ');
ETH_SEND_VAL = parseFloat(ETH_SEND_VAL) * 1000000000000000000



console.log('\nYou are sending ' + ETH_SEND_VAL/1000000000000000000 + ' of ETH'+ '\nFROM: ' + MY_ADRESS + '\nTO:   ' + RCV_ADRESS + '\n')
const userconfirm = prompt('Are you sure?: ');
if (userconfirm === 'y')
{
    console.log('\n Sending ' + ETH_SEND_VAL/1000000000000000000 + ' ETH to: ' + RCV_ADRESS)
    SendTX(MY_ADRESS, RCV_ADRESS, ETH_SEND_VAL)
}
else
{
    console.log('\nNoob')
    return 1
}



async function SendTX(MY_ADRESS, RCV_ADRESS, ETH_SEND_VAL) 
{
  const myAddress = MY_ADRESS
  const rcvAdress = RCV_ADRESS
  const ethSendVal = ETH_SEND_VAL
  require('dotenv').config();

  const { API_URL, PRIVATE_KEY } = process.env;
  let Web3 = require('web3')
  let web3 = new Web3(API_URL)
      
  const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

  const transaction = {
    'to': rcvAdress, // RECIVER ADRESS TO RETURN ETH
    'value': ethSendVal,
    'gas': 129671, 
    'maxFeePerGas': 1000000108,
    'maxPriorityFeePerGas': 1000000106,
    'nonce': nonce,
    // optional data field to send message or execute smart contract
  };
  
  const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
  
  web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
  if (!error) 
  {
    console.log("The hash of your transaction is: ", hash, "\n Check etherscan to view the status of your transaction!");
  } else 
  {
    console.log("Something went wrong while submitting your transaction:", error)
  }

  web3.eth.getTransaction(hash, function(error, result)
  {
    if (!error)
    {
      const entries = Object.entries(result);      //  [["width", 300], ["height", 200], ["title", "Menu"]]
      entries.forEach(([key, value]) => {console.log('\x1b[32m', `${key}: ${value}`, '\x1b[0m')})
    }
    else  {return error}
  })

  });
}
