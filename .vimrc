set t_Co=256			"using 256 colors
set gfn=terminusmodx
set nu
set wrap
set linebreak
set nolist
set textwidth=0
set wrapmargin=0
"set formatoptions+=l "apparently keeps existing textwidth but makes vim not
"autoformat when typing on existing lines...
colorscheme zenburn		"color scheme setup
set bs=2			"use backspace over everything in insert mode
set nocompatible		"use gVim defaults
" set tw=80			"tw to specify a default text width
set fo=tcrq			"fo to specify default formatoptions
				"t auto-wraps text using textwidth
				"c auto wraps comments using text width
				"r auto inserts the current comment leader
				"q allows formatting of comments
set tabstop=4			"each tab has 1_spaces equivalent width
set shiftwidth=2		"indentation width when using >> and << re-indentation
set nobackup
set noswf
set expandtab			"tabs are expanded to spaces
" You can use the default (don't set any parameters), or you can
" set some parameters to tweak the Zenburn colours.
"
" To use them, put them into your .vimrc file before loading the color scheme,
" example:
"    let g:zenburn_high_Contrast=1
"    colors zenburn
"
" * You can now set a darker background for bright environments. To activate, use:
"   contrast Zenburn, use:
"
      let g:zenburn_high_Contrast = 1
"
" * For example, Vim help files uses the Ignore-group for the pipes in tags 
"   like "|somelink.txt|". By default, the pipes are not visible, as they
"   map to Ignore group. If you wish to enable coloring of the Ignore group,
"   set the following parameter to 1. Warning, it might make some syntax files
"   look strange.
"
      let g:zenburn_color_also_Ignore = 1
"
" * To get more contrast to the Visual selection, use
"
      let g:zenburn_alternate_Visual = 1
"
" * To use alternate colouring for Error message, use
"
      let g:zenburn_alternate_Error = 1
"
" * The new default for Include is a duller orange. To use the original
"   colouring for Include, use
"
      let g:zenburn_alternate_Include = 1
"
" * Work-around to a Vim bug, it seems to misinterpret ctermfg and 234 and 237
"   as light values, and sets background to light for some people. If you have
"   this problem, use:
"
      let g:zenburn_force_dark_Background = 1
colors zenburn
source $VIMRUNTIME/vimrc_example.vim
