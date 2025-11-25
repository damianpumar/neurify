import { generateComponent } from "@adaptive-ui/client";
import React, { useEffect, useState } from "react";

interface AIComponentProps {
  intent: string;
  data: any;
}

export const AIComponent: React.FC<AIComponentProps> = ({ intent, data }) => {
  const [generating, setGenerating] = useState<boolean>(true);
  const [html, setHtml] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    generateComponent(intent, data, {
      language: "en",
      persona: "default",
      timestamp: 18232183123127,
      sessionId: "demo-session",
    })
      .then((generatedHtml) => {
        setHtml(generatedHtml);
        setGenerating(false);
      })
      .catch((err) => {
        setError(err.message || "Error generating AIComponent");
        setGenerating(false);
      });
  });

  if (generating) {
    return <div>Generating...</div>;
  }

  if (error) {
    return <div className="text-red-600"> {error} </div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
