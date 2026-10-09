import {expectError, expectType} from 'tsd';
import escapeStringRegexp from './index.js';

expectType<string>(escapeStringRegexp('how much $ for a 🦄?'));
expectType<string>(escapeStringRegexp('a-b', false));
expectError(escapeStringRegexp('a-b', 'false'));
