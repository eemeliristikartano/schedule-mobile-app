import { test } from '@jest/globals';
import { strict as assert } from 'node:assert';
import { formatTime } from '../utils/FormatTime';

test("Format time with 61 seconds - should be 00:01", () => {
    assert.deepEqual(formatTime(61), '00:01');
});

test("Format time with 600 seconds - should be 00:10", () => {
    assert.deepEqual(formatTime(600), '00:10');
});

test("Format time with 3 600 seconds - should be 01:00", () => {
    assert.deepEqual(formatTime(3_600), '01:00');
});

test("Format time with 36 000 seconds - should be 10:00", () => {
    assert.deepEqual(formatTime(36_000), '10:00');
});

