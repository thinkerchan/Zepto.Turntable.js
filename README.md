# Zepto.Turntable.js -- Wap端转盘菜单


## 使用方法

**HTML：**
```html
<div class="demo-wrap">
    <!-- 展示区 -->
    <ul class="show-list" id="JshowList">
      <li class="list-item">show1</li>
      <li class="list-item">show2</li>
      <li class="list-item">show3</li>
      <li class="list-item">show4</li>
      <li class="list-item">show5</li>
      <li class="list-item">show6</li>
      <li class="list-item">show7</li>
      <li class="list-item">show8</li>
      <li class="list-item">show9</li>
      <li class="list-item">show10</li>
    </ul>
    <!-- 转盘区 , circle-wrap用于定位, list-item和nav-dot数量相同 -->
    <div  class="circle-wrap">
      <ul id="Jcircle" class="circle">
        <li class="nav-dot"><img src="http://dummyimage.com/80x80" class="pic"></li>
        <li class="nav-dot"><img src="http://dummyimage.com/80x80" class="pic"></li>
        <li class="nav-dot"><img src="http://dummyimage.com/80x80" class="pic"></li>
        <li class="nav-dot"><img src="http://dummyimage.com/80x80" class="pic"></li>
        <li class="nav-dot"><img src="http://dummyimage.com/80x80" class="pic"></li>
        <li class="nav-dot"><img src="http://dummyimage.com/80x80" class="pic"></li>
        <li class="nav-dot"><img src="http://dummyimage.com/80x80" class="pic"></li>
        <li class="nav-dot"><img src="http://dummyimage.com/80x80" class="pic"></li>
        <li class="nav-dot"><img src="http://dummyimage.com/80x80" class="pic"></li>
        <li class="nav-dot"><img src="http://dummyimage.com/80x80" class="pic"></li>
      </ul>
    </div>
  </div>
```

**CSS**
```css
*{margin: 0;padding: 0;list-style-type: none;}
html,body{height:100%;}
.demo-wrap{position: absolute;top: 0;right: 0;bottom: 0;left: 0;overflow: hidden;width: 100%;height: 100%;}
.show-list{position: relative;width: 100%;height: 100%;background: #fff;}
.show-list .list-item{position: absolute;top: 0;left: 0;display: none;width: 100%;height: 100%;}
.circle-wrap{position: absolute;bottom: -160px;left: 50%;-webkit-transform: translateX(-50%);}
.circle-wrap .circle{position: absolute;-webkit-transition: -webkit-transform .8s;border-radius: 50%;background: #f44;}
.nav-dot{overflow: hidden;}
.nav-dot .pic{width: 100%;-webkit-transition: -webkit-transform .6s;-webkit-transform: scale(.75);border-radius: 50%;}
.nav-dot.active .pic{-webkit-transform: scale(1);}
.show-list .list-item{text-align: center;font-size:20px;line-height:30px;}
```
>样式可以自行重写

**JavaScript**
```javascript
  var demo = new Turntable({
    showArea:'#JshowList',  //展示区
    ctrlArea:'#Jcircle',    //转盘区
    radius: 140,            //转盘半径
    sideLen:80              //小正方形边长
  });
```


#### 0.1.2 解决安卓环境下UC浏览器在转盘旋转过程中渲染出错问题
#### 0.1.1 DOM读取优化,事件绑定处理优化
#### 0.1.0 初稿




