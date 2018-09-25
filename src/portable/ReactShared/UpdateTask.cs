﻿using System;
using System.Text.RegularExpressions;
using System.Web;
using System.Xml;

namespace ReactShared
{
	public class UpdateTask
	{
		public static readonly Regex ReferencePattern = new Regex(@"^([A-Za-z1-3]{3}) ([0-9]{1,3}):([0-9]{1,3})-([0-9]{1,3})$", RegexOptions.Compiled);

		public UpdateTask(string query)
		{
			var parsedQuery = HttpUtility.ParseQueryString(query);
			var task = parsedQuery["task"];
			var taskMatch = Util.TaskIdPattern.Match(task);
			var taskId = taskMatch.Success ? taskMatch.Groups[1].Value : task;

			var project = parsedQuery["project"];
			var audioFile = parsedQuery["audioFile"];
			var reference = parsedQuery["reference"];
			var heading = parsedQuery["heading"];
			var assignedTo = parsedQuery["assignedTo"];
			var timeDuration = parsedQuery["timeDuration"];

			//Debug.Print($"{task}:{project}:{audioFile}:{reference}:{heading}:{assignedTo}:{timeDuration}");
			var tasksDoc = Util.LoadXmlData("tasks");
			var projectNode = tasksDoc.SelectSingleNode($"//project[@id='{project}']");
			if (projectNode == null)
				return;
			if (string.IsNullOrEmpty(taskId))
			{
				var refMatch = ReferencePattern.Match(reference);
				if (refMatch.Success)
				{
					taskId = $"{project}-{refMatch.Groups[1].Value}-{int.Parse(refMatch.Groups[2].Value):D3}-{int.Parse(refMatch.Groups[3].Value):D3}{int.Parse(refMatch.Groups[4].Value):D3}";
				}
				else if (!string.IsNullOrEmpty(audioFile))
				{
					taskId = $"{project}-{audioFile}";
				}
				else
				{
					var allTaskNodes = tasksDoc.SelectNodes($"//project[@id='{project}']/task");
					taskId = $"{project}-{allTaskNodes.Count:D3}";
				}
			}

			var taskNode = tasksDoc.SelectSingleNode($"//project[@id='{project}']/task[@id='{taskId}']") as XmlElement;
			if (taskNode == null)
			{
				taskNode = tasksDoc.CreateElement("task");
				Util.NewAttr(taskNode, "id", taskId);
				projectNode.AppendChild(taskNode);
			}

			var taskNameNode = taskNode.SelectSingleNode("name") as XmlElement;
			if (taskNameNode == null)
			{
				taskNameNode = tasksDoc.CreateElement("name");
				taskNode.AppendChild(taskNameNode);
			}
			taskNameNode.InnerText = heading;
			Util.UpdateAttr(taskNode, "assignedto", assignedTo);
			Util.UpdateAttr(taskNode, "length", timeDuration);
			Util.UpdateAttr(taskNode, "state", "Transcribe");
			
			using (var xw = XmlWriter.Create(Util.XmlFullName("tasks"), new XmlWriterSettings {Indent = true}))
			{
				tasksDoc.Save(xw);
			}
		}
	}
}