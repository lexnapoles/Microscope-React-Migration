Helpers = (() => {
	const pluralize = (n, thing) => n === 1 ? `1 ${thing}` : `${n} ${thing}s`;

	return {
		pluralize: pluralize,
	};
})();



