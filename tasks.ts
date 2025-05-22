import { Task } from 'https://raw.githubusercontent.com/sinclairzx81/tasksmith/0.8.2/src/index.ts'

// ------------------------------------------------------------------
// Clean
// ------------------------------------------------------------------
Task.run('clean', async () => {
  await Task.folder('target').delete()
})
// ------------------------------------------------------------------
// Format
// ------------------------------------------------------------------
Task.run('format', async () => {
  await Task.shell('deno fmt src')
})
// ------------------------------------------------------------------
// Start
// ------------------------------------------------------------------
Task.run('start', async () => {
  await Task.shell('deno run -A --watch example/index.ts')
})
// ------------------------------------------------------------------
// Test
// ------------------------------------------------------------------
Task.run('test', async () => {
  await Task.shell('deno test -A test')
})
// ------------------------------------------------------------------
// Build
// ------------------------------------------------------------------
Task.run('build', () => Task.build('src', {
  compiler: 'latest',
  outdir: 'target/build',
  additional: ['license', 'readme.md'],
  packageJson: {
    name: '@sinclair/parsebox',
    description: 'Parser Combinators in the TypeScript Type System',
    version: '0.9.6',
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
Task.run('publish', async (otp: string, target: string = `target/build`) => {
  const { version } = JSON.parse(await Deno.readTextFile(`${target}/package.json`))
  if(version.includes('-dev')) throw Error(`package version should not include -dev specifier`)
  await Task.shell(`cd ${target} && npm publish sinclair-parsebox-${version}.tgz --access=public --otp ${otp}`)
  await Task.shell(`git tag ${version}`)
  await Task.shell(`git push origin ${version}`)
})