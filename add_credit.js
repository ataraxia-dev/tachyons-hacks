const credit = "extended with https://github.com/ataraxia-dev/tachyons-hacks/"

async function main() {
    const readline = require('readline').createInterface({
        input: process.stdin,
    })
    let found = false;
    for await(const line of readline) {
        if(/TACHYONS/.exec(line)) {
            console.log(line.replace("*/", "| " + credit + " */"));
            found = true;
        }
        else {
            console.log(line);
        }
    }
}

main()
