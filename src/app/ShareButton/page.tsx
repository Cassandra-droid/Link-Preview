"use client";
import React, { useState } from "react";

const ShareButton: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const generateShareableUrl = () => {
    const baseUrl = "https://link-preview-eta.vercel.app/";
    const defaultText = "My Default Editable Text";
    const encodedText = encodeURIComponent(defaultText);
    return `${baseUrl}?text=${encodedText}`;
  };

  const handleCopy = async () => {
    const shareableUrl = generateShareableUrl();

    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopied(true);
      console.log("URL copied to clipboard");
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  return (
    <div style={{ display: "none" }}>
      <input
        type="text"
        id="editableText"
        value="Your Default Editable Text"
        readOnly
        style={{ position: "absolute", left: "-9999px" }}
      />
      <button onClick={handleCopy}>Copy Shareable Link</button>
      {copied && <p>Link copied to clipboard!</p>}
    </div>
  );
};

export default ShareButton;
