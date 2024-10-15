"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { FC, ReactNode, useState } from "react";

export const ReactQueryProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
