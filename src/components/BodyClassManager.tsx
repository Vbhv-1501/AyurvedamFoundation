"use client";

import { useEffect } from "react";

interface BodyClassManagerProps {
  className: string;
}

export default function BodyClassManager({ className }: BodyClassManagerProps) {
  useEffect(() => {
    // Save original classes
    const originalClasses = document.body.className;

    // Apply the page-specific classes
    document.body.className = className;

    return () => {
      // Restore original class on unmount
      document.body.className = originalClasses;
    };
  }, [className]);

  return null;
}
