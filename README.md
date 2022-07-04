# React-List-NFTS

React-List-NFTS is a npm library for listing all ``NFTS`` of any ``Etherscan`` contract using contract ``address`` and ``Contract ABI``.

## Installation

Use the package manager [npm](https://npmjs.com) to install react-list-nfts.



```bash
npm install react-list-nfts
```

## Requirements
* React or Next js
* Metamask 


## Usage

```React
import {ReactListNfts} from 'react-list-nfts'
import 'react-list-nfts/index.css' //or
import 'react-list-nfts/dist/index.css'
```

## Example
"nftContractABI" can be fetched from etherscan

```React
import {ReactListNfts} from 'react-list-nfts'

const nftContractABI = {...} // contract abi related to that address

const ListAllNfts = ()=>{
 const [contractAddress] = useState('your_contract_address')

return (
<>
<h1>All NFTS</h1>

<ReactListNfts 
    nftContractABI={nftContractABI} 
    itemsPerPage={5} 
    contractAddress={contractAddress}
 />
</>
)
}

```
### Note
Feel Free to report issue/feedback on github
