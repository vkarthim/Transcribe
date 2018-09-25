﻿using System.Diagnostics;
using System.Web;
using System.Xml;

namespace ReactShared
{
	public class UpdateProject
	{
		public UpdateProject(string query)
		{
			var parsedQuery = HttpUtility.ParseQueryString(query);
			var id = parsedQuery["project"];
			var name = parsedQuery["name"];
			var guid = parsedQuery["guid"];
			var lang = parsedQuery["lang"];
			var langName = parsedQuery["langName"];
			var font = parsedQuery["font"];
			var size = parsedQuery["size"];
			var features = parsedQuery["features"];
			var dir = parsedQuery["dir"];
			var sync = parsedQuery["sync"];
			var claim = parsedQuery["claim"];
			var type = parsedQuery["type"];
			var message =
				$"UpdateProject id={id}, name={name}, guid={guid}, lang={lang}, langName={langName}, font={font}, size={size}, features={features}, direction={dir}, synch={sync}, claim={claim}, type={type}";
			Debug.Print(message);
			var tasksDoc = Util.LoadXmlData("tasks");
			var taskNode = tasksDoc.SelectSingleNode($"//project[@id = '{id}']");
			if (taskNode == null)
			{
				taskNode = tasksDoc.CreateElement("project");
				Debug.Assert(tasksDoc.DocumentElement != null, "tasksDoc.DocumentElement != null");
				tasksDoc.DocumentElement.AppendChild(taskNode);
			}
			Util.NewAttr(taskNode, "id", id);
			Util.NewAttr(taskNode, "name", name);
			Util.NewAttr(taskNode, "guid", guid);
			Util.NewAttr(taskNode, "lang", lang);
			Util.NewAttr(taskNode, "langName", langName);
			Util.NewAttr(taskNode, "font", font);
			Util.NewAttr(taskNode, "size", size);
			Util.NewAttr(taskNode, "features", features);
			Util.NewAttr(taskNode, "direction", dir);
			Util.NewAttr(taskNode, "sync", sync);
			Util.NewAttr(taskNode, "claim", claim);
			Util.NewAttr(taskNode, "type", type);
			using (var xw = XmlWriter.Create(Util.XmlFullName("tasks"), new XmlWriterSettings { Indent = true }))
			{
				tasksDoc.Save(xw);
			}
		}
	}
}