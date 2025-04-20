import { createMemoryRouter, RouterProvider } from "react-router";

import PageContainer from "./pages/page_container";

import Footer from "./components/footer";
import { VStack } from "@chakra-ui/react";

import LoginPage from "./pages/login_page";
import CallsPage from "./pages/calls_page";
import CrmPage from "./pages/crm_page";
import AutomationPage from "./pages/automation_page";
import BasePage from "./pages/base_page";
import MailingPage from "./pages/mailing_page";
import ManagementPage from "./pages/management_page";

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
    path: "/crm",
    element: (
      <PageContainer>
        <CrmPage />
      </PageContainer>
    ),
  },

  {
    path: "/automation",
    element: (
      <PageContainer>
        <AutomationPage />
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
    path: "/base",
    element: (
      <PageContainer>
        <BasePage />
      </PageContainer>
    ),
  },
  {
    path: "/mailing",
    element: (
      <PageContainer>
        <MailingPage />
      </PageContainer>
    ),
  },
  {
    path: "/management",
    element: (
      <PageContainer>
        <ManagementPage />
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
