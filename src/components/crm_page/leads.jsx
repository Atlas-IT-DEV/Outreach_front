import { Button, HStack, Input, Stack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

import Searcher from "../searcher";
import TableLeads from "./table_leads";
import ModalCreateLead from "./modal_create_lead";
import { useStores } from "../../store/store_context";
import useWindowDimensions from "../../windowDimensions";

const Leads = () => {
  const { pageStore } = useStores();
  const { width } = useWindowDimensions();
  const options = {
    keys: ["number", "responsible"], // Поля для поиска
    threshold: 0, // 0 = точное совпадение, 1 = любые совпадения
  };
  return (
    <VStack w={"100%"}>
      <Searcher
        array={pageStore.leads}
        options={options}
        search_by="Поиск по лидам"
      />

      <Stack
        width={"100%"}
        justify={"space-between"}
        marginTop={"10px"}
        flexDirection={width >= 1400 ? "row" : "column"}
      >
        <ModalCreateLead />
        <HStack width={"100%"} justify={"space-between"}>
          <Button
            boxShadow={"-2px 2px 0 0 #4682B4"}
            borderRadius={"0px"}
            border={"1px solid #4682B4"}
            bg={"white"}
            color={"black"}
            _hover={{ bg: "#4682B4", color: "white" }}
            flexShrink={width >= 1400 ? 0 : 1}
            width={width >= 1400 ? "auto" : "100%"}
          >
            <Text fontSize={width >= 1000 ? "16px" : ["13px", "14px"]}>
              Загрузить лида
            </Text>
          </Button>
          <Button
            boxShadow={"-2px 2px 0 0 #4682B4"}
            borderRadius={"0px"}
            border={"1px solid #4682B4"}
            bg={"white"}
            color={"black"}
            _hover={{ bg: "#4682B4", color: "white" }}
            flexShrink={width >= 1400 ? 0 : 1}
            width={width >= 1400 ? "auto" : "100%"}
          >
            <Text fontSize={width >= 1000 ? "16px" : ["13px", "14px"]}>
              Настроить статусы
            </Text>
          </Button>
        </HStack>
      </Stack>

      <TableLeads />
    </VStack>
  );
};

export default Leads;
