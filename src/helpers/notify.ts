import { Notify } from 'quasar'

type NotifyType = 'positive' | 'negative' | 'warning' | 'info'

export function notify (ntype: NotifyType, message: string) {
  Notify.create({
    type: ntype,
    message: message
  })
}
