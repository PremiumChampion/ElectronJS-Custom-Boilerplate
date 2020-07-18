
/**
 * Defines the type of the Boolean input option
 *
 * @export
 * @enum {number}
 */
export enum BooleanDisplayType {
    /**
     * Shows the BooleanOption as Buttons
     */
    Buttons,
    /**
     *Shows the BooleanOption as Toggle
     */
    Toggle,
    /**
     * Shows the BooleanOption as Dropdown
     */
    DropDown
}


/**
 * The custom Actions input types
 *
 * @export
 * @enum {number}
 */
export enum customActionInputType {
    /**
     * Text input option
     */
    text, 
    /**
     * Boolean input option
     */
    boolean, 
    /**
     * Choice input option
     */
    choice
}