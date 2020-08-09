/**
 * Interface for a valid BasicAdaptiveCardItem
 *
 * @export
 * @interface BasicAdaptiveCardItem
 */
export interface BasicAdaptiveCardItem {
    /**
     * returns your adaptive card item object
     *
     * @memberof BasicAdaptiveCardItem
     */
    toAdapticeCardItem: () => any;
}

/**
 * The body of the AdaptiveCard
 *
 * @export
 * @interface BasicAdaptiveCardBody
 */
export interface BasicAdaptiveCardBody {
    /**
     * the type of the adaptive card body
     *
     * @type {string}
     * @memberof BasicAdaptiveCardBody
     */
    type: string;
    /**
     * The items of the adaptive card
     *
     * @type {any[]}
     * @memberof BasicAdaptiveCardBody
     */
    items: any[];
    /**
     * Indicates if an seperator should be shown
     *
     * @type {boolean}
     * @memberof BasicAdaptiveCardBody
     */
    separator: boolean;
}

/**
 * The basic adaptive card item
 *
 * @export
 * @class BasicAdaptiveCard
 * @template T The type of the adaptive card
 */
export class BasicAdaptiveCard<T extends BasicAdaptiveCardItem> {

    /**
     * The type of the BasicAdaptiveCard
     *
     * @type {string}
     * @memberof BasicAdaptiveCard
     */
    public type: string;
    /**
     * the version of the BasicAdaptiveCard
     *
     * @type {string}
     * @memberof BasicAdaptiveCard
     */
    public version: string;
    /**
     * the body of the BasicAdaptiveCard
     *
     * @type {BasicAdaptiveCardBody}
     * @memberof BasicAdaptiveCard
     */
    public body: BasicAdaptiveCardBody[];

    constructor() {
        this.type = "AdaptiveCard";
        this.version = "1.0";
        this.body = [{
            type: "Container",
            items: [],
            separator: true
        }];
    }

    /**
     * Adds a single item to the adaptive card
     *
     * @param {T} item the item to add
     * @memberof BasicAdaptiveCard
     */
    public addItem(item: T) {
        this.body[0].items.push(...item.toAdapticeCardItem());
    }

    /**
     * Adds multiple items to the adaptive card
     *
     * @param {T[]} items the items to add
     * @memberof BasicAdaptiveCard
     */
    public addItems(items: T[]) {
        items.forEach((item) => {
            this.addItem(item);
        });
    }

    /**
     * Creates the adaptive card
     *
     * @return {object}  {object} the adaptive card
     * @memberof BasicAdaptiveCard
     */
    public toAdaptiveCard(): object {
        return {
            "type": this.type,
            "version": this.version,
            "body": this.body,
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
        }
    }
}