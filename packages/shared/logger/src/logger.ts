import chalk from 'chalk'
import winston, { format } from 'winston'

const customFormat = format.printf((meta: any) => {
  const { level, message, timestamp, namespace, func, stack, ...restMeta } = meta
  const displayNamespace = namespace ? `[${namespace}]` : ''
  const displayFunction = func ? ` (${func})` : ''
  const stackMessage = stack ? `\n${stack}` : ''
  const otherMetaMessage = Object.keys(restMeta).length > 0 ? `\n${JSON.stringify(restMeta)}` : ''

  const color = level.indexOf('info') > -1 ? 'yellow' : 'cyan'

  return `${chalk.blue(level)} - ${chalk.green(timestamp)} ${chalk.magenta(
    displayNamespace
  )}${chalk.cyan(displayFunction)}: ${chalk[color](
    typeof message === 'object' ? `\n${JSON.stringify(message)}` : message
  )} ${chalk.white(otherMetaMessage)}${chalk.red(stackMessage)}`
})

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      silent: process.env.NODE_ENV === 'production',
      format: format.combine(
        format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        customFormat
      )
    })
  ]
})

export const Logger = (namespace?: string): winston.Logger => {
  if (namespace) {
    if (namespace.endsWith('.js')) {
      namespace = namespace.split('dist\\')[1]
      namespace = namespace.replace('.js', '.ts')
    }
    return logger.child({ namespace })
  }
  return logger
}
