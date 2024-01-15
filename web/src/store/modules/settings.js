import { isJson } from "@/utils/validate";
import { collapse as _collapse, layout, showTabs, fixedHeader } from "@/config";

const defaultTheme = {
  layout,
  fixedHeader,
  showTabs,
};

const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  if (isJson(value)) {
    return JSON.parse(value);
  } else {
    return false;
  }
};

const { collapse } = getLocalStorage("collapse");

const state = () => ({
  theme: getLocalStorage("theme") || { ...defaultTheme },
  collapse: collapse || _collapse,
});

const getters = {
  theme: (state) => state.theme,
  collapse: (state) => state.collapse,
};

const mutations = {
  openSideBar(state) {
    state.collapse = false;
  },
  foldSideBar(state) {
    state.collapse = true;
  },
  toggleCollapse(state) {
    state.collapse = !state.collapse;
    localStorage.setItem("collapse", `{"collapse": ${state.collapse}}`);
  },
};

const actions = {
  foldSideBar({ commit }) {
    commit("foldSideBar");
  },
  toggleCollapse({ commit }) {
    commit("toggleCollapse");
  },
};

export default { state, getters, mutations, actions };
