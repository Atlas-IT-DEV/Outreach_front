import { Button, Stack, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import TableBase from "../components/base_page/table_base";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";
import useWindowDimensions from "../windowDimensions";
import ModalSelectBase from "../components/base_page/modal_select_base";
import ModalImportBase from "../components/base_page/modal_import_base";
import BaseSearcher from "../components/base_page/base_searcher";

const BasePage = observer(() => {
  const { pageStore } = useStores();
  const { width } = useWindowDimensions();

  useEffect(() => {
    pageStore.getAllBases();
    pageStore.updateSearchElement([]);
    pageStore.updateSearchValue("");
  }, []);

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
      {pageStore.selected_base != "" ? <BaseSearcher /> : null}

      <Stack
        flexDirection={width >= 600 ? "row" : "column"}
        width={"100%"}
        justify={"flex-end"}
        gap={"10px"}
        marginTop={"20px"}
      >
        <ModalSelectBase />
        <ModalImportBase />
        {/* <Button
          boxShadow={"-2px 2px 0 0 #4682B4"}
          borderRadius={"0px"}
          border={"2px solid #4682B4"}
          bg={"white"}
          color={"black"}
          _hover={{ bg: "#4682B4", color: "white" }}
          flexShrink={0}
        >
          <Text>Экспортировать базу</Text>
        </Button> */}
      </Stack>
      <TableBase />
    </VStack>
  );
});

export default BasePage;
