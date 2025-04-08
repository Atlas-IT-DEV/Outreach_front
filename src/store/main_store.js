import { makeAutoObservable } from "mobx";

class MainStore {
  isOpen = true;
  constructor() {
    makeAutoObservable(this);
  }
  setIsOpen = (new_is_open) => {
    this.isOpen = new_is_open;
  };
}

export default MainStore;
