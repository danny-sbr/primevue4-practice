<script setup>
import MarkdownIt from '@/components/MarkdownIt.vue'
import PassThroughExplain from './markdown/PassThroughExplain.md'
import { ref } from 'vue'

const panelPt = ref({
  hooks: {
    onMounted: () => console.log('Panel 已掛載'),
    onUpdated: () => console.log('Panel 已更新'),
    onUnmounted: () => console.log('Panel 已卸載'),
  },
})
/** @type {import('./PassThroughView.d').HeaderHoverHandler} */
const onHeaderHover = (event) => {
  console.log(event)
  console.log('🔵 滑鼠進入標題區塊！')
}
const count = ref(0)
</script>
<template>
  <div class="mb-4">
    <span class="text-xl font-bold">toggle 次數 : </span>
    <span class="text-xl">{{ count }}</span>
  </div>
  <Panel
    header="我是頭"
    toggleable
    :pt="{
      root: (options) => {
        options.instance.toggle = (event) => {
          options.instance.d_collapsed = !options.instance.d_collapsed
          options.instance.$emit(
            'update:collapsed',
            options.instance.d_collapsed,
          )
          options.instance.$emit('toggle', {
            originalEvent: event,
            value: options.instance.d_collapsed,
          })
          count++
        }
      },
      header: (options) => {
        return {
          id: 'myPanelHeader',
          style: {
            'user-select': 'none', // 禁止選取標題文字
          },
          class: [
            'border-green-600 border', // 加上邊框顏色
            {
              'text-red-600': options.state.d_collapsed, // 摺疊時的背景與文字顏色
              'text-blue-600': !options.state.d_collapsed, // 展開時的背景與文字顏色
            },
          ],
          onMouseover: onHeaderHover, // 滑鼠移入事件
        }
      },
      content: {
        'data-name': '我是內容',
      },
      title: 'text-xl', // 標題文字放大
      headerActions: (options) => {
        console.log(options)
      },
    }"
  >
    <p class="m-0">這是內容區塊，可依需求進行客製化樣式設定。</p>
  </Panel>
  <Button
    :pt="{
      root: (options) => {
        console.log(options)
      },
    }"
    >按鈕</Button
  >

  <Panel header="Header" :pt="panelPt"> 生命週期展示 </Panel>
  <MarkdownIt :source="PassThroughExplain" />
</template>
<style scoped></style>
