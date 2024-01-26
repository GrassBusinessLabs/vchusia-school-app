<template>
  <div>

    <div class="main_holst">
      <v-btn icon="mdi-arrow-left" class="arrow-button" elevation="0"></v-btn>
      <div>

        <canvas
            ref="canvas"
            @touchstart="startDrawing"
            @touchmove="draw"
            @touchend="stopDrawing"
            @mousedown="startDrawing"
            @mousemove="draw"
            @mouseup="stopDrawing"
            :style="{ backgroundImage: 'url(' + backgroundImage + ')'  }"
        >
        </canvas>
      </div>

      <v-btn class="arrow-button" icon="mdi-arrow-right" elevation="0"></v-btn>

    </div>


    <div class="d-flex justify-space-around mx-auto w-75 mb-4">
      <v-btn icon="mdi-pencil" @click="penType = 'pencil'" class="btn_panel pencil" elevation="0"></v-btn>
      <v-btn icon="mdi-brush" @click="penType = 'circle'" class="btn_panel brush" elevation="0"></v-btn>
      <v-btn @click="clearCanvas" icon="mdi-close" class="btn_panel" elevation="0"></v-btn>
      <v-btn @click="undo" icon="mdi-subdirectory-arrow-left" class="btn_panel" elevation="0"></v-btn>
      <v-btn @click="saveImage" icon="mdi-check" class="btn_panel" elevation="0"></v-btn>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      context: null,
      drawing: false,
      penType: 'pencil',
      penColor: 'rgba(255, 99, 71, 0.6)',
      strokes: [],
      inline: null,
      column: null,
      backgroundImage: 'https://vchusia.grassbusinesslabs.tk/static/32fe5013-cfda-4869-885f-ee074f721144.png',
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext('2d');
  },
  methods: {

    startDrawing(event) {
      event.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const x = (event.type === 'touchstart') ? event.touches[0].clientX : event.clientX;
      const y = (event.type === 'touchstart') ? event.touches[0].clientY : event.clientY;

      this.drawing = true;
      this.context.beginPath();
      this.context.moveTo(x - rect.left, y - rect.top);
    },
    draw(event) {
      if (!this.drawing) return;

      const rect = this.canvas.getBoundingClientRect();
      const x = (event.type === 'touchmove') ? event.touches[0].clientX : event.clientX;
      const y = (event.type === 'touchmove') ? event.touches[0].clientY : event.clientY;

      if (this.penType === 'pencil') {
        this.context.lineTo(x - rect.left, y - rect.top);
        this.context.strokeStyle = this.penColor;
        this.context.lineWidth = 2; // Товщина лінії для олівця
        this.context.stroke();
        this.context.beginPath();
        this.context.moveTo(x - rect.left, y - rect.top);
      } else if (this.penType === 'circle') {
        const radius = 3;
        this.context.beginPath();
        this.context.arc(x - rect.left, y - rect.top, radius, 0, 2 * Math.PI);
        this.context.fillStyle = this.penColor;
        this.context.fill();
      }
    },

    stopDrawing() {
      if (this.drawing) {
        this.drawing = false;
        this.context.closePath();
        this.strokes.push(this.canvas.toDataURL('image/png'));
      }
    },
    clearCanvas() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.strokes = [];
    },
    undo() {
      if (this.strokes.length > 0) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const img = new Image();
        img.src = this.strokes.pop();
        img.onload = () => {
          this.context.drawImage(img, 0, 0);
        };
      }
    },
    saveImage() {
      const dataUrl = this.canvas.toDataURL('image/png');
      const blobPromise = new Promise((resolve) => {
        this.canvas.toBlob((blob) => {
          resolve(blob);
        });
      });

      blobPromise.then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        console.log(blob)
        a.href = url;
        a.download = 'drawing.png'; // Ім'я файлу, яке ви хочете задати
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
    },

  },
};
</script>

<style scoped>
canvas {
  border: 1px solid #efefef;
  border-radius: 5px;
  touch-action: none;
  width: 100%;
  min-height: 70vh;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.main_holst {
  display: flex;
  justify-content: space-between;
  margin: 10px;
  align-items: center;
}
.arrow-button {
  position: relative;
  z-index: 1;
}
.arrow-button {
  font-size: 24px;
  background-color: transparent;
  color: #000;
  cursor: pointer;
  margin: 0;
}

.arrow-button:hover {
  color: #FF0000;
}

.pencil:focus{
  background: grey;
  color: #fff;
}
.brush:focus{
  background: grey;
  color: #fff;


}
.btn_panel{
  background: transparent;

}
</style>
