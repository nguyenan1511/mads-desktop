# MADS SATS

## Project Setup

### Install

```bash
$ yarn
```

### Development

```bash
$ yarn dev
```

### Build

```bash
# For windows
$ yarn build:win

# For macOS
$ yarn build:mac

# For Linux
$ yarn build:linux
```


# Auto updater
### Notes
* Update version in the `package.json` everytime if we have a new release.
* macOS application must be [signed](https://www.electron.build/code-signing) in order for auto updating to work.
* Private GitHub provider only for very special cases — not intended and not suitable for all users.
* The GitHub API currently has a rate limit of 5000 requests per user per hour. An update check uses up to 3 requests per check.
### 1. Setting github repository
```yml
# Publish application
publish:
  provider: github
  owner: your-github-username
  repo: mads-sat
  releaseType: release
```
### 2. Build and create a release (this guide for windows)
#### 2.1 Build command
```sh
yarn build:win
```
#### 2.2 Files in the `dist` folder
```
dist\builder-debug.yml
dist\builder-effective-config.yaml
dist\latest.yml
dist\mads-sat-1.0.0-setup.exe
dist\mads-sat-1.0.0-setup.exe.blockmap
```
#### 2.3 Create release
* Follow [This link](https://docs.github.com/fr/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release) to create new release
* Values will be filled in the UI
  * Tag: same as version in the `package.json`, prefix by `v` (e.g. v1.0.1)
  * Target: choose `master`
  * Title: type as you want
  * Description: type as you want
  * Upload files in the step 2.2 to the `Attach binaries by dropping them here or selecting them.` area
  * Choose `Set as the latest release` check box
  * Publish release
