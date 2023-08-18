import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import MyContract from './build/SightseeingToken.json';

//import './GoodsPage.css';

const web3 = new Web3(window.ethereum);
const contractABI = MyContract.abi;
const contractAddress ='0xfB56e10b48C17F5D3104323bc33EC3eF9028D0D1';
const instance = new web3.eth.Contract(contractABI, contractAddress);


function GoodsPage () {
  const [address, setAddress] = useState('0x8FE051AFE0Ad1B8168CAB2F4832E1337dbd84d82');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const [price, setprice] = useState('');
  const [id, setid] = useState('');
  const [goodsList, setGoodsList] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(file);
      setImageUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
  };
};
  const registergoods = (e) => {
    instance.methods.register_Goods(price).send({from:address}).then((res) => {
      //DB登録処理
      setprice('');
      setSelectedImage(null);
      setName('');
    }).catch((err) => {
      alert('エラーが起きました');
    })
  }
  const rmgoods = (e) => {
    //削除処理

  }
   
  return (
    <body>
    <div class="header">
      <h1 class="h31">景品登録ページ</h1>
      <p class="p31">Current Account: {address}</p>
    </div>
    <div class="div31">
          <h2 class="h32">景品登録</h2>
          <input class="input3" type="text" id="task-input" placeholder="名前を入力" value={name} onChange={(e) => {setName(e.target.value);}}/>
          <input class="input3" type="number" id="task-input" placeholder="価格を入力" value={price} onChange={(e) => {setprice(e.target.value);}}/>
          <input class="input3" type="file" onChange={handleImageChange} accept="image/*"/>
          {imageUrl && <img src={imageUrl} alt="選択した画像" />}
          <button class="button3" type="button" onClick={registergoods}>登録</button>
          <h3 class="h33">景品削除</h3>
          <input class="input3" type="number" id="task-input" placeholder="削除する景品のID" value={id} onChange={(e) => {setid(e.target.value);}}/>
          <button class="button3" type="button" onClick={rmgoods}>削除</button>
    </div>
    <div class="div31">
      <p2 class="p32" >現在の特産品一覧</p2>
      {goodsList.map((item, index) => (
      <div key={index} class="goods-item">
        <img src={item.image} alt={item.name} />
        <h4>{item.name}</h4>
        <p>{item.price} ETH</p>
        <p>販売者: {item.seller}</p>
      </div>
    ))}
    </div>
    <div class="div31">
      <Link to="/">
              <button class="button3">戻る</button>
      </Link>
      </div>
  </body>
  );
};
export default GoodsPage;