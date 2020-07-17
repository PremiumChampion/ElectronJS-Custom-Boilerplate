export class NotificationsRenderer {
    public static createNotification(title: string, message: string = "") {
        let newNotification = new Notification(title, { body: message, lang: "DE-DE" } as NotificationOptions);
    }

    public static getUserInputFromNotification(title: string, message: string = ""): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let newNotification = new Notification(title, { body: message, lang: "DE-DE", renotify: false, requireInteraction: true } as NotificationOptions);
            newNotification.onclick = (ev: Event) => {
                if(ev.returnValue){
                    
                }
           };
        });
    }
}