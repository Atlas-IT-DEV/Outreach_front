import { HStack, VStack } from "@chakra-ui/react";
import SideMenu from "../components/side_menu";
import Footer from "../components/footer";

const PageContainer = ({ children }) => {
  return (
    <VStack>
      <HStack
        width={"100%"}
        minH={"100vh"}
        backgroundColor={"white"}
        align={"flex-start"}
      >
        <SideMenu />
        {children}
      </HStack>
      <Footer />
    </VStack>
  );
};

export default PageContainer;
