import { test, describe, expect } from '@jest/globals';
import { strict as assert } from 'node:assert';
import { countHours } from './src/utils/TimeCalculations';
import renderer from 'react-test-renderer'

import App from './App';

test("Count hours", () => {
    assert.deepEqual(countHours(3_600), 1);
})

