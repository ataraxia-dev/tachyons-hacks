dist/tachyons-extended.css: tachyons.css inject_styles.js add_breakpoints.js strip_normalize.js add_credit.js
	mkdir -p dist; \
	cat tachyons.css | \
		node inject_styles.js | \
		node add_breakpoints.js | \
		node strip_normalize.js | \
		node add_credit.js > dist/tachyons-extended.css

