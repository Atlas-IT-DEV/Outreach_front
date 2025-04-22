import { Text, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStores } from "../store/store_context";
import ModalScript from "./calls_page/modal_script";

const TableScripts = observer(({ type = "" }) => {
  const { pageStore } = useStores();

  return (
    <>
      <VStack marginTop={"10px"} width={"100%"} gap={0}>
        <Text fontWeight={"600"} color={"black"}>
          Скрипты
        </Text>
        {type == "calls"
          ? pageStore.scripts
              ?.filter(
                (item) =>
                  item?.department_id == pageStore.selected_department &&
                  !item?.is_email
              )
              .map((item, index) => <ModalScript obj={item} key={index} />)
          : type == "mail"
          ? pageStore.scripts
              ?.filter(
                (item) =>
                  item?.department_id == pageStore.selected_department &&
                  item?.is_email
              )
              .map((item, index) => <ModalScript obj={item} key={index} />)
          : null}
      </VStack>
    </>
  );
});

export default TableScripts;
