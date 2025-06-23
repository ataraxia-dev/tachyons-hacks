const breakpoints = [
    [ "extra-small", "-xs", "min-width: 32rem" ],
    [ "small",       "-s",  "min-width: 48rem" ],
    [ "medium",      "-m",  "min-width: 64rem" ],
    [ "large",       "-l",  "min-width: 80rem" ],
    [ "extra-large", "-xl", "min-width: 96rem" ],
];

function printBreakpointDocs(match) {
    for(const bp of breakpoints) {
        console.log(`${match[1]}${bp[1].padEnd(3, " ")} = ${bp[0]}`);
    }
}

async function main() {
    let slurp = false;
    let skip  = false;
    let buf   = "";

    const readline = require('readline').createInterface({
        input: process.stdin,
    })

    for await(const line of readline) {
        if(skip) {
            continue;
        }

        let found = false;

        /* eat the docs & replace them */
        const patterns = [
            /^( +)-ns = not-small/,
            /^( +)-m  = medium/,
            /^( +)-l  = large/,
        ];
        for(let i = 0; i < patterns.length; i++) {
            let match;
            const p = patterns[i];
            if(match = p.exec(line)) {
                if(i === patterns.length - 1) {
                    /* print new docs on last pattern matched */
                    printBreakpointDocs(match);
                }
                found = true;
            }
        }

        if(found) {
            continue;
        }

        /* slurp the first media query section, then skip the rest */
        const pattern = /@media screen and \(min-width: /
        if(pattern.exec(line)) {
            slurp = true;
            continue;
        }

        if(slurp) {
            buf += line + "\n";
            if(line.match(/^}$/)) {
                skip = true;
            }
            continue;
        }

        /* if we don't do either of those things, just print */
        console.log(line);
    }

    for(let bp of breakpoints) {
        console.log(`@media screen and (${bp[2]}) {`);
        console.log(buf.replace(/(\.[a-z0-9.\\/-]+)-ns {/g, "$1" + bp[1] + " {"));
    }
}

main()
