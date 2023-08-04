# Painting

> 先布局后上色

## 折线/多边形

0. 开始：`ctx.beginPath()`

1. 落笔：`ctx.moveTo(x, y)`
2. 轨迹：`ctx.lineTo(x, y)`
3. 闭合：`ctx.closePath()`
4. 勾勒：`ctx.stroke()`
5. 填充：`ctx.fill()`

## 矩形

1. stroke rect

```ts
// ctx.rect(x,y,width,height)
ctx.rect(0, 0, 100, 200);
ctx.stroke();

// 等价于
ctx.strokeRect(0, 0, 100, 200);
```

2. fill rect

```ts
// ctx.rect(x,y,width,height)
ctx.rect(0, 0, 100, 200);
ctx.fill();

// 等价于
ctx.fillRect(0, 0, 100, 200);
```

3. clear react

```ts
// ctx.fillRect(0, 0, 100, 200);

// clearRect(x,y,width,height) 相当于橡皮擦
ctx.clearRect(50, 50, 10, 100);
```

## 圆弧

> 弧度制转角度制：pi / 180 \* degree

```ts
// ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
ctx.arc(100, 100, 50, 0, Math.PI);
```

## 变形

```ts
// translate 方法移动的是坐标系，而不是画板。
ctx.translate(x, y);
// 顺时针选择坐标系
ctx.rotate(angle);
// 放大与缩小
ctx.scale(x, y);
```

## 状态保存与恢复

> 只会保存和恢复样式或变形的状态，并不影响已经绘制的图形。

```ts
ctx.fillStyle = '#123';
ctx.lineCap = 'round';
ctx.save(); // 入栈：把上面两行的样式 👆

ctx.fillStyle = '#ffe';
ctx.lineCap = 'butt';
ctx.fillText('hello world');

ctx.restore(); // 出栈：取出最上面两行的样式（中间三行并不影响，下面的绘制将采用最上面两行样式 👇）
```

```ts
ctx.translate(50, 50);
ctx.rotate((30 * Math.PI) / 180);
ctx.save(); // 入栈：把上面两行的变形 👆

ctx.translate(100, 100);
ctx.rotate((60 * Math.PI) / 180);
ctx.fillText('hello world');

ctx.restore(); // 出栈：取出最上面两行的变形（中间三行并不影响，下面的绘制将采用最上面两行变形 👇）
```

```ts
ctx.fillStyle = '#123';
ctx.lineCap = 'round';
ctx.save(); // 入栈：👆 [s]

ctx.fillStyle = '#ffe';
ctx.lineCap = 'butt';
ctx.fillText('hello world');
ctx.translate(50, 50);
ctx.rotate((30 * Math.PI) / 180);
ctx.save(); // 入栈：👆 [s, t]

ctx.translate(100, 100);
ctx.rotate((60 * Math.PI) / 180);
ctx.fillText('hello world');

ctx.restore(); // 出栈：[s, t].pop() => t
// ...
ctx.restore(); // 出栈：[s].pop() => s
// ...
```
