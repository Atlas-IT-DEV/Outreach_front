import { createMemoryRouter, RouterProvider } from "react-router";

import PageContainer from "./pages/page_container";
import LoginPage from "./pages/login_page";
import MainPage from "./pages/main_page";
import CallsPage from "./pages/calls_page";
import CommentsPage from "./pages/settings_page";
import Footer from "./components/footer";
import { VStack } from "@chakra-ui/react";
import ModulePage from "./pages/module_page";
import AdminPage from "./pages/admin_page";
import VideoPage from "./pages/video_page";
import BasesPage from "./pages/bases_page";

const router = createMemoryRouter([
  {
    path: "/",
    element: (
      <VStack>
        <LoginPage />
        <Footer />
      </VStack>
    ),
  },
  {
    path: "/main",
    element: (
      <PageContainer>
        <MainPage />
      </PageContainer>
    ),
  },
  {
    path: "/calls",
    element: (
      <PageContainer>
        <CallsPage />
      </PageContainer>
    ),
  },
  {
    path: "/bases",
    element: (
      <PageContainer>
        <BasesPage />
      </PageContainer>
    ),
  },
  {
    path: "/module",
    element: (
      <PageContainer>
        <ModulePage />
      </PageContainer>
    ),
  },
  {
    path: "/comments",
    element: (
      <PageContainer>
        <CommentsPage />
      </PageContainer>
    ),
  },
  {
    path: "/admin",
    element: (
      <PageContainer>
        <AdminPage />
      </PageContainer>
    ),
  },
  {
    path: "/video",
    element: (
      <PageContainer>
        <VideoPage />
      </PageContainer>
    ),
  },
]);
const App = () => {
  return (
    <>
      {/* <WebApp /> */}
      <RouterProvider router={router} />;
    </>
  );
};

export default App;
