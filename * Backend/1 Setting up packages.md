## Preface
These are my notes for documenting my learning process for backend (specifically web) development
A lot of it will probably be jotting down notes/random bits of code while I figure things out
I'll maybe write fuller fledged 'notes' or instructions if I feel like it.

Also, this is all in the context of [**node.js**](https://nodejs.org/en)
## Package manager
### Picking a package manager
Okay, so by now, you should probably have [node.js](https://nodejs.org/en) installed. I personally have all of my node instances installed per project directory using [direnv](https://direnv.net/) and [nix flakes](https://nixos.wiki/wiki/Flakes) to prevent conflicting node versions, but you probably shouldn't try and worry about that since its just a gimmick thing.

There are various different package managers you can use (for node packages) but the most commonly used one is [npm](https://www.npmjs.com/).
I personally like using [yarn](https://yarnpkg.com/) but i don't think it really matters since it seems like its just preference but what i write will all be in yarn. npm is basically the same with some minor command changes, but it won't be too hard to change 

For now, just download one of these and look things up as you go
### Setting up package manager stuff
Like I said, I like yarn so the commands and stuff might be yarn specific

Let's initialize our project 
```bash
#!/project/
mkdir backend
cd backend

#!/project/backend/
yarn init
```
running `yarn init` will prompt you a couple of questions, mostly which you can just leave as default (by hitting enter)
```bash
# To automatically accept all default values, just run this:
yarn init -y
```
If anything, you can change your entry point (i use server.js)

This will generate a `package.json` file in your backend which will handle all of the requirements for your environment/project. Which all of these reside in `/node_modules`
### oh my god please add `node_modules` to `.gitignore` 
### Adding/Removing Packages
Adding/removing packages is easy
```bash
#!/project/backend
yarn add foo

yarn remove foo
```
That's it. Sometimes you add a little `-D` flag when you add packages, but when you look up the packages, it'll usually tell you to do it
