<template>
  <div>

    <div class="main_holst">
      <canvas
          ref="canvas"
          @touchstart="startDrawing"
          @touchmove="draw"
          @touchend="stopDrawing"
          @mousedown="startDrawing"
          @mousemove="draw"
          @mouseup="stopDrawing"
          :style="{ backgroundImage: 'url(' + backgroundImage + ')' }"
      ></canvas>

    </div>

    <div class="d-flex justify-center justify-space-between mx-auto w-25">


        <v-btn icon="mdi-pencil" @click="penType = 'pencil'"></v-btn>
        <v-btn icon="mdi-brush" @click="penType = 'circle'"></v-btn>

    </div>

    <div class="d-flex justify-space-around align-center ma-6">
      <div>
        <v-btn icon="mdi-arrow-left" elevation="0"></v-btn>
      </div>
      <v-color-picker hide-canvas hide-inputs :swatches="swatches" show-swatches v-model="penColor" label="Цвет ручки"></v-color-picker>

      <div>
        <v-btn icon="mdi-arrow-right" elevation="0"></v-btn>
      </div>
    </div>

    <div class="d-flex justify-space-between mx-auto w-50 mb-4">
      <v-btn @click="clearCanvas" icon="mdi-delete"></v-btn>
      <v-btn @click="undo" icon="mdi-arrow-left"></v-btn>
      <v-btn @click="saveImage" icon="mdi-content-save"></v-btn>

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
      penColor: '#000000',
      strokes: [],
      inline: null,
      column: null,
      backgroundImage: 'https://vchusia.grassbusinesslabs.tk/static/32fe5013-cfda-4869-885f-ee074f721144.png',
      swatches: [
        ['#FF0000', '#AA0000', ],
        ['#FFFF00', '#AAAA00', ],
        ['#00FF00', '#00AA00', ],
        ['#00FFFF', '#00AAAA', ],
        ['#0000FF', '#0000AA',],
      ],

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
        this.context.stroke();
      } else if (this.penType === 'circle') {
        const radius = 10;
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
  height: 400px;
  background-size: contain;
  background-repeat: no-repeat;
}

.main_holst{
  display: flex;
  margin: 10px;
}
</style>
