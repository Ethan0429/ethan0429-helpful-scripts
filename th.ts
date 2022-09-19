// requires deno to run as intended
// deno run --allow-net th.ts

import { load } from 'https://cdn.skypack.dev/cheerio'


const input = async () => {
    const buffer = new Uint8Array(1024);
    Deno.stdout.writeSync(new TextEncoder().encode('Enter a term to lookup: '));
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
        console.log(`\nNo synonyms found for ${term.toUpperCase()}.`);
        return;
    }

    const [synonyms, antonyms] = content.split('; ');
    console.log(`\n${synonyms}`);
    
    antonyms ? console.log(`\n${antonyms}`) : console.log(`\nNo antonyms found for ${term.toUpperCase()}.`);
    return;
}

Deno.args.length > 0 ? await thesaurus(Deno.args[0]) : await input().then((term) => thesaurus(String(term)));
