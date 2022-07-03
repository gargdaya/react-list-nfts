import './styles.css';
import { FC, useCallback, useEffect, useState } from 'react';
import Web3 from 'web3/dist/web3.min.js';
import NftCard from './nftcard';

declare global {
  interface Window {
    ethereum?: any;
  }
}
interface ReactListNftsProps{
  nftContractABI:any,
  itemsPerPage:number,
  contractAddress?:string
}
export const ReactListNfts:FC<ReactListNftsProps> = ({
  nftContractABI,
  itemsPerPage = 10,
  contractAddress = '0xF9e631014Ce1759d9B76Ce074D496c3da633BA12',
}) => {
  itemsPerPage = parseInt(`${itemsPerPage}`)
  const [pageNo, setPageNo] = useState(1);
  const [nftData, setNftData] = useState([]) as any;
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);


  const getData = useCallback(
    async (w: any, page: any) => {
      setIsLoading(true);
      const data = await w.methods.totalSupply().call();

      setTotalData(parseInt(data));

      const index = (page - 1) * itemsPerPage;
      const limit = page * itemsPerPage;
      const allData: any[] = [];
      if (parseInt(data) < limit) {
        return;
      }

      for (let i = index; i < limit; i++) {
        const token = await w.methods.tokenByIndex(i).call();
        const tokenMetaDataURI = await w.methods.tokenURI(token).call();
        const tokenMetaData = await (
          await fetch(
            tokenMetaDataURI.includes('ipfs://')
              ? `https://ipfs.io/ipfs/${tokenMetaDataURI.split('ipfs://')[1]}`
              : tokenMetaDataURI
          )
        ).json();
        if (tokenMetaData.image?.includes('ipfs://')) {
          tokenMetaData.image = `https://ipfs.io/ipfs/${
            tokenMetaData.image.split('ipfs://')[1]
          }`;
        }
        allData.push(tokenMetaData);
      }
      setIsLoading(false);
      setNftData(allData);
    },
    [itemsPerPage]
  );

  useEffect(() => {

    window.ethereum?.on('chainChanged', (_chainId: any) =>
      window.location.reload()
    );
    if (window.ethereum) {
      (async () => {
        const chainId = await window.ethereum.request({
          method: 'eth_chainId',
        });
        
        if (chainId !== '0x1') {
          alert("Change Metamask network to Mainnet")
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x1' }],
            });
          } catch (error:any) {
            console.log(error.message);
            
          }
          
        }
      })();
    } else {
      alert('Please Install Metamask');
    }
    (async () => {
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });
      if (chainId === '0x1') {
        const web3 = new Web3(window.ethereum);
        const w = new web3.eth.Contract(nftContractABI, contractAddress);
        getData(w, pageNo);
      }
    })();
  }, [contractAddress, getData, nftContractABI, pageNo]);

  return (
    <div className="min-h-screen">
      {totalData ? (
        <div className="bg-gradient-to-r from-slate-800 via-zinc-700 to-rose-900 py-4">
          <div className="grid grid-cols-4 grid-flow-row max-w-7xl mx-auto">
            {isLoading ? (
              <div className="animate-ping  text-white border-2 mx-auto my-3">
                Loading...
              </div>
            ) : (
              nftData.map((el: any, index: any) => (
                <NftCard nftItem={el} key={index} />
              ))
            )}
          </div>
          <div className="bg-gray-300 mb-4 max-w-7xl mx-auto flex md:justify-center justify-between items-center p-4">
            <div className="flex-auto flex items-center justify-between">
              <div>
                <p className="text-sm text-black">
                  Showing{' '}
                  <span className="font-medium">
                    {(pageNo - 1) * itemsPerPage + 1}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">{pageNo * itemsPerPage}</span>{' '}
                  of <span className="font-medium">{totalData}</span> results
                </p>
              </div>
            </div>
            <div className="flex-auto flex justify-end space-x-1">
              <div
                onClick={() => (pageNo > 1 ? setPageNo(pageNo - 1) : '')}
                className="relative inline-flex cursor-pointer items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </div>
              <div className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                {pageNo}
              </div>
              <div
                onClick={() =>
                  Math.ceil(totalData / itemsPerPage) !== pageNo
                    ? setPageNo(pageNo + 1)
                    : ''
                }
                className="ml-3 relative inline-flex cursor-pointer items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

// export default ReactListNfts;
