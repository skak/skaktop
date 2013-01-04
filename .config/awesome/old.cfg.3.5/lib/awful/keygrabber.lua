---------------------------------------------------------------------------
-- @author dodo
-- @copyright 2012 dodo
-- @release v3.5
---------------------------------------------------------------------------

local ipairs = ipairs
local table = table
local capi = {
    keygrabber = keygrabber }

--- Keygrabber Stack
-- awful.keygrabber
local keygrabber = {}

-- Private data
local grabbers = {}
local keygrabbing = false


local function grabber(mod, key, event)
    for i, g in ipairs(grabbers) do
        -- continue if the grabber explicitly returns false
        if g(mod, key, event) ~= false then
            break
        end
    end
end

--- Stop grabbing the keyboard for the provided callback.
-- When no callback is given, the least grabber gets removed (last one added to the stack).
-- @param g The key grabber that must be removed.
function keygrabber.stop(g)
    for i, v in ipairs(grabbers) do
        if v == g then
            table.remove(grabbers, i)
            break
        end
    end
    -- stop the global key grabber if the last grabber disappears from stack
    if #grabbers == 0 then
        keygrabbing = false
        capi.keygrabber.stop()
    end
end

---
-- Grab keyboard and read pressed keys, calling the least callback function from
-- stack at each  key press, until stack is empty. </br>
-- Calling run with the same callback again will bring the callback
-- to the top of the stack. </br></br>
-- The callback function is passed three arguments: </br>
-- a table containing modifiers keys, a string with the key pressed and a
-- string with either "press" or "release" to indicate the event type.</br></br>
-- A callback can return false to pass the events to the next key grabber in the stack.
-- @param g The key grabber callback that will get the key events until it will be deleted or a new grabber is added.
-- @return the given callback `g`
-- @usage Following function can be bound to a key, and used to resize a client
-- using keyboard.
-- <p><code>
-- function resize(c) <br/>
--   local grabber = awful.keygrabber.run(function(mod, key, event) </br>
--     if event == "release" then return end </br></br>
--
--     if     key == 'Up'   then awful.client.moveresize(0, 0, 0, 5, c) <br/>
--     elseif key == 'Down' then awful.client.moveresize(0, 0, 0, -5, c) <br/>
--     elseif key == 'Right' then awful.client.moveresize(0, 0, 5, 0, c) <br/>
--     elseif key == 'Left'  then awful.client.moveresize(0, 0, -5, 0, c) <br/>
--     else   awful.keygrabber.stop(grabber) <br/>
--     end <br/><br/>
--
--   end) <br/>
-- end <br/>
-- </code></p>
function keygrabber.run(g)
    -- Remove the grabber if its in stack
    keygrabber.stop(g)
    -- Record the grabber has latest added
    table.insert(grabbers, 1, g)
    -- start the keygrabber if its not running already
    if not keygrabbing then
        keygrabbing = true
        capi.keygrabber.run(grabber)
    end
    return g
end

return keygrabber

-- vim: filetype=lua:expandtab:shiftwidth=4:tabstop=8:softtabstop=4:textwidth=80
