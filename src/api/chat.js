import { localAxios } from "@/utils/http-commons";

const local = localAxios;

function requestAnswer(param, success, fail) {
  local.post('/chat',param).then(success);
}

export {
  requestAnswer
}