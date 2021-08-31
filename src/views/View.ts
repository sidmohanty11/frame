import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};
  constructor(public parent: Element, public model: T) {
    this.bindEffect();
  }

  abstract template(): string;

  regionsMap(): { [key: string]: string } {
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindEffect(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  bind(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      })
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = '';

    const templateEl = document.createElement('template');
    templateEl.innerHTML = this.template();

    this.bind(templateEl.content);
    this.mapRegions(templateEl.content);

    this.onRender();
    this.parent.append(templateEl.content);
  }
}