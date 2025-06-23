const format = require('util').format;

async function main() {
    const readline = require('readline').createInterface({
        input: process.stdin,
    })

    let match, mode = "START";
    for await(const line of readline) {
        switch(mode) {
            case "START":
                mode = "HEADER";
                break;
            case "HEADER":
                let found = false;
                /* we're also stripping the variables... */
                const patterns = [
                    /1. External Library/,
                    /- Normalize.css/,
                ];
                for(let p of patterns) {
                    if(p.exec(line)) {
                        found = true;
                        break;
                    }
                }
                if(found) {
                    continue;
                }
                else if(/^\/\* External/.exec(line)) {
                    mode = "NORMALIZE";
                    continue;
                }
                break;
            case "NORMALIZE":
                if(!/Modules/.exec(line)) {
                    continue;
                }
                mode = "END";
                break;
            case "END":
                break;
                
        }
        console.log(line);
    }
}

main()
