const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../middleware/authMiddleware');


const userCarts = {};
//장바구니 항목을 고유하게 식별하도록 키 생성(id + 선택된 토핑)
const generateKey = (item) => `${item.id}-${item.toppings.slice().sort().join(',')}`;

{/*----장바구니 조회----*/}
router.get('/getCart', authenticateToken, (req, res) => {
    const userId = req.user.id; //jwt에서 추출
    const cart = userCarts[userId] || []; //해당 유저의 장바구니
    res.json({success: true, cart});
});

{/*----장바구니 항목 추가----*/}
router.post('/addCart', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const item = req.body;

    if (!item || !item.id || !item.price || !item.quantity || !Array.isArray(item.toppings)) {
        return res.status(400).json({success: false, message: '잘못된 요청입니다.'});
    }
    //해당 유저의 장바구니가 없으면 배열 초기화
    if (!userCarts[userId]) {
        userCarts[userId] = [];
    }
    //장바구니에 동일한 항목이 있는지 확인
    const key = generateKey(item);
    const exist = userCarts[userId].find(i => generateKey(i) === key);
    //동일한 항목이 있으면 수량만 증가, 아니면 새로 추가
    if (exist) {
        exist.quantity += item.quantity;
    } else {
        userCarts[userId].push(item);
    }
    console.log(`${userId}의 서버 장바구니 항목: `, userCarts[userId]);
    res.json({success: true, message: '장바구니 항목 추가 완료', cart: userCarts[userId]});
});

{/*----장바구니 항목 삭제----*/}
router.delete('/deleteItem/:id', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const id = req.params.id; //url에서 받아온 음식 id
    const {toppings} = req.body;

    if(!Array.isArray(toppings)) {
        return res.status(400).json({success: false, message : '토핑은 배열 형태여야 합니다.'});
    }
    //jeno123-김가루 추가 이런식으로 키를 생성함
    const key = `${id}-${toppings.slice().sort().join(',')}`;
    userCarts[userId] = (userCarts[userId] || []).filter(
        item => generateKey(item) !== key
    );
    
    console.log(`${userId}의 항목 삭제 후 서버 장바구니 항목: `, userCarts[userId]);
    res.json({success: true, message: '선택 항목 삭제 완료', cart: userCarts[userId]});
});

{/*----장바구니 전체 삭제----*/}
router.delete('/deleteCart', authenticateToken, (req, res) => {
    const userId = req.user.id;
    if(!userId) {
        res.json({success: false, message: '오류가 발생했습니다.'})
    }
    userCarts[userId] = [];
    console.log(`${userId}의 전체 삭제 후 장바구니 상태: `, userCarts[userId])
    res.json({success: true, message: '장바구니 초기화 완료'})
});

module.exports = router;