/**
* Queries the current working context
*
* @returns {boolean} TRUE if the user is in the renderer process FALSE if the user is in the main process
*/
export const isRendererProcess: () => boolean = () => {
    if (typeof process === 'undefined') return true
    if (!process) return true
    if (!process.type) return false
    return process.type === 'renderer'
}

/**
* Queries the current working context
*
* @returns {boolean} TRUE if the user is in the main process FALSE if the user is in the renderer process 
*/
export const isMainProcess: () => boolean = () => {
    return !isRendererProcess();
}