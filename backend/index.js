const express = require('express'); //express.js 사용할거임
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt'); //비밀번호 해싱
const jwt = require('jsonwebtoken'); //jwt 라이브러리
require('dotenv').config(); //환경변수
app.use(express.json()); //클라이언트에서 보내는 json 데이터를 변환함
app.use(cors()); //백, 프론트의 출처가 다를 때 요청 가능하게 함

const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
//환경변수로 관리
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
