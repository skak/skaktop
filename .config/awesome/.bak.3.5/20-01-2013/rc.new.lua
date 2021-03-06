local gears = require("gears")
local awful = require("awful")
awful.rules = require("awful.rules")
require("awful.autofocus")
local wibox = require("wibox")
local beautiful = require("beautiful")
beautiful.init("/home/skak/.config/awesome/themes/skakburn/theme.lua")
local naughty = require("naughty")
local menubar = require("menubar")
local wi = require("wi")

if awesome.startup_errors then
    naughty.notify({ preset = naughty.config.presets.critical,
                     title = "Oops, there were errors during startup!",
                     text = awesome.startup_errors })
end
do
    local in_error = false
    awesome.connect_signal("debug::error", function (err)
        if in_error then return end
        in_error = true

        naughty.notify({ preset = naughty.config.presets.critical,
                         title = "Oops, an error happened!",
                         text = err })
        in_error = false
    end)
end
-- VARIABLES DECLARATION
dmenu = "dmenu_run -p skak -nb \"#3F3F3F\" -nf \"#DCDCCC\" -sf \"#F0DFAF\" -sb \"#1E2320\" -b -l 15 -fn Terminus:pixelsize=12"
gimp = "gimp"
gcolor = "gcolor2"
killswitch = "gksudo systemctl poweroff"
recycle = "gksudo systemctl reboot"
lxapp = "lxappearance"
gvim = "gvim"
gedit = "gedit"
imclient = "pidgin"
mail = "thunderbird"
file = "spacefm" --"pcmanfm"--"4pane"
browser = "google-chrome"
urxvt = "urxvt"
terminator = "terminator"
terminal = "xterm"
editor = os.getenv("EDITOR") or "vim"
editor_cmd = terminal .. " -e " .. editor
modkey = "Mod4"
altkey = "Mod1"

local layouts =
{
    awful.layout.suit.floating,			--1
    awful.layout.suit.tile,				--2
    awful.layout.suit.tile.left,		--3
    awful.layout.suit.tile.bottom,		--4
    awful.layout.suit.tile.top,			--5
    awful.layout.suit.fair,				--6
    awful.layout.suit.fair.horizontal,	--7
    awful.layout.suit.spiral,			--8
    awful.layout.suit.spiral.dwindle,	--9
    awful.layout.suit.max,				--10
    awful.layout.suit.max.fullscreen,	--11
    awful.layout.suit.magnifier			--12
}
if beautiful.wallpaper then
    for s = 1, screen.count() do
        gears.wallpaper.maximized(beautiful.wallpaper, s, true)
    end
end
 tags = {
   names = {        "一", 		"二", 		"三", 		"四",	    "五",       "六",        "七",       "八",       "九",       "十" },
--   names  = {     "[1]",      "[2]",      "[3]",      "[4]",      "[5]",      "[6]",      "[7]",      "[8]",      "[9]"},
   layout = { layouts[2], layouts[2], layouts[2], layouts[2], layouts[2], layouts[2], layouts[2], layouts[2], layouts[2], layouts[2] } }
 
 for s = 1, screen.count() do
     tags[s] = awful.tag(tags.names, s, tags.layout)
 end
