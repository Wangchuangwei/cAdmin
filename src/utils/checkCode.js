/**
 * 图形验证码校验生成,封装为类
 */

class CheckCode {
  constructor(id, identifyCodeNum, width, height, dotColorMin, dotColorMax, backgroundColorMin, backgroundColorMax, fontSizeMin, fontSizeMax) {
    // 初始化
    this.identifyCodeNum = identifyCodeNum
    this.width = width
    this.height = height
    this.dotColorMin = dotColorMin
    this.dotColorMax = dotColorMax
    this.backgroundColorMin = backgroundColorMin
    this.backgroundColorMax = backgroundColorMax
    this.fontSizeMin = fontSizeMin
    this.fontSizeMax = fontSizeMax
    this.canvas = document.getElementById(id)

    // 获取canvas的2d绘图上下文
    this.ctx = this.canvas.getContext('2d')
    this.ctx.textBaseline = 'bottom'
    // 绘制背景
    this.ctx.fillStyle = '#e6ecfd'
    this.ctx.fillRect(0, 0, width, height)
  }

  /**
   * @returns 在[min,max]之间随机一个数
   */
  randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  /**
   * @returns 随机生成一个字符
   */
  randCode() {
    // 去掉i,I,l,o,O等易混淆字母
    const str = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ0123456789'
    // 将字符串分隔为数组
    const arr = str.split('')
    // 随机字符在[0,56]之间
    const ranNum = Math.floor(Math.random() * 57)
    const captcha = arr[ranNum]
    return captcha
  }

  /**
   * @returns 随机生成一个颜色
   */
  randColor(min, max) {
    let r = this.randomNum(min, max)
    let g = this.randomNum(min, max)
    let b = this.randomNum(min, max)
    return `rgb(${r},${g},${b})`
  }

  /**
   * @returns 绘制字符
   */
  drawText(ctx, text, idx) {
    ctx.fillStyle = this.randColor(50, 160)
    ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
    let x = (idx + 1) * this.width / (this.identifyCodeNum + 1)
    let y = this.randomNum(this.fontSizeMax, this.height - 5)
    let deg = this.randomNum(-30, 30)
    // 修改坐标原点和旋转角度
    ctx.translate(x, y)
    ctx.rotate(deg * Math.PI / 180)
    ctx.fillText(text, 0, 0)
    // 恢复坐标原点和旋转角度
    ctx.rotate(-deg * Math.PI / 180)
    ctx.translate(-x, -y)
  }

  /**
   * @returns 绘制干扰线
   */
  drawLine(ctx) {
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = this.randColor(100, 200)
      ctx.beginPath()
      ctx.moveTo(this.randomNum(0, this.width), this.randomNum(0, this.height))
      ctx.lineTo(this.randomNum(0, this.width), this.randomNum(0, this.height))
      ctx.stroke()
    }
  }

  /**
   * @returns 绘制干扰点
   */
  drawDot(ctx) {
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = this.randColor(0, 255)
      ctx.beginPath()
      ctx.arc(this.randomNum(0, this.width), this.randomNum(0, this.height), 1, 0, 2 * Math.PI)
      ctx.fill()
    }
  }

  /**
   * @returns 生成验证码图片
   */
  drawPic() {
    // 清空画布
    this.ctx.clearRect(0, 0, this.width, this.height);
    // 绘制文字
    for (let i = 0; i < this.identifyCodeNum; i++) {
      this.drawText(this.ctx, this.randCode(), i)
    }
    this.drawLine(this.ctx)
    this.drawDot(this.ctx)
  }
}

export default CheckCode