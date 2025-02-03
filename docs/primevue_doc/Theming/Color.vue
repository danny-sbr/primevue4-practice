<template>
  <div class="card">
    <ul class="color-list">
      <li
        v-for="(palette, index) in colorPalettes"
        :key="index"
        class="color-item"
      >
        <span class="color-title">{{ palette.name }}</span>
        <div class="color-shades">
          <div
            v-for="(shade, sIndex) in palette.shades"
            :key="sIndex"
            class="shade-item"
          >
            <div class="shade-box" :class="`${palette.name}-${shade}`"></div>
            <span class="shade-label">{{ shade }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const colorPalettes = [
  {
    name: 'emerald',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'green',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'lime',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'red',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'orange',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'amber',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'yellow',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'teal',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'cyan',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'sky',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'blue',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'indigo',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'violet',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'purple',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'fuchsia',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'pink',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'rose',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'slate',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'gray',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'zinc',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'neutral',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: 'stone',
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
]
</script>

<style scoped src="../../style/color.css"></style>
<style scoped>
.card {
  padding: 1rem;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.color-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.color-item {
  min-width: 6rem;
  flex: 1 1 auto;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.color-title {
  font-weight: 500;
  text-transform: capitalize;
  text-align: center;
  margin-bottom: 0.5rem;
}

.color-shades {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.shade-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 0.25rem;
  padding: 0.25rem;
  border-radius: 0.25rem;
}

.shade-box {
  width: 100%;
  height: 2rem;
  border-radius: 0.25rem;
}

.shade-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}
</style>
