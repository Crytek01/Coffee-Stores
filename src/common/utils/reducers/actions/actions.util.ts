/**
 * @description Helper for typing Action Functions
 *
 * If theres no payload please specify the first generic as void
 *
 * Expects first generic to be the payload type
 * Expects second generic to be the return type of the action
 */
export type TActionFunction<T, R> = (payload: T) => R;
