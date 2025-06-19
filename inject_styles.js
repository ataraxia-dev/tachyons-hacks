const format = require('util').format;

async function main() {
    const readline = require('readline').createInterface({
        input: process.stdin,
    })

    for await(const line of readline) {
        let match;

        /* inject extra font sizes */
        if(match = /( |)\.f7(-[a-z]+|) {/.exec(line)) {
            let i;
            for(i = 4; i <= 96; i++) {
                const fmt = "%s.f--%d%s { font-size: %frem; }";
                console.log(format(fmt, match[1], i, match[2], i / 16));
            }
        }

        /* inject extra widths */
        if(match = /( |)\.w-auto(-[a-z]+|) {/.exec(line)) {
            console.log(line);
            let i;
            for(i = 1; i <= 12; i++) {
                const fmt = "%s.w-col%d%s { width: %f%; }" ;
                console.log(format(fmt, match[1], i, match[2], ((i / 12) * 100).toFixed(5)));
            }
            continue;
        }

        /* inject extra widths doc */
        if(match = /( +)-auto( +)= string value auto/.exec(line)) {
            console.log(line);
            console.log("")
            for(i = 1; i <= 12; i++) {
                const si = "" + i;
                console.log(`${match[1]}-col${si.padEnd(2, " ")} = ${(i/12*100).toFixed(5)}%`);
            }
        }

        if(!match) {
            console.log(line);
        }
    }
}

main()
