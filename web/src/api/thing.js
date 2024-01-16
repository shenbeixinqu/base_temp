import request from "@/utils/request";

export function getList(params) {
  return request({
    url: "/back/thing_manage",
    method: "GET",
    params,
  });
}

export function getEdit(data) {
  return request({
    url: "/back/thing_edit",
    method: "POST",
    data,
  });
}

export function getDel(data) {
  return request({
    url: "/back/thing_del",
    method: "POST",
    data,
  });
}
