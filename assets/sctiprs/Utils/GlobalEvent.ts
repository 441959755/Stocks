
//事件消息
//

interface EventData {
    callback: Function,
    target: any,
}

class EventManager {

    private eventsMap: Map<string, [EventData]> = new Map();

    public on(eventName: string, callback: Function, target?) {

        let eventData = this.eventsMap.get(eventName);
        if (!eventData) {
            this.eventsMap.set(eventName, [{ callback, target }]);
        }
        else {
            eventData.push({ callback, target });
            this.eventsMap.set(eventName, eventData);
        }
    }

    public emit(eventName, arg?, args1?, args2?) {

        if (!this.eventsMap.has(eventName)) {
            return;
        }

        let eventdata = this.eventsMap.get(eventName);

        eventdata.forEach(el => {

            if (el.target && !el.target.node) {
                el.callback.call(el.target, arg, args1, args2);
            }

            else if (el.target.node.active) {
                el.callback.call(el.target, arg, args1, args2);
            }
        })
    }

    public off(eventName) {
        if (!this.eventsMap.has(eventName)) {
            return;
        }
        this.eventsMap.delete(eventName);
    }

    public allClear() {
        this.eventsMap.clear();
    }

}

export default new EventManager();
