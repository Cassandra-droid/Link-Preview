"use client";
import React, { useState, useEffect, useRef } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import styles from "./sharebutton.module.css";

const ShareButton: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

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

  const handleClickOutside = (event: MouseEvent) => {
    if (
      shareMenuRef.current &&
      !shareMenuRef.current.contains(event.target as Node)
    ) {
      setShowMenu(false);
      setCopied(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  //remove text on screen after copying link
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className={styles.sharebuttoncontainer}>
      <button
        className={styles.shareiconbutton}
        onClick={handleShareIconClick}
        onMouseEnter={() => setShowMenu(true)}
      >
        <i className="fas fa-share-alt"></i>
      </button>
      {showMenu && (
        <div
          ref={shareMenuRef}
          className={styles.sharemenu}
          onMouseLeave={() => setShowMenu(true)}
        >
          <button className={styles.emailbutton} onClick={handleEmailShare}>
            <i className="fas fa-envelope"></i> Share via Email
          </button>
          <button className={styles.twitterbutton} onClick={handleTwitterShare}>
            <i className="fab fa-twitter"></i> Share via Twitter
          </button>
          <button
            className={styles.whatsappbutton}
            onClick={handleWhatsAppShare}
          >
            <i className="fab fa-whatsapp"></i> Share via WhatsApp
          </button>
          <button className={styles.copybutton} onClick={handleCopyLink}>
            <i className="fas fa-copy"></i> Copy Link
          </button>
        </div>
      )}
      {copied && <p className={styles.copiedText}>Link copied to clipboard!</p>}
    </div>
  );
};

export default ShareButton;
