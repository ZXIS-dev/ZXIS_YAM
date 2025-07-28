const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

{/*-----jwt 인증(미들웨어)->보안을 위함-----*/}
function authenticateToken(req, res, next) {
  //요청 헤더에서 Authorization 값 추출
  const authHeader = req.headers['authorization'];
  //"Bearer <토큰값>"에서 토큰 부분만 추출
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({success: false, message: '토큰이 없습니다.'});
  }
  //jwt 검증
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({success: false, message: '유효하지 않은 토큰입니다.'});
    }
    //검증 성공 시 payload 정보를 req.user에 저장
    req.user = decoded;
    next();
  });
}

module.exports = { authenticateToken };
