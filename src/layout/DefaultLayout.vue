<script setup>
import { RouterLink } from 'vue-router'

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
  },
  {
    label: 'Components',
    icon: 'pi pi-microchip',
    items: [
      {
        label: 'Menu',
        route: '/components/menu',
      },
      {
        label: 'Tabs',
        route: '/components/tabs',
      },
    ],
  },
  {
    label: 'Theme',
    icon: 'pi pi-fw pi-palette',
    items: [
      {
        label: 'Theme',
        route: '/theme/',
      },
      {
        separator: true,
      },
      {
        label: 'Styled Mode',
        route: '/theme/styled-mode',
      },
    ],
  },
])
</script>

<template>
  <header>
    <Menubar :model="items">
      <template #start>
        <i class="pi pi-prime"></i>
      </template>
      <template #item="{ item, props, hasSubmenu }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a
          v-else
          v-ripple
          :href="item.url"
          :target="item.target"
          v-bind="props.action"
        >
          <span v-if="item.icon"> <i :class="item.icon"></i></span>
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
    </Menubar>
  </header>

  <article class="container mx-auto py-5">
    <slot />
  </article>

  <footer class="bg-slate-800 py-5 text-center text-gray-100">
    <p class="my-[5px]">&copy; All rights reserved.</p>
  </footer>
</template>

<style scoped></style>
