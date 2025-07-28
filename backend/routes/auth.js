const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); //비밀번호 해싱
const jwt = require('jsonwebtoken'); //jwt 라이브러리
const { authenticateToken } = require('../middleware/authMiddleware');
const users = require('../models/user');

//환경변수
const JWT_SECRET = process.env.JWT_SECRET;

{/*-----회원가입 api-----*/}
router.post('/signup', async (req, res) => {
  try {
    const {id, pw, name, phone} = req.body; //클라이언트가 보낸 json 본문을 변수에 저장
    
    //비밀번호 해싱
    const hashedpw = await bcrypt.hash(pw, 10);
    //users에 사용자 추가
    users.push({id, pw: hashedpw, name, phone});
    console.log('회원 목록: ', users); //테스트용
    res.json({success: true, message: '로그인 페이지로 이동합니다.'});
  } catch (err) {
      console.error(err);
      res.status(500).json({success: false, message: '오류가 발생했습니다.'});
  }
});

{/*------- 로그인 api ------- */}
router.post('/login', async (req, res) => {
  try {
    const {id, pw} = req.body;
    
    if (!id || !pw) {
      return res.status(400).json({success: false, message: '아이디와 비밀번호를 입력해주세요.'});
    }
    //사용자 id 찾기(없으면 false)
    const user = users.find(u=> u.id === id);
    if (!user) {
      return res.status(401).json({success: false, message: '존재하지 않는 아이디입니다.'});
    }

    const isMatch = await bcrypt.compare(pw, user.pw);
    if (!isMatch) {
      return res.status(401).json({success: false, message: '비밀번호가 일치하지 않습니다.'});
    }

    //jwt 토큰 생성
    const token = jwt.sign(
      {id: user.id, name: user.name}, //payload
      JWT_SECRET,
      {expiresIn: '1h'} //유효기간
    )
    //로그인 성공 시 이름, 전화번호, 토큰도 같이 반환함
    res.json({
      success: true, 
      message: '로그인 성공',
      token,
      name: user.name, 
      phone: user.phone, 
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({success: false, message: '오류가 발생했습니다.'});
  }
});

{/*-----중복체크 api-----*/}
router.post('/checked-id', (req, res) => {
  const {id} = req.body;
  if (!id) {
    return res.status(400).json({success: false, message: '아이디를 입력해주세요.'});
  }
  //id가 존재하는지 확인
  const exists = users.some(u=> u.id === id); //true or false를 반환
  if (exists) {
    return res.json({success: true, exists: true, message: '이미 사용 중인 아이디입니다.'});
  } else {
    return res.json({success: true, exists: false, message: '사용 가능한 아이디입니다!'});
  };
})

{/* ----토큰 인증 테스트용 프로필 api----- */}
router.get('/profile', authenticateToken, (req, res) => {
  res.json ({
    success: true,
    message: '프로필 조회 성공',
    user: {
      id: req.user.id,
      name: req.user.name,
    }
  })
})

module.exports = router;
