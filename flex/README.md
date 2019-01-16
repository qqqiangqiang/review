## flex
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
- flex-flow ()
- justify-content (定义了项目在主轴上的对齐方式)
- align-items (定义了项目在交叉轴上的对齐方式))
- align-content (定义了多跟轴线的对齐方式，如果项目只有一根轴线，该属性不起作用)

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