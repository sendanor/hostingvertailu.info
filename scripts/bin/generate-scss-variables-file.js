#!/usr/bin/env node

const PATH = require('path');

const RELATIVE_INPUT_FILE = 'docs/_data/variables.json';

const INPUT_FILE = PATH.resolve(__dirname, `../../${RELATIVE_INPUT_FILE}`);

const INPUT = require(INPUT_FILE);

console.log(`/* THIS FILE IS AUTOGENERATED -- DO NOT MAKE CHANGES! */`);
console.log(`/* Created using ./scripts/bin/compile-scss-variables.sh from ./${RELATIVE_INPUT_FILE} */`);

const toKebab = (string) => string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

const SEEN_VALUES = [];

Object.keys(INPUT).forEach(key => {

    const value = INPUT[key];

    if ( SEEN_VALUES.indexOf(value) >= 0 ) {
        console.warn(`Warning! Duplicate value for ${key}`);
    } else {
        SEEN_VALUES.push(value);
    }

    console.log(`\$${toKebab(key)} : '${value}';`)
});
