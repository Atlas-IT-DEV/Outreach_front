import PageStore from "./page_store.js";
import MainStore from "./main_store.js";
export default class RootStore {
  pageStore = new PageStore();
  mainStore = new MainStore();
}
