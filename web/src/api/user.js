import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/back/login",
    method: "POST",
    data,
  });
}

export function register(data) {
  return request({
    url: "/back/register",
    method: "POST",
    data,
  });
}

export function logout(data) {
  return request({
    url: "/back/logout",
    method: "POST",
    data,
  });
}

export function getRoleInfo(params) {
  return request({
    url: "/back/userInfo",
    method: "get",
    params,
  });
}
