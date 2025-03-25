const readline=require("readline-sync")
const {ethers} = require('ethers');

async function createOffer (contract){
    amount=readline.question("amount of electricty");
    price=readline.question("price per unit");
    tx=await contract.createOffer(amount,price);
    console.log(tx);
    const user=await contract.get();
    console.log(user);
}
async function listOffers(contract){
    const tx = await contract.getAllOffers();//get Bids
    console.log("S.No\tAddress\t\t\t\t\tAmount\tPrice\n");
                tx.forEach((user, index) => {
                  console.log(`${index + 1}\t${user[0]}\t${user[1]}\t${user[2]}\n`);
                });
                console.log("1.Trade\n2.Go back\n")
                const option=readline.question("choose:");
                if (option==1){
                  option2=readline.question("choose offer number:")
                  const receiver=tx[option2-1][0];
                  const amount=tx[option2-1][1];
                  const price=tx[option2-1][2];
                  const buy=readline.question("how much")
                  console.log(receiver,price,amount)
                  const total=price*buy;
                  console.log(`are you sure need to transfer ${total}`)
                  console.log("1.Yes2.No");
                  option3=readline.question("choose");
                  if (option3==1){
                    const tx1 = await contract.sendMoney(receiver,buy, { value: ethers.parseEther(total.toString()),gasLimit: 6000000 });
                    const receipt=await tx1.wait();
                    if (receipt.status==1){
                        console.log("fund transfer successfull")
                    }else{
                        console.log("fund transfer failed")
                    }
                  }
                }
}
module.exports = { createOffer, listOffers };