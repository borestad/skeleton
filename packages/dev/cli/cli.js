async function hello (props) {
  return new Promise(resolve => {
    resolve('hello world')
  })
}

module.exports = hello
