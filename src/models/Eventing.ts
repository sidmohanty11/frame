export type CallbackFn = () => void

export class Eventing {
  events: { [key:string]: CallbackFn[] } = {};
  
  on = (event: string, callback: CallbackFn) => {
    const handlers = this.events[event] || [];
    handlers.push(callback);
    this.events[event] = handlers;
  }
  
  trigger = (event: string): void => {
    const handlers = this.events[event];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach(callback => {
      callback();
    });
  }
}