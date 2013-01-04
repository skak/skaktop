------------------------ * http://awesome.naquadah.org/wiki/Nice_Icons *
--  this&that theme   --                for better icons
-- based on "zenburn" --
-- <skakkix@gmail.com --
------------------------
local awful = require("awful")
-- {{{ Main
theme = {}
theme.wallpaper = "~/.config/awesome/themes/zenburn/skak-awesome-background.png"
-- }}}

-- {{{ Styles
theme.font      = "sans 8"

-- {{{ Colors
theme.fg_normal  = "#DCDCCC"
theme.fg_focus   = "#F0DFAF"
theme.fg_urgent  = "#CC9393"
theme.fg_tooltip = "#DCDCCC"
theme.fg_em 	 = "#DCDCCC"

theme.bg_normal  = "#3F3F3F"
theme.bg_focus   = "#1E2320"
theme.bg_urgent  = "#3F3F3F"
theme.bg_tooltip = "#3F3F3F"
theme.bg_em      = "#3F3F3F"
theme.bg_systray = theme.bg_normal

theme.fg_widget        = theme.fg_normal
theme.fg_center_widget = theme.fg_normal
theme.fg_end_widget    = theme.fg_normal
theme.bg_widget        = theme.bg_normal
theme.border_widget    = bg_normal
-- }}}

-- {{{ Borders
theme.border_width  = 2
theme.border_normal = "#3F3F3F"
theme.border_focus  = "#6F6F6F"
theme.border_marked = "#CC9393"
theme.border_tooltip = theme.border_normal
-- }}}

-- {{{ Titlebars
theme.titlebar_bg_focus  = "#3F3F3F"
theme.titlebar_bg_normal = "#3F3F3F"
-- }}}

-- There are other variable sets
-- overriding the default one when
-- defined, the sets are:
-- [taglist|tasklist]_[bg|fg]_[focus|urgent]
-- titlebar_[normal|focus]
-- tooltip_[font|opacity|fg_color|bg_color|border_width|border_color]
-- Example:
--theme.taglist_bg_focus = "#CC9393"
-- }}}

-- {{{ Widgets
-- You can add as many variables as
-- you wish and access them by using
-- beautiful.variable in your rc.lua
theme.fg_widget        = "#AECF96"
theme.fg_center_widget = "#88A175"
theme.fg_end_widget    = "#FF5656"
theme.bg_widget        = "#494B4F"
theme.border_widget    = "#3F3F3F"
theme.widget_disk      = awful.util.getdir("config") .. "/themes/dust/widgets/disk.png"
theme.widget_cpu       = awful.util.getdir("config") .. "/themes/dust/widgets/cpu.png"
theme.widget_ac        = awful.util.getdir("config") .. "/themes/dust/widgets/ac.png"
theme.widget_acblink   = awful.util.getdir("config") .. "/themes/dust/widgets/acblink.png"
theme.widget_blank     = awful.util.getdir("config") .. "/themes/dust/widgets/blank.png"
theme.widget_batfull   = awful.util.getdir("config") .. "/themes/dust/widgets/batfull.png"
theme.widget_batmed    = awful.util.getdir("config") .. "/themes/dust/widgets/batmed.png"
theme.widget_batlow    = awful.util.getdir("config") .. "/themes/dust/widgets/batlow.png"
theme.widget_batempty  = awful.util.getdir("config") .. "/themes/dust/widgets/batempty.png"
theme.widget_vol       = awful.util.getdir("config") .. "/themes/dust/widgets/vol.png"
theme.widget_mute      = awful.util.getdir("config") .. "/themes/dust/widgets/mute.png"
theme.widget_pac       = awful.util.getdir("config") .. "/themes/dust/widgets/pac.png"
theme.widget_pacnew    = awful.util.getdir("config") .. "/themes/dust/widgets/pacnew.png"
theme.widget_mail      = awful.util.getdir("config") .. "/themes/dust/widgets/mail.png"
theme.widget_mailnew   = awful.util.getdir("config") .. "/themes/dust/widgets/mailnew.png"
theme.widget_temp      = awful.util.getdir("config") .. "/themes/dust/widgets/temp.png"
theme.widget_tempwarn  = awful.util.getdir("config") .. "/themes/dust/widgets/tempwarm.png"
theme.widget_temphot   = awful.util.getdir("config") .. "/themes/dust/widgets/temphot.png"
theme.widget_wifi      = awful.util.getdir("config") .. "/themes/dust/widgets/wifi.png"
theme.widget_nowifi    = awful.util.getdir("config") .. "/themes/dust/widgets/nowifi.png"
theme.widget_mpd       = awful.util.getdir("config") .. "/themes/dust/widgets/mpd.png"
theme.widget_play      = awful.util.getdir("config") .. "/themes/dust/widgets/play.png"
theme.widget_pause     = awful.util.getdir("config") .. "/themes/dust/widgets/pause.png"
theme.widget_ram       = awful.util.getdir("config") .. "/themes/dust/widgets/ram.png"

theme.widget_mem       = awful.util.getdir("config") .. "/themes/dust/tp/ram.png"
theme.widget_swap      = awful.util.getdir("config") .. "/themes/dust/tp/swap.png"
theme.widget_fs        = awful.util.getdir("config") .. "/themes/dust/tp/fs_01.png"
theme.widget_fs2       = awful.util.getdir("config") .. "/themes/dust/tp/fs_02.png"
theme.widget_up        = awful.util.getdir("config") .. "/themes/dust/tp/up.png"
theme.widget_down      = awful.util.getdir("config") .. "/themes/dust/tp/down.png"
-- }}}

