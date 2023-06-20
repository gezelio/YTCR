# Welcome to the YTCR Beta Documentation!

The main change with this is that you no longer need the StreamerBot websocket, and you use an OBS dock instead. This is to make it easier to use and to make it more reliable. This is using the YouTube API instead of the StreamerBot API.

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