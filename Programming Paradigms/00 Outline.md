### Compiler/Language
- [ghc compiler \(for nix\)](https://search.nixos.org/packages?channel=25.11&show=ghc&query=ghc)
- flake template
```nix
{
  description = "ghc template";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  inputs.systems.url = "github:nix-systems/default";
  inputs.flake-utils = {
    url = "github:numtide/flake-utils";
    inputs.systems.follows = "systems";
  };

outputs = 
  { nixpkgs, flake-utils, ... }:
  flake-utils.lib.eachDefaultSystem (
    system:
    let
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShells.default = pkgs.mkShell {
        packages = [
          pkgs.ghc
        ];
      };
    }
  );
}
```
---
