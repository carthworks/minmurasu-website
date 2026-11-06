import React from "react";
import Container from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <Container>
        <EmptyState
          title="Page Not Found (404)"
          description="The page or resource you are looking for may have moved or no longer exists. Let’s get you back to our growth solutions."
          actionLabel="Return to Homepage"
          actionHref="/"
        />
      </Container>
    </section>
  );
}

