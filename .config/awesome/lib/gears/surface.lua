---------------------------------------------------------------------------
-- @author Uli Schlachter
-- @copyright 2012 Uli Schlachter
-- @release v3.5
---------------------------------------------------------------------------

local setmetatable = setmetatable
local type = type
local capi = { awesome = awesome }
local cairo = require("lgi").cairo

-- This checks for '<= 0.5' because there are git versions after 0.6 which still
-- identify themselves as 0.6 but already have the needed cairo support
if tonumber(string.match(require('lgi.version'), '(%d%.%d)')) <= 0.5 then
    error("lgi too old, need at least version 0.6.1")
end

-- gears.surface
local surface = { mt = {} }

--- Try to convert the argument into an lgi cairo surface.
-- This is usually needed for loading images by file name.
function surface.load(_surface)
    -- Nil is not changed
    if not _surface then
        return nil
    end
    -- lgi cairo surfaces don't get changed either
    if cairo.Surface:is_type_of(_surface) then
        return _surface
    end
    -- Strings are assumed to be file names and get loaded
    if type(_surface) == "string" then
        _surface = capi.awesome.load_image(_surface)
    end
    -- Everything else gets forced into a surface
    return cairo.Surface(_surface, true)
end

function surface.mt:__call(...)
    return surface.load(...)
end

return setmetatable(surface, surface.mt)

-- vim: filetype=lua:expandtab:shiftwidth=4:tabstop=8:softtabstop=4:textwidth=80
