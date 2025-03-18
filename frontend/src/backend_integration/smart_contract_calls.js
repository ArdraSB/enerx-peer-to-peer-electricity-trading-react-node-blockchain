import {ethers} from 'ethers'

const blockchain={
    "rpc_blockchain":"http://localhost:7545",
    "contract_address":"0x75372C507a616Ac5e7C7A54d3c0F57a167e4b706",
    "abi":[
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
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "int256",
              "name": "initialEnergy",
              "type": "int256"
            }
          ],
          "name": "UserRegistered",
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
          "name": "users",
          "outputs": [
            {
              "internalType": "address",
              "name": "public_address",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "amount",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "price",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [],
          "name": "register",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "amount",
              "type": "string"
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
              "internalType": "string",
              "name": "",
              "type": "string"
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
                  "internalType": "string",
                  "name": "amount",
                  "type": "string"
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
      ],
}
let privateKey="0x6b3b88ba38364666aac2336913c0bc120dc2139cd0aca1b10b178e081bd40d2e";
const provider = new ethers.JsonRpcProvider(blockchain.rpc_blockchain);
const signer = new ethers.Wallet(privateKey, provider);



const haveWallet=()=>{
    if (privateKey!==""){
        console.log("have wallet")
        return true;
    }
    else{
        return false;
    }
}

const listOffers=async ()=>{
    try{
        const contract = new ethers.Contract( blockchain.contract_address,blockchain.abi,provider);
        console.log("listOffers");
        const tx=await contract.getAllOffers();
        if (tx.length==0){
            alert("no offers");
            return [];
        }
        else{
            const jsonArray=[];
            tx.forEach((element)=>{
                jsonArray.push({
                    "public_address":element[0],
                    "quantity":element[1],
                    "price":element[2]
                });

            });

            return jsonArray;
        }
    }
    catch(err){
        console.log(err);
        alert(err);
    }
    
}
const createOffer=async (offer)=>{
    try{
        const signedContract = new ethers.Contract( blockchain.contract_address,blockchain.abi,signer);
        console.log(offer);
        const quantity=offer.quantity;
        const price=offer.price;
        const tx=await signedContract.createOffer(quantity,price);
        console.log(tx);
        receipt=await tx.wait();
        if(receipt.status==1){
            alert("Offer created successfully");
        }
        const user=await contract.get();
        console.log(user);
    }catch(err){
        alert(err);
    }
    
}



export {blockchain,haveWallet,listOffers,createOffer}