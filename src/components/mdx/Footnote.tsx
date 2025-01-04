"use client";
import styled, { keyframes } from "styled-components";
import { ReactNode, useState, useEffect } from "react";

interface FootnoteProps {
  idName: string | number;
  children: ReactNode;
  isClosed?: boolean;
}

interface FootnoteContainerProps {
  $isClosed?: boolean;
}

const flashAnimation = keyframes`
  0% {
    background-color: var(--accent);
  }
  100% {
    background-color: rgba(255, 213, 219, 0.1);
    opacity: 1;
  }
`;

// Component adapted from that of Maggie Appleton
// https://github.com/MaggieAppleton/maggieappleton.com-V2/blob/4107d30d2f73e91b23d5e97934d1c1452c463d03/components/mdx/Footnote.js
const Footnote = ({ idName, children, isClosed = false }: FootnoteProps) => {
  const [activeFootnote, setActiveFootnote] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkWidth = () => {
      setIsWideScreen(window.innerWidth >= 1420);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  const handleClick = () => {
    if (!isMounted) return;

    const element = document.getElementById(`fn-${idName}`);
    if (!element) return;

    const yOffset = -100;
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });

    setActiveFootnote(`fn-${idName}`);
    setTimeout(() => setActiveFootnote(null), 1000);
  };

  if (!isMounted) {
    // return placeholder to avoid layout shift
    return (
      <FootnoteContainer $isClosed={isClosed}>
        <label
          htmlFor={`fn-${idName}`}
          className="margin-toggle footnote-number"
        />
        {children}
      </FootnoteContainer>
    );
  }

  return (
    <FootnoteContainer $isClosed={isClosed}>
      <label
        htmlFor={`fn-${idName}`}
        className="margin-toggle footnote-number"
        onClick={isWideScreen ? handleClick : undefined}
      ></label>
      <span
        className={`footnote ${
          activeFootnote === `fn-${idName}` ? "highlight" : ""
        }`}
        id={`fn-${idName}`}
      >
        {children}
      </span>
    </FootnoteContainer>
  );
};

const FootnoteContainer = styled.span<FootnoteContainerProps>`
  .footnote.highlight {
    animation: ${flashAnimation} 1s ease;
  }

  .footnote {
    float: right;
    background: rgba(255, 213, 219, 0.1);
    transition: all 0.25s ease-in-out;
    height: fit-content;
    width: 33%;
    overflow: visible;
    clear: right;
    margin-right: -38%;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 14px;
    opacity: 0.8;
    vertical-align: baseline;
    position: relative;
    border-left: 1px solid var(--accent);
    padding-left: 1em;
    &:hover {
      opacity: 1;
    }
    a::before,
    a:hover::before,
    a {
      background: none;
      transform: none;
    }
    a span {
      font-size: 14px;
    }
  }
  label {
    cursor: pointer;
  }
  .footnote-number {
    counter-increment: footnote-counter;
  }
  .footnote-number:after,
  .footnote:before {
    position: relative;
    vertical-align: baseline;
  }
  .footnote-number:after {
    content: counter(footnote-counter);
    padding: 0.15rem;
    padding-left: 0rem;
    font-size: 1rem;
    color: var(--accent);
    font-weight: 700;
    position: relative;
    top: -6px;
    left: 2px;
  }
  .footnote:before {
    content: counter(footnote-counter);
    font-size: 1rem;
    top: -0.1rem;
    padding-right: 0.3rem;
    font-weight: 600;
    color: var(--accent);
  }
  blockquote .footnote {
    margin-right: -82%;
    min-width: 59%;
    text-align: left;
  }
  label.footnote-number {
    display: inline;
    padding-right: var(--space-3xs);
  }

  @media (max-width: 1420px) {
    .footnote {
      display: block;
      float: left;
      left: 0;
      clear: both;
      min-width: 88%;
      width: fit-content;
      margin: 1rem;
      height: auto;
      position: relative;
    }

    .footnote-number {
      cursor: auto;
    }
  }
`;

export default Footnote;
