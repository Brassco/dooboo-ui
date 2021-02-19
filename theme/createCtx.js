import React from 'react';
// create context with no upfront defaultValue
// without having to do undefined check all the time
function createCtx() {
    var ctx = React.createContext(undefined);
    function useCtx() {
        var c = React.useContext(ctx);
        if (!c)
            throw new Error('useCtx must be inside a Provider with a value');
        return c;
    }
    // make TypeScript infer a tuple, not an array of union types
    return [useCtx, ctx.Provider];
}
export default createCtx;
