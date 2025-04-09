import { Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

import Searcher from "../searcher";
import TableLeads from "./table_leads";
import ModalCreateLead from "./modal_create_lead";

const Leads = () => {
  const [typeView, setTypeView] = useState("kanban");
  return (
    <VStack w={"100%"}>
      <HStack width={"100%"} marginTop={"20px"} align={"center"}>
        <Searcher />
      </HStack>

      <HStack width={"100%"} justify={"space-between"} marginTop={"20px"}>
        <ModalCreateLead />

        <HStack>
          <Button
            boxShadow={"-2px 2px 0 0 #4682B4"}
            borderRadius={"0px"}
            border={"1px solid #4682B4"}
            bg={"white"}
            color={"black"}
            _hover={{ bg: "#4682B4", color: "white" }}
            flexShrink={0}
          >
            <Text>Загрузить лида</Text>
          </Button>
          <Button
            boxShadow={"-2px 2px 0 0 #4682B4"}
            borderRadius={"0px"}
            border={"1px solid #4682B4"}
            bg={"white"}
            color={"black"}
            _hover={{ bg: "#4682B4", color: "white" }}
            flexShrink={0}
          >
            <Text>Настроить статусы</Text>
          </Button>
        </HStack>
      </HStack>
      <VStack
        width={"auto"}
        minWidth={"100%"}
        marginTop={"20px"}
        overflow={"hidden"}
        overflowX={"scroll"}
      >
        <TableLeads />
      </VStack>
    </VStack>
  );
};

export default Leads;
