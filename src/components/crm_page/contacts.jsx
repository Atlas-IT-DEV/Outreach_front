import { Button, HStack, Text, VStack } from "@chakra-ui/react";

import Searcher from "../searcher";
import TableContacts from "./table_contacts";
import ModalAddContact from "./modal_add_contact";

const Contacts = () => {
  return (
    <VStack width={"100%"}>
      <HStack width={"100%"} marginTop={"20px"}>
        <Searcher />
      </HStack>
      <HStack width={"100%"} justify={"flex-end"} marginTop={"20px"}>
        <ModalAddContact />
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
