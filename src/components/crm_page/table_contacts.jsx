import { Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/store_context";

const TableContacts = observer(() => {
  const { pageStore } = useStores();
  return (
    <Table width={"100%"} padding={"10px"} border={"2px solid #4682B4"}>
      <Thead bg={"#4682B4"} borderBottom={"none"}>
        <Tr borderBottom={"2px solid #4682B4"}>
          <Th color={"white"}>
            <Text>ID</Text>
          </Th>
          <Th color={"white"}>
            <Text>ФИО</Text>
          </Th>
          <Th color={"white"}>
            <Text>Телефон</Text>
          </Th>
          <Th color={"white"}>
            <Text>Компания</Text>
          </Th>
          <Th color={"white"}>
            <Text>email</Text>
          </Th>
          <Th color={"white"}>
            <Text>ИНН</Text>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {pageStore.crm_contacts.length > 0
          ? pageStore.crm_contacts?.map((item, index) => {
              return (
                <Tr color={"black"} key={index}>
                  <Td border={"1px solid rgba(200,200,200,1)"}>
                    <Text>{item?.id}</Text>
                  </Td>
                  <Td border={"1px solid rgba(200,200,200,1)"}>
                    <Text>{item?.fullName}</Text>
                  </Td>
                  <Td border={"1px solid rgba(200,200,200,1)"}>
                    <Text>{item?.phoneNumber}</Text>
                  </Td>
                  <Td border={"1px solid rgba(200,200,200,1)"}>
                    <Text>{item?.company}</Text>
                  </Td>
                  <Td border={"1px solid rgba(200,200,200,1)"}>
                    <Text>{item?.email}</Text>
                  </Td>
                  <Td border={"1px solid rgba(200,200,200,1)"}>
                    <Text>{item?.inn}</Text>
                  </Td>
                </Tr>
              );
            })
          : null}
      </Tbody>
    </Table>
  );
});

export default TableContacts;
