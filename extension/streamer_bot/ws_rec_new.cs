using System;
using Newtonsoft.Json.Linq;

public class CPHInline
{
    public bool Execute()
    {
        string channel_check = CPH.GetGlobalVar<string>("youtube_channel_id");
        var msg = args["message"].ToString();
        var json = JObject.Parse(msg);
        if ((string) json["type"] == "Heartbeat")
        {
            CPH.LogInfo("Heartbeat received");
            return true;
        }

        var channel = (string) json["channel_id"];
        var user = (string) json["username"];
        var reward_id = (int) json["reward_id"];
        var reward_name = (string) json["reward_name"];
        var reward_action_id = (string) json["reward_action_id"];
        var reward_action_userInput = (bool) json["reward_action_userInput"];
        var reward_action_clip = (bool) json["reward_action_clip"];
        if (channel == channel_check)
        {
            if (reward_action_clip == true)
            {
                CPH.SetArgument("YTCR_clip_username", user);
                CPH.RunAction("Clipping Tool", true);
                return true;
            }

            if (reward_action_userInput == true)
            {
                var reward_action_message =
                    (string) json["reward_action_message"];
                CPH.SetArgument("YTCRMessage", reward_action_message);
            }

            CPH.RunActionById(reward_action_id, false);
            CPH.SendYouTubeMessage($"{user} has redeemed '{reward_name}'");
        }

        return true;
    }
}
