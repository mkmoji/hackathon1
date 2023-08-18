import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



function EventHis () {
  const [address, setAddress] = useState('0x8FE051AFE0Ad1B8168CAB2F4832E1337dbd84d82');
   
  return (
    <body class="body40">
    <h1 class="h41">イベント履歴</h1>
    <p class="p41">Current Account: {address}</p>
    <Link to="/">
            <button class="button4">戻る</button>
    </Link>
</body>
  );
};

export default EventHis;