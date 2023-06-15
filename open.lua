-- Define the URL to open
local url = "https://ytcr.gezel.io"

-- Define the delay duration in seconds
local delay_duration = 5

-- Detect the operating system to determine the browser command
local os_name = string.lower(package.config:sub(1, 1)) == '\\' and 'windows' or 'unix'

-- Define the browser commands based on the operating system
local browser_commands = {
  windows = 'start "" "%s"',
  unix = 'xdg-open "%s"'
}

-- Get the browser command based on the operating system
local browser_command = browser_commands[os_name]

-- Function to wait for a specific number of seconds
local function delay(seconds)
  local cmd = os_name == 'windows' and 'ping 127.0.0.1 -n ' .. seconds + 1 .. ' >nul' or 'sleep ' .. seconds
  os.execute(cmd)
end

-- Wait for the specified delay duration
delay(delay_duration)

-- Open the URL in a new tab of the default browser
local full_command = string.format(browser_command, url)
os.execute(full_command)
