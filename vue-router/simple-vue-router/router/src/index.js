import { HashHistory } from './history/hash'
import { HTML5History } from './history/html5'
import { Watcher } from './util/watcher.js'
import { Observe } from './util/observer.js'

class Router {
  constructor(options) {
    this.base = options.base;
    this.routes = options.routes;
    this.container = options.id
    this.mode = options.mode || 'hash'
    this.history = this.mode == 'history' ? new HTML5History(this) : new HashHistory(this)
    this.initData();

  }
  push(location) {
    this.history.push(location);
  }
  replace(location) {
    this.history.replace(location);
  }
  go(n) {
    this.history.go(n);
  }
  render() {
    let i;
    if ((i = this.history.current) && (i = i.route) && (i = i.component)) {
      document.getElementById(this.container).innerHTML = i;
    }
  }
  initData() {
    Observe.call(this, this.history.current);
    new Watcher(this, this.render.bind(this));
  }
}
window.Router = Router