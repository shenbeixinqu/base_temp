import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/back/thing_manage",
    method: "get",
    data,
  });
}
