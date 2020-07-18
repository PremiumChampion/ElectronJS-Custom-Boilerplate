
export const NotificationChannelNames:
{
    /**
     * The channel name to create a notification
     *
     * @type {string}
     */
    createNotification: string;
    /**
     * the channel name to close a notification
     *
     * @type {string}
     */
    closeNotification: string;
    /**
     * the channel name to show a notification
     *
     * @type {string}
     */
    showNotification: string;
    /**
     * the channel name to hide a notification
     *
     * @type {string}
     */
    hideNotification: string;
    /**
     * the channel name for a notification to recieve props
     *
     * @type {string}
     */
    recieveProps: string;
    /**
     * the channel name where the notification will submit the results
     *
     * @type {string}
     */
    resolveInput: string;
} = {
    createNotification: 'create-notification',
    closeNotification: 'close-notification',
    showNotification: 'show-notification',
    hideNotification: 'hide-notification',
    recieveProps: 'recieve-props',
    resolveInput: 'resolve-input'
};