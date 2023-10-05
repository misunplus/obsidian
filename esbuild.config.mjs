import esbuild from "esbuild";
import process from "process";
import builtins from 'builtin-modules'
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

const banner =
`/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;

const prod = (process.argv[2] === 'production');

esbuild.build({
	banner: {
		js: banner,
	},
	entryPoints: ['main.ts'],
	bundle: true,
	external: ['obsidian', 'electron', ...builtins],
	format: 'cjs',
	target: 'es2016',
	logLevel: "info",
	sourcemap: prod ? false : 'inline',
	treeShaking: true,
	outfile: 'main.js',
	plugins: [
		esbuildSvelte({
		  compilerOptions: { css: 'injected'},
		  preprocess: sveltePreprocess(),
		}),
	  ],
}).catch(() => process.exit(1));
