Two scripts are included, alongside the latest release of Tachyons.

To run the hack, do this:

```sh
$ cat tachyons.css | node inject_styles.js | node add_breakpoints.js
```

The scripts may also be run independently of one another if you prefer to use just some of the modifications. Breakpoints maybe be easily adjusted by editing `add_breakpoints.js`.
