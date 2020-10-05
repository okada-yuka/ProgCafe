export const notificationSupported = !!window.Notification;

export const getNotifPermission = (): Promise<NotificationPermission> => {
  if (!notificationSupported) return Promise.resolve('denied');
  if (Notification.permission === 'granted') return Promise.resolve('granted');
  return Notification.requestPermission();
};

/**
 * Example
 * ```
 * isNotfiable.then(() => {
 *   new Notification();
 * })
 * ```
 */
export const isNotifiable = getNotifPermission().then((permission) => ((permission === 'granted')
  ? Promise.resolve()
  : Promise.race([]))); // forever pending
