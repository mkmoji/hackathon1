import './App.css';
import React, { useEffect,useState } from 'react';
import { BrowserRouter, Router, Switch, Route, Routes} from 'react-router-dom';
import Web3 from 'web3';
import MyContract from './build/SightseeingToken.json';
import MPage from './MyPage.js';
import EPage from './EventPage.js';
import EHis from './EventHis.js';
import BPage from './BuyPage.js';
import GPage from './GoodsPage.js';
import LPage from './ListenPage';

const web3 = new Web3(window.ethereum);
const contractABI = MyContract.abi;
const networkId = await web3.eth.net.getId();
const contractAddress = '0xfB56e10b48C17F5D3104323bc33EC3eF9028D0D1';
const instance = new web3.eth.Contract(contractABI, contractAddress);

function App() {
  const [Account, setAccount] = useState('0x8FE051AFE0Ad1B8168CAB2F4832E1337dbd84d82');



  //アカウントの所属判定
  useEffect(() => {
    const GetA = () => {
      web3.eth.getAccounts().then((resolve) => {
        setAccount(resolve[0]);
      }).catch((err) => {
        setAccount('');
      });
    }
    GetA();
  });

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
        setAccount(accounts[0]);
    };
  // アカウントの変更を購読
  window.ethereum.on('accountsChanged', handleAccountsChanged);
  return () => {
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    }}
  }, []);
  
  return (
    <div>
      {Account ? (<BrowserRouter>
        <Routes>
          <Route path="/" element={<MPage />} />
            <Route path="/eventregister" element={<EPage />} />
            <Route path="/eventhistory" element={<EHis/>} />
            <Route path="/goodsregister" element={<GPage/>} />
            <Route path="/buy" element={<BPage/>} /> 
            <Route path="/listen" element={<LPage/>} />
        </Routes>
      </BrowserRouter>):(<p>Metamaskを接続してください</p>)}
    </div>
  );
}

export default App;
