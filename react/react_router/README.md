## 路由

### 基本
> cnpm install react-router-dom 
不同的路径渲染不同的组件
有两种实现方式
- HashRouter:利用hash实现路由切换
- BrowserRouter:实现h5 Api实现路由的切换

### 跑通路由
```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Route} from 'react-router-dom';
// Router 路由容器
// Route  代表一条的路由规则
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
ReactDOM.render(
    <Router>
        <div>
          <Route path="/" component={Home} />
          <Route path="/user" component={User} />
          <Route path="/profile" component={Profile}/>
        </div>
    </Router>
,document.getElementById('root'));

// home.js
import React,{Component} from 'react';
export default class Home extends Component{
    render() {
        return (
            <div>Home</div>
        )
    }
}

// profile.js
import React,{Component} from 'react';
export default class Profile extends Component{
    render() {
        return (
            <div>Profile</div>
        )
    }
}
```
