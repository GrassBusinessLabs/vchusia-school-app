<template>
  <div class="arrow_nav-left">
    <v-btn icon="mdi-arrow-left" class="arrow" elevation="0"></v-btn>
  </div>

  <div class="arrow_nav-right">
    <v-btn icon="mdi-arrow-right" class="arrow" elevation="0"></v-btn>
  </div>



  <div class="d-flex justify-center container_canvas">
    <canvas class="canvas" ref="canvas" width="400" height="500" @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing"
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove" @touchend="stopDrawing"></canvas>

  </div>

  <div class="d-flex justify-center">
    <v-btn class="d-flex justify-center align-center" @click="clearCanvas" icon="mdi-backspace"></v-btn>
  </div>


  <div class="d-flex justify-center w-75 mx-auto ma-5">
    <div>
      <p>Товщина</p>
    </div>

    <v-slider v-model="lineThickness" min="1" max="20" step="1"></v-slider>
    <p>{{ lineThickness }}</p>

  </div>

</template>

<script>
export default {
  data() {
    return {
      drawing: false,
      context: null,
      visibility: true,
      lineThickness: 5,
      pinchStartDistance: 0,
      initialCanvasWidth: 400,
      initialCanvasHeight: 500,
    };
  },

  mounted() {
    this.drawImage();
  },
  methods: {
    handleTouchStart(event) {
      if (event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        this.pinchStartDistance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
        );
      } else {
        this.startDrawing(event);
      }
    },

    handleTouchMove(event) {
      if (event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const pinchDistance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
        );
        const scale = pinchDistance / this.pinchStartDistance;

        const canvas = this.$refs.canvas;
        canvas.width = this.initialCanvasWidth * scale;
        canvas.height = this.initialCanvasHeight * scale;

        this.drawImage();
      } else {
        this.draw(event);
      }
    },

    clearCanvas() {
      const canvas = this.$refs.canvas
      const context = canvas.getContext('2d')
      context.clearRect(0, 0, canvas.width, canvas.height)
      this.drawImage()
    },
    drawImage() {
      const canvas = this.$refs.canvas
      const context = canvas.getContext('2d')

      const img = new Image()

      img.src = 'https://vchusia.grassbusinesslabs.tk/static/32fe5013-cfda-4869-885f-ee074f721144.png'

      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
      };
    },
    startDrawing(event) {
      this.drawing = true
      const canvas = this.$refs.canvas
      this.context = canvas.getContext('2d')
      this.context.lineCap = 'round'
      this.context.strokeStyle = 'rgba(255, 0, 0, 0.1)'

      this.context.lineWidth = this.lineThickness;
      const x = event.type.startsWith('touch') ? event.touches[0].clientX - canvas.offsetLeft : event.clientX - canvas.offsetLeft
      const y = event.type.startsWith('touch') ? event.touches[0].clientY - canvas.offsetTop : event.clientY - canvas.offsetTop
      this.context.beginPath()
      this.context.moveTo(x, y)


    },

    draw(event) {
      if (!this.drawing) return
      const x = event.type.startsWith('touch') ? event.touches[0].clientX - this.$refs.canvas.offsetLeft : event.clientX - this.$refs.canvas.offsetLeft
      const y = event.type.startsWith('touch') ? event.touches[0].clientY - this.$refs.canvas.offsetTop : event.clientY - this.$refs.canvas.offsetTop
      this.context.lineWidth = this.lineThickness;
      this.context.lineTo(x, y)
      this.context.stroke()
    },

    stopDrawing() {
      this.drawing = false
      this.context.closePath()
    },

    saveImage() {
      const canvas = this.$refs.canvas
      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = 'canvas_image.png'
      link.click()
    },
  },
};
</script>

<style scoped>
.arrow_nav-left{
  position: absolute;
}

.arrow_nav-right{
  position: absolute;
  left: 89%;

}
.arrow{
  background: transparent;
  font-size: 25px;
}

.canvas {
  margin: 20px;
  touch-action: none;
}
.arrow:active{
  color: #fff3e0;
}
</style>
