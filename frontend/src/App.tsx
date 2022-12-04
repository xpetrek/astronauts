import { Layout } from "./components/Layout";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApplicationRoutes } from "./ApplicationRoutes";

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Layout>
          <ApplicationRoutes />
        </Layout>
      </QueryClientProvider>
      {/* <ReactQueryDevtools /> */}
    </BrowserRouter>
  );
}

export default App;
