import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Leads from "../components/crm_page/leads";
import Contacts from "../components/crm_page/contacts";
import Automation from "../components/crm_page/automation";
import Tasks from "../components/crm_page/tasks";
import useWindowDimensions from "../windowDimensions";
import { observer } from "mobx-react-lite";
import { useStores } from "../store/store_context";

const CrmPage = observer(() => {
  const [selected, setSelected] = useState([1, 0, 0, 0]);
  const { width } = useWindowDimensions();
  const { pageStore } = useStores();

  useEffect(() => {
    pageStore.getAllClients();
    pageStore.getAllCompanies();
    pageStore.getAllBases();
    pageStore.getAllScripts();
    pageStore.getAllWorks();
    pageStore.getAllTasks();
    pageStore.getAllUsers();
    pageStore.updateSearchElement([]);
    pageStore.updateSearchValue("");
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
      {width >= 900 ? (
        <HStack width={"100%"} gap={"10px"} justify={"space-between"}>
          <Button
            width={"100%"}
            border={"2px solid #4682B4"}
            boxShadow={"-2px 2px 0 0 #4682B4"}
            borderRadius={"0px"}
            bg={selected[0] == 1 ? "#4682B4" : "white"}
            color={selected[0] == 1 ? "white" : "black"}
            onClick={() => setSelected([1, 0, 0, 0])}
            _hover={{ bg: "#4682B4", color: "white" }}
          >
            <Text fontSize={width >= 1000 ? "16px" : "14px"}>Лиды</Text>
          </Button>

          <Button
            width={"100%"}
            border={"2px solid #4682B4"}
            boxShadow={"-2px 2px 0 0 #4682B4"}
            borderRadius={"0px"}
            bg={selected[3] == 1 ? "#4682B4" : "white"}
            color={selected[3] == 1 ? "white" : "black"}
            onClick={() => setSelected([0, 0, 0, 1])}
            _hover={{ bg: "#4682B4", color: "white" }}
          >
            <Text fontSize={width >= 1000 ? "16px" : "14px"}>
              Задачи и уведомления
            </Text>
          </Button>
        </HStack>
      ) : (
        <VStack width={"100%"} gap={"10px"}>
          <Button
            width={"100%"}
            border={"2px solid #4682B4"}
            boxShadow={"-2px 2px 0 0 #4682B4"}
            borderRadius={"0px"}
            bg={selected[0] == 1 ? "#4682B4" : "white"}
            color={selected[0] == 1 ? "white" : "black"}
            onClick={() => setSelected([1, 0, 0, 0])}
            _hover={{ bg: "#4682B4", color: "white" }}
          >
            <Text fontSize={width >= 1000 ? "16px" : ["13px", "14px"]}>
              Лиды
            </Text>
          </Button>
          <Button
            width={"100%"}
            border={"2px solid #4682B4"}
            boxShadow={"-2px 2px 0 0 #4682B4"}
            borderRadius={"0px"}
            bg={selected[3] == 1 ? "#4682B4" : "white"}
            color={selected[3] == 1 ? "white" : "black"}
            onClick={() => setSelected([0, 0, 0, 1])}
            _hover={{ bg: "#4682B4", color: "white" }}
          >
            <Text fontSize={width >= 1000 ? "16px" : "14px"}>
              Задачи и уведомления
            </Text>
          </Button>
        </VStack>
      )}

      {selected[0] == 1 ? (
        <Leads />
      ) : selected[1] == 1 ? (
        <Contacts />
      ) : selected[2] == 1 ? (
        <Automation />
      ) : (
        <Tasks />
      )}
    </VStack>
  );
});

export default CrmPage;
