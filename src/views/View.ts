import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K> {
  constructor(public parent: Element, public model: T) {
    this.bindEffect();
  }

  abstract eventsMap(): { [key: string]: () => void };
  abstract template(): string;

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

  render(): void {
    this.parent.innerHTML = '';

    const templateEl = document.createElement('template');
    templateEl.innerHTML = this.template();

    this.bind(templateEl.content);

    this.parent.append(templateEl.content);
  }
}