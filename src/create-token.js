/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Token, ArrayToken} from './types.js';

export const TokenType = {
  Required: 0,
  Optional: 1,
};
function Ref() {}
export class TokenImpl<TResolved> {
  name: string;
  ref: mixed;
  type: $Values<typeof TokenType>;
  optional: ?TokenImpl<TResolved>;
  isCompound = false;

  constructor(name: string, ref: mixed) {
    this.name = name;
    this.ref = ref || new Ref();
    this.type = ref ? TokenType.Optional : TokenType.Required;
    if (!ref) {
      this.optional = new TokenImpl(name, this.ref);
    }
  }
}

export function createToken<TResolvedType>(name: string): Token<TResolvedType> {
  // $FlowFixMe
  return new TokenImpl(name);
}

export function createArrayToken<TResolvedType>(
  name: string
): ArrayToken<TResolvedType> {
  const token = new TokenImpl(name);
  token.isCompound = true;
  // $FlowFixMe
  return token;
}
