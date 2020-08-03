import { Guid } from "guid-typescript";

/**
 * Contains functions to handle guids
 *
 * @export
 * @class GuidHelper
 */
export class GuidHelper {
    /**
     * Creates a guid with twice the length 
     * Example: ce818515-e77d-43dc-855d-dc65e4e92bf61ea19e11-c769-4a4c-9506-1e5a705897f3
     *
     * @static
     * @returns {string}
     * @memberof GuidHelper
     */
    public static createCustomGuid(): string {
        return Guid.create().toString() + Guid.create().toString();
    }

    /**
     * Creates a normal guid
     * Example: ce818515-e77d-43dc-855d-dc65e4e92bf6
     *
     * @static
     * @returns {string} the created guid
     * @memberof GuidHelper
     */
    public static createGuid(): string {
        return Guid.create().toString();
    }
}