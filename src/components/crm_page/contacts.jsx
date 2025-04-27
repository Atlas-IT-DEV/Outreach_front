import { Button, HStack, Text, VStack } from "@chakra-ui/react";

import Searcher from "../searcher";
import TableContacts from "./table_contacts";
import ModalAddContact from "./modal_add_contact";
import { useStores } from "../../store/store_context";

const Contacts = () => {
  const { pageStore } = useStores();
  const options = {
    keys: ["fullName", "company"], // Поля для поиска
    threshold: 0.5, // 0 = точное совпадение, 1 = любые совпадения
  };
  return (
    <VStack width={"100%"}>
      <Searcher
        array={pageStore.crm_contacts}
        options={options}
        search_by="Поиск по контактам"
      />
      <HStack width={"100%"} justify={"flex-end"} marginTop={"10px"}>
        <ModalAddContact />
      </HStack>

      <TableContacts />
    </VStack>
  );
};

export default Contacts;
