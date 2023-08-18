import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import MyContract from './build/SightseeingToken.json';
//import './EventPage.css';

const web3 = new Web3(window.ethereum);
const contractABI = MyContract.abi;
const contractAddress = '0xfB56e10b48C17F5D3104323bc33EC3eF9028D0D1';
const instance = new web3.eth.Contract(contractABI, contractAddress);


function EventPage () {
  const [address, setAddress] = useState('0x8FE051AFE0Ad1B8168CAB2F4832E1337dbd84d82');
  const [eventName, setEve] = useState('');
  const [reward, setRew] = useState('');
  const [participants, setPart] = useState([]);
  const [eventId, setEventID] = useState('');
  const [description, setVal] = useState('')

  const registerEve = ((e) => {
    instance.methods.Register_Event(parseInt(reward,10)).send({from:address}).then((resolve) => {
        alert("イベント登録が完了しました");
    }).catch((err) => {
        alert("入力が不正");
    });
});
const provide = ((e) => {
  instance.methods.provide_reward(Number(eventId), participants).send({from:address}).then((resolve) => {
      alert("トークン配布が完了しました");
  }).catch(() => {
      alert("入力が不正");
  });
});
   
  return (
<body class="body11">
    <div class="div11">
    <h1 class="h11">イベント登録ページ</h1>
    </div>
    <p>Current Account: {address}</p>
    <div class="div11">
        <h3 class="h13">イベントの登録</h3>               
        <input type="text" id="task-input" placeholder="イベントの名前" value={eventName} onChange={(e)=>{setEve(e.target.value);}}/>
        <input type="number" id="task-input" placeholder="報酬" value={reward} onChange={(e)=>{setRew(e.target.value);}}/>
        <input type="text" class="text-box11" placeholder="ここに詳細情報を入力" />
        <button class="button11" type="button" onClick={registerEve}>追加</button>      
    </div>
    <div class="div11">
        <h3 class="h13">トークン配布</h3>
        <input type='text' id='provision' placeholder='イベント番号' value={eventId} onChange={(e) => {setEventID(e.target.value);}}/>
        <input type='text' id='provision' placeholder='アドレス'value={participants} onChange={(e) => {setPart(e.target.value.split(','));}}/>
 
        <button class="button11"  type="button" onClick={provide}>追加</button>
    </div>
    <div class="div11">
      <p class="p11">開催中のイベント一覧</p>
    </div>

    <div class="div11">
        <table class="table11">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>名前</th>
                    <th>報酬(SSC)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>11</td>
                    <td>祭り運営</td>
                    <td>3</td>
                </tr>
                <tr>
                    <td>12</td>
                    <td>地域清掃</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>15</td>
                    <td>ボランティア</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>17</td>
                    <td>農作業補助</td>
                    <td>7</td>
                </tr>
            </tbody>
        </table>
    </div>
    <Link to="/">
        <button class="button11" >戻る</button>
</Link>
  </body>
  );
};

export default EventPage;