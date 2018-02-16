import * as notifier from 'node-notifier'
import * as path from 'path'

/**
 * Logs a message to the console. The level is displayed in ANSI colors,
 * either bright red in case of an error or green otherwise.
 */

function icon(level) {
  return path.resolve(__dirname, `./icons/node_${level}.png`)
}

function log(msg, level): void {
  // console.log(`[${color(level.toUpperCase(), c)}] ${msg}`)
  console.log(msg, level)
}

/**
 * Displays a desktop notification and writes a message to the console.
 */
export const notify = (title, msg, level) => {
  level = level || 'info'
  log(title || msg, level)

  notifier.notify({
    title: title || 'node.js',
    icon: icon(level),
    message: msg,
    timeout: 2
  })
}

notify('hello', 'world', 'error')
