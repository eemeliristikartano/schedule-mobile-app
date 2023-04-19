import { test } from '@jest/globals';
import { strict as assert } from 'node:assert';
import { countHours, countMinutes } from '../utils/TimeCalculations';

test("Count hours with 3 599 seconds - should be 0", () => {
    assert.deepEqual(countHours(3_599), 0);
});

test("Count hours with 3 600 seconds - should be 1", () => {
    assert.deepEqual(countHours(3_600), 1);
});

test("Count hours with 3 601 seconds - should be 1", () => {
    assert.deepEqual(countHours(3_601), 1);
});

test("Count hours with 7 199 seconds - should be 1", () => {
    assert.deepEqual(countHours(7_199), 1);
})

test("Count minutes with 3 599 seconds - should be 59", () => {
    assert.deepEqual(countMinutes(3_599), 59);
});

test("Count minutes with 3 600 seconds - should be 0", () => {
    assert.deepEqual(countMinutes(3_600), 0);
});

test("Count minutes with 3 659 seconds - should be 0", () => {
    assert.deepEqual(countMinutes(3_659), 0);
});

test("Count minutes with 3 660 seconds - should be 1", () => {
    assert.deepEqual(countMinutes(3_660), 1);
});

