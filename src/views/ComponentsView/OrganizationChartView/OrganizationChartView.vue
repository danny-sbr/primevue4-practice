<script setup>
import MarkdownIt from '@/components/MarkdownIt.vue'
import OrganizationChartExplain from './markdown/OrganizationChartExplain.md'

const data = ref({
  key: 'home',
  label: '首頁',
  url: '/',
  children: [
    {
      key: 'products',
      label: '產品介紹',
      url: '/products',
      children: [
        {
          key: 'hardware',
          label: '硬體設備',
          url: '/products/hardware',
          children: [
            {
              key: 'servers',
              label: '伺服器',
              url: '/products/hardware/servers',
            },
            {
              key: 'network',
              label: '網路設備',
              url: '/products/hardware/network',
            },
          ],
        },
        {
          key: 'software',
          label: '軟體服務',
          url: '/products/software',
          children: [
            {
              key: 'cloud',
              label: '雲端服務',
              url: '/products/software/cloud',
            },
            {
              key: 'security',
              label: '資安解決方案',
              url: '/products/software/security',
            },
          ],
        },
      ],
    },
    {
      key: 'solutions',
      label: '解決方案',
      url: '/solutions',
      children: [
        {
          key: 'enterprise',
          label: '企業方案',
          url: '/solutions/enterprise',
        },
        {
          key: 'sme',
          label: '中小企業方案',
          url: '/solutions/sme',
        },
      ],
    },
    {
      key: 'about',
      label: '關於我們',
      url: '/about',
      children: [
        {
          key: 'company',
          label: '公司簡介',
          url: '/about/company',
        },
        {
          key: 'team',
          label: '團隊成員',
          url: '/about/team',
        },
        {
          key: 'contact',
          label: '聯絡資訊',
          url: '/about/contact',
        },
      ],
    },
  ],
})
</script>
<template>
  <MarkdownIt :source="OrganizationChartExplain" />
  <OrganizationChart
    :value="data"
    class="overflow-auto rounded-md border border-gray-300 p-2"
  >
    <template #default="slotProps">
      <p class="font-bold text-sky-600">{{ slotProps.node.label }}</p>
      <p>
        <span class="font-bold">連結：</span>
        {{ slotProps.node.url }}
      </p>
    </template>
  </OrganizationChart>
</template>
<style scoped></style>
