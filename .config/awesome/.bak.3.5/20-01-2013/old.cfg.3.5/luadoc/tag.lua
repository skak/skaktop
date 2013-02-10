--- awesome tag API
-- @author Julien Danjou &lt;julien@danjou.info&gt;
-- @copyright 2008-2009 Julien Danjou
module("tag")

--- Tag object.
-- @field name Tag name.
-- @field selected True if the tag is selected to be viewed.
-- @field activated True if the tag is active and can be used.
-- @class table
-- @name tag

--- Get or set the clients attached to this tag.
-- @param clients_table None or a table of clients to set as being tagged with this tag.
-- @return A table with the clients attached to this tags.
-- @name clients
-- @class function

--- Add a signal.
-- @param name A signal name.
-- @param func A function to call when the signal is emitted.
-- @name connect_signal
-- @class function

--- Remove a signal.
-- @param name A signal name.
-- @param func A function to remove.
-- @name disconnect_signal
-- @class function

--- Emit a signal.
-- @param name A signal name.
-- @param ... Various arguments, optional.
-- @name emit_signal
-- @class function

--- Get the number of instances.
-- @return The number of tag objects alive.
-- @name instances
-- @class function
