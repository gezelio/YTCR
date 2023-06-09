# How to set up YouTube Channel Rewards as a streamer

#### Prerequisites

-   [Streamer.Bot](https://streamer.bot) - v0.1.16 or newer
-   An affiliated Twitch channel - needed to create channel rewards in Streamer.Bot
-   A YouTube channel that is connected to your Discord - needed for [step 4](https://github.com/gezelio/YTCR#4-the-ytcr-dashboard)

## 1. Streamerbot configuration

---

### Initial setup

1. Download `YTCR_{version}.gezel` from our [Releases Page](https://github.com/gezelio/YTCR/releases).
2. Launch Streamer.Bot and select `Import` and drag the file into the `Import String` box.
    - Confirm you see the following `Actions`:
        - Clipping Tool
        - Execute Channel Reward Redeem
        - Set Channel Rewards
    - Once confirmed, you can click `Import`.
3. Click the `Set Channel Rewards` action and you should see two Sub-Actions. Double click `Set global "youtube_channel_id"`.
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

### 3. Setting up channel rewards

It's likely you've set up channel points with StreamerBot before for your Twitch, but if you haven't, you can watch IRLCreates video [here](https://www.youtube.com/watch?v=nlNkGBWA1A0). This should give you an idea on how to get started.

**The channel points used will be the ones under the “Twitch category” on StreamerBot:**

#### **You add your rewards in `Platforms > Twitch > Channel Point Rewards` inside Streamerbot.**

**NOTE:** There are some important things to know what we will pull into the YouTube Channel Points that you should pay attention to:

-   Group
    -   The channel rewards you want on YouTube should be under a group called `YTCR`
        -   You can add rewards to a group by double clicking on one, and under ‘group’ type `YTCR`
        -   Any other channel points you want to add to the group can be done by right clicking and under group select `YTCR`
-   The 'Enabled' status
    -   Any channel rewards with the ‘enabled’ setting set to ‘no’ will automatically be not pulled to the extension
        -   This is to allow you to quickly enable/disable points that may not be working on your side, or are not fully complete.
-   User Input Required
    -   Any reward that requires a user input will also automatically not be added to the extension, as this is a Twitch feature that currently cannot be replicated with our extension (yet).
-   Action
    -   Ensure you have an action set in order for this to work! You must create a new action, and have a sub action inside to link. (This will be resolved in v2.0.0)

> The cost of a channel point inside StreamerBot will also be the cost of the action inside YouTube. Users generate points every 5 minutes, so be sure you set these fair with how many points you offer every 5 minutes from the [Dashboard](https://youtube.redeems.live).

---

### 4. The YTCR Dashboard

Before going forward, it's good to confirm that your YouTube channel is linked to your Discord account. If you do not have a YouTube channel linked to your Discord, YTCR won't be able to find your channel as we use Discord as our sign in method. Once you've added your YouTube channel to your Discord's `Connections` (can be found in User Settings):

1.  Sign in to [https://youtube.redeems.live](http://youtube.redeems.live/creds/login)
2.  Authenticate with Discord (the only sign in method)
3.  Choose your YouTube channel

After this, you can do things like set the amount of points you'd like your viewers to earn each interval (which is roughly 5 minutes) and much more!

> **Tip:** You can actually add a custom dock on your OBS to see how many points each user has! If you click `View Profile` on the YTCR site, you can see your username in the URL bar like this:
> `youtube.redeems.live/u/USERNAME`.\
> Add the following URL (and update your username) to a `custom dock` inside `OBS > Docks > Custom Browser Docks` to see this from there;
> ` https://youtube.redeems.live/obs/USERNAME?darkmode=true&refresh=true`

---

### 5. Clipping tool

The Clipping Tool is a feature that adds a clipping feature to your stream. This utilizes the OBS `Replay Buffer` feature and would require additional setup.
We made this because YouTube's clipping feature doesn't actually create a downloadable clip to post on other social media platforms, so we hope this will be a good alternative to Twitch's clip feature.

> **If you don't plan on using Clipping Tool, you can disable it in the YTCR Dashboard and ignore all of this.**

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

---

### And that's it! You're all set up on YTCR!

---
