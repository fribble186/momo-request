/**
 * Description: 
 * 将promise返回的数据持久化，可以不用redux也能简单达到数据持久化的效果
 * 只用了简单的js，在不同的框架中都可以使用
 * 
 * Author: fribble
 * Date: 2020/12/4
 */

 
// utils
const deep_compare = (a, b) => JSON.stringify(a) === JSON.stringify(b)
// 数据持久层
const Store = {}
const Mock = {}
// 暴露的两个方法
export const MRequest = ({ page, ...promises }) => {
  if (Store[page]) return Store[page]
  let services = {}
  for (let promise_key in promises) {
    services["_" + promise_key] = {
      params: null,
      response: null
    }
    services[promise_key] = (...params) => new Promise((resolve, reject) => {
      if (deep_compare(services["_" + promise_key].params, params)) {
        resolve(services["_" + promise_key].response)
      } else {
        services["_" + promise_key].params = params
        promises[promise_key](params).then(data => {
          services["_" + promise_key].response = data
          resolve(data)
        }).catch(reject)
      }
    })
  }
  Store[page] = services
  return Store[page]
}
export const MMockRequest = ({ page, timeout, ...mocks }) => {
  if (Mock[page]) return Mock[page]
  let services = {}
  for (let mock_key in mocks) {
    services[mock_key] = () => new Promise((resolve, reject) => {
      if (timeout) setTimeout(() => resolve(mocks[mock_key]), timeout)
      else resolve(mocks[mock_key])
    })
  }
  Mock[page] = services
  return Mock[page]
}

// demo
let MportfolioAPI = MRequest({
  page: "test",
  hold_record_list: portfolioAPI.hold_record_list
})
let MMockAPI = MMockRequest({
  page: "test",
  hold_record_list: {a: "test"},
  timeout: 3000
})