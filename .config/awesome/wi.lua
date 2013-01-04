local awful = require("awful")
local wibox = require("wibox")
local beautiful = require("beautiful")
local vicious = require("vicious")
local naughty = require("naughty")

graphwidth  = 120
graphheight = 20
pctwidth    = 40
netwidth    = 50
mpdwidth    = 365

 uptimewidget = wibox.widget.textbox()
  vicious.register(uptimewidget, vicious.widgets.uptime,
    function (widget, args)
      return string.format("Uptime: %2dd %02d:%02d ", args[1], args[2], args[3])
    end, 61)

-- {{{ NETWORK
-- Cache
vicious.cache(vicious.widgets.net)
-- Up graph
upgraph = awful.widget.graph()
upgraph:set_width(graphwidth):set_height(graphheight)
upgraph:set_border_color(nil)
upgraph:set_background_color(beautiful.bg_widget)
upgraph:set_color({
  type = "linear",
  from = { 0, graphheight },
  to = { 0, 0 },
  stops = {
    { 0, beautiful.fg_widget },
    { 0.25, beautiful.fg_center_widget },
    { 1, beautiful.fg_end_widget }
  }})
vicious.register(upgraph, vicious.widgets.net, "${eth0 up_kb}")
-- TX
txwidget = wibox.widget.textbox()
vicious.register(txwidget, vicious.widgets.net,
  "<span color='" .. beautiful.fg_normal .. "'>up</span>${eth0 tx_mb}MB", 19)
-- Up speed
upwidget = wibox.widget.textbox()
upwidget.fit = function(box,w,h)
  local w,h = wibox.widget.textbox.fit(box,w,h) return math.max(netwidth,w),h
end
vicious.register(upwidget, vicious.widgets.net, "${eth0 up_kb}", 2)
-- Down graph
downgraph = awful.widget.graph()
downgraph:set_width(graphwidth):set_height(graphheight)
downgraph:set_border_color(nil)
downgraph:set_background_color(beautiful.bg_widget)
downgraph:set_color({
  type = "linear",
  from = { 0, graphheight },
  to = { 0, 0 },
  stops = {
    { 0, beautiful.fg_widget },
    { 0.25, beautiful.fg_center_widget },
    { 1, beautiful.fg_end_widget }
  }})
vicious.register(downgraph, vicious.widgets.net, "${eth0 down_kb}")
-- RX
rxwidget = wibox.widget.textbox()
vicious.register(rxwidget, vicious.widgets.net,
  "<span color='" .. beautiful.fg_normal .. "'>down</span>${eth0 rx_mb}MB", 17)
-- Down speed
downwidget = wibox.widget.textbox()
downwidget.fit = function(box,w,h)
  local w,h = wibox.widget.textbox.fit(box,w,h) return math.max(netwidth,w),h
end
vicious.register(downwidget, vicious.widgets.net, "${eth0 down_kb}", 2)
-- }}}

-- {{{ VOLUME
-- Spacer
volspace = wibox.widget.textbox()
volspace:set_text(" ")

-- Cache
vicious.cache(vicious.widgets.volume)

-- Icon
volicon = wibox.widget.imagebox()
volicon:set_image(beautiful.widget_vol)

-- Volume %
volpct = wibox.widget.textbox()
vicious.register(volpct, vicious.widgets.volume, "$1%", nil, "Master")

-- Buttons
volicon:buttons(awful.util.table.join(
  awful.button({ }, 1,
    function() awful.util.spawn_with_shell("amixer -q set Master toggle") end),
  awful.button({ }, 4,
    function() awful.util.spawn_with_shell("amixer -q set Master 3+% unmute") end),
  awful.button({ }, 5,
    function() awful.util.spawn_with_shell("amixer -q set Master 3-% unmute") end)
))
volpct:buttons(volicon:buttons())
volspace:buttons(volicon:buttons())
-- }}}

