import { localAxios } from "@/utils/http-commons";

const local = localAxios;

function listArticle(param, success, fail) {
  local.get(`/board/list`, param).then(success).catch(fail)
}

export { listArticle }