<script setup>
const value1 = ref(0)
const value2 = ref(0)
const usNumberFormat = ref(1234567.89)
const germanyNumberFormat = ref(1234567.89)
const indiaNumberFormat = ref(1234567.89)
const usCurrencyNumberFormat = ref(123456789)
const deCurrencyNumberFormat = ref(123456789)
const inCurrencyNumberFormat = ref(123456789)
const jpCurrencyNumberFormat = ref(123456789)
const twdCurrencyNumberFormat = ref(123456789)
const mileValue = ref(0)
const percentValue = ref(0)
const expiryValue = ref(0)
const temperatureValue = ref(0)
const spinnerValue1 = ref(0)
const spinnerValue2 = ref(0)
const spinnerValue3 = ref(0)
const spinnerValue4 = ref(0)
const filledValue = ref(0)
const floatLabelValue = ref(0)
const smallValue = ref(0)
const normalValue = ref(0)
const largeValue = ref(0)
const invalidValue = ref(null)
const disabledValue = ref(50)
</script>
<template>
  <div>
    <h2 class="mb-8 text-3xl font-bold">InputNumber</h2>

    <div
      class="mb-2 grid grid-cols-12 gap-4 rounded-md border border-gray-300 p-4 shadow-lg"
    >
      <div class="col-span-6">
        <h3 class="mb-1 text-xl font-bold">整數輸入與設定範圍</h3>
        <InputNumber v-model="value1" inputId="integeronly" fluid />
      </div>
      <div class="col-span-6">
        <h3 class="mb-1 text-xl font-bold">無數字分組與小數點範圍設定</h3>
        <InputNumber
          v-model="value2"
          inputId="withoutgrouping"
          :useGrouping="false"
          :minFractionDigits="2"
          :maxFractionDigits="5"
          fluid
        />
      </div>
      <h3 class="col-span-12 text-xl font-bold">數字切分格式</h3>
      <div class="col-span-4">
        <h4 class="mb-1 text-lg font-bold">美國格式</h4>
        <InputNumber
          v-model="usNumberFormat"
          inputId="currency-us"
          locale="en-US"
          :minFractionDigits="2"
          fluid
        />
      </div>
      <div class="col-span-4">
        <h4 class="mb-1 text-lg font-bold">德國格式</h4>
        <InputNumber
          v-model="germanyNumberFormat"
          inputId="currency-germany"
          locale="de-DE"
          :minFractionDigits="2"
          fluid
        />
      </div>
      <div class="col-span-4">
        <h4 class="mb-1 text-lg font-bold">印度格式</h4>
        <InputNumber
          v-model="indiaNumberFormat"
          inputId="currency-india"
          locale="en-IN"
          :minFractionDigits="2"
          fluid
        />
      </div>
      <h3 class="col-span-12 text-xl font-bold">貨幣格式</h3>
      <div class="col-span-2">
        <h4 class="mb-1 text-lg font-bold">美國貨幣</h4>
        <InputNumber
          v-model="usCurrencyNumberFormat"
          inputId="currency-us"
          locale="en-US"
          mode="currency"
          currency="USD"
          fluid
        />
      </div>
      <div class="col-span-2">
        <h4 class="mb-1 text-lg font-bold">德國貨幣</h4>
        <InputNumber
          v-model="deCurrencyNumberFormat"
          inputId="currency-germany"
          locale="de-DE"
          mode="currency"
          currency="EUR"
          fluid
        />
      </div>
      <div class="col-span-2">
        <h4 class="mb-1 text-lg font-bold">印度貨幣</h4>
        <InputNumber
          v-model="inCurrencyNumberFormat"
          inputId="currency-india"
          mode="currency"
          currency="INR"
          locale="en-IN"
          fluid
        />
      </div>
      <div class="col-span-2">
        <h4 class="mb-1 text-lg font-bold">日本貨幣</h4>
        <InputNumber
          v-model="jpCurrencyNumberFormat"
          inputId="currency-india"
          locale="jp-JP"
          mode="currency"
          currency="JPY"
          fluid
        />
      </div>
      <div class="col-span-2">
        <h4 class="mb-1 text-lg font-bold">新台幣</h4>
        <InputNumber
          v-model="twdCurrencyNumberFormat"
          inputId="currency-india"
          locale="zh-TW"
          mode="currency"
          currency="TWD"
          fluid
        />
      </div>
      <h3 class="col-span-12 text-xl font-bold">前後綴字 (Prefix & Suffix)</h3>
      <div class="col-span-3">
        <h4 class="mb-1 text-lg font-bold">公里</h4>
        <InputNumber v-model="mileValue" inputId="mile" suffix=" mi" fluid />
      </div>
      <div class="col-span-3">
        <h4 class="mb-1 text-lg font-bold">百分比</h4>
        <InputNumber
          v-model="percentValue"
          inputId="percent"
          prefix="%"
          fluid
        />
      </div>
      <div class="col-span-3">
        <h4 class="mb-1 text-lg font-bold">到期天數</h4>
        <InputNumber
          v-model="expiryValue"
          inputId="expiry"
          prefix="剩餘 "
          suffix=" 天"
          fluid
        />
      </div>
      <div class="col-span-3">
        <h4 class="mb-1 text-lg font-bold">溫度</h4>
        <InputNumber
          v-model="temperatureValue"
          inputId="temperature"
          prefix="↑ "
          suffix="℃"
          :min="0"
          :max="40"
          fluid
        />
      </div>
      <h3 class="col-span-12 text-xl font-bold">按鈕操作 (Spinner Buttons)</h3>
      <p class="col-span-12">
        注意：目前想要更改按鈕的 icon，需要使用 incrementIcon 和
        decrementIcon，原先官網的 decrementButtonIcon 已經棄用了
      </p>
      <div class="col-span-3">
        <h4 class="mb-1 text-lg font-bold">預設按鈕</h4>
        <InputNumber
          v-model="spinnerValue1"
          inputId="stacked-buttons"
          showButtons
          mode="currency"
          currency="USD"
          fluid
        />
      </div>
      <div class="col-span-3">
        <h4 class="mb-1 text-lg font-bold">最小最大值</h4>
        <InputNumber
          v-model="spinnerValue2"
          inputId="minmax-buttons"
          mode="decimal"
          showButtons
          :min="0"
          :max="100"
          fluid
        />
      </div>
      <div class="col-span-3">
        <h4 class="mb-1 text-lg font-bold">水平按鈕</h4>
        <InputNumber
          v-model="spinnerValue3"
          inputId="horizontal-buttons"
          showButtons
          buttonLayout="horizontal"
          :step="0.25"
          mode="currency"
          currency="EUR"
          fluid
          incrementIcon="pi pi-plus"
          decrementIcon="pi pi-minus"
        >
        </InputNumber>
      </div>
      <div class="col-span-3">
        <h4 class="mb-1 text-lg font-bold">垂直按鈕</h4>
        <InputNumber
          v-model="spinnerValue4"
          showButtons
          buttonLayout="vertical"
          style="width: 5rem"
          :min="0"
          :max="99"
          incrementIcon="pi pi-plus"
          decrementIcon="pi pi-minus"
        >
        </InputNumber>
      </div>
      <h3 class="col-span-12 text-xl font-bold">變體樣式</h3>
      <div class="col-span-12">
        <h4 class="mb-1 text-lg font-bold">填充樣式</h4>
        <InputNumber v-model="filledValue" variant="filled" fluid />
      </div>
      <div class="col-span-12">
        <h4 class="mb-8 text-lg font-bold">浮動標籤</h4>
        <FloatLabel>
          <InputNumber
            v-model="floatLabelValue"
            inputId="over_label"
            mode="currency"
            currency="USD"
            locale="en-US"
            fluid
          />
          <label for="over_label">金額</label>
        </FloatLabel>
      </div>
      <h3 class="col-span-12 text-xl font-bold">尺寸調整</h3>
      <div class="col-span-4">
        <h4 class="mb-1 text-lg font-bold">小尺寸</h4>
        <InputNumber
          v-model="smallValue"
          size="small"
          placeholder="Small"
          mode="currency"
          currency="USD"
          locale="en-US"
          fluid
        />
      </div>
      <div class="col-span-4">
        <h4 class="mb-1 text-lg font-bold">一般尺寸</h4>
        <InputNumber
          v-model="normalValue"
          placeholder="Normal"
          mode="currency"
          currency="USD"
          locale="en-US"
          fluid
        />
      </div>
      <div class="col-span-4">
        <h4 class="mb-1 text-lg font-bold">大尺寸</h4>
        <InputNumber
          v-model="largeValue"
          size="large"
          placeholder="Large"
          mode="currency"
          currency="USD"
          locale="en-US"
          fluid
        />
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4">
      <h3 class="col-span-12 text-xl font-bold">無效狀態與禁用狀態</h3>
      <div class="col-span-4">
        <h4 class="mb-1 text-lg font-bold">無效狀態</h4>
        <InputNumber
          v-model="invalidValue"
          :invalid="invalidValue === null"
          mode="decimal"
          :minFractionDigits="2"
          placeholder="請輸入金額"
          fluid
        />
      </div>
      <div class="col-span-4">
        <h4 class="mb-1 text-lg font-bold">禁用狀態</h4>
        <InputNumber v-model="disabledValue" disabled prefix="%" fluid />
      </div>
      <div class="col-span-4">
        <h4 class="mb-1 text-lg font-bold">無障礙設計</h4>
        <InputNumber
          v-model="disabledValue"
          inputId="price"
          fluid
          aria-labelledby="label_number"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
