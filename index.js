export default function escapeStringRegexp(string, escapeHyphen = true) {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	// Escape characters with special meaning either inside or outside character sets.
	// Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
	const escapedString = string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
	return escapeHyphen ? escapedString.replace(/-/g, '\\x2d') : escapedString;
}
