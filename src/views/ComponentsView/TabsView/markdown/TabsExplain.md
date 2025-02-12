# Tabs

## 基本用法

分頁元件是由 `TabList`、`Tab`、`TabPanels` 和 `TabPanel` 等元件所組成。
`Tab` 和 `TabPanel` 元件透過 `value` 屬性來建立關聯。

```jsx
  <Tabs value="0" :dt="myDt2">
    <TabList>
      <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value" :dt="myDt2">
        {{ tab.title }}
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value">
        <component :is="tab.content" />
      </TabPanel>
    </TabPanels>
  </Tabs>
```


