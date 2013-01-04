-----------------------------
-- ##### ##### ##### #   # --
-- # # # #   #   #   ##  # --
-- # # # #####   #   # # # --
-- # # # #   #   #   #  ## --
-- # # # #   # ##### #   # --
--    skakkix@gmail.com    --
--       AWESOMEwm         --
--         rc.lua          --
-----------------------------

local gears = require("gears")
local awful = require("awful")
awful.rules = require("awful.rules")
require("awful.autofocus")
local wibox = require("wibox")
local beautiful = require("beautiful")
beautiful.init(awful.util.getdir("config") .. "/themes/zenburn/theme.lua")
local naughty = require("naughty")
local menubar = require("menubar")
-- WIDGET LIB
local wi = require("wi")

-- {{{ Error handling
-- Check if awesome encountered an error during startup and fell back to
-- another config (This code will only ever execute for the fallback config)
if awesome.startup_errors then
    naughty.notify({ preset = naughty.config.presets.critical,
                     title = "Oops, there were errors during startup!",
                     text = awesome.startup_errors })
end
-- Handle runtime errors after startup
do
    local in_error = false
    awesome.connect_signal("debug::error", function (err)        -- Make sure we don't go into an endless error loop
        if in_error then return end
        in_error = true
        naughty.notify({ preset = naughty.config.presets.critical,
                         title = "Oops, an error happened!",
                         text = err })
        in_error = false
    end)
end
-- }}}
-- {{{ Variable definitions
beautiful.init("/usr/local/share/awesome/themes/zenburn/theme.lua")
terminal = "terminator"
editor = os.getenv("EDITOR") or "gedit"
editor_cmd = terminal .. " -e " .. editor
torrent = "vuze"
imclient = "pidgin"
browser = "google-chrome"
technicaledit = "gvim"
lazyedit = "gedit"
modkey = "Mod4" -- Mod4 is default and is "windows" key
fileman = "thunar"

local layouts =
{
    awful.layout.suit.tile,            -- 2 TILE
    awful.layout.suit.tile.left,       -- 3 TILE LEFT
    awful.layout.suit.tile.bottom,     -- 4 TILE BOTTOM
    awful.layout.suit.tile.top,        -- 5 TILE TOP
    awful.layout.suit.fair,            -- 6 FAIR
    awful.layout.suit.fair.horizontal, -- 7 FAIR HORIZ
    awful.layout.suit.spiral,          -- 8 SPIRAL
    awful.layout.suit.spiral.dwindle,  -- 9 SPIRAL DWINDLE
    awful.layout.suit.max,             -- 10 MAX
    awful.layout.suit.max.fullscreen,  -- 11 FULL SCREEN
    awful.layout.suit.magnifier        -- 12 MAGNIFIER
}
-- }}}
-- {{{ Wallpaper
if beautiful.wallpaper then
    for s = 1, screen.count() do
        gears.wallpaper.maximized(beautiful.wallpaper, s, true)
    end
end
-- }}}
-- {{{ Tags
tags = { names  = { "::[1]TILE", "::[2]MAX", "::[3]FLOAT", "::[4]WWW", "::[5]WOMP", "::[6]FILES", "::[7]GVIM", "::[8]GEDIT", "::[9]SKAKATTACK" },     
	           --   1            2           3             4           5            6             7            8             9
	layout = { layouts[2], layouts[10], layouts[1], layouts[7], layouts[8], layouts[6], layouts[6], layouts[3], layouts[9] }
	}               -- 1           2            3           4           5           6           7           8           9
for s = 1, screen.count() do
	tags[s] = awful.tag(tags.names, s, tags.layout)
end
-- }}}
-- {{{ Menu
myawesomemenu = {
   { "manual", terminal .. " -e man awesome" },
   { "edit config", editor .. " " .. awesome.conffile },	--   { "edit config", editor_cmd .. " " .. awesome.conffile },
   { "restart", awesome.restart },
   { "quit", awesome.quit }
}
mymainmenu = awful.menu({ items = { { "awesome", myawesomemenu, beautiful.awesome_icon },
                                    { "open terminal", terminal }
                                  }
                        })
mylauncher = awful.widget.launcher({ image = beautiful.awesome_icon,
                                     menu = mymainmenu })
menubar.utils.terminal = terminator -- Set the terminal for applications that require it
-- }}}
-- {{{ Wibox
mytextclock = awful.widget.textclock()
mycolons = wibox.widget.textbox()
	mycolons:set_text("::")
myspacer = wibox.widget.textbox()
	myspacer:set_text("  ")
myskakbox = wibox.widget.textbox()
	myskakbox:set_text("skak")
mymobilebox = wibox.widget.textbox()
	mymobilebox:set_text("mobile")
local mycross = wibox.widget.base.make_widget()
	mycross.fit = function(mycross, width, height)
		local size = math.min(width, height)
		return size, size
end
mycross.draw = function(mycross, wibox, cr, width, height)
	cr:move_to(0, 0)
	cr:line_to(width, height)
	cr:move_to(width, 0)
	cr:line_to(0, height)
	cr:set_line_width(3)
	cr:stroke()
end
mywibox = {} -- TOP BAR (PER SCREEN)
mywiboxtwo = {} -- BOTTOM BAR (PER SCREEN)
mypromptbox = {} -- MOD4 + R
mylayoutbox = {} -- MOD4 + SPACEBAR
mytaglist = {} -- MOD4 + 1-9
mytaglist.buttons = awful.util.table.join (
                    awful.button({ }, 1, awful.tag.viewonly),
                    awful.button({ modkey }, 1, awful.client.movetotag),
                    awful.button({ }, 3, awful.tag.viewtoggle),
                    awful.button({ modkey }, 3, awful.client.toggletag),
                    awful.button({ }, 4, function(t) awful.tag.viewnext(awful.tag.getscreen(t)) end),
                    awful.button({ }, 5, function(t) awful.tag.viewprev(awful.tag.getscreen(t)) end)
                    )
mytasklist = {}
mytasklist.buttons = awful.util.table.join (
                     awful.button({ }, 1, function (c)
                                              if c == client.focus then
                                                  c.minimized = true
                                              else
                                                  c.minimized = false
                                                  if not c:isvisible() then
                                                      awful.tag.viewonly(c:tags()[1])
                                                  end
                                                  client.focus = c
                                                  c:raise()
                                              end
                                          end),
                     awful.button({ }, 3, function ()
                                              if instance then
                                                  instance:hide()
                                                  instance = nil
                                              else
                                                  instance = awful.menu.clients({ width=250 })
                                              end
                                          end),
                     awful.button({ }, 4, function ()
                                              awful.client.focus.byidx(1)
                                              if client.focus then client.focus:raise() end
                                          end),
                     awful.button({ }, 5, function ()
                                              awful.client.focus.byidx(-1)
                                              if client.focus then client.focus:raise() end
                                          end))
for s = 1, screen.count() do
    mypromptbox[s] = awful.widget.prompt()
    mylayoutbox[s] = awful.widget.layoutbox(s)    -- Create an imagebox widget which will contains an icon indicating which layout we're using.
    mylayoutbox[s]:buttons(awful.util.table.join(
                           awful.button({ }, 1, function () awful.layout.inc(layouts, 1) end),
                           awful.button({ }, 3, function () awful.layout.inc(layouts, -1) end),
                           awful.button({ }, 4, function () awful.layout.inc(layouts, 1) end),
                           awful.button({ }, 5, function () awful.layout.inc(layouts, -1) end)))
    mytaglist[s] = awful.widget.taglist(s, awful.widget.taglist.filter.all, mytaglist.buttons)
    mytasklist[s] = awful.widget.tasklist(s, awful.widget.tasklist.filter.currenttags, mytasklist.buttons)
    mywibox[s] = awful.wibox({ position = "top", screen = s })
    mywiboxtwo[s] = awful.wibox({ position = "bottom", screen = s })
    local topleft = wibox.layout.fixed.horizontal()	-- TOP LEFT
    	topleft:add(mylauncher)
    	topleft:add(mytaglist[s])
    	topleft:add(mypromptbox[s])
    local bottomleft = wibox.layout.fixed.horizontal()	-- BOTTOM LEFT
    	bottomleft:add(myspacer)
    	bottomleft:add(mycolons)
    	bottomleft:add(myskakbox)
    	bottomleft:add(mycolons)
    	bottomleft:add(myspacer)
    	bottomleft:add(mycross)
    local topright = wibox.layout.fixed.horizontal()	-- TOP RIGHT
    	topright:add(volicon)
        topright:add(volpct)
        topright:add(volspace)
    	if s == 1 then 
    		topright:add(wibox.widget.systray()) 
    	end
    	topright:add(mytextclock)
	topright:add(mylayoutbox[s])
    local bottomright = wibox.layout.fixed.horizontal()	-- BOTTOM RIGHT
	bottomright:add(mycross)
        bottomright:add(myspacer)
	bottomright:add(mycolons)
	bottomright:add(mymobilebox)
	bottomright:add(mycolons)
    	bottomright:add(myspacer)
    local layout = wibox.layout.align.horizontal()	-- TOP LAYOUT (topleft + topright)
        layout:set_left(topleft)
        layout:set_right(topright)
    local layoutb = wibox.layout.align.horizontal()	-- BOTTOM LAYOUT (bottomleft + bottomright)
	layoutb:set_left(bottomleft)
	layoutb:set_middle(mytasklist[s])
	layoutb:set_right(bottomright)
    mywibox[s]:set_widget(layout)			-- SET TOP WIBOX
    mywiboxtwo[s]:set_widget(layoutb)			-- SET BOTTOM WIBOX
end
root.buttons(awful.util.table.join(
    awful.button({ }, 3, function () mymainmenu:toggle() end),					-- MOUSE BINDINGS
    awful.button({ }, 4, awful.tag.viewnext),
    awful.button({ }, 5, awful.tag.viewprev)))
globalkeys = awful.util.table.join(
    awful.key({ modkey,           }, "Left",   awful.tag.viewprev       ),			-- KEY BINDINGS
    awful.key({ modkey,           }, "Right",  awful.tag.viewnext       ),
    awful.key({ modkey,           }, "Escape", awful.tag.history.restore),
    awful.key({ modkey,           }, "j",
        function ()
            awful.client.focus.byidx( 1)
            if client.focus then client.focus:raise() end
        end),
    awful.key({ modkey,           }, "k",
        function ()
            awful.client.focus.byidx(-1)
            if client.focus then client.focus:raise() end
        end),
    awful.key({ modkey,           }, "w", function () mymainmenu:show() end),
    awful.key({ modkey, "Shift"   }, "j", function () awful.client.swap.byidx(  1)    end),    -- LAYOUT MANIPULATION
    awful.key({ modkey, "Shift"   }, "k", function () awful.client.swap.byidx( -1)    end),
    awful.key({ modkey, "Control" }, "j", function () awful.screen.focus_relative( 1) end),
    awful.key({ modkey, "Control" }, "k", function () awful.screen.focus_relative(-1) end),
    awful.key({ modkey,           }, "u", awful.client.urgent.jumpto),
    awful.key({ modkey,           }, "Tab",
        function ()
            awful.client.focus.history.previous()
            if client.focus then
                client.focus:raise()
            end
        end),
    awful.key({ modkey,           }, "t", function () awful.util.spawn(fileman) end),		-- STANDARD PROGRAMS
    awful.key({ modkey,           }, "z", function () awful.util.spawn(torrent) end),
    awful.key({ modkey, "Control" }, "p", function () awful.util.spawn(imclient) end),
    awful.key({ modkey,           }, "c", function () awful.util.spawn(browser) end),
    awful.key({ modkey,           }, "v", function () awful.util.spawn(technicaledit) end),
    awful.key({ modkey,           }, "g", function () awful.util.spawn(lazyedit) end),    
    awful.key({ modkey,           }, "Return", function () awful.util.spawn(terminal) end),
    awful.key({ modkey, "Control" }, "r", awesome.restart),					-- RESTART AWESOME
    awful.key({ modkey, "Control"   }, "q", awesome.quit),					-- QUIT AWESOME
    awful.key({ modkey,           }, "l",     function () awful.tag.incmwfact( 0.05)    end),	-- WINDOW SIZE
    awful.key({ modkey,           }, "h",     function () awful.tag.incmwfact(-0.05)    end),
    awful.key({ modkey, "Shift"   }, "h",     function () awful.tag.incnmaster( 1)      end),
    awful.key({ modkey, "Shift"   }, "l",     function () awful.tag.incnmaster(-1)      end),
    awful.key({ modkey, "Control" }, "h",     function () awful.tag.incncol( 1)         end),
    awful.key({ modkey, "Control" }, "l",     function () awful.tag.incncol(-1)         end),
    awful.key({ modkey,           }, "space", function () awful.layout.inc(layouts,  1) end),
    awful.key({ modkey, "Shift"   }, "space", function () awful.layout.inc(layouts, -1) end),
    awful.key({ modkey, "Control" }, "n", awful.client.restore),
    awful.key({ modkey },            "r",     function () mypromptbox[mouse.screen]:run() end),	-- PROMPTBOX
    awful.key({ modkey, "Shift" }, "c",
              function ()
                  awful.prompt.run({ prompt = "Run Lua code: " },
                  mypromptbox[mouse.screen].widget,
                  awful.util.eval, nil,
                  awful.util.getdir("cache") .. "/history_eval")
              end),
    awful.key({ modkey }, "p", function() menubar.show() end)					-- MENUBAR?? TITLEBARS MAYBE~
)
clientkeys = awful.util.table.join (
    awful.key({ modkey,           }, "f",      function (c) c.fullscreen = not c.fullscreen  end),
    awful.key({ modkey,           }, "x",      function (c) c:kill()                         end), -- CLIENT KILL
    awful.key({ modkey, "Control" }, "space",  awful.client.floating.toggle                     ),
    awful.key({ modkey, "Control" }, "Return", function (c) c:swap(awful.client.getmaster()) end),
    awful.key({ modkey,           }, "o",      awful.client.movetoscreen                        ),
    awful.key({ modkey, "Control" }, "t",      function (c) c.ontop = not c.ontop            end),
    awful.key({ modkey,           }, "n",
        function (c) -- CURRENT CLIENT "c" HAS THE INPUT FOCUS, SO IT CAN'T BE MINIMIZED SINCE MINIMIZED CLIENTS CAN'T HAVE THE FOCUS
            c.minimized = true
        end),
    awful.key({ modkey,           }, "m",
        function (c)
            c.maximized_horizontal = not c.maximized_horizontal
            c.maximized_vertical   = not c.maximized_vertical
        end)
)
keynumber = 0						-- Compute the maximum number of digit we need, limited to 9
for s = 1, screen.count() do
   keynumber = math.min(9, math.max(#tags[s], keynumber))
end
for i = 1, keynumber do					-- Bind all key numbers to tags.
    globalkeys = awful.util.table.join(globalkeys,
        awful.key({ modkey }, "#" .. i + 9,
                  function ()
                        local screen = mouse.screen
                        if tags[screen][i] then
                            awful.tag.viewonly(tags[screen][i])
                        end
                  end),
        awful.key({ modkey, "Control" }, "#" .. i + 9,
                  function ()
                      local screen = mouse.screen
                      if tags[screen][i] then
                          awful.tag.viewtoggle(tags[screen][i])
                      end
                  end),
        awful.key({ modkey, "Shift" }, "#" .. i + 9,
                  function ()
                      if client.focus and tags[client.focus.screen][i] then
                          awful.client.movetotag(tags[client.focus.screen][i])
                      end
                  end),
        awful.key({ modkey, "Control", "Shift" }, "#" .. i + 9,
                  function ()
                      if client.focus and tags[client.focus.screen][i] then
                          awful.client.toggletag(tags[client.focus.screen][i])
                      end
                  end))
end
clientbuttons = awful.util.table.join(
    awful.button({ }, 1, function (c) client.focus = c; c:raise() end),
    awful.button({ modkey }, 1, awful.mouse.client.move),
    awful.button({ modkey }, 3, awful.mouse.client.resize))
root.keys(globalkeys)					-- Set keys

awful.rules.rules = {								-- RULES - USE xprop
  { rule = { }, -- RULE FOR ALL CLIENTS
      properties = { border_width = beautiful.border_width,
                     border_color = beautiful.border_normal,
                     focus = awful.client.focus.filter,
                     keys = clientkeys,
                     maximized_vertical = false,
                     maximized_horizontal = false,
                     buttons = clientbuttons } },
    { rule = { class = "Pidgin" },      properties = { tag = tags[1][3] } },
    { rule = { class = "Gedit" },      properties = { tag = tags[1][8] } },
    { rule = { class = "Terminator" },      properties = { tag = tags[1][9] } },
    { rule = { class = "Google-chrome" },      properties = { tag = tags[1][4] } },
    { rule = { class = "MPlayer" },      properties = { floating = true } },
    { rule = { class = "pinentry" },      properties = { floating = true } },
    { rule = { class = "gimp" },      properties = { floating = true } }
}
client.connect_signal("manage", function (c, startup)	-- Signal function to execute when a new client appears.
    c:connect_signal("mouse::enter", function(c)    		-- Enable sloppy focus
        if awful.layout.get(c.screen) ~= awful.layout.suit.magnifier
            and awful.client.focus.filter(c) then
            client.focus = c
        end
    end)
    if not startup then -- awful.client.setslave(c) -- SET WINDOW SLAVE, INSTEAD OF MASTER
        if not c.size_hints.user_position and not c.size_hints.program_position then  -- IF WINDOW HAS NO SET POS, PUT IT IN POS IN SMART WAY
            awful.placement.no_overlap(c)
            awful.placement.no_offscreen(c)
        end
    end
    local titlebars_enabled = false
    if titlebars_enabled and (c.type == "normal" or c.type == "dialog") then
        local topleft = wibox.layout.fixed.horizontal()				--TOPLEFT
	        topleft:add(awful.titlebar.widget.iconwidget(c))
        local topright = wibox.layout.fixed.horizontal()			--TOPRIGHT
	        topright:add(awful.titlebar.widget.floatingbutton(c))
	        topright:add(awful.titlebar.widget.maximizedbutton(c))
	        topright:add(awful.titlebar.widget.stickybutton(c))
	        topright:add(awful.titlebar.widget.ontopbutton(c))
	        topright:add(awful.titlebar.widget.closebutton(c))
        local title = awful.titlebar.widget.titlewidget(c)			--MIDDLE (TITLE)
	        title:buttons(awful.util.table.join(
        	        awful.button({ }, 1, function()
        	            client.focus = c
        	            c:raise()
        	            awful.mouse.client.move(c)
        	        end),
                	awful.button({ }, 3, function()
                	    client.focus = c
                	    c:raise()
                	    awful.mouse.client.resize(c)
                	end)))
        local layout = wibox.layout.align.horizontal()				--SET LAYOUT FOR TITLEBAR
	        layout:set_left(topleft)
	        layout:set_right(topright)
	        layout:set_middle(title)
        awful.titlebar(c):set_widget(layout)					--SET TITLEBAR TO LAYOUT
    end
end)
client.connect_signal("focus", function(c) c.border_color = beautiful.border_focus end)
client.connect_signal("unfocus", function(c) c.border_color = beautiful.border_normal end)
