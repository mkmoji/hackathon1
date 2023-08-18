// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SightseeingToken is ERC20, Ownable {
    //自治体に振るID（１から開始）
    uint256 ID = 1;

    //自治体のホワイトリスト
    mapping (address => uint256) GovernmentList;



    //自治体ごとに複数のイベントIDを登録
    mapping (address => mapping (uint256 => uint256)) EventList;

    //自治体ごとの景品の登録
    mapping (address => mapping (uint256 => uint256)) GoodsList;

    //自治体クラス
    struct Gov {
        address Address;
        string name;
        uint256 id;
        uint256 eventNumber;
        uint256 goodsNumber;
    }
    //自治体の配列
    Gov[] localgoverment;

    constructor() ERC20("SightseeingToken", "SST") {}

    //自治体クラスに操作を許可するための修飾子
    modifier govOnly() {
        require(GovernmentList[msg.sender] != 0, "you are not government");
        _;
    }

    //自治体の登録
    event regigov(string indexed name);
    function register_government(address _government,string calldata _name) public onlyOwner() {
        //すでに登録されている場合は二重に登録できないようにする
        require(GovernmentList[_government] == 0, "already registeresd");
        GovernmentList[_government] = ID;
        //Gov storage LocalGoverment = Gov(_government, _name, ID, 0, 0);
        localgoverment.push(Gov(_government, _name, ID, 0, 0));
        ID ++;
        _mint(_government, 1000);
        emit regigov(_name);
    }
    //トークンの購入
    function Buy_token(uint256 _amount) payable public govOnly {
        require(msg.value >= (10**16)*(_amount/1000), "1");
        require(msg.value%10**16 == 0, "2");
        uint256 Eth = msg.value/10**16;
        uint256 token_amount = Eth*1000;
        _mint(msg.sender, token_amount);
    }

    //イベント登録
    function Register_Event(uint256 _reward) public govOnly() {
        uint256 tmp = localgoverment[GovernmentList[msg.sender]-1].eventNumber;
        EventList[msg.sender][tmp] = _reward;
        localgoverment[GovernmentList[msg.sender]-1].eventNumber += 1;
    }

    //イベント報酬配布
    function reward_provision(address _participant, uint256 _reward) internal {
        transfer(_participant, _reward);
    }

    //参加者アドレスの配列を引数に入れると報酬を配布
    function provide_reward(uint256 _eventnum, address[] memory _participants) public govOnly() {
        uint256 endEvent = EventList[msg.sender][_eventnum];
        require(endEvent > 0, "event is not defined");
        for(uint i=0; i<_participants.length; i++){
            reward_provision(_participants[i], endEvent);
        }
    }

    //景品の登録
    function register_Goods(uint256 _price) public govOnly {
        uint256 tmp = localgoverment[GovernmentList[msg.sender]-1].goodsNumber;
        GoodsList[msg.sender][tmp] = _price;
        localgoverment[GovernmentList[msg.sender]-1].goodsNumber += 1;
    }

    
    //トークンと特産品交換
     event TransferEvent(address indexed from, address indexed to, uint256 goodsid, uint256 amount);
    function exchange(address _gov, uint256 _goodsid, uint256 _amount) public returns (bool) {
        uint256 perprice = GoodsList[_gov][_goodsid];
        require(perprice > 0, "goods is not defind");
        require(balanceOf(msg.sender) >= perprice*_amount, "insufficient amount of token");
        bool success = transfer(_gov, perprice*_amount);
        if (success) {
            emit TransferEvent(msg.sender, _gov, _goodsid, _amount);
        }
        return success;
    }
}