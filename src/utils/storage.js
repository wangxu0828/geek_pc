class Storage {
  /**
   * 从缓存中获取数据
   * @param {*} key
   * @returns
   */
  getCache = (key) => {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    } else {
      return false
    }
  }

  /**
   * 存储数据到缓存
   * @param {*} key
   * @param {*} value
   */
  setCache = (key, value) => {
    window.localStorage.setItem(key, value)
  }

  /**
   * 删除缓存某一项
   * @param {*} key
   */
  removeCache = (key) => {
    window.localStorage.removeItem(key)
  }

  /**
   * 清除缓存所有数据
   */
  clearCache = () => {
    window.localStorage.clear()
  }
}

const cache = new Storage()
export default cache
