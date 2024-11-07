import * as Fs from 'node:fs'

// -------------------------------------------------------------------------------
// Clean
// -------------------------------------------------------------------------------
export async function clean() {
  await folder('target').delete()
}

// -------------------------------------------------------------------------------
// Format
// -------------------------------------------------------------------------------
export async function format() {
  await shell('prettier --no-semi --single-quote --print-width 512 --trailing-comma all --write src test example/index.ts')
}

// -------------------------------------------------------------------------------
// Start
// -------------------------------------------------------------------------------
export async function start() {
  await shell('hammer run example/index.ts --dist target/example')
}

// -------------------------------------------------------------------------------
// Test
// -------------------------------------------------------------------------------
export async function test_typescript() {
  for (const version of ['4.9.5', '5.0.4', '5.1.3', '5.1.6', '5.2.2', '5.3.2', '5.3.3', '5.4.3', '5.4.5', '5.5.2', '5.5.3', '5.5.4', '5.6.2', 'next', 'latest']) {
    await shell(`npm install typescript@${version} --no-save`)
    await test_static()
  }
}
export async function test_static() {
  await shell(`tsc -v`)
  await shell(`tsc -p test/tsconfig.json --noEmit`)
}
export async function test_runtime(filter = '') {
  await shell(`hammer build ./test/runtime/index.ts --dist target/test/runtime --platform node`)
  await shell(`mocha target/test/runtime/index.js -g "${filter}"`)
}
export async function test(filter = '') {
  await test_static()
  await test_runtime(filter)
}
// -------------------------------------------------------------------------------
// Build
// -------------------------------------------------------------------------------
export async function build(target = 'target/build') {
  await test()
  await shell(`tsc -p src/tsconfig.json --outDir ${target} --declaration`)
  await folder(target).add('licence')
  await folder(target).add('package.json')
  await folder(target).add('readme.md')
  await shell(`cd ${target} && npm pack`)
}
// -------------------------------------------------------------
// Publish
// -------------------------------------------------------------
export async function publish(otp, target = 'target/build') {
  const { version } = JSON.parse(Fs.readFileSync('package.json', 'utf8'))
  if(version.includes('-dev')) throw Error(`package version should not include -dev specifier`)
  await shell(`cd ${target} && npm publish sinclair-parsebox-${version}.tgz --access=public --otp ${otp}`)
  await shell(`git tag ${version}`)
  await shell(`git push origin ${version}`)
}
