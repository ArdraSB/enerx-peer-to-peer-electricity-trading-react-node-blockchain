const readline = require('readline-sync');
const {ethers} = require('ethers');
const {createOffer,listOffers}=require('./contract_calls')
const provider = new ethers.JsonRpcProvider('http://localhost:7545');


const contractAddress = '0x82Ea955F2638F951F72BB5963a81BA81b216279e';

// ABI of the contract
const abi =[
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "quantity",
        "type": "int256"
      }
    ],
    "name": "EnergyTraded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "MoneySent",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "energyTraded",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "offerExist",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "quantity",
        "type": "int256"
      },
      {
        "internalType": "string",
        "name": "price",
        "type": "string"
      }
    ],
    "name": "createOffer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "get",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getAllOffers",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "public_address",
            "type": "address"
          },
          {
            "internalType": "int256",
            "name": "quantity",
            "type": "int256"
          },
          {
            "internalType": "string",
            "name": "price",
            "type": "string"
          }
        ],
        "internalType": "struct Enerx.Offer[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "seller",
        "type": "address"
      },
      {
        "internalType": "int256",
        "name": "quantity",
        "type": "int256"
      }
    ],
    "name": "sendMoney",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  }
];
const account1="0x6b3b88ba38364666aac2336913c0bc120dc2139cd0aca1b10b178e081bd40d2e"
const account2="0xde364ac3e2a138c07c60ac867a144a54c7bc514708c991e4f2658db7b4f84176"
const privateKey = account2;
const signer = new ethers.Wallet(privateKey, provider);
// Create a contract instance
const contract = new ethers.Contract( contractAddress,abi,signer);
async function transferFunds() {
    try {
        do{
          console.log("1.Place Bid\n2.List Bids\n3.Check Energy Balance\n4.Add wallet for first time users\n5.exit\n")
          const option=readline.question("choose:");
          if (option==1){
            await createOffer(contract);
          }
          else if(option==2){
            await listOffers(contract)
            
          }
          else if(option==3){
            const balance = await contract.getBalance();
            console.log('Balance:', parseInt(balance),' units');
          }
          else if(option==4){
            const tx = await contract.register();
            console.log(tx);
          }
          else{
            break;
          }
          
        }while(true)
        // const receiver="0xA68E1051c53Fdcd02fca6bB233AE1C657e7dcE9A";
        // const amount="10";
        // const tx = await contract.sendMoney(receiver, { value: ethers.parseEther(amount) });
        // console.log(tx);
        // const number = await contract.getNumber().call();
        // console.log('Number:', number)
    } catch (error) {
        console.error('Error during transaction:', error);
    }
}

transferFunds();