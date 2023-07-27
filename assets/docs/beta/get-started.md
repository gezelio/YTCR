# Welcome to the YTCR Beta Documentation!

The main change with this is that you no longer need the StreamerBot websocket, and you use an OBS dock instead. This is to make it easier to use and to make it more reliable. This is using the YouTube API instead of the StreamerBot API.

**Why use the OBS Dock?**

To put simply, we know that not all our users like to use StreamerBot, or have a separate browser window open during their live streams. So to help with this we created a Browser Dock for OBS that you can create, edit, and manage the YTCR interface.
Along with this, you can create a command with the Prefix "!" and the chatbot will send a message within Youtube Chat with this prefix. Then in YOUR preferred streaming bot (Mix It Up, Nightbot, whatever you want) create a command with the Prefix "!",
then when the YTCR Chatbot uses that command it will trigger your action in your preffered Chat Bot.
We are constantly working on updating this extention and appreciate any feedback or ideas you may have. 

---
**PLEASE NOTE**

This is currently invite only. If you're interested in joining the beta, please complete the Google Form on [ytcr.gezel.io/beta-request](https://ytcr.gezel.io/beta-request)

---

## Preqrequisites
1. Ensure you have your YouTube account connected to Discord.
2. Created an account on [YTCR](https://ytcr.gezel.io) and connected your YouTube account.
3. Use OBS (StreamLabs not supported at this time due to the custom dock)

## Getting Started
### OBS Setup
1. Launch OBS and create a new dock by going to `View > Docks > Custom Browser Docks...` and input the following data:

| Name | URL |
|---|---|
| YTCR | `https://ytcr.gezel.io/dock` |

2. Click the sign in button and sign in with your YouTube account.
      **Important: Please keep this dock visible inside your OBS as you need to click `Sign In` before each stream to ensure the connection**

### Connecting Rewards
After you've created a reward on the [YTCR Reward Dashboard](https://ytcr.gezel.io/dashboard/rewards), you can assign an interaction to it. This is done by the `Message Response` feature.
Assign a message response such as `!soundeffect` and then create a command in your bot (MixItUp, SAMMI, StreamerBot, etc) of choice to trigger the sound effect.
[Learn more about the different tools and interactions here](/commands).

### Action ID (StreamerBot)
As you may notice, there's an option for an `Action ID` beside `Message Response`. This only works with the StreamerBot tool and a connection to our websocket. If you wish to use this, please follow [this additional guide](/streamerbot/action-id).
