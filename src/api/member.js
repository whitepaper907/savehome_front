import { localAxios, loginAxios } from "@/utils/http-commons";

const local = localAxios;
const loginA = loginAxios;

function register(param, success, fail) {
  local.post('/member/join', param).then(success).catch(fail);
}

function login(param, success, fail) {
  loginA.post('/member/login', param).then(success).catch(fail);
}

function validateLogin(param, success, fail) {
  local.post('/member/check', param).then(success).catch(fail);
}

function logout(param, success, fail) {
  local.post('/member/logout', param).then(success).catch(fail);
}

function getKakaoToken(param, success, fail) {
  local.post('/member/login/kakao', param).then(success).catch(fail);
}

function getUserInfo(success, fail) {
  local.get('/member/info')
    .then(success)
    .catch(fail)
}

export {
  getUserInfo, register, login, validateLogin, logout, getKakaoToken
}