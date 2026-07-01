"use client";
import * as ReactQuery from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { useI18n } from "@/locales/i18n";
import { Toaster } from "@/components/ui/sonner";

const QueryClientProvider = (
  ReactQuery as unknown as {
    QueryClientProvider: React.ComponentType<{
      client: QueryClient;
      children?: React.ReactNode;
    }>;
  }
).QueryClientProvider;

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lang, dir } = useI18n();
  const [query] = useState(() => new QueryClient());

  return (
    <div lang={lang} dir={dir} className="min-h-screen">
      <QueryClientProvider client={query}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "17px",
            padding: "14px 20px",
          },
        }}
      />
    </div>
  );
}
