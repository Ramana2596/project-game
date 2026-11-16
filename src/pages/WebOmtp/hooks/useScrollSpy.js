// ==========================================================
// Component Name : useScrollSpy
// Module         : WebOmtp (Landing)
// Purpose        : Track which landing section is in view to highlight the nav tab
// Author/Version : UXLab V1.3 / v1.0
// AI Tags        : hook, scroll-spy, navigation, landing
// ==========================================================

// Imports
import { useState, useEffect } from "react";

// Constants: sections that belong to a visible nav item
const ALIAS = {
  industry: "audiences",
  journey: "steps",
};

const OBSERVER_MARGIN = "-40% 0px -55% 0px";

const useScrollSpy = (ids, initial = "overview") => {
  // State: id of the nav item to highlight
  const [activeId, setActiveId] = useState(initial);

  // Effect: observe each section and update the highlight while scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(ALIAS[e.target.id] || e.target.id)),
      { rootMargin: OBSERVER_MARGIN }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return [activeId, setActiveId];
};

export default useScrollSpy;
