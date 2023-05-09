using System;
using Newtonsoft.Json.Linq;

public class CPHInline
{
    public bool Execute()
    {
        var channel_check = "CHANGE ME TO YOUR CHANNEL ID";
        var msg = args["message"].ToString();
        var json = JObject.Parse(msg);
        var channel = (string) json["channel_id"];
        var user = (string) json["username"];
        var reward_id = (int) json["reward_id"];
        var reward_name = (string) json["reward_name"];
        var reward_action_id = (string) json["reward_action_id"];
        if (channel == channel_check)
        {
            CPH.RunActionById (reward_action_id);
            CPH.SendYouTubeMessage($"{user} has redeemed '{reward_name}'");
        }

        CPH.LogInfo($"LogVars :: {json} = {args}");
        return true;
    }
}