-- {{{ Pianobar
-- Icon
mpdicon = wibox.widget.imagebox()
mpdicon:set_image(beautiful.widget_mpd)

-- Song info
mpdwidget = wibox.widget.textbox()
vicious.register(mpdwidget, vicious.widgets.mpd, function(widget, args)
  mpdicon:set_image(beautiful.widget_play)
  local bg = beautiful.bg_focus

  local italic = ""
  local like = ""
  local color = beautiful.fg_focus
  local f = io.popen("pgrep pianobar")

  if f:read("*line") then
    f = io.open(os.getenv("HOME") .. "/.config/pianobar/isplaying")
    play_or_pause = f:read("*line")
    f:close()

    -- Current song
    f = io.open(os.getenv("HOME") .. "/.config/pianobar/nowplaying")
    text = f:read("*line"):match("(.*)")
    f:close()

    -- Awaiting song
    if text:match(" -  $") then
      text = "..."
    end

    -- Loved song
    if text:find("%(like%)") then
      like = "&#x1f495;"
    end

    -- Ampersands
    if text:find("&") then
      text = text:gsub("&","and")
    end

    -- Paused
    if play_or_pause == "0" then
      if text:len() > 35 then
        mpdwidget.width = mpdwidth
      end
      italic = "font_style='italic'"
      mpdicon:set_image(beautiful.widget_pause)
      info = like .. awful.util.escape(text:gsub("%(like%)",""))
    else
      mpdwidget.width = 0
      local helpers = require("vicious.helpers")
      info = like .. awful.util.escape(helpers.scroll(text:gsub("%(like%)",""), 30, mpdwidget))
    end
  else
    -- Stopped
    mpdwidget.width = 0
    mpdicon:set_image(beautiful.widget_mpd)
    bg = beautiful.bg_normal
    color = beautiful.fg_normal
    info = "..."
  end

  return "<span color='" .. color .. "' background='" .. bg ..
    "' " .. italic  .. ">" .. info .. "</span>"
end, 3)

-- Buttons
mpdwidget:buttons(awful.util.table.join(
  awful.button({ }, 1, function()
      local f = io.popen("pgrep pianobar")
      p = f:read("*a"):match("([0-9]*)")
      if p == "" then
        awful.util.spawn_with_shell(pianobar_screen)
      else
        awful.util.spawn_with_shell(pianobar_toggle)
      end
    end),
  awful.button({ modkey }, 1, function()
      awful.util.spawn_with_shell(pianobar_upcoming)
    end),
  awful.button({ }, 2, function()
      awful.util.spawn_with_shell(pianobar_quit)
    end),
  awful.button({ }, 3, function()
      awful.util.spawn_with_shell(pianobar_station)
    end),
  awful.button({ }, 4, function()
      awful.util.spawn_with_shell(pianobar_next)
    end),
  awful.button({ }, 5, function()
      awful.util.spawn_with_shell(pianobar_history)
    end)
))
mpdicon:buttons(mpdwidget:buttons())
-- }}}

-- {{{ PACMAN
-- Icon
pacicon = wibox.widget.imagebox()
pacicon:set_image(beautiful.widget_pac)
-- Upgrades
pacwidget = wibox.widget.textbox()
vicious.register(pacwidget, vicious.widgets.pkg, function(widget, args)
  if args[1] > 0 then
    pacicon:set_image(beautiful.widget_pacnew)
  else
    pacicon:set_image(beautiful.widget_pac)
  end

  return args[1]
end, 1801, "Arch S") -- Arch S for ignorepkg

-- Buttons
function popup_pac()
  local pac_updates = ""
  local f = io.popen("pacman -Sup --dbpath /tmp/pacsync")
  if f then
    pac_updates = f:read("*a"):match(".*/(.*)-.*\n$")
  end
  f:close()

  if not pac_updates then
    pac_updates = "System is up to date"
  end

  naughty.notify { text = pac_updates }
end
pacwidget:buttons(awful.util.table.join(awful.button({ }, 1, popup_pac)))
pacicon:buttons(pacwidget:buttons())
-- }}}

