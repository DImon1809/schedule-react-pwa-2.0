import { makeAutoObservable, runInAction } from "mobx";

class AlertStore {
  public isOpenAlert: boolean = false;
  public alertText: string = "Внимание!";

  constructor() {
    makeAutoObservable(this);
  }

  openSetText(isOpen: boolean, text: string) {
    runInAction(() => {
      this.isOpenAlert = isOpen;
      this.alertText = text;
    });
  }
}

export default new AlertStore();
