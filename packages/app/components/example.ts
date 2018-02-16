import './example.css'

let fragment = `
<example>
  <h1>ES6 Hot Module Replacement</h1>
  <div class="explanation">
    You can now make changes to files in the packages/app/ directory
    and you'll see those changes happen here immediately,
    all without needing to refresh the page.
  </div>
</example>
`

export default element => {
  element.insertAdjacentHTML('afterbegin', fragment)
}
