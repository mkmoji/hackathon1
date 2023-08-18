import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import MyContract from './build/SightseeingToken.json';
//import classes from './BuyPage.css';

const web3 = new Web3(window.ethereum);
const contractABI = MyContract.abi;
const contractAddress = '0xfB56e10b48C17F5D3104323bc33EC3eF9028D0D1';
const instance = new web3.eth.Contract(contractABI, contractAddress);


function BuyPage () {
    const [ETH, setEth] = useState(0)
    const [address, setAddress] = useState('0x8FE051AFE0Ad1B8168CAB2F4832E1337dbd84d82');

    const Buy = (e) => {
        instance.methods.Buy_token(ETH).send({from:address, value:10**16*ETH/1000}).then((res) => {
            alert('購入が完了しました！');
            setEth(0);
        }).catch((err) => {
            alert('エラーが発生しました');
            setEth(0);
        })

    }
   
  return (
    <body class="body21">
     <div class="container21">
     <h1 class="h21" >トークン購入ページ</h1>
     </div>
     <div class="div21">
     <h2 class="h21">トークン購入</h2>
     <input class="input2" type="number" id="task-input" placeholder="購入トークン数を入力してください" step='1000' value={ETH} onChange={(e)=>{setEth(e.target.value);}}/>
     <button class="button2" type="button" onClick={Buy}>追加</button>  
     </div>
     <p class="p20">Current Account: {address}</p>
    <Link to="/">
        <button class="button2" >戻る</button>
    </Link>
    </body>
  );
};

export default BuyPage;