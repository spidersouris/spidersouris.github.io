"use client";

import React, { useState } from "react";

// Context to manage footnotes state
const FootnotesContext = React.createContext({
  activeFootnote: null as string | null,
  setActiveFootnote: (id: string | null) => {},
});

export const FootnotesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeFootnote, setActiveFootnote] = useState<string | null>(null);

  return (
    <FootnotesContext.Provider value={{ activeFootnote, setActiveFootnote }}>
      {children}
    </FootnotesContext.Provider>
  );
};

// Transform the footnote reference links
export const FootnoteReference: React.FC<{
  href: string;
  children: React.ReactNode;
  className?: string;
}> = ({ href, children, className }) => {
  const { setActiveFootnote } = React.useContext(FootnotesContext);
  const id = href.replace("#", "");

  return (
    <a
      href={href}
      className={`cursor-pointer text-blue-600 hover:text-blue-800 ${
        className || ""
      }`}
      onClick={(e) => {
        e.preventDefault();
        setActiveFootnote(id);
      }}
    >
      {children}
    </a>
  );
};

// Transform the footnotes section
export const FootnotesSection: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { activeFootnote } = React.useContext(FootnotesContext);

  // Function to transform the footnote content
  const transformFootnotes = (content: React.ReactNode): React.ReactNode => {
    return React.Children.map(content, (child) => {
      if (!React.isValidElement(child)) return child;

      if (child.type === "ol") {
        // todo: figure out type
        //@ts-ignore
        return React.Children.map(child.props.children, (listItem) => {
          if (
            !React.isValidElement<{ id: string; children: React.ReactNode }>(
              listItem
            )
          ) {
            return listItem;
          }

          const id = listItem.props.id;
          const isActive = id === activeFootnote;

          return (
            <div
              key={id}
              id={id}
              className={`
                fixed right-8 w-72 bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg shadow-lg
                transform transition-all duration-200 mb-4
                ${
                  isActive
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4 pointer-events-none"
                }
              `}
              style={{
                top: getRefPosition(id.replace("user-content-", "")),
              }}
            >
              {listItem.props.children}
            </div>
          );
        });
      }

      return child;
    });
  };

  // Function to get the vertical position of the footnote reference
  const getRefPosition = (id: string) => {
    const refElement = document.getElementById(`user-content-fnref-${id}`);
    if (refElement) {
      const rect = refElement.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      return rect.top + scrollTop;
    }
    return 0;
  };

  return <div className={className}>{transformFootnotes(children)}</div>;
};

// Custom MDX components to transform remark-gfm footnotes
export const components = {
  // Transform footnote reference links
  a: (props: any) => {
    if (props.className?.includes("data-footnote-ref")) {
      return <FootnoteReference {...props} />;
    }
    // Don't transform back references
    if (props["data-footnote-backref"]) {
      return null;
    }
    return <a {...props} />;
  },
  // Transform footnotes section
  section: (props: any) => {
    if (props["data-footnotes"] === true) {
      return <FootnotesSection {...props} />;
    }
    return <section {...props} />;
  },
};

export default {
  FootnotesProvider,
  components,
};
