import React from 'react';
declare type CreateCtx<A> = readonly [
    () => A,
    React.ProviderExoticComponent<React.ProviderProps<A | undefined>>
];
declare function createCtx<A>(): CreateCtx<A>;
export default createCtx;
