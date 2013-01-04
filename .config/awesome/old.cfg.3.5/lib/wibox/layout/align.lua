---------------------------------------------------------------------------
-- @author Uli Schlachter
-- @copyright 2010 Uli Schlachter
-- @release v3.5
---------------------------------------------------------------------------

local setmetatable = setmetatable
local table = table
local pairs = pairs
local type = type
local base = require("wibox.layout.base")
local widget_base = require("wibox.widget.base")

-- wibox.layout.align
local align = {}

-- Draw the given align layout. dir describes the orientation of the layout, "x"
-- means horizontal while "y" is vertical.
local function draw(dir, layout, wibox, cr, width, height)
    local size_first = 0
    local size_third = 0
    local size_limit = dir == "y" and height or width

    if layout.first then
        local w, h, _ = width, height, nil
        if dir == "y" then
            _, h = layout.first:fit(w, h)
            size_first = h
        else
            w, _ = layout.first:fit(w, h)
            size_first = w
        end
        base.draw_widget(wibox, cr, layout.first, 0, 0, w, h)
    end

    if layout.third and size_first < size_limit then
        local w, h, x, y, _
        if dir == "y" then
            w, h = width, height - size_first
            _, h = layout.third:fit(w, h)
            x, y = 0, height - h
            size_third = h
        else
            w, h = width - size_first, height
            w, _ = layout.third:fit(w, h)
            x, y = width - w, 0
            size_third = w
        end
        base.draw_widget(wibox, cr, layout.third, x, y, w, h)
    end

    if layout.second and size_first + size_third < size_limit then
        local x, y, w, h
        if dir == "y" then
            x, y = 0, size_first
            w, h = width, size_limit - size_first - size_third
        else
            x, y = size_first, 0
            w, h = size_limit - size_first - size_third, height
        end
        base.draw_widget(wibox, cr, layout.second, x, y, w, h)
    end
end

local function widget_changed(layout, old_w, new_w)
    if old_w then
        old_w:disconnect_signal("widget::updated", layout._emit_updated)
    end
    if new_w then
        widget_base.check_widget(new_w)
        new_w:connect_signal("widget::updated", layout._emit_updated)
    end
    layout._emit_updated()
end

--- Set the layout's first widget. This is the widget that is at the left/top
function align:set_first(widget)
    widget_changed(self, self.first, widget)
    self.first = widget
end

--- Set the layout's second widget. This is the centered one.
function align:set_second(widget)
    widget_changed(self, self.second, widget)
    self.second = widget
end

--- Set the layout's third widget. This is the widget that is at the right/bottom
function align:set_third(widget)
    widget_changed(self, self.third, widget)
    self.third = widget
end

function align:reset()
    for k, v in pairs({ "first", "second", "third" }) do
        self[v] = nil
    end
    self:emit_signal("widget::updated")
end

local function get_layout(dir)
    local function draw_dir(layout, wibox, cr, width, height)
        draw(dir, layout, wibox, cr, width, height)
    end

    local ret = widget_base.make_widget()
    ret.draw = draw_dir
    ret.fit = function(box, ...) return ... end
    ret.get_dir = function () return dir end
    ret._emit_updated = function()
        ret:emit_signal("widget::updated")
    end

    for k, v in pairs(align) do
        if type(v) == "function" then
            ret[k] = v
        end
    end

    return ret
end

--- Returns a new horizontal align layout. An align layout can display up to
-- three widgets. The widget set via :set_left() is left-aligned. :set_right()
-- sets a widget which will be right-aligned. The remaining space between those
-- two will be given to the widget set via :set_middle().
function align.horizontal()
    local ret = get_layout("x")

    ret.set_left = ret.set_first
    ret.set_middle = ret.set_second
    ret.set_right = ret.set_third

    return ret
end

--- Returns a new vertical align layout. An align layout can display up to
-- three widgets. The widget set via :set_top() is top-aligned. :set_bottom()
-- sets a widget which will be bottom-aligned. The remaining space between those
-- two will be given to the widget set via :set_middle().
function align.vertical()
    local ret = get_layout("y")

    ret.set_top = ret.set_first
    ret.set_middle = ret.set_second
    ret.set_bottom = ret.set_third

    return ret
end

return align

-- vim: filetype=lua:expandtab:shiftwidth=4:tabstop=8:softtabstop=4:textwidth=80
