# About

These scripts are intended for a Unix environment, and are mostly suited to my needs. This repo is mainly so I can keep them organized across drivers and for fun. Most of these scripts are configured via shortcut on my personal computer.

## Scripts

- [airdrop.sh](airdrop.sh)
- [config.sh](config.sh)
- [batch-rename.sh](batch-rename.sh)
- [th.ts](th.ts)

### airdrop.sh

Opens a site [snapdrop](https://snapdrop.net/#) from Firefox. Allows one to send/receive files/text messages with anyone on the same network. Useful for Linux since there's no airdrop like Apple.

```
$ ./airdrop.sh
```

### config.sh

Opens my `.zshrc` in vscode for easy editing

```
$ ./config.sh
```

### batch-rename.sh

Removes a substring `s` from all file names in the current directory.

```
$ ./batch-rename txt
renamed 'abcdtxt' -> 'abcd'
renamed 'txtabc' -> 'abc'
renamed 'urtxtmom' -> 'urmom'
```

### th.ts

Queries [Merriam Webster](https://www.merriam-webster.com) for synonyms/antonyms related to term `t`

Requires [deno](https://deno.land/manual@v1.25.3/getting_started/installation) for a JS/TS browser-like runtime

Optional args:

```bash
no-exit # keeps stdin open even after finished query - should be the last arg
[term]  # the term being searched.
        # term will be prompted for interactively if no argument is provided
```

Run remotely:

```
$ deno run --allow-net https://raw.githubusercontent.com/Ethan0429/ethan0429-helpful-scripts/main/th.ts
```

Run locally:

```
$ deno run --allow-net th.ts
```

Install locally/remotely:

```bash
# local
$ deno install --allow-net th.ts
# remote
$ deno install --allow-net https://raw.githubusercontent.com/Ethan0429/ethan0429-helpful-scripts/main/th.ts
# usage example after install
$ th peachy no-exit
```
