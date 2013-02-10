---------------------------------------------------------------------------
-- @author Julien Danjou &lt;julien@danjou.info&gt;
-- @copyright 2008-2009 Julien Danjou
-- @release v3.5
---------------------------------------------------------------------------

-- Grab environment we need
local math = math
local type = type
local ipairs = ipairs
local pairs = pairs
local pcall = pcall
local setmetatable = setmetatable
local capi = { button = button }
local util = require("awful.util")
local wibox = require("wibox")
local imagebox = require("wibox.widget.imagebox")
local textbox = require("wibox.widget.textbox")

--- Common utilities for awful widgets
local common = {}

-- Recursively processes a template, replacing the tables representing the icon and
-- the title with the widgets ib and tb
local function replace_in_template(t, ib, tb)
    for i, v in ipairs(t) do
        if type(t[i]) == "table" then
            if v.item == "icon" then
                t[i] = ib
            elseif v.item == "title" then
                t[i] = tb
            else
                replace_in_template(v, ib, tb)
            end
        end
    end
end

function common.list_update(w, buttons, label, data, objects)
    -- update the widgets, creating them if needed
    w:reset()
    for i, o in ipairs(objects) do
        local cache = data[o]
        local ib, tb, bgb, m, l
        if cache then
            ib = cache.ib
            tb = cache.tb
            bgb = cache.bgb
        else
            ib = wibox.widget.imagebox()
            tb = wibox.widget.textbox()
            bgb = wibox.widget.background()
            m = wibox.layout.margin(tb, 4, 4)
            l = wibox.layout.fixed.horizontal()

            -- All of this is added in a fixed widget
            l:fill_space(true)
            l:add(ib)
            l:add(m)

            -- And all of this gets a background
            bgb:set_widget(l)

            if buttons then
                local btns = {}
                for kb, b in ipairs(buttons) do
                    -- Create a proxy button object: it will receive the real
                    -- press and release events, and will propagate them the the
                    -- button object the user provided, but with the object as
                    -- argument.
                    local btn = capi.button { modifiers = b.modifiers, button = b.button }
                    btn:connect_signal("press", function () b:emit_signal("press", o) end)
                    btn:connect_signal("release", function () b:emit_signal("release", o) end)
                    btns[#btns + 1] = btn
                end
                bgb:buttons(btns)
            end

            data[o] = {
                ib = ib,
                tb = tb,
                bgb = bgb
            }
        end

        local text, bg, bg_image, icon = label(o)
        -- The text might be invalid, so use pcall
        if not pcall(tb.set_markup, tb, text) then
            tb:set_markup("<i>&lt;Invalid text&gt;</i>")
        end
        bgb:set_bg(bg)
        bgb:set_bgimage(bg_image)
        ib:set_image(icon)
        w:add(bgb)
   end
end

return common

-- vim: filetype=lua:expandtab:shiftwidth=4:tabstop=8:softtabstop=4:textwidth=80
