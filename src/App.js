import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";

import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Routes/Router";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="bg-slate-900">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
