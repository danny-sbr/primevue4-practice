<script setup>
const data = ref({
  key: '2020-000009',
  gender: '公',
  label: '飛翔 9 號',
  color: '石板',
  strain: '阿密魯 x 畢包',
  creator: '亞太',
  awards:
    '新竹春 18-123456 灰（公）五關綜合冠軍、桃園秋 19-789012 灰（公）四關優勝、總經理盃 20-345678 灰（公）三關入賞',
  children: [
    {
      key: '2020-000005',
      gender: '母',
      label: '飛翔 5 號',
      color: '灰',
      strain: '阿密盒 x 單包',
      creator: '五丈',
      awards:
        '台中冬 17-456789 灰（母）五關綜合亞軍、嘉義春 18-234567 灰（母）四關第三名',
      children: [
        {
          key: '2020-000003',
          gender: '公',
          label: '飛翔 3 號',
          color: '點灰白羽',
          strain: '阿密盒 x 單包',
          creator: '五丈',
          awards:
            '台北春 16-987654 灰（公）三關優勝、總統盃 17-345678 灰（公）五關入賞',
          children: [
            {
              key: '2020-000001',
              gender: '公',
              label: '飛翔 1 號',
              color: '灰',
              strain: '阿密盒 x 單包',
              creator: '五丈',
              awards:
                '高雄冬 15-123789 灰（公）四關第五名、屏東秋 16-456123 灰（公）三關入賞',
            },
            {
              key: '2020-000002',
              gender: '母',
              label: '飛翔 2 號',
              color: '灰',
              strain: '阿密盒 x 單包',
              creator: '五丈',
              awards:
                '宜蘭春 15-789456 灰（母）五關第八名、花蓮夏 16-234789 灰（母）四關入賞',
            },
          ],
        },
      ],
    },
    {
      key: '2020-000006',
      gender: '公',
      label: '飛翔 6 號',
      color: '白',
      strain: '阿密魯 x 畢包',
      creator: '亞太',
      awards:
        '台南春 17-567890 白（公）四關綜合冠軍、雲林秋 18-901234 白（公）五關優勝',
      children: [
        {
          key: '2020-000004',
          gender: '母',
          label: '飛翔 4 號',
          color: '白點',
          strain: '阿密魯 x 畢包',
          creator: '亞太',
          awards:
            '彰化夏 16-345678 白（母）三關亞軍、南投秋 17-678901 白（母）四關第三名',
        },
      ],
    },
    {
      key: '2020-000007',
      gender: '母',
      label: '飛翔 7 號',
      color: '藍白',
      strain: '阿密魯 x 畢包',
      creator: '亞太',
      awards:
        '基隆冬 17-234567 藍（母）五關優勝、台東春 18-567890 藍（母）三關第二名',
      children: [
        {
          key: '2020-000008',
          gender: '公',
          label: '飛翔 8 號',
          color: '藍斑',
          strain: '阿密魯 x 畢包',
          creator: '亞太',
          awards:
            '澎湖夏 16-789012 藍（公）四關冠軍、金門秋 17-123456 藍（公）五關入賞',
        },
      ],
    },
  ],
})
</script>
<template>
  <OrganizationChart
    :value="data"
    :pt="{
      root: {
        class: 'w-full',
      },
      node: {
        class: 'w-full',
      },
      table: {
        class: 'min-w-[200px]',
      },
    }"
  >
    <template #default="slotProps">
      <p class="font-bold text-sky-600">{{ slotProps.node.key }}</p>

      <p>
        <span class="font-bold">名字：</span>
        {{ slotProps.node.label }}
      </p>
      <p>
        <span class="font-bold">性別：</span>
        {{ slotProps.node.gender }}
      </p>
      <p>
        <span class="font-bold">顏色：</span>
        {{ slotProps.node.color }}
      </p>
      <p>
        <span class="font-bold">血統：</span>
        {{ slotProps.node.strain }}
      </p>
      <p>
        <span class="font-bold">培育者：</span>
        {{ slotProps.node.creator }}
      </p>
      <p>
        <span class="font-bold">獎項：</span>
        {{ slotProps.node.awards }}
      </p>
    </template>
  </OrganizationChart>
</template>
<style scoped></style>
