export class MenuItem {
  private title : string = '';
  private text : string;
  private url : string;
  private target : string = '_self';
  private active : boolean = false;

  /** Constructor of menu item class */
  constructor(pTitle : string, pText : string, pUrl : string, pTarget : string) {
    this.title = pTitle;
    this.text = pText;
    this.url = pUrl;
    this.target = pTarget;
  }

  getTitle() : string { return this.title; }
  setTitle(pTitle : string) : void { this.title = pTitle; }

  getText() : string { return this.text; }
  setText(pText : string) : void { this.text = pText; }

  getUrl() : string { return this.url; }
  setUrl(pUrl : string) : void { this.url = pUrl; }

  getTarget() : string { return this.target; }
  setTarget(pTarget : string) : void { this.target = pTarget; }

  isActive() : boolean { return this.active; }
  setActive(pActive : boolean) : void { this.active = pActive; }
}
