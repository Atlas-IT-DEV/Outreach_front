import { VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import Clients from "../components/management_page/clients";
import useWindowDimensions from "../windowDimensions";
import { useEffect } from "react";
import { useStores } from "../store/store_context";

const ManagementPage = observer(() => {
  const { width } = useWindowDimensions();
  const { pageStore } = useStores();

  useEffect(() => {
    pageStore.getAllClients();
    pageStore.getAllUsers();
  }, []);
  return (
    <VStack
      width={"100%"}
      minHeight={"100vh"}
      height={"auto"}
      overflow={"hidden"}
      align={"flex-start"}
      marginLeft={width >= 1400 ? "280px" : 0}
      padding={width >= 1400 ? "40px" : ["10px", "20px"]}
      marginTop={width >= 1400 ? "10px" : ["40px", "30px"]}
    >
      <Clients />
    </VStack>
  );
});

export default ManagementPage;
