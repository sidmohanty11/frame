import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

export class Collection<T, P> {
  models: T[] = [];
  events: Eventing = new Eventing();
  constructor(
    public rootUrl: string,
    public deserialize: (json: P) => T,
    ) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl)
      .then((res: AxiosResponse) => {
        res.data.forEach((i: P) => {
          this.models.push(this.deserialize(i));
        });
        this.trigger('change');
      });
  }
}
