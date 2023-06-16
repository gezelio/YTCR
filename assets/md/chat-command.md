# Set Up Chat Commands
## Understanding "Message Response"
Message response is a feature of YTCR that allows you to send a message when a reward is redeemed. It's primary function is to trigger a chat command on a tool such as [MixItUp](#mixitup), [SAMMI](#sammi), [StreamerBot](#streamerbot) and basically any other tool that can be triggered via a YouTube chat message.

Below we'll go over how to set these up for each service.

---
**PLEASE NOTE**

- The reward **must be triggered via an expination point** (!) in order for it to trigger the command.
- **Do not inlcude** other symbols in your command such as !, ?, #, etc. Doing this will cause the command to not trigger.

---

## StreamerBot

---
**PLEASE NOTE**

This is only if you don't wish to use the `Action ID` section. If you wish to use the `Action ID` instead of a chat command, please follow [this guide](/action-id)

---

1. Create the `action` you wish to be triggered on the reward event
2. Navigate to `Commands` and right click to create a new command
3. Inside the `Command(s)` box, please enter your desired command. For example, if you wanted to trigger a sound effect, you would enter `!soundeffect`
4. Under `Action`, select the action you created in step 1
5. Under `Sources` choose `YouTube Message`
6. Under `Permissions`:
   1. Grant Type: `Allow (all, or only some)`
   2. Select `User Permissions` and grant these to your YouTube account and your Bot account.
7. Click `Ok`
8. Click `Save` at the top of StreamerBot

## MixItUp
---
**PLEASE NOTE**

This requires the YouTube Beta version of MixItUp. You can apply for this [here](https://docs.google.com/forms/d/e/1FAIpQLSfGG_EPqaVgli-785zwoDWkOdzwyCKij4qnvS91ndCYB4VdcQ/viewform).

---

1.  Go to `commands > custom commands > add new command`
2.  Name your command and set the chat trigger as you'd like
3.  Under `Action`, choose what you'd like MixItUp to do when the command is triggered
4.  Under `Useage Requirements`, click `User Role`
    1.  Switch the view to `Advanced`
    2.  Streaming platform: `YouTube`
    3.  Role: `Streamer`
    4.  Role: `Moderator`
5.  Click the `Save` button at the bottom of MixItUp

## SAMMI

We currently do not have documentation on SAMMI. If you wish to contribute, please submit a pull request [here](https://github.com/gezelio/ytcr/pulls)