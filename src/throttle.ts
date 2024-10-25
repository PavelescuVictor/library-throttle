import { IThrottleConfig } from './throttle.types';

export const throttle = (callback: Function, throttleConfig: IThrottleConfig) => {
    const {
        throttleTime = 5000,
        // maxWaitTime = 1000,
        // maxWaitCalls = Infinity,
        // leading = false,
        // trailing = false,
    } = throttleConfig;

    let _timeoutId: number | ReturnType<typeof setTimeout> = -1;
    let _shouldWait: boolean = false;
    let _callbackArgs: Array<any | null> = [];

    const timeoutCallback = () => {
        if (!_callbackArgs.length) {
            _shouldWait = false;
        } else {
            callback(..._callbackArgs);
            _callbackArgs = [];
            setTimeout(timeoutCallback, throttleTime);
        }
    }

    return (...args: any[]) => {
        if (_shouldWait) {
            _callbackArgs = args;
            return;
        }

        callback(...args);
        _shouldWait = true;
        if (_timeoutId !== -1) {
            clearTimeout(_timeoutId);
            _timeoutId = -1;
        }
        _timeoutId = setTimeout(timeoutCallback, throttleTime)
    }
}

export default throttle;