import './example.css'
import * as text from './example.md'

let fragment = `
<example>
  <h1>ES6 Hot Module Replacement</h1>
  <div class="explanation">
    You can now make changes to files in the packages/app/ directory
    and you'll see those changes happen here immediately,
    all without needing to refresh the page.
  </div>
</example>
`.concat(text)

export default element => {
  element.insertAdjacentHTML('afterbegin', fragment)
}
