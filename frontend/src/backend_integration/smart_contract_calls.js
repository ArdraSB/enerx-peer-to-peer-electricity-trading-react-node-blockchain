import {ethers} from 'ethers'


const accounts={
  "account1":"0x6b3b88ba38364666aac2336913c0bc120dc2139cd0aca1b10b178e081bd40d2e",//8893267671
  "account2":"0xde364ac3e2a138c07c60ac867a144a54c7bc514708c991e4f2658db7b4f84176"//7907008629

}
const blockchain={
    "rpc_blockchain":"http://localhost:7545",
    "contract_address":"0x82Ea955F2638F951F72BB5963a81BA81b216279e",
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
    ],
}
let privateKey=accounts.account1;





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
        console.log("error")
        const provider = new ethers.JsonRpcProvider(blockchain.rpc_blockchain);
        const contract = new ethers.Contract( blockchain.contract_address,blockchain.abi,provider);
        console.log("listOffers");
        const tx=await contract.getAllOffers();
        if (tx.length==0){
            alert("no offers");
            return [];
        }
        else{
            const jsonArray=[];
            tx.forEach((element,index)=>{
                jsonArray.push({
                    "public_address":element[0],
                    "quantity":parseInt(element[1]),
                    "price":element[2]
                });

            });

            return jsonArray;
        }
    
}
const createOffer = async (offer) => {
  try {
      const provider = new ethers.JsonRpcProvider(blockchain.rpc_blockchain);
      const signer = new ethers.Wallet(privateKey, provider);
      const signedContract = new ethers.Contract(blockchain.contract_address, blockchain.abi, signer);

      console.log("Offer data:", offer);

      const quantity = offer.quantity;
      const price = offer.price;

      const tx = await signedContract.createOffer(quantity, price, {
          gasLimit: 300000  // Ensure sufficient gas
      });

      console.log("Transaction sent:", tx);

      const receipt = await tx.wait();
      console.log("Transaction receipt:", receipt);

      if (receipt.status === 1) {
          alert("Offer created successfully");
      } else {
          alert("Transaction failed.");
      }

      const user = await signedContract.get();
      console.log("User data:", user);

  } catch (error) {
      console.error("Error creating offer:", error);
      alert("Failed to create offer. See console for details.");
  }
};

const sendMoney=async(receiver,buy,amount)=>{
  const total=buy*amount;
  const provider = new ethers.JsonRpcProvider(blockchain.rpc_blockchain);
      const signer = new ethers.Wallet(privateKey, provider);
      const signedContract = new ethers.Contract(blockchain.contract_address, blockchain.abi, signer);
      const tx1 = await signedContract.sendMoney(receiver,buy, { value: ethers.parseEther(total.toString()),gasLimit: 6000000 });
                    const receipt=await tx1.wait();
                    if (receipt.status==1){
                        console.log(`fund transfer of ${total} ethers successfull`)
                        alert("fund transfer successfull")
                    }else{
                        console.log("fund transfer failed")
                        alert("fund transfer failed")
                    }

}
const getBalance=async()=>{
  const provider = new ethers.JsonRpcProvider(blockchain.rpc_blockchain);
  const signer = new ethers.Wallet(privateKey, provider);
  const signedContract = new ethers.Contract(blockchain.contract_address, blockchain.abi, signer);
  const balance=await signedContract.getBalance();
  return parseInt(balance);
  // return parseInt()

}
const getMoneyBalance=async()=>{
  const provider = new ethers.JsonRpcProvider(blockchain.rpc_blockchain);
  const signer = new ethers.Wallet(privateKey, provider);
  const balance=await provider.getBalance(signer.address);
  const ether=ethers.formatEther(balance)
  console.log(ether)
  return Math.round(ether);

}


export {blockchain,haveWallet,listOffers,createOffer,sendMoney,getBalance,getMoneyBalance}