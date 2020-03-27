## flex
(参考链接：http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
```javascript
.box {
  display: flex
}
.box {
  display: inline-flex;
}
.box {
  display: -webkit-flex;
  display: flex;
}
```
``ps：注意，设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。``

- ``如果容器元素设置了display:flex，主轴方向上的元素无论设置多大的宽度，将都不会溢出容器元素，将会按照宽度比例进行均分``

### 基本概念
采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

### 容器的属性
- flex-direction (主轴的方向) 
   - row 主轴为水平方向，起点在左端。(默认值)
   - row-reverse：主轴为水平方向，起点在右端。
   - column：主轴为垂直方向，起点在上沿。
   - column-reverse：主轴为垂直方向，起点在下沿。
- flex-wrap (如果一条轴线排不下，如何换行)
   - nowrap（默认）：不换行。
   - wrap：换行，第一行在上方。
   - wrap-reverse：换行，第一行在下方 
- flex-flow (是flex-direaction属性和flex-wrap属性的简写形式，默认值为row nowrap)
- justify-content (定义了项目在主轴上的对齐方式)
   - flex-start
   - flex-end
   - center
   - space-between
   - space-around
- align-items (定义了项目在交叉轴上的对齐方式))
   - flex-start
   - flex-end
   - center
   - baseline
   - stretch
- align-content (定义了多跟轴线的对齐方式，如果项目只有一根轴线，该属性不起作用)
   - flex-start 
   - flex-end
   - center
   - space-between
   - space-around
   - stretch

### 项目的属性
- order （定义项目的排列顺序，数值越小，排列越靠前，默认为0）
   - <integer>
- flex-grow (定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大)
   - 注意此处的放大是指存在剩余空间的情况下，主轴方向上的放大比例
   - <integer>
- flex-shrink (flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。)
   - 这也是上文提到过的主轴方向不会溢出容器的原因
   - <integer>
- flex-basis （属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。）
- flex （flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。）
- align-self(属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。)
```javascript
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

### flex-basis详解
(参考链接：https://www.cnblogs.com/lvmylife/p/7670149.html)
flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

举例：
```javascript
<div class="parent">
    <div class="item-1"></div>
    <div class="item-2"></div>
    <div class="item-3"></div>
</div>

<style type="text/css">
    .parent {
        display: flex;
        width: 600px;
    }
    .parent > div {
        height: 100px;
    }
    .item-1 {
        width: 140px;
        flex: 2 1 0%;
        background: blue;
    }
    .item-2 {
        width: 100px;
        flex: 2 1 auto;
        background: darkblue;
    }
    .item-3 {
        flex: 1 1 200px;
        background: lightblue;
    }
</style>
```
- 主轴上父元素总尺寸为600px
- 子元素的总基准值（flex-basis）是：0% + auto + 200px = 300px，其中
  - 0% 即 0 宽度
  - auto 对应取主尺寸即 100px
- 故剩余空间为 600px - 300px = 300px
- 伸缩放大(``flex-grow``)系数之和为： 2 + 2 + 1 = 5
- 剩余空间分配如下：
  - item-1 和 item-2 各分配 2/5，各得 120px
  - item-3 分配 1/5，得 60px
- 各项目最终宽度为：
  - item-1 = 0% + 120px = 120px
  - item-2 = auto + 120px = 220px
  - item-3 = 200px + 60px = 260px



### flex简写
(参考链接：https://segmentfault.com/q/1010000004080910/a-1020000004100314)
- 当flex取值为none的时候，则计算为0 0 auto，如下是等同的：
```javascript
.item {flex: none;}
.item {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;
}
```
- 当flex取值为auto的时候，则计算为1 1 auto，如下是等同的：
```javascript
.item {flex: auto;}
.item {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
}
```
- 当 flex 取值为一个非负数字，则该数字为 flex-grow 值，flex-shrink 取 1，flex-basis 取 0%，如下是等同的：
```javascript
.item {flex: 1;}
.item {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}
```
- 当 flex 取值为两个非负数字，则分别视为 flex-grow 和 flex-shrink 的值，flex-basis 取 0%，如下是等同的：
```javascript
.item {flex: 2 3;}
.item {
    flex-grow: 2;
    flex-shrink: 3;
    flex-basis: 0%;
}
```

