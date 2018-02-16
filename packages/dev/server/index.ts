import * as Koa from 'koa'
const app = new Koa()

// response
app.use($ => {
  $.body = 'Hello Koa'
})

app.listen(() => {
  console.log('Server started - http://localhost:3000')
})
app.listen(3000)
