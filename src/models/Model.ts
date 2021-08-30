import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}

interface Sync<T> {
  fetch(id: number | string): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(event: string, callback: () => void): void;
  trigger(event: string): void;
}

interface HasId {
  id?: number | string;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;

  trigger = this.events.trigger;

  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');

    if (typeof id === 'number' || typeof id === 'string') {
      this.sync.fetch(id).then((res: AxiosResponse): void => {
        this.set(res.data);
      });
    } else {
      throw new Error('cannot fetch without id');
    }
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
    .then((res: AxiosResponse): void => {
      this.trigger('save');
    })
    .catch(() => {
      this.trigger('error');
    });
  }
}
