-- Define the URL to open
local url = "https://ytcr.gezel.io"

-- Define the countdown duration in seconds
local countdown_duration = 5

-- Detect the operating system to determine the browser command
local os_name = string.lower(package.config:sub(1, 1)) == '\\' and 'windows' or 'unix'

-- Define the browser commands based on the operating system
local browser_commands = {
  windows = 'start "" "%s"',
  unix = 'xdg-open "%s"'
}

-- Get the browser command based on the operating system
local browser_command = browser_commands[os_name]

-- Function to display the countdown
local function countdown(seconds)
  for i = seconds, 1, -1 do
    print(i)
    os.execute("timeout 1 >nul")
  end
end

-- Display the countdown
countdown(countdown_duration)

-- Open the URL in a new tab of the default browser
local full_command = string.format(browser_command, url)
os.execute(full_command)
