import { utils } from "ethers";
import 'dotenv/config'

const mnemonic = process.env.MNEMONIC
const password = process.env.PASSWORD
const target = process.env.TARGET

const addPassword = true
let hdNode
if(addPassword){
  hdNode = utils.HDNode.fromMnemonic(mnemonic, password);
}else{
  hdNode = utils.HDNode.fromMnemonic(mnemonic); // maybe not need password
}

function tryPath(path) {
  const account = hdNode.derivePath(path)
  console.log(account.address)
  if (account.address == target) {
    console.log(`path found ${path}`)
    return 1
  }
  return 0
}

const pathIterations = 5

for (let k = 0; k < pathIterations; k++) {
  let path = `m/44'/60'/${k}'`
  let res = tryPath(path);
  if (res === 1) { process.exit(0); }
  for (let i = 0; i < pathIterations; i++) {
    path = `m/44'/60'/${k}'/${i}`;
    res = tryPath(path);
    if (res === 1) { process.exit(0); }
    for (let j = 0; j < pathIterations; j++) {
      path = `m/44'/60'/${k}'/${i}/${j}`;
      res = tryPath(path);
      if (res === 1) { process.exit(0); }
    }
  }
}

console.log('no path found')