import { Task } from 'tasksmith'

const VERSION = '0.11.3'

// ------------------------------------------------------------------
// Clean
// ------------------------------------------------------------------
Task.run('clean', () => Task.folder('target').delete())
// ------------------------------------------------------------------
// Format
// ------------------------------------------------------------------
Task.run('format', () => Task.shell('deno fmt src test'))
// ------------------------------------------------------------------
// Lint
// ------------------------------------------------------------------
Task.run('lint', () => Task.shell('deno lint src'))
// ------------------------------------------------------------------
// Start
// ------------------------------------------------------------------
Task.run('start', () => Task.shell('deno run -A --watch example/index.ts'))
// ------------------------------------------------------------------
// Test
// ------------------------------------------------------------------
Task.run('test', async (filter: string = '') => 
  Task.shell('deno lint src').catch(() => null).then(() => 
    Task.test.run(['test/parsebox'], { filter }))
)
// ------------------------------------------------------------------
// Fast
// ------------------------------------------------------------------
Task.run('fast', async (filter: string = '') => Task.test.run(['test/parsebox'], { watch: true, noCheck: true, filter }))
// ------------------------------------------------------------------
// Report
// ------------------------------------------------------------------
Task.run('report', async () => Task.test.report(['test/parsebox']))
// ------------------------------------------------------------------
// Build
// ------------------------------------------------------------------
Task.run('build', () => Task.build.dual('src', {
  compiler: '6.0.2',
  outdir: 'target/build',
  additional: ['license', 'readme.md'],
  packageJson: {
    name: '@sinclair/parsebox',
    description: 'Parser Combinators in the TypeScript Type System',
    version: VERSION,
    keywords: ['typescript', 'parser', 'combinator'],
    license: 'MIT',
    author: 'sinclairzx81',
    repository: {
      type: 'git',
      url: 'https://github.com/sinclairzx81/parsebox'
    }
  },
}))
// ------------------------------------------------------------------
// Publish
// ------------------------------------------------------------------
Task.run('publish', async (target: string = `target/build`) => {
  const { version } = JSON.parse(await Task.file(`${target}/package.json`).read())
  await Task.shell(`git tag ${version}`)
  await Task.shell(`git push origin ${version}`)
})