import test from 'ava';
import escapeStringRegexp from './index.js';

test('main', t => {
	t.is(
		escapeStringRegexp('\\ ^ $ * + ? . ( ) | { } [ ]'),
		'\\\\ \\^ \\$ \\* \\+ \\? \\. \\( \\) \\| \\{ \\} \\[ \\]'
	);
});

test('escapes `-` in a way compatible with PCRE', t => {
	t.is(
		escapeStringRegexp('foo - bar'),
		'foo \\x2d bar'
	);
});

test('escapes `-` in a way compatible with the Unicode flag', t => {
	t.regex(
		'-',
		new RegExp(escapeStringRegexp('-'), 'u')
	);
});

test('leaves hyphens literal when disabled without skipping other escaping', t => {
	const input = 'a-b$[c]';
	const escapedString = escapeStringRegexp(input, false);

	t.is(escapedString, 'a-b\\$\\[c\\]');
	t.true(new RegExp(`^${escapedString}$`, 'u').test(input));
});
