import { Chrono } from "../chrono/chrono.js";



/**
 * Base class for timekeeping-related classes.
 */
export class Until {

    _inUpdateLoop = false;
    _stopUpdateLoopFlag = false;
    #whenLoopStoppedStack = [];


    /**
     * Starts a loop which continuously calls a function.
     * Only one loop can be run at once.
     * @param {Function} func The function to be continuously called.
     * @param {Number} delayMilliseconds The delay, in milliseconds, to loop-call the function.
     * @param {...*} args The arguments to call func with.
     * @return {Boolean} Returns true if the update loop was started, and false otherwise.
     */
    startUpdateLoop(func, delayMilliseconds, ...args) {
        if (!this._inUpdateLoop && !this._stopUpdateLoopFlag) {
            this.#updateLoop(this, func, delayMilliseconds, ...args);
            this._inUpdateLoop = true;
            return true;
        } else
            return false;
    }


    /**
     * Runs a loop which continuously calls a function.
     * @param {Object} thisArg Stores the 'this' variable, since setTimeout can only be called by Window.
     * @param {Function} func The function to be continuously called.
     * @param {Number} delayMilliseconds The delay, in milliseconds, to loop-call the function.
     * @param {...any} args The arguments to call func with.
     */
    #updateLoop(thisArg, func, delayMilliseconds, ...args) {
        if (thisArg._stopUpdateLoopFlag)
            thisArg._inUpdateLoop = thisArg._stopUpdateLoopFlag = false;
        else {
            func.call(thisArg, ...args);
            setTimeout(thisArg.#updateLoop, delayMilliseconds, thisArg, func, delayMilliseconds, ...args);
        }
    }


    /**
     * Returns true if this Until is in an update loop.
     * @return {Boolean}
     */
    inUpdateLoop() {
        return this._inUpdateLoop;
    }


    /**
     * Stops the update loop of this Until.
     */
    stopUpdateLoop() {
        this._stopUpdateLoopFlag = true;
        
        for (const func of this.#whenLoopStoppedStack)
            func();

        this.#whenLoopStoppedStack.length = 0;
    }


    /**
     * Run a function when stopUpdateLoop() is called.
     * @param {Object} thisArg 
     * @param {Function} func 
     * @param  {...any} args 
     */
    appendLoopStoppedStack(thisArg, func, ...args) {
        this.#whenLoopStoppedStack.push(func.bind(thisArg, ...args));
    }

}
