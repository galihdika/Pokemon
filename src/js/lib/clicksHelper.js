/* 
Prevent firing single click on double click event in the same element (use in the functional component)
from https://medium.com/trabe/prevent-click-events-on-double-click-with-react-with-and-without-hooks-6bf3697abc40
*/
import { useRef } from 'react';

const cancellablePromise = promise => {
    let isCanceled = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
            value =>
                isCanceled ? reject({ isCanceled, value }) : resolve(value),
            error => reject({ isCanceled, error })
        );
    });

    return {
        promise: wrappedPromise,
        cancel: () => (isCanceled = true)
    };
};

const delay = n => new Promise(resolve => setTimeout(resolve, n));

const useCancellablePromises = () => {
    const pendingPromises = useRef([]);

    const appendPendingPromise = promise =>
        (pendingPromises.current = [...pendingPromises.current, promise]);

    const removePendingPromise = promise =>
        (pendingPromises.current = pendingPromises.current.filter(
            p => p !== promise
        ));

    const clearPendingPromises = () =>
        pendingPromises.current.map(p => p.cancel());

    const api = {
        appendPendingPromise,
        removePendingPromise,
        clearPendingPromises
    };

    return api;
};

const useClickPreventionOnDoubleClick = (onClick, onDoubleClick) => {
    const api = useCancellablePromises();

    const handleClick = () => {
        api.clearPendingPromises();
        const waitForClick = cancellablePromise(delay(210));
        api.appendPendingPromise(waitForClick);

        return waitForClick.promise
            .then(() => {
                api.removePendingPromise(waitForClick);
                onClick();
            })
            .catch(errorInfo => {
                api.removePendingPromise(waitForClick);
                if (!errorInfo.isCanceled) {
                    throw errorInfo.error;
                }
            });
    };

    const handleDoubleClick = () => {
        api.clearPendingPromises();
        onDoubleClick();
    };

    return [handleClick, handleDoubleClick];
};

export default useClickPreventionOnDoubleClick;
