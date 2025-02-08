<style>
.rem25{
font-size:2.5rem;
}
.rem40{
font-size:4.0rem;
}
.rem50{
  font-size:5.0rem;
}
@media (max-width: 576px) {
  .rem25{
    font-size:2rem;
  }
  .rem40{
    font-size:3.0rem;
  }
  .rem50{
    font-size:3.5rem;
  }
}
.red {
color:red;
}
.blue{
color:blue;
}
</style>

# 最佳實踐

透過將您自己的設計標籤 (design tokens) 定義為自訂預設值，您將能夠在不觸及 CSS 
的情況下定義自己的樣式。<span class="red">使用 `CSS class` 覆寫 PrimeVue 元件並不是一個好的做法</span>，應該作為<span class="red">最後的手段</span>，<span class="blue">設計標籤 (design tokens) 才是建議的方法</span>。

##### 資料來源

- [PrimeVue - Best practices](https://primevue.org/theming/styled/)
