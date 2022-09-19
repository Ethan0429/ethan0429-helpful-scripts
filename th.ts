// requires deno to run as intended
// deno run --allow-net th.ts

import { load } from 'https://cdn.skypack.dev/cheerio'
import * as Colors from "https://deno.land/std@0.156.0/fmt/colors.ts";

const input = async (prompt: string) => {
    // prompt user for input deno style
    await Deno.stdout.write(new TextEncoder().encode(Colors.blue(Colors.bold(prompt))));
    const buffer = new Uint8Array(1024);
    const number = await Deno.stdin.read(buffer);

    // throw error if no input
    if (number == null) {
        throw new Error('Null error!');
    }

    const term = new TextDecoder().decode(buffer.subarray(0, number));
    if (term == undefined || term.at(0) == '\n') {
        throw new Error('Invalid search term.');
    }
    return term;
}

async function thesaurus(term: string) {
    const response = await fetch(`https://www.merriam-webster.com/thesaurus/${term}`);
    const document = await response.text();
    
    const handle = load(document);
    
    const content = handle('meta[name=description]').attr('content');

    if (content == null) {
        console.log(`\n%cNo synonyms found for ${term.toUpperCase()}.`, 'color: red; font-weight: bold;');
        return;
    }

    const [synonyms, antonyms] = content.split('; ');
    console.log(`\n%c${synonyms}`, 'color: green; font-weight: bold;');
    
    antonyms ? console.log(`\n%c${antonyms}\n`, 'color: red; font-weight: bold') : console.log(`\n%cNo antonyms found for ${term.toUpperCase()}.`, 'color: red; font-weight: bold');
    return;
}

const term = Deno.args.length > 0 && Deno.args[0] != 'no-exit' ? Deno.args[0] : await input("Enter a term to lookup: ");
await thesaurus(term);

if (Deno.args.includes('no-exit')) {
    console.log(`%cPress 'Enter' to exit.`, 'color: blue; font-weight: bold;');
    await Deno.stdin.read(new Uint8Array(1));
}
