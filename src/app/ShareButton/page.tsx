"use client";
import React, { useState } from "react";

const ShareButton: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const specifiedText = "Your specified text here";
  const shareableUrl = "https://link-preview-eta.vercel.app/";

  const handleShareIconClick = () => {
    setShowMenu(!showMenu);
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent("Check out this link!");
    const body = encodeURIComponent(`${specifiedText}\n${shareableUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setShowMenu(false);
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`${specifiedText} ${shareableUrl}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    setShowMenu(false);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${specifiedText} ${shareableUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    setShowMenu(false);
  };

  const handleCopyLink = async () => {
    const textToCopy = `${specifiedText}\n${shareableUrl}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      console.log("Content copied to clipboard:", textToCopy);
    } catch (error) {
      console.error("Failed to copy content:", error);
    }
    setShowMenu(false);
  };

  return (
    <div className="share-button-container">
      <button className="share-icon-button" onClick={handleShareIconClick}>
        Share
      </button>
      {showMenu && (
        <div className="share-menu">
          <button onClick={handleEmailShare}>Share via Email</button>
          <button onClick={handleTwitterShare}>Share via Twitter</button>
          <button onClick={handleWhatsAppShare}>Share via WhatsApp</button>
          <button onClick={handleCopyLink}>Copy Link</button>
          {copied && <p>Link copied to clipboard!</p>}
        </div>
      )}
    </div>
  );
};

export default ShareButton;