-- {{{ Mouse finder
theme.mouse_finder_color = "#CC9393"
-- mouse_finder_[timeout|animate_timeout|radius|factor]
-- }}}

-- {{{ Menu
-- Variables set for theming the menu:
-- menu_[bg|fg]_[normal|focus]
-- menu_[border_color|border_width]
theme.menu_height = 15
theme.menu_width  = 100
-- }}}

-- {{{ Icons
-- {{{ Taglist
theme.taglist_squares_sel   = "/usr/share/awesome/themes/zenburn/taglist/squarefz.png"
theme.taglist_squares_unsel = "/usr/share/awesome/themes/zenburn/taglist/squarez.png"
--theme.taglist_squares_resize = "false"
-- }}}

-- {{{ Misc
theme.awesomec				 = "~/.config/awesome/themes/zenburn/awesomec.png"
theme.awesomes			     = "~/.config/awesome/themes/zenburn/awesomes.png"
theme.awesome_icon           = "/usr/share/awesome/themes/zenburn/awesome-icon.png"
theme.sky_awesome_icon	     = "~/.config/awesome/themes/zenburn/sky-awesome-icon.png"
theme.menu_submenu_icon      = "/usr/share/awesome/themes/default/submenu.png"
-- }}}

-- {{{ Layout
theme.layout_tile = awful.util.getdir("config") .. "/themes/zenburn/layouts/tile_pink_blur.png"
theme.layout_tileleft = awful.util.getdir("config") .. "/themes/zenburn/layouts/tileleft_pink_blur.png"
theme.layout_tilebottom = awful.util.getdir("config") .. "/themes/zenburn/layouts/tilebottom_pink_blur.png"
theme.layout_tiletop = awful.util.getdir("config") .. "/themes/zenburn/layouts/tiletop_pink_blur.png"
theme.layout_fairv = awful.util.getdir("config") .. "/themes/zenburn/layouts/fairv_pink_blur.png"
theme.layout_fairh = awful.util.getdir("config") .. "/themes/zenburn/layouts/fairh_pink_blur.png"
theme.layout_spiral = awful.util.getdir("config") .. "/themes/zenburn/layouts/spiral_pink_blur.png"
theme.layout_dwindle = awful.util.getdir("config") .. "/themes/zenburn/layouts/dwindle_pink_blur.png"
theme.layout_max = awful.util.getdir("config") .. "/themes/zenburn/layouts/max_pink_blur.png"
theme.layout_fullscreen = awful.util.getdir("config") .. "/themes/zenburn/layouts/fullscreen_pink_blur.png"
theme.layout_magnifier = awful.util.getdir("config") .. "/themes/zenburn/layouts/magnifier_pink_blur.png"
theme.layout_floating = awful.util.getdir("config") .. "/themes/zenburn/layouts/floating_pink_blur.png"
-- }}}

-- {{{ Titlebar
theme.titlebar_close_button_focus  = "/usr/share/awesome/themes/zenburn/titlebar/close_focus.png"
theme.titlebar_close_button_normal = "/usr/share/awesome/themes/zenburn/titlebar/close_normal.png"

theme.titlebar_ontop_button_focus_active  = "/usr/share/awesome/themes/zenburn/titlebar/ontop_focus_active.png"
theme.titlebar_ontop_button_normal_active = "/usr/share/awesome/themes/zenburn/titlebar/ontop_normal_active.png"
theme.titlebar_ontop_button_focus_inactive  = "/usr/share/awesome/themes/zenburn/titlebar/ontop_focus_inactive.png"
theme.titlebar_ontop_button_normal_inactive = "/usr/share/awesome/themes/zenburn/titlebar/ontop_normal_inactive.png"

theme.titlebar_sticky_button_focus_active  = "/usr/share/awesome/themes/zenburn/titlebar/sticky_focus_active.png"
theme.titlebar_sticky_button_normal_active = "/usr/share/awesome/themes/zenburn/titlebar/sticky_normal_active.png"
theme.titlebar_sticky_button_focus_inactive  = "/usr/share/awesome/themes/zenburn/titlebar/sticky_focus_inactive.png"
theme.titlebar_sticky_button_normal_inactive = "/usr/share/awesome/themes/zenburn/titlebar/sticky_normal_inactive.png"

theme.titlebar_floating_button_focus_active  = "/usr/share/awesome/themes/zenburn/titlebar/floating_focus_active.png"
theme.titlebar_floating_button_normal_active = "/usr/share/awesome/themes/zenburn/titlebar/floating_normal_active.png"
theme.titlebar_floating_button_focus_inactive  = "/usr/share/awesome/themes/zenburn/titlebar/floating_focus_inactive.png"
theme.titlebar_floating_button_normal_inactive = "/usr/share/awesome/themes/zenburn/titlebar/floating_normal_inactive.png"

theme.titlebar_maximized_button_focus_active  = "/usr/share/awesome/themes/zenburn/titlebar/maximized_focus_active.png"
theme.titlebar_maximized_button_normal_active = "/usr/share/awesome/themes/zenburn/titlebar/maximized_normal_active.png"
theme.titlebar_maximized_button_focus_inactive  = "/usr/share/awesome/themes/zenburn/titlebar/maximized_focus_inactive.png"
theme.titlebar_maximized_button_normal_inactive = "/usr/share/awesome/themes/zenburn/titlebar/maximized_normal_inactive.png"
-- }}}
-- }}}

return theme
