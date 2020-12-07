# momo-request 简单的请求层的数据持久化

**将请求的数据和参数保存，下次请求可以用保存的数据**

> 只适用于小型项目，不适合请求参数经过复杂处理的页面

## 前言
简单的数据持久化方案，可用于简单的页面，以及标准的api的接口（确定输入获得确定输出）

忘记复杂的全局状态管理，将请求promise和page key传入工厂方法，获得新的api工厂。如果传入相同的request将获得相同的response，不用再次发网络请求

也可以用api工厂里的getParams方法，根据promise key获得该promise上次的请求request

## 使用方法
### 真实请求 api工厂
```
// 获得api工厂
let MportfolioAPI = MRequest({
  page: "test",
  getData: API.getData
})
// 网络请求时
let response = await MportfolioAPI.getData(request_params)
// 拿到上次请求的request params
let getDataParams = MportfolioAPI.getParams("getData")
```

### 调试时可以使用mockData模拟网络请求
```
// mockdata api工厂
let MMockAPI = MMockRequest({
  page: "test",
  getData: {a: "test"},
  timeout: 3000
})
// 请求时
let response = await MMockAPI.getData()
```
