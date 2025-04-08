import { Button, HStack, Text, VStack } from "@chakra-ui/react";

import Searcher from "../searcher";
import TableContacts from "./table_contacts";

const Contacts = () => {
  return (
    <VStack width={"100%"}>
      <HStack width={"100%"} marginTop={"20px"}>
        <Searcher />
      </HStack>
      <HStack width={"100%"} justify={"flex-end"} marginTop={"20px"}>
        <Button
          boxShadow={"-2px 2px 0 0 #4682B4"}
          borderRadius={"0px"}
          border={"1px solid #4682B4"}
          bg={"white"}
          color={"black"}
          _hover={{ bg: "#4682B4", color: "white" }}
          flexShrink={0}
        >
          <Text>Добавить контакт</Text>
        </Button>
      </HStack>
      <VStack
        width={"auto"}
        minWidth={"100%"}
        marginTop={"20px"}
        overflow={"hidden"}
        overflowX={"scroll"}
      >
        <TableContacts />
      </VStack>
    </VStack>
  );
};

export default Contacts;
