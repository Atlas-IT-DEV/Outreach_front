import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Journal from "../components/mailing_page/journal";
import Report from "../components/mailing_page/report";
import useWindowDimensions from "../windowDimensions";
import TableScripts from "../components/table_scripts";
import { useStores } from "../store/store_context";
import Scripts from "../components/mailing_page/scripts";
import { observer } from "mobx-react-lite";

const MailingPage = observer(() => {
  const [selected, setSelected] = useState([1, 0, 0]);
  const { width } = useWindowDimensions();
  const { pageStore } = useStores();

  useEffect(() => {
    pageStore.getAllWorks();
    pageStore.getAllScripts();
    pageStore.updateSearchElement([]);
    pageStore.updateSearchValue("");
  }, []);

  useEffect(() => {
    pageStore.updateSelectedScript({});
  }, [selected]);

  return (
    <VStack
      width={"100%"}
      minHeight={"100vh"}
      height={"auto"}
      overflow={"hidden scroll"}
      align={"flex-start"}
      marginLeft={width >= 1400 ? "280px" : 0}
      padding={width >= 1400 ? "40px" : ["10px", "20px"]}
      marginTop={width >= 1400 ? "10px" : ["40px", "30px"]}
    >
      <HStack width={"100%"} gap={"10px"} justify={"space-between"}>
        <Button
          width={"100%"}
          border={"2px solid rgba(48, 141, 218, 1)"}
          
          borderRadius={"8px"}
          bg={selected[0] == 1 ? "rgba(48, 141, 218, 1)" : "white"}
          color={selected[0] == 1 ? "white" : "black"}
          onClick={() => setSelected([1, 0, 0])}
          _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
        >
          <Text fontSize={width >= 1000 ? "16px" : "14px"}>Журнал</Text>
        </Button>
        <Button
          width={"100%"}
          border={"2px solid rgba(48, 141, 218, 1)"}
          borderRadius={"8px"}
          
          bg={selected[1] == 1 ? "rgba(48, 141, 218, 1)" : "white"}
          color={selected[1] == 1 ? "white" : "black"}
          onClick={() => setSelected([0, 1, 0])}
          _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
        >
          <Text fontSize={width >= 1000 ? "16px" : "14px"}>Скрипты</Text>
        </Button>
        <Button
          width={"100%"}
          border={"2px solid rgba(48, 141, 218, 1)"}
          borderRadius={"8px"}
          
          bg={selected[2] == 1 ? "rgba(48, 141, 218, 1)" : "white"}
          color={selected[2] == 1 ? "white" : "black"}
          onClick={() => setSelected([0, 0, 1])}
          _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
        >
          <Text fontSize={width >= 1000 ? "16px" : "14px"}>Отчетность</Text>
        </Button>
      </HStack>
      {selected[0] == 1 ? (
        <Journal />
      ) : selected[1] == 1 ? (
        <Scripts />
      ) : (
        <Report />
      )}
    </VStack>
  );
});

export default MailingPage;