-- {{{ Menu
myawesomemenu = {
   { "manual", terminal .. " -e man awesome" },
   { "edit config", editor_cmd .. " " .. awesome.conffile },
   { "restart", awesome.restart },
   { "quit", awesome.quit },
   { "recycle", recycle },
   { "killswitch", killswitch } }
appsmenu = {
	{ "gedit", gedit },
	{ "#gedit", "gksudo " .. gedit },
	{ "GTKedit", lxapp },
	{ "GTKedit", "gksudo " .. lxapp },
	{ "gvim", gvim },
	{ "#gvim", "gksudo " .. gvim },
	{ "pidgin", imclient },
	{ "thunderbird", mail },
	{ "google chrome", browser} }
skakmenu = {
   { "root", "gksudo " .. file .. " /" },
   { "home", file .. " ~/" },
   { "cfg dir", file .. " ~/.config/awesome" },
   { "xsessions", "gksudo " .. file .. " /usr/share/xsessions" } }
termsmenu = {
	{ "default", terminal },
	{ "terminator", terminator },
	{ "rxvt-unicode[urxvt]", urxvt} }
mymainmenu = awful.menu( { items = {
		{ "dmenu", "dmenu_run -p skak -nb \"#3F3F3F\" -nf \"#DCDCCC\" -sf \"#F0DFAF\" -sb \"#1E2320\" -b -l 15 -fn Terminus:pixelsize=12", beautiful.awesomes },
		{ "awesome", myawesomemenu, beautiful.awesome_icon },
		{ "apps", appsmenu, beautiful.awesomes },
		{ "skak", skakmenu, beautiful.awesomes },
		{ "terms", termsmenu, beautiful.awesomes } } } )
mylauncher = awful.widget.launcher({ image = beautiful.awesomes, menu = mymainmenu })
myChromeLauncher = awful.widget.launcher({   image = beautiful.awesomec, command = browser })
menubar.utils.terminal = urxvt -- Set the terminal for applications that require it
-- {{{ Wibox
mytextclock = awful.widget.textclock()
swibTop = {} -- skaks top wibox (horizontal)
swibBottom = {} -- skaks bottom wibox (horizontal)
swibRight = {} -- skaks right wibox (vertical)
swibLeft = {} -- skaks left wibox (vertical)
mypromptbox = {}
mylayoutbox = {}
mytaglist = {}
mytaglist.buttons = awful.util.table.join(
                    awful.button({ }, 1, awful.tag.viewonly),
                    awful.button({ modkey }, 1, awful.client.movetotag),
                    awful.button({ }, 3, awful.tag.viewtoggle),
                    awful.button({ modkey }, 3, awful.client.toggletag),
                    awful.button({ }, 4, function(t) awful.tag.viewnext(awful.tag.getscreen(t)) end),
                    awful.button({ }, 5, function(t) awful.tag.viewprev(awful.tag.getscreen(t)) end)
                    ) -- buttons operable by mouse
mytasklist = {}
mytasklist.buttons = awful.util.table.join(
                     awful.button({ }, 1, function (c)
                                              if c == client.focus then
                                                  c.minimized = true
                                              else
                                                  -- Without this, the following
                                                  -- :isvisible() makes no sense
                                                  c.minimized = false
                                                  if not c:isvisible() then
                                                      awful.tag.viewonly(c:tags()[1])
                                                  end
                                                  -- This will also un-minimize
                                                  -- the client, if needed
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
    mylayoutbox[s] = awful.widget.layoutbox(s)
    mylayoutbox[s]:buttons(awful.util.table.join( -- layoutbox buttons operable by mouse
                           awful.button({ }, 1, function () awful.layout.inc(layouts, 1) end),
                           awful.button({ }, 3, function () awful.layout.inc(layouts, -1) end),
                           awful.button({ }, 4, function () awful.layout.inc(layouts, 1) end),
                           awful.button({ }, 5, function () awful.layout.inc(layouts, -1) end)))
    mytaglist[s] = awful.widget.taglist(s, awful.widget.taglist.filter.all, mytaglist.buttons) -- the top taglist
    mytasklist[s] = awful.widget.tasklist(s, awful.widget.tasklist.filter.currenttags, mytasklist.buttons) -- the bottom tasklist

	swibBottom[s] = awful.wibox({ position = "bottom", screen = s }) -- bottom swibox
		local swibBottomLeft = wibox.layout.fixed.horizontal()
			swibBottomLeft:add(mylauncher)
		local swibBottomMiddle = wibox.layout.fixed.horizontal()
			swibBottomMiddle:add(mytasklist[s])
		local swibBottomRight = wibox.layout.fixed.horizontal()
			swibBottomRight:add(mylayoutbox[s])
				local swibBottomAlign = wibox.layout.align.horizontal()
					swibBottomAlign:set_left(swibBottomLeft)
					swibBottomAlign:set_middle(swibBottomMiddle)
					swibBottomAlign:set_right(swibBottomRight)
						swibBottom[s]:set_widget(swibBottomAlign)
	swibRight[s] = awful.wibox({ position = "right", screen = s }) -- right swibox
		local swibRightLeft = wibox.layout.fixed.horizontal()
		local swibRightMiddle = wibox.layout.fixed.horizontal()
		local swibRightRight = wibox.layout.fixed.horizontal()
				local swibRightAlign = wibox.layout.align.horizontal()
					swibRightAlign:set_left(swibRightLeft)
					swibRightAlign:set_middle(swibRightMiddle)
					swibRightAlign:set_right(swibRightRight)
						swibRight[s]:set_widget(swibRightAlign)
	swibLeft[s] = awful.wibox({ position = "left", screen = s }) -- left swibox
		local swibLeftLeft = wibox.layout.fixed.horizontal()
--			swibLeftLeft:add(myChromeLauncher)		
		local swibLeftMiddle = wibox.layout.fixed.horizontal()		
		local swibLeftRight = wibox.layout.fixed.horizontal()
			swibLeftRight:add(myChromeLauncher)
				local swibLeftAlign = wibox.layout.align.horizontal()
					swibLeftAlign:set_left(swibLeftLeft)
					swibLeftAlign:set_middle(swibLeftMiddle)
					swibLeftAlign:set_right(swibLeftRight)
						swibLeft[s]:set_widget(swibLeftAlign)
    swibTop[s] = awful.wibox({ position = "top", screen = s }) -- top swibox
	    local swibTopLeft = wibox.layout.fixed.horizontal()
    		swibTopLeft:add(mytaglist[s])
    		swibTopLeft:add(mypromptbox[s])
		local swibTopMiddle = wibox.layout.fixed.horizontal()
	    local swibTopRight = wibox.layout.fixed.horizontal()
			if s == 1 then swibTopRight:add(wibox.widget.systray()) end
			swibTopRight:add(mpdicon)
			swibTopRight:add(mpdwidget)
			swibTopRight:add(volicon)
			swibTopRight:add(volpct)
			swibTopRight:add(volspace)
			swibTopRight:add(pacicon)
			swibTopRight:add(pacwidget)
		    swibTopRight:add(mytextclock)
			    local swibTopAlign = wibox.layout.align.horizontal()
				    swibTopAlign:set_left(swibTopLeft)
					swibTopAlign:set_middle(swibTopMiddle)
				    swibTopAlign:set_right(swibTopRight)
					    swibTop[s]:set_widget(swibTopAlign)
end
root.buttons(awful.util.table.join(
    awful.button({ }, 3, function () mymainmenu:toggle() end), -- toggle main menu on right mouse click... well something happens???
    awful.button({ }, 4, awful.tag.viewnext), -- mouse wheel on tag buttons
    awful.button({ }, 5, awful.tag.viewprev) ) )
globalkeys = awful.util.table.join(
    awful.key({ modkey }, "Next", function (c)
        awful.util.spawn("transset-df --actual --inc 0.1")
    end),
    awful.key({ modkey }, "Prior", function (c)
        awful.util.spawn("transset-df --actual --dec 0.1")
    end),
    awful.key({ modkey,           }, "Left",   awful.tag.viewprev       ),
    awful.key({ modkey,           }, "Right",  awful.tag.viewnext       ),
    awful.key({ modkey,           }, "Escape", awful.tag.history.restore),
	awful.key({ }, "Print", function() awful.util.spawn("scrot -e 'mv $f ~/screenshots/ 2>/dev/null'") end),
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
    awful.key({                   }, "Menu", function () mymainmenu:show() end), -- produce main menu on Menu key
    awful.key({ modkey,           }, "w", function () mymainmenu:show() end), -- produce main menu on mod4 + w
    awful.key({ modkey, "Shift"   }, "j", function () awful.client.swap.byidx(  1)    end), -- layout manip
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
--[[ dmenu = "dmenu_run -p skak -nb \"#3F3F3F\" -nf \"#DCDCCC\" -sf \"#F0DFAF\" -sb \"#1E2320\" -b -l 15 -fn Terminus:pixelsize=12"
      gimp = "gimp"
    gcolor = "gcolor2"
killswitch = "gksudo systemctl poweroff"
   recycle = "gksudo systemctl reboot"
     lxapp = "lxappearance"
      gvim = "gvim"
     gedit = "gedit"
  imclient = "pidgin"
      mail = "thunderbird"
      file = "4pane"
   browser = "google-chrome"
     urxvt = "urxvt"
terminator = "terminator"
  terminal = "xterm"
	editor = os.getenv("EDITOR") or "vim"
editor_cmd = terminal .. " -e " .. editor
    modkey = "Mod4"
    altkey = "Mod1" ]]--
--[[ 123 XF86AudioRaiseVolume,122 XF86AudioLowerVolume,121 XF86AudioMute,174 XF86AudioStop,171 XF86AudioNext,172 XF86AudioPlay,173 XF86AudioPrev,234 XF86AudioMedia
awful.key({ }, "USERKEYCHOICE", function () awful.util.spawn(" ") end),
awful.key({       , "       " }, " ", function () awful.util.spawn(     ) end), --]]
    awful.key({ },"XF86AudioMute",        function () awful.util.spawn_with_shell("amixer -q set Master toggle") end),
    awful.key({ },"XF86AudioRaiseVolume", function () awful.util.spawn_with_shell("amixer -q set Master 3+% unmute") end),
    awful.key({ },"XF86AudioLowerVolume", function () awful.util.spawn_with_shell("amixer -q set Master 3-% unmute") end),
    awful.key({ modkey, }, "Menu", function () awful.util.spawn("xephyr-awesome rc.new.lua") end),
    awful.key({ altkey, "Control" }, "f", function () awful.util.spawn(dmenu) end),
    awful.key({ modkey, "Control" }, "`", function () awful.util.spawn(lxapp) end),	
    awful.key({ modkey, "Control" }, "g", function () awful.util.spawn(gedit) end),	
    awful.key({ modkey, "Control" }, "p", function () awful.util.spawn(imclient) end),
    awful.key({ modkey, "Control" }, "b", function () awful.util.spawn(mail) end),
    awful.key({ modkey, "Control" }, "t", function () awful.util.spawn(file) end),
    awful.key({ modkey, "Control" }, "c", function () awful.util.spawn(browser) end),
    awful.key({ modkey, "Control" }, "Return", function () awful.util.spawn(terminator) end),
    awful.key({ modkey, "Shift"   }, "Return", function () awful.util.spawn(terminal) end),
    awful.key({ modkey,           }, "Return", function () awful.util.spawn(urxvt) end),
    awful.key({ modkey, "Control" }, "r", awesome.restart),
    awful.key({ modkey, "Shift"   }, "q", awesome.quit),
    awful.key({ modkey,           }, "l",     function () awful.tag.incmwfact( 0.05)    end),
    awful.key({ modkey,           }, "h",     function () awful.tag.incmwfact(-0.05)    end),
    awful.key({ modkey, "Shift"   }, "h",     function () awful.tag.incnmaster( 1)      end),
    awful.key({ modkey, "Shift"   }, "l",     function () awful.tag.incnmaster(-1)      end),
    awful.key({ modkey, "Control" }, "h",     function () awful.tag.incncol( 1)         end),
    awful.key({ modkey, "Control" }, "l",     function () awful.tag.incncol(-1)         end),
    awful.key({ modkey,           }, "space", function () awful.layout.inc(layouts,  1) end),
    awful.key({ modkey, "Shift"   }, "space", function () awful.layout.inc(layouts, -1) end),
    awful.key({ modkey, "Control" }, "n", awful.client.restore),
    awful.key({ modkey            }, "r",     function () mypromptbox[mouse.screen]:run() end),
    awful.key({ modkey,	"Shift"   }, "c",
              function ()
                  awful.prompt.run({ prompt = "Run Lua code: " },
                  mypromptbox[mouse.screen].widget,
                  awful.util.eval, nil,
                  awful.util.getdir("cache") .. "/history_eval")
              end),
    awful.key({ modkey            }, "p", function() menubar.show() end) )
clientkeys = awful.util.table.join(
    awful.key({ modkey,           }, "f",      function (c) c.fullscreen = not c.fullscreen  end),
    awful.key({ modkey, 	      }, "x",      function (c) c:kill()                         end),
    awful.key({ modkey, "Control" }, "space",  awful.client.floating.toggle                     ),
    awful.key({ modkey, "Control" }, "Return", function (c) c:swap(awful.client.getmaster()) end),
    awful.key({ modkey,           }, "o",      awful.client.movetoscreen                        ),
    awful.key({ modkey,           }, "t",      function (c) c.ontop = not c.ontop            end),
    awful.key({ modkey,           }, "n",
        function (c)
            c.minimized = true -- CLIENT HAS FOCUS THEREFORE =! MINIMIZED, THUS MINIMIZE WITH BUTTON
        end),
    awful.key({ modkey,           }, "m",
        function (c)
            c.maximized_horizontal = not c.maximized_horizontal
            c.maximized_vertical   = not c.maximized_vertical
        end) )
keynumber = 0 -- Compute the maximum number of digit we need, limited to 9
for s = 1, screen.count() do
   keynumber = math.min(9, math.max(#tags[s], keynumber))
end
for i = 1, keynumber do
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
root.keys(globalkeys) -- set global keys
awful.rules.rules = { -- CLIENT RULES
-- [...]
    { 
      rule = { }, 
      properties = { 
        border_width = beautiful.border_width,
        border_color = beautiful.border_normal,
			     focus = awful.client.focus.filter,
        keys = clientkeys,
								maximized_vertical = false,
								maximized_horizontal = false,
        buttons = clientbuttons 
      } 
    },
-- [...]

-- [...]
    { 
      rule = { class = "Xmessage" },  
      properties = { floating = true } 
    },
-- [...]
-- [...]
    { 
      rule = { class = "Pidgin", role = "conversation" },  
      properties = { floating = true, tag = tags[2][1] },
      callback = function(c)
                     c:geometry( { width = 400, height = 400 } )
                 end
    },
-- [...]

-- [...]
    { 
      rule = { class = "Pidgin", 
               role = "buddy_list" },
      properties = { floating = true, tag = tags[2][1] },
      callback = function(c)
                     c:geometry( { width = 200, height = 400 } )
                 end
    },
    { rule = { class = "MPlayer" },  properties = { floating = true } },
    { rule = { class = "pinentry" }, properties = { floating = true } },
    { rule = { class = "gimp" },     properties = { floating = true } },
	{ rule = { class = "Conky" },    properties = { floating = true } } }
-- {{{ Signals
-- Signal function to execute when a new client appears.
client.connect_signal("manage", function (c, startup)
    c:connect_signal("mouse::enter", function(c)          -- ENTER SLOPPY FOCUS
        if awful.layout.get(c.screen) ~= awful.layout.suit.magnifier
            and awful.client.focus.filter(c) then
            client.focus = c
        end
    end)
    if not startup then -- Set windows at the slave, i.e. put it at the end of others instead of setting it master. awful.client.setslave(c)
        if not c.size_hints.user_position and not c.size_hints.program_position then -- IF NO POS. PROVIDED, PLACE WINDOWS INTELLIGENTLY
            awful.placement.no_overlap(c)
            awful.placement.no_offscreen(c)
        end
    end
    local titlebars_enabled = true -- 					  -- TITLEBAR TOGGLE ON/OFF
    if titlebars_enabled and (c.type == "normal" or c.type == "dialog") then
        local swibTopLeft = wibox.layout.fixed.horizontal()
    	    swibTopLeft:add(awful.titlebar.widget.iconwidget(c))
        local swibTopRight = wibox.layout.fixed.horizontal()
	        swibTopRight:add(awful.titlebar.widget.floatingbutton(c))
    	    swibTopRight:add(awful.titlebar.widget.maximizedbutton(c))
    	    swibTopRight:add(awful.titlebar.widget.stickybutton(c))
    	    swibTopRight:add(awful.titlebar.widget.ontopbutton(c))
    	    swibTopRight:add(awful.titlebar.widget.closebutton(c))
        local swibTopMiddle = awful.titlebar.widget.titlewidget(c)
	        swibTopMiddle:buttons(awful.util.table.join(
    	            awful.button({ }, 1, function()
    	                client.focus = c
    	                c:raise()
    	                awful.mouse.client.move(c)
    	            end),
    	            awful.button({ }, 3, function()
    	                client.focus = c
    	                c:raise()
    	                awful.mouse.client.resize(c)
    	            end)
    	            ))
        local layout = wibox.layout.align.horizontal()
	        layout:set_left(swibTopLeft)
    	    layout:set_right(swibTopRight)
    	    layout:set_middle(swibTopMiddle)
    	    awful.titlebar(c):set_widget(layout)
    	end
end)
client.connect_signal("focus", function(c) c.border_color = beautiful.border_focus end)			-- ON FOCUS CHANGE BORDER COLOR
client.connect_signal("unfocus", function(c) c.border_color = beautiful.border_normal end)		-- ON LOSSF FOCUS REVERT BORDER COLOR
function run_once(prg)
  awful.util.spawn_with_shell("pgrep -u $USER -x " .. prg .. " || (" .. prg .. ")")
end
os.execute"xrdb -load ~/.Xresources"
awful.util.spawn_with_shell("pgrep -u $USER -x gvim || (gvim ~/.config/awesome/rc.new.lua)")
awful.util.spawn_with_shell("pgrep -u $USER -x xcompgr || (xcompmgr &)")
awful.util.spawn_with_shell("pgrep -u $USER -x pidgin || (pidgin)")
-- [WORKING EXAMPLE] function run_once(prg) awful.util.spawn_with_shell("pgrep -u $USER -x " .. prg .. " || (" .. prg .. ")") end
-- awful.util.spawn_with_shell(gedit .. " /home/skak/.config/awesome/rc.new.lua" ) 				-- ON STARTUP
-- awful.util.spawn_with_shell(imclient)															-- ON STARTUP

