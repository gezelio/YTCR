# How to set up YouTube Channel Rewards as a streamer

#### Prerequisites

-   [Streamer.Bot](https://streamer.bot) - v0.1.16 or newer
-   A YouTube channel that is connected to your Discord
-   An affitiated Twitch channel is **no longer required** to use this service

### Video tutorial
(Thank you for creating this, @KiokuReign)
[![Alt text](https://img.youtube.com/vi/ydQ6VQobQ0I/0.jpg)](https://www.youtube.com/watch?v=ydQ6VQobQ0I)

## 1. Streamerbot configuration

---

### Initial setup

1. Ensure you're logged in to your YouTube account on StreamerBot under `Platforms`
2. Download `YTCR_{version}.gezel` from our [Releases Page](https://github.com/gezelio/YTCR/releases).
3. Launch Streamer.Bot and select `Import` and drag the file into the `Import String` box.
    - Confirm you see the following `Actions`:
        - Clipping Tool
        - Execute Channel Reward Redeem
        - Set Channel Rewards
    - Once confirmed, you can click `Import`.
4. Click the `Set Channel Rewards` action and you should see two Sub-Actions. Double click `Set global "youtube_channel_id"`.
   Where it says `CHANGEME` beside `value`, update this to your YouTube channel ID. You can get that [here](https://www.youtube.com/account_advanced) if you aren't aware of it.

---

### 2. Websocket

Inside StreamerBot, head over to:

-   Servers/Clients
    -   Websocket Clients

Right click and select ‘Add’ and insert the following:

| SECTION                        | INPUT                                        |
| ------------------------------ | -------------------------------------------- |
| Name                           | `Gezel's YTCR `                              |
| Endpoint                       | `wss://youtube.redeems.live/ws`                     |
| Auto Connect on Startup        | ✅                                           |
| Reconnect on Disconnect        | ✅                                           |
| TLS (tick the following boxes) | ✅ `TLS 1.0`<br>✅ `TLS 1.1`<br>✅ `TLS 1.2` |
| Retry Interval                 | `5 seconds`                                  |

| Actions      |                                 |
| ------------ | ------------------------------- |
| Connected    | `Set Channel Rewards`           |
| Disconnected | `NONE`                          |
| Message      | `Execute Channel Reward Redeem` |

**Once you've completed this, press `ok`, right-click on the connection and choose `connect`!**

> **Tip:** Anytime you add/remove/modify channel rewards while connected to the WebSocket, you must go into `Servers/Clients` > `Websocket Clients` and right-click `disconnect` and then `reconnect` to pull the changes. It only pulls the reward data on load at this present time.

---

### 3. The YTCR Dashboard

Before going forward, it's good to confirm that your YouTube channel is linked to your Discord account. If you do not have a YouTube channel linked to your Discord, YTCR won't be able to find your channel as we use Discord as our sign in method. Once you've added your YouTube channel to your Discord's `Connections` (can be found in User Settings):

1.  Sign in to [https://youtube.redeems.live](http://youtube.redeems.live/creds/login)
2.  Authenticate with Discord
3.  Choose your YouTube channel
4.  Adjust your settings to your liking

---

### 4. Setting up channel rewards

Head over to the [YTCR Dashboard](https://youtube.redeems.live) and click on `Rewards`.

##### Fields:

| **Reward Name**         | **Cost**                | **Action ID**                                                                                                                                                                      |
| ----------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The name of your reward | The cost of your reward | The ID of the action you want to run. This is only required if you wish to pair it with an action you built on StreamerBot, such as controlling something on your OBS, for example |

This is the new primary way going forward with building actions, as it cuts out the requirement of needing an affiliated Twitch account in previous iterations.

---

### 5. Clipping tool

> **If you don't plan on using Clipping Tool, you can disable it in the YTCR Dashboard and ignore all of this.**

The Clipping Tool is a feature that adds a clipping feature to your stream. This utilizes the OBS `Replay Buffer` feature and would require additional setup.
We made this because YouTube's clipping feature doesn't actually create a downloadable clip to post on other social media platforms, so we hope this will be a good alternative to Twitch's clip feature.

#### How does it work?

It only allows one clip every minute. It does this by renaming the files by 'year-month-day_hour-minute' while also thanking the user who created the clip.

-   Example of a clip name: `"2022-06-24_16-04 (clipped by trent1605)"`

#### OBS settings

-   `Output` > `Replay Buffer` and select `Enable Replay Buffer`
    -   You can also change the length of your clips here. We recommend 30/60 seconds.
-   Head into `settings` - Under `General`, tick the box for `Automatically start replay buffer when streaming`\
    _This will help you ensure it's always running when streaming._
-   Inside the `Recording` tab, these are also your settings for the `Replay Buffer`
    -   Take note of the recording path and format, we'll need these for StreamerBot.

#### StreamerBot settings

-   Select the `Clipping Tool` Action and update the following; - Set global "yourReplayPath" - This is where your `recording path` was from OBS.
    -   Set global "yourOutputPath" - This is where you want the new files to go to.
    -   Set global "yourFileFormat" - This is what format you are using, such as mp4/mkv/etc
        > It's important to note that the paths are written in `C#` and may not appear as you'd expect. For example, my Replay Path on Windows is `D:\rec` but in `C#` it's `D:\\rec\\`. We haven't found a good converter for those who aren't aware, so if you get super stuck on this, please feel free to jump into our [Discord](https://gezel.io/discord) and either us or someone from the community I'm sure will be able to help!

NOTE: This is a "fork" of [HYP3RSTRIKE](https://youtube.com/hyp3rstrike)'s [Advanced OBS Clipper](https://github.com/hyp3rstrike/StreamerBot_CSharp/blob/main/AdvancedOBSClipper.cs) to function with YTCR as a separate icon within the extension. Credits go to him for giving us this idea, so I'd recommend dropping him a [sub on YouTube](https://youtube.com/hyp3rstrike) to say thank you!
