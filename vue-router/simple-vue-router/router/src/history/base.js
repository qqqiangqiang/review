export class Base {
  constructor(router) {
    this.router = router;
    this.current = {
      path: '/',
      query: {},
      params: {},
      name: '',
      fullPath: '/',
      route: {}
    }
  }
  /**
   * 路由转换
   * @param target 目标路径
   * @param cb 成功后的回调
   */
  transitionTo(target, cb) {
    const targetRoute = match(target, this.router.routes);
    this.confirmTransition(targetRoute, () => {
      this.current.route = targetRoute;
      this.current.name = targetRoute.name;
      this.current.path = targetRoute.path;
      this.current.query = targetRoute.query || getQuery();
      this.current.fullPath = getFullPath(this.current);
      console.log('fullPath', this.current.fullPath);
      cb && cb();
    })
  }
  /**
   * 确认跳转
   * @param route route对象
   * @param cb 回调函数
   */
  confirmTransition(route, cb) {
    // 钩子函数执行队列
    let queue = [
      this.router.beforeEach, // 全局前置
      this.current.route.beforeLeave, // 离开当前导航的钩子函数
      route.beforeEnter, // 即将进入该导航
      route.afterEnter
    ]
    // 通过step调度执行
    let i = -1;
    const step = () => {
      i++;
      if (i > queue.length) {
        cb();
      } else if (queue[i]) {
        queue[i](step);
      } else {
        step();
      }
    }
    step();
  }
}

function getFullPath ({ path, query = {}, hash = '' }, _stringifyQuery){
  const stringify = _stringifyQuery || stringifyQuery
  return (path || '/') + stringify(query) + hash
}

export function match(path, routeMap) {
  let match = {};
  // path为 '/bar' 或者是 { path: '/bar' } 的形式
  if (typeof path == 'string' || path.name == undefined) {
    for (let route of routeMap) {
      if (route.path == path || route.path == path.path) {
        match = route;
        break;
      }
    }
  } else {
    // path为 { name: 'bar', query: { name: 'bar' } } 的形式
    for (let route of routeMap) {
      if (route.name == path.name) {
        match = route
        if (path.query) {
          match.query = path.query
        }
        break;
      }
    }
  }
  return match;
}

// 获取query参数
export function getQuery() {
  const hash = location.hash
  const queryStr = hash.indexOf('?') !== -1 ? hash.substring(hash.indexOf('?') + 1) : ''
  const queryArray = queryStr ? queryStr.split('&') : []
  let query = {}
  queryArray.forEach((q) => {
    let qArray = q.split('=')
    query[qArray[0]] = qArray[1]
  })
  return query
}


function stringifyQuery (obj) {
  const res = obj ? Object.keys(obj).map(key => {
    const val = obj[key]

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return key
    }

    if (Array.isArray(val)) {
      const result = []
      val.forEach(val2 => {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(key)
        } else {
          result.push(key + '=' + val2)
        }
      })
      return result.join('&')
    }

    return key + '=' + val
  }).filter(x => x.length > 0).join('&') : null
  return res ? `?${res}` : ''
}



