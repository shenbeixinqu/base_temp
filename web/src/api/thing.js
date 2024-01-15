import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/back/thing_manage",
    method: "GET",
    data,
  });
}

export function getEdit(data) {
  return request({
    url: "/back/thing_edit",
    method: "POST",
    data,
  });
}
