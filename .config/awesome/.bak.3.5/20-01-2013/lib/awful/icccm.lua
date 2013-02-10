---------------------------------------------------------------------------
-- @author Uli Schlachter
-- @copyright 2011 Uli Schlachter
-- @release v3.5
---------------------------------------------------------------------------

local client = client
local math = math

--- Implements ICCCM handling.
-- awful.icccm

-- Make sure we don't get into an endless loop
local size_hints_lock = false

local function get_titlebar_size(c)
    local res, _ = {}
    _, res.top = c:titlebar_top()
    _, res.right = c:titlebar_right()
    _, res.bottom = c:titlebar_bottom()
    _, res.left = c:titlebar_left()

    res.x = res.left
    res.y = res.top
    res.width = res.left + res.right
    res.height = res.top + res.bottom

    return res
end

local function apply_size_hints(c)
    if size_hints_lock then return end
    if not c.size_hints_honor then return end
    -- Fullscreen clients don't get size hints applied!
    if c.fullscreen then return end

    size_hints_lock = true

    local geom = c:geometry()
    local hints = c.size_hints
    local titlebar = get_titlebar_size(c)

    -- Apply size hints to the client size without titlebars
    geom.width = geom.width - titlebar.width
    geom.height = geom.height - titlebar.height

    local basew, baseh
    local real_basew, real_baseh = 0, 0
    if hints.base_width then
        basew, baseh = hints.base_width, hints.base_height
        real_basew, real_baseh = basew, baseh
    elseif hints.min_width then
        -- Base size is substituted with min size if not specified
        basew, baseh = hints.min_width, hints.min_height
    else
        basew, baseh = 0, 0
    end

    -- Handle the size aspect ratio

    if hints.min_aspect_den then
        -- Apply the size aspect
        if hints.min_aspect_den > 0 and hints.max_aspect_den > 0 and
            geom.height > real_baseh and geom.width > real_basew then
            -- ICCCM mandates:
            -- If a base size is provided along with the aspect ratio fields, the
            -- base size should be subtracted from the window size prior to checking
            -- that the aspect ratio falls in range. If a base size is not provided,
            -- nothing should be subtracted from the window size. (The minimum size
            -- is not to be used in place of the base size for this purpose.)
            local dx = geom.width - real_basew
            local dy = geom.height - real_baseh
            local ratio = dx / dy
            local min = hints.min_aspect_num / hints.min_aspect_den
            local max = hints.max_aspect_num / hints.max_aspect_den

            if max > 0 and min > 0 and ratio > 0 then
                if ratio < min then
                    -- dx is lower than allowed, make dy lower to compensate this
                    -- (+ 0.5 to force proper rounding).
                    dy = dx / min + 0.5
                    geom.width  = dx + real_basew
                    geom.height = dy + real_baseh
                elseif ratio > max then
                    -- dx is too high, lower it (+0.5 for proper rounding)
                    dx = dy * max + 0.5
                    geom.width  = dx + real_basew
                    geom.height = dy + real_baseh;
                end
                -- Make sure these are integers
                geom.width  = math.floor(geom.width)
                geom.height = math.floor(geom.height)
            end
        end
    end

    -- Handle the minimum size
    local minw, minh
    if hints.min_width then
        minw, minh = hints.min_width, hints.min_height
    elseif hints.base_width then
        -- min size is substituted with base size if not specified
        minw, minh = hints.base_width, hints.base_height
    else
        minw, minh = 0, 0
    end

    if minw ~= nil and minw > 0 and geom.width < minw then
        geom.width = minw
    end
    if minh ~= nil and minh > 0 and geom.height < minh then
        geom.height = minh
    end

    -- Handle the maximum size
    if hints.max_width ~= nil and hints.max_width > 0 and hints.max_width < geom.width then
        geom.width = hints.max_width
    end
    if hints.max_height ~= nil and hints.max_height > 0 and hints.max_height < geom.height then
        geom.height = hints.max_height
    end

    -- Handle the size increment
    if hints.width_inc and hints.width_inc > 0 then
        local function apply_inc(size, inc, base)
            local i = size - base
            if i < 0 then i = 0 end
            -- Round size down to a multiple of inc, ignoring the base size
            return size - math.fmod(i, inc)
        end
        geom.width  = apply_inc(geom.width, hints.width_inc, basew)
        geom.height = apply_inc(geom.height, hints.height_inc, baseh)
    end

    c:geometry({ width = geom.width + titlebar.width, height = geom.height + titlebar.height })

    size_hints_lock = false
end

client.connect_signal("property::width", apply_size_hints)
client.connect_signal("property::height", apply_size_hints)

-- vim: filetype=lua:expandtab:shiftwidth=4:tabstop=8:softtabstop=4:textwidth=80
