# Neovim Cheatsheet

**Leader key: `Space`** | Theme: Catppuccin Mocha | Plugin manager: lazy.nvim

---

## Navigation

### Window Navigation

| Key | Action |
|-----|--------|
| `Ctrl+h` | Move to left window |
| `Ctrl+l` | Move to right window |
| `Ctrl+j` | Move to lower window |
| `Ctrl+k` | Move to upper window |

### Buffer / Tab Navigation

| Key | Action |
|-----|--------|
| `Shift+h` | Previous buffer |
| `Shift+l` | Next buffer |
| `<leader>bd` | Delete buffer |
| `<leader><leader>` | Find open buffers |

### File Explorer (Neo-tree)

| Key | Action |
|-----|--------|
| `<leader>e` | Toggle file explorer |
| `<leader>o` | Focus file explorer |

---

## Finding Things (Telescope)

| Key | Action |
|-----|--------|
| `<leader>sf` | Search files |
| `<leader>sg` | Live grep (search text across files) |
| `<leader>sw` | Search current word |
| `<leader>sd` | Search diagnostics |
| `<leader>sr` | Resume last search |
| `<leader>s.` | Recent files |
| `<leader>sh` | Search help tags |
| `<leader>sk` | Search keymaps |
| `<leader>ss` | Search Telescope builtins |
| `<leader>/` | Fuzzy search in current buffer |

---

## LSP - Code Intelligence

### Go To

| Key | Action |
|-----|--------|
| `gd` | Go to definition |
| `gr` | Go to references |
| `gI` | Go to implementation |
| `gD` | Go to declaration |
| `<leader>D` | Go to type definition |

### Code Actions

| Key | Action |
|-----|--------|
| `<leader>rn` | Rename symbol |
| `<leader>ca` | Code action |
| `K` | Hover documentation |
| `<leader>k` | Signature help |
| `<leader>th` | Toggle inlay hints |

### Symbols

| Key | Action |
|-----|--------|
| `<leader>ds` | Document symbols |
| `<leader>ws` | Workspace symbols |

---

## Diagnostics / Errors (Trouble)

| Key | Action |
|-----|--------|
| `<leader>xx` | Toggle diagnostics list |
| `<leader>xX` | Toggle buffer diagnostics |
| `<leader>q` | Open diagnostic quickfix list |

---

## Git (Gitsigns + Lazygit)

| Key | Action |
|-----|--------|
| `]h` | Next git hunk |
| `[h` | Previous git hunk |
| `<leader>gp` | Preview hunk |
| `<leader>gb` | Blame line |
| `<leader>gs` | Stage hunk |
| `<leader>gr` | Reset hunk |
| `<leader>tg` | Open Lazygit |

---

## Debugging (DAP)

| Key | Action |
|-----|--------|
| `F5` | Start / Continue |
| `F10` | Step Over |
| `F11` | Step Into |
| `F12` | Step Out |
| `<leader>db` | Toggle breakpoint |
| `<leader>dB` | Conditional breakpoint |
| `F7` | Toggle debug UI |

---

## Editing

| Key | Action |
|-----|--------|
| `<` / `>` | Indent/outdent (keeps selection in visual) |
| `J` (visual) | Move selected lines down |
| `K` (visual) | Move selected lines up |
| `gcc` | Toggle comment (line) |
| `gc` (visual) | Toggle comment (selection) |
| `ys{motion}{char}` | Add surround (e.g. `ysiw"`) |
| `ds{char}` | Delete surround |
| `cs{old}{new}` | Change surround |

---

## Autocomplete (Insert Mode)

| Key | Action |
|-----|--------|
| `Ctrl+Space` | Trigger completion |
| `Ctrl+n` / `Tab` | Next item |
| `Ctrl+p` / `Shift+Tab` | Previous item |
| `Ctrl+y` / `Enter` | Confirm selection |

---

## Terminal

| Key | Action |
|-----|--------|
| `Ctrl+\` | Toggle terminal |
| `Ctrl+\ Ctrl+n` | Exit terminal mode |

---

## Formatting

| Key | Action |
|-----|--------|
| `<leader>f` | Format buffer |

Format on save is enabled by default.

---

## Which-Key Groups

Press `<leader>` and wait to see all available key groups:

| Prefix | Group |
|--------|-------|
| `<leader>s` | **[S]earch** |
| `<leader>c` | **[C]ode** |
| `<leader>d` | **[D]ocument / Debug** |
| `<leader>w` | **[W]orkspace** |
| `<leader>r` | **[R]ename** |
| `<leader>t` | **[T]oggle** |
| `<leader>b` | **[B]uffer** |
| `<leader>g` | **[G]it** |
| `<leader>x` | **Diagnostics** |

---

## Language-Specific

### C# (OmniSharp + netcoredbg)

- LSP: OmniSharp with extended go-to-definition
- Formatter: csharpier (on save)
- Debugger: netcoredbg via DAP (`F5` to start)

### Angular (angularls + ts_ls)

- LSP: Angular Language Server + TypeScript
- Formatter: prettierd / prettier (on save)
- HTML auto-close/rename tags enabled
- Treesitter: angular grammar installed
