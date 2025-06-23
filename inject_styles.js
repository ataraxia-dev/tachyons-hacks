const format = require('util').format;

async function main() {
    const readline = require('readline').createInterface({
        input: process.stdin,
    })

    for await(const line of readline) {
        let match;

        /* inject zero font size class */
        if(match = /( |)\.f1(-[a-z]+|) {/.exec(line)) {
            console.log(match[1] + ".f0" + match[2] + " { font-size: 0; }");
            console.log(line);
            continue;
        }

        /* move bn above ba */
        if(match = /( |)\.ba(-[a-z]+|) {/.exec(line)) {
            console.log(match[1] + ".bn" + match[2] + " { border-style: none; border-width: 0; }");
            console.log(line);
            continue;
        }
        if(match = /( |)\.bn(-[a-z]+|) {/.exec(line)) {
            continue;
        }

        /* inject additional negative margin utilities */
        if(match = /( |)\.nt7(-[a-z]+|) {/.exec(line)) {
            console.log(line);
            let i, counter;
            counter = -0.25;
            for(i = 1; i <= 7; i++) {
                const fmt = "%s.nh%d%s { margin-top: %frem; margin-bottom: %frem; }";
                console.log(format(fmt, match[1], i, match[2], counter, counter));
                counter *= 2;
            }
            counter = -0.25;
            for(i = 01; i <= 7; i++) {
                const fmt = "%s.nv%d%s { margin-left: %frem; margin-right: %frem; }";
                console.log(format(fmt, match[1], i, match[2], counter, counter));
                counter *= 2;
            }
            continue;
        }

        /* inject object-fit & object-position classes */
        if(match = /( |)\.bg-left(-[a-z]+|) {/.exec(line)) {
            console.log(line);
            const fits = ['fill','contain','cover','scale-down','none'];
            fits.forEach(f => {
                const fmt = "%s.object-%s%s { object-fit: %s; };"
                console.log(format(fmt, match[1], f, match[2], f));
            });
            const positions = {
                top: 'top center',
                left: 'center left',
                right: 'center right',
                bottom: 'bottom center',
                center: 'center',
            };
            Object.keys(positions).forEach(k => {
                const fmt = "%s.object-%s%s { object-position: %s; }"
                console.log(format(fmt, match[1], k, match[2], positions[k]));
            });
            continue;
        }

        /* inject sticky position class */
        if(match = /( |)\.fixed(-[a-z]+|) {/.exec(line)) {
            console.log(line);
            const fmt = "%s.sticky%s { position: sticky; }";
            console.log(format(fmt, match[1], match[2]));
            continue;
        }

        /* inject arbitrary 1/16th rem (default 1px) font sizes */
        if(match = /( |)\.f7(-[a-z]+|) {/.exec(line)) {
            console.log(line);
            let i;
            for(i = 4; i <= 96; i++) {
                const fmt = "%s.f--%d%s { font-size: %frem; }";
                console.log(format(fmt, match[1], i, match[2], i / 16));
            }
            continue;
        }

        /* inject extra widths */
        if(match = /( |)\.w-auto(-[a-z]+|) {/.exec(line)) {
            console.log(line);
            let i;
            for(i = 1; i <= 12; i++) {
                const fmt = "%s.w-%d\\/12%s { width: %f%; }" ;
                const percent = ((i / 12) * 100).toFixed(5);
                console.log(format(fmt, match[1], i, match[2], percent));
            }
            continue;
        }

        /* inject extra widths doc */
        if(match = /( +)-auto( +)= string value auto/.exec(line)) {
            console.log(line);
            console.log("")
            for(i = 1; i <= 12; i++) {
                const si = "" + i;
                const percent = (i / 12*100).toFixed(5);
                console.log(`${match[1]}-col${si.padEnd(2, " ")} = ${percent}%`);
            }
            continue;
        }

        console.log(line);
    }
}

main()
