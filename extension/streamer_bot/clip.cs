// This is a fork of HYP3RSTRIKE's clip tool, which triggers a clip via a chat command rather than the button inside YTCR.
// If you'd also like to use that, I'd recommend checking out his GitHub: https://github.com/hyp3rstrike/StreamerBot_CSharp/blob/main/AdvancedOBSClipper.cs
// You can also check out his YouTube at https://youtube.com/hyp3rstrike
using System;
using System.IO;
using System.Text;
using System.Linq;
using System.Globalization;

public class CPHInline
{
    public bool Execute()
    {
        var clipPath = "";
        try
        {
            DateTime localDate = DateTime.Now;
            string time = localDate.ToString("HH:mm");
            string time_new = time.Replace(":", "-");
            string date = localDate.ToString("yyyy-MM-dd");
            string data_time = date + "_" + time_new;
            // Set your ReplayBuffer FilePaths Here
            string yourReplayPath = CPH.GetGlobalVar<string>("yourReplayPath");
            string yourOutputPath = CPH.GetGlobalVar<string>("yourOutputPath");
            string yourFileFormat = CPH.GetGlobalVar<string>("yourFileFormat"); // Set this to your chosen output format. Remember, you can remux MKV's to MP4's directly via OBS. 
            // Variables used in the routine
            string fileNameInput = "clip"; // Name of the clip, which is used as the the new filename.
            string clipUser = args["YTCR_clip_username"].ToString(); // Triggering User for attribution
            // If there's no input from the chatter, it won't save the clip.
            // The actual OBS Replay Buffer save event
            CPH.ObsReplayBufferSave();
            // Wait 2 seconds in case there's a delay of whatever reason
            System.Threading.Thread.Sleep(2000);
            // Scan the initial folder where the clip is saved for the newest file created - presumably the clip
            var clipBackups = new DirectoryInfo(@"" + yourReplayPath + "");
            // Filter by MKV files - or change to whatever file output format you have your replay buffer configured to.
            var clipFile = clipBackups.GetFiles("*." + yourFileFormat).OrderByDescending(p => p.CreationTime).FirstOrDefault();
            // If no file found, quit out.
            if (clipFile == null)
                return true; //
            // Grab the file name by the Windows Path
            clipPath = clipFile.FullName;
            // Rename the file
            string newFileName = @"" + yourOutputPath + "\\{date}\\" + data_time + " (clipped by " + clipUser + ")." + yourFileFormat;
            System.IO.File.Move(clipPath, newFileName);
            // Send an alert to the YouTube chat that the clip has been successfully saved by the user.
            string msgOutput = args["YTCR_clip_username"].ToString() + " has just saved a clip!";
            CPH.SendYouTubeMessage(msgOutput);
            // Finish up.
            return true;
        }
        catch
        {
            System.IO.File.Delete(clipPath);
            return true;
        }
    }
}