"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureAttribution } from "@/lib/analytics";

/** Records UTM / click-ID / landing-page attribution for the session. Renders nothing. */
export default function AttributionCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureAttribution();
  }, [pathname, searchParams]);

  return null;
}
