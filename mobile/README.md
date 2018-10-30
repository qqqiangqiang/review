## 移动端布局、适配相关
### 分辨率
#### 像素
- 每一个像素点都是由红绿蓝组成的一个小块
- 一个像素需要rgb三种颜色不同亮度的配合才能显示出其他颜色
#### 概念
- iphone4 960*640像素，就是横向有640像素，纵向有960像素
- 安卓厂商常说的1080 * 1920，就是横向有1080像素，纵向有1920像素

---

### 逻辑像素与物理像素
#### 概念
- 物理像素：屏幕这块物理材料上，横向和纵向分别有多少个像素
- 逻辑像素：程序认为屏幕上横向和纵向有多少个像素点
#### 屏幕密度（PPI）
屏幕密度是指一个设备表面上存在的像素数量，它通常以没英寸有多少像素来计算
#### 屏幕倍率
- iphone3GS：一倍屏，程序上的1像素等于物理屏幕上的1像素，因此图片的一个像素需要一个物理像素展示
- iphone4：二倍屏，程序上的1像素等于物理屏幕上的1像素，因此图片的一个像素需要两个物理像素展示，这也就是@2x图的原因
- iphone7plus：三倍屏，程序上的1像素等于物理屏幕上的3像素，因此图片的一个像素需要三个物理像素展示，这也就是@3x图的原因
``通过window.devicePixelRatio获取屏幕的倍率``

---

### 视口
> 在没有viewport的meta标签进行移动端适配的时候，为了能够让PC端网页展示在移动端下不出现先水平滚动条，为了解决这个问题，手机会把viewport值默认认为980px，即页面宽度默认为980px
#### 三种视口
- layout viewport ，官方所说的viewport，即100%的宽度有多个像素。``document.documentElement.clientWidth``
- visual viewport ，代表浏览器可视区域的大小，缩放会改变可视区域。``window.innerWidth``
- idea viewport ，最理想情况下的视口，是meta标签中的device-width指定的宽度。``window.screen.widht``
#### viewport标签
> <meta name="viewport" content="width=device-width, initial-scale = 1, maximum-scale= 1, minimum-scale=1, user-scale=no">

- ``width=device-width``，设置视口的宽度等于设备的宽度
- ``initial-scale``，设置页面的初始缩放比例
- ``minimum-scale``，允许用户的最小缩放值
- ``maximum-scale``，允许用户的最大缩放值
- ``user-scale``，是否允许用户缩放

--- 

### 移动端布局方案
#### postCss
- 他可以被理解为一个平台，可以让一些插件在上面跑
- 他提供了一个解析器，可以将css解析成抽象语法树，类似于babel核心库``babel-core``
- 通过这个平台，我们能够开发一些插件，来处理css.热门插件如autoprefixer
#### vw和vh视口单位实现自适应
根据css3规范，视口单位主要包括以下4个：
- vw：1vw等于视口宽度的1%
- vh：1vh等于视口高度的1%
- vmin：选取vw和vh中最小的那个
- vmax：选取vw和vh中最大的那个

#### rem实现移动端布局
<a href='https://github.com/amfe/lib-flexible'>flexible</a>

- 在页面中引入flexible脚本，通过该脚本可以实现针对不同尺寸屏幕设置不同根font-size的作用，一般情况下，font-size = window.screen.width / 10
##### rem -> px
为了减轻开发者的计算工作，我们可以引入另一个库``px2rem``来实现px->rem的转换工作
```javascript```
require('postcss-px2rem')({remUnit: 37.5})
```
其中会以remUnit变量作为基准计算rem，例如我们设置某元素的宽度为100px，经改插件转译后的宽度则为 (100 / 37.5)rem