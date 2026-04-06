type Callback = (...args: unknown[]) => void;

export class EventEmitter<T> {
  private subscribers: Map<T, Callback[]> = new Map();

  public on(event: T, callback: Callback) {
    if (!this.subscribers.get(event)) {
      this.subscribers.set(event, []);
    }
    this.subscribers.get(event)!.push(callback);
  }

  public emit(event: T, ...args: unknown[]) {
    const subscribers = this.subscribers.get(event) || [];
    for (const sub of subscribers) {
      sub(...args);
    }
  }
}
