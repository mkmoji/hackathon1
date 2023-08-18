import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import MyContract from './build/SightseeingToken.json';
//import classes from './MyPage.css';


const web3 = new Web3(window.ethereum);
const contractABI = MyContract.abi;
const contractAddress = '0xfB56e10b48C17F5D3104323bc33EC3eF9028D0D1';
const instance = new web3.eth.Contract(contractABI, contractAddress);


function MyPage () {
    const [account, setAccount] = useState('0x8FE051AFE0Ad1B8168CAB2F4832E1337dbd84d82');
    const [token, setToken] = useState(124697);
    const [ETH, setEth] = useState('');

    useEffect(() => {
        instance.methods.balanceOf(account).call().then((resolve) =>{
           setToken(resolve);
        }).catch((err) => {
            console.log(err);
        });
    }, [account]);

    useEffect(() => {
        web3.eth.getBalance(account).then((resolve) =>{
           const balanceEth = web3.utils.fromWei(resolve, 'ether');
           setEth(balanceEth);
        });
    }, [account]);
   
  return (
    <body class="body0">
    <div0 class="container0">
        <h0 class='mura'>WEB3村 </h0>
        <h0>My page</h0>

        <div0>
            <p></p>
            <p class="p01">Current Account: {account}</p>
            <p class="p03">手持ちトークン:{token}</p>
            <p class="p04">手持ちETH:{ETH}</p>
        </div0>
        <div0>
            <Link to="/eventregister">
                <button class="button0">イベント登録ページ</button>
            </Link>
            <Link to="/eventhistory">
                <button class="button0">イベント履歴</button>
            </Link>
            <Link to="/goodsregister">
                <button class="button0">景品登録</button>
            </Link>
            <Link to="/buy">
                <button class="button0">トークン購入</button>
            </Link>
            <Link to="/listen">
                <button class="button0">景品申請状況</button>
            </Link>
        </div0>
    </div0>
  </body>
  );
};

export default MyPage;