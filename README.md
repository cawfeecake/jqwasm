# jqwasm

The goal of this project is to release a WebAssembly version of `jq` for every
new release of the `jq` program (starting w/ 1.7)

## TODO

- Running the release workflow will create a new tag and release artifacts
  - Overrides previous release of same version if one exists
- Manually run the release workflow with a new `jq` version, and then have the workflow
update the codebase with the new version
  - If it is ran with a version that is older than what is checked in, it will create a
release for it (overriding if needed), but won't update the codebase

## Local development

After `git clone`, do `git submodule update --init --recursive` in the project's directory
to download its submodules (and those submodules' dependent submodules).

### Update/change `jq` submodule reference

```sh
cd ${submodule}
git checkout ${tag}
cd ..
git add ${submodule}
```

### Add a new submodule

```sh
git submodule add https://github.com/${owner}/${repoName}
# e.g.
git submodule add https://github.com/jqlang/jq
```

# Credits

Referenced the source of [jq-web](https://github.com/fiatjaf/jq-web) for building `jq` with Emscripten
