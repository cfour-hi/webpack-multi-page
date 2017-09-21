// 此文件用来修改除首页之外的页面 entry name（默认是 index）
// entry name 为每个页面的 html、css、js 文件名

module.exports = [
  {
    dir: 'page-b', // 页面目录路径
    name: 'pageb'  // entry name
  },
  {
    dir: 'page-b/sub-page-b',
    name: 'sub-page-b'
  }
]
