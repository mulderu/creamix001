<template>
  <div ref="container" draggable="false" class="drawing-container" @mousedown.prevent="startDrawing" @mouseup="endDrawing" @mousemove="draw">
    <img :src="imageSrc" class="drawing-image" />
    <canvas ref="canvas" class="drawing-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
  imageSrc: { type: String, required: true },
  lineColor: { type: String, default: '#ff0000' },
  lineWidth: { type: Number, default: 2 }
})

const emit = defineEmits(['drawing_start', 'drawing_end'])

const container = ref(null)
const canvas = ref(null)
const ctx = ref(null)

const drawing = ref(false)
const lastPos = ref({ x: 0, y: 0 })

const resizeCanvas = () => {
  if (canvas.value && container.value) {
    const { width, height } = container.value.getBoundingClientRect()
    canvas.value.width = width
    canvas.value.height = height
  }
}

onMounted(async () => {
  await nextTick()
  resizeCanvas()
  ctx.value = canvas.value.getContext('2d')
})

watch(() => props.lineColor, () => {
  if (ctx.value) ctx.value.strokeStyle = props.lineColor
})

watch(() => props.lineWidth, () => {
  if (ctx.value) ctx.value.lineWidth = props.lineWidth
})

const getRelativePos = (e) => {
  const rect = canvas.value.getBoundingClientRect()
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}

const startDrawing = (e) => {
  if (e.button !== 0) return // left mouse only
  const pos = getRelativePos(e)
  lastPos.value = pos
  drawing.value = true

  ctx.value.strokeStyle = props.lineColor
  ctx.value.lineWidth = props.lineWidth
  ctx.value.lineJoin = 'round'
  ctx.value.lineCap = 'round'
  ctx.value.beginPath()
  ctx.value.moveTo(pos.x, pos.y)

  emit('drawing_start', pos)
}

const draw = (e) => {
  if (!drawing.value) return
  const pos = getRelativePos(e)
  ctx.value.lineTo(pos.x, pos.y)
  ctx.value.stroke()
}

const endDrawing = (e) => {
  if (!drawing.value) return
  drawing.value = false
  ctx.value.closePath()
  const pos = getRelativePos(e)
  emit('drawing_end', pos)
}
</script>

<style scoped>
.drawing-container {
  position: relative;
  display: inline-block;
}
.drawing-image {
  display: block;
  max-width: 100%;
  height: auto;
}
.drawing-canvas {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
</style>
