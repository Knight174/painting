// 画图库
class DrawingBoard {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.isDrawing = false;
    this.lastX = 0; // 鼠标 x 位置
    this.lastY = 0; // 鼠标 y 位置
    this.color = '#000000'; // 线的颜色
    this.lineWidth = 2; // 线宽
    this.lineCap = 'round'; // 线型
    this.undoStack = []; // 撤销记录
    this.redoStack = []; // 重做记录（用于取消撤销），有撤销记录才有重做记录

    // 监听鼠标事件
    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
    this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    // this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
  }

  // 开始绘制
  startDrawing(e) {
    this.isDrawing = true;
    [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
  }

  // 绘制过程
  draw(e) {
    if (!this.isDrawing) return;
    this.context.beginPath();
    this.context.moveTo(this.lastX, this.lastY);
    this.context.lineTo(e.offsetX, e.offsetY);
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.lineWidth;
    this.context.lineCap = this.lineCap;
    this.context.stroke();
    [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
  }

  // 停止绘制
  stopDrawing() {
    this.isDrawing = false;
    // 清空redoStack
    this.redoStack = []; // 清空重做记录
    // 保存当前画布的图像数据到undoStack
    const imageData = this.context.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.undoStack.push(imageData);
    console.log('undo', this.undoStack);
  }

  // 清除画布
  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // 清空undoStack和redoStack
    this.undoStack = [];
    this.redoStack = [];
  }

  // 撤销操作
  undo() {
    if (this.undoStack.length > 0) {
      const currentImageData = this.undoStack.pop();
      this.redoStack.push(currentImageData);

      if (!this.undoStack.length) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return;
      }
      const lastImageData = this.undoStack[this.undoStack.length - 1];
      this.context.putImageData(lastImageData, 0, 0);
    }
  }

  // 重做操作（取消撤销）
  redo() {
    if (this.redoStack.length > 0) {
      // const imageData = this.context.getImageData(
      //   0,
      //   0,
      //   this.canvas.width,
      //   this.canvas.height
      // );
      const nextImageData = this.redoStack.pop();
      this.undoStack.push(nextImageData);
      this.context.putImageData(nextImageData, 0, 0);
    }
  }

  // 保存画布内容为图像文件
  saveCanvas() {
    const image = this.canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'drawing.png';
    link.click();
  }

  // 设置颜色
  setColor(color) {
    this.color = color;
  }

  // 设置线条粗细
  setLineWidth(lineWidth) {
    this.lineWidth = lineWidth;
  }
}

// 创建画板实例
const drawingBoard = new DrawingBoard('drawingBoard');
