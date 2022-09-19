// requires deno to run as intended
// deno run --allow-net th.ts

import { load } from 'https://cdn.skypack.dev/cheerio'


const input = async (prompt: String) => {
    const buffer = new Uint8Array(1024);
    console.log(`%c${prompt}`, 'color: blue; font-weight: bold;');
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

Deno.args.length > 0 ? await thesaurus(Deno.args[0]) : await input("Enter a term to lookup: ").then((term) => thesaurus(String(term)));

// press enter to exit
console.log(`\n%cPress 'Enter' to exit.`, 'color: blue; font-weight: bold;');
await Deno.stdin.read(new Uint8Array(1));
