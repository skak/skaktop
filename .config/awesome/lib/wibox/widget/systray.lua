---------------------------------------------------------------------------
-- @author Uli Schlachter
-- @copyright 2010 Uli Schlachter
-- @release v3.5
---------------------------------------------------------------------------

local wbase = require("wibox.widget.base")
local lbase = require("wibox.layout.base")
local beautiful = require("beautiful")
local capi = { awesome = awesome }
local setmetatable = setmetatable
local error = error

--- wibox.widget.systray
local systray = { mt = {} }

local created_systray = false
local horizontal = true
local base_size = nil

function systray:draw(wibox, cr, width, height)
    local x, y, width, height = lbase.rect_to_device_geometry(cr, 0, 0, width, height)
    local num_entries = capi.awesome.systray()
    local bg = beautiful.bg_systray or beautiful.bg_normal or "#000000"

    local in_dir, ortho, base
    if horizontal then
        in_dir, ortho = width, height
    else
        ortho, in_dir = width, height
    end
    if ortho * num_entries <= in_dir then
        base = ortho
    else
        base = in_dir / num_entries
    end
    capi.awesome.systray(wibox.drawin, x, y, base, horizontal, bg)
end

function systray:fit(width, height)
    local num_entries = capi.awesome.systray()
    local base = base_size
    if base == nil then
        if width < height then
            base = width
        else
            base = height
        end
    end
    if horizontal then
        return base * num_entries, base
    end
    return base, base * num_entries
end

local function new()
    local ret = wbase.make_widget()

    if created_systray then
        error("More than one systray created!")
    end
    created_systray = true

    ret.fit = systray.fit
    ret.draw = systray.draw
    ret.set_base_size = function(_, size) base_size = size end
    ret.set_horizontal = function(_, horiz) horizontal = horiz end

    capi.awesome.connect_signal("systray::update", function()
        ret:emit_signal("widget::updated")
    end)

    return ret
end

function systray.mt:__call(...)
    return new(...)
end

return setmetatable(systray, systray.mt)

-- vim: filetype=lua:expandtab:shiftwidth=4:tabstop=8:softtabstop=4:textwidth=80
