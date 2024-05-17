import { localAxios } from "@/utils/http-commons";

const local = localAxios;

function register(param, success, fail) {
  local.post('/member/register', param).then(success).catch(fail);
}

function login(param, success, fail) {
  local.post('/member/login', param).then(success).catch(fail);
}

function validateLogin(param, success, fail) {
  local.post('/member/check', param).then(success).catch(fail);
}

function logout(param, success, fail) {
  local.post('/member/logout', param).then(success).catch(fail);
}

function loginKakao(param, success, fail) {
  local.get('/member/login/kakao', param).then(success).catch(fail);
}

function getKakaoToken(param, success, fail) {
  local.post('/member/login/kakao', param).then(success).catch(fail);
}


export {
  register, login, validateLogin, logout, loginKakao, getKakaoToken
}