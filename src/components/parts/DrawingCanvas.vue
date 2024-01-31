<template>
  <main class="d-flex flex-column justify-end">
    <div class="canvas-drawing w-100">

      <div class="arrow_nav-left">
        <v-btn icon="mdi-arrow-left" class="arrow" elevation="1"></v-btn>


      </div>

      <div class="arrow_nav-right">
        <v-btn icon="mdi-arrow-right" class="arrow" @click="saveImage()" elevation="1"></v-btn>


      </div>

      <div class="d-flex justify-center container_canvas w-100">
        <div class="d-flex justify-center align-center w-100 h-100 position-absolute">
          <img class="img_canvas"
               src="https://vchusia.grassbusinesslabs.tk/static/32fe5013-cfda-4869-885f-ee074f721144.png"
               alt="Img">
        </div>

        <canvas class="canvas" ref="canvas" :width="canvasSize.width" :height="canvasSize.height"
                @mousedown="startDrawing" @mousemove="draw"
                @mouseup="stopDrawing"
                @touchstart="handleTouchStart"
                @touchmove="handleTouchMove" @touchend="stopDrawing"></canvas>
      </div>

    </div>


    <div class="panel-drawing mt-5">
      <div class="d-flex justify-space-around panel">
        <v-btn class="d-flex justify-center undo align-center" @click="undo" icon="mdi-undo"></v-btn>
        <v-btn class="d-flex justify-center redo align-center" @click="redo" icon="mdi-redo"></v-btn>
        <v-btn class="popUpLineWeight" icon="mdi-format-line-weight"
               @click="popUpLineWeight = !popUpLineWeight"></v-btn>
        <v-btn class="d-flex justify-center align-center close" @click="clearCanvas" icon="mdi-close"></v-btn>
      </div>
    </div>

    <div class="text-center">
      <v-bottom-sheet v-model="popUpLineWeight">
        <v-card height="100" class="d-flex align-center justify-center">
          <div class="d-flex w-75 mx-auto">
            <v-slider v-model="lineThickness" min="1" max="20" step="1"></v-slider>
            <p>{{ lineThickness }}</p>
          </div>

        </v-card>
      </v-bottom-sheet>
    </div>
  </main>


</template>

<script>

import {ref} from "vue";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";

export default {
  components: {
    VBottomSheet
  },

  data() {
    return {
      drawing: false,
      context: null,
      visibility: true,
      lineThickness: 5,
      pinchStartDistance: 0,
      initialCanvasWidth: 400,
      initialCanvasHeight: 500,
      undoStack: [],
      redoStack: [],
      currentImage: null,
      popUpLineWeight: ref(false)
    };
  },

  mounted() {
    this.initCanvas();
    this.drawImage();
    window.addEventListener("resize", this.handleResize);
  },
  computed: {
    canvasSize() {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const maxWidth = 800;
      const maxHeight = 1000;

      const width = Math.min(maxWidth, windowWidth);
      const height = Math.min(maxHeight, windowHeight);

      return {
        width,
        height,
      };
    },
  },

  methods: {
    handleResize() {
      this.initCanvas();
      this.drawImage();
    },
    initCanvas() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');
      context.fillStyle = 'transparent';
      context.fillRect(0, 0, canvas.width, canvas.height);
    },
    redo() {
      if (this.redoStack.length > 0) {
        const canvas = this.$refs.canvas;
        const context = canvas.getContext('2d');
        this.undoStack.push(this.currentImage || canvas.toDataURL('image/png'));
        this.currentImage = this.redoStack.pop();
        const img = new Image();
        img.src = this.currentImage;
        img.onload = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      }
    },

    undo() {
      if (this.undoStack.length > 0) {
        const canvas = this.$refs.canvas;
        const context = canvas.getContext('2d');
        this.redoStack.push(this.currentImage || canvas.toDataURL('image/png'));
        this.currentImage = this.undoStack.pop();
        const img = new Image();
        img.src = this.currentImage;
        img.onload = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      }
    },
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

      //Для збереження фотки повністю разом з нарисованим

      // const img = new Image()
      // img.src = 'https://vchusia.grassbusinesslabs.tk/static/32fe5013-cfda-4869-885f-ee074f721144.png'
      // img.onload = () => {
      //   context.drawImage(img, 0, 0, canvas.width, canvas.height)
      // };
    },

    startDrawing(event) {
      this.drawing = true;
      const canvas = this.$refs.canvas;
      this.context = canvas.getContext('2d');
      this.context.lineCap = 'round';
      this.context.strokeStyle = 'rgba(255, 0, 0, 0.1)';
      this.context.lineWidth = this.lineThickness;

      const x = event.type.startsWith('touch') ? event.touches[0].clientX - canvas.offsetLeft : event.clientX - canvas.offsetLeft;
      const y = event.type.startsWith('touch') ? event.touches[0].clientY - canvas.offsetTop : event.clientY - canvas.offsetTop;

      this.context.beginPath();
      this.context.moveTo(x, y);
      this.undoStack.push(this.$refs.canvas.toDataURL('image/png'));
      this.redoStack = [];
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
      if (this.drawing) {
        this.drawing = false;
        this.context.closePath();
        this.undoStack.push(this.$refs.canvas.toDataURL('image/png'));
        this.redoStack = [];
      }
    },

    saveImage() {
      const canvas = this.$refs.canvas
      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = 'canvas_image.png'
      link.click()

    },
    beforeUnmount() {
      window.removeEventListener("resize", this.handleResize);
    },
  },
};
</script>

<style scoped>
.arrow_nav-left {
  position: absolute;
}

.arrow_nav-right {
  position: absolute;
  left: 89%;
}

.arrow {
  background: transparent;
  font-size: 25px;
  z-index: 11;
}


.canvas {
  touch-action: none;
  z-index: 10;

}

.img_canvas {
  z-index: -10;
  display: flex;
}

.canvas-drawing {
  display: flex;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2), 0 0 4px rgba(0, 0, 0, 0.1) inset;
}


.arrow:active {
  color: #fff3e0;
}

.panel-drawing {
  margin-bottom: 30px;
  position: absolute;
  top: 85%;
  left: 50%;
  z-index: 15;
  transform: translate(-50%, -50%);
}

.undo, .redo, .close, .popUpLineWeight {
  margin: 10px;
  background: transparent;
}

@media screen and (min-width: 415px) {

  .img_canvas {
    z-index: -10;
    height: inherit;
  }

  .arrow_nav-right {
    position: absolute;
    left: 89%;
    z-index: 15;
  }
  .arrow_nav-right {
    left: 95%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .arrow_nav-left {
    top: 50%;
    left: 5%;
    transform: translate(-50%, -50%);

  }

}

</style>
