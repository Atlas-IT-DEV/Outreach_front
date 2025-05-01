import {
  Button,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/store_context";
import { useState } from "react";

const ModalSelectBase = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pageStore } = useStores();

  const [selected, setSelected] = useState("");

  return (
    <>
      <Button
        onClick={onOpen}
        
        borderRadius={"8px"}
        border={"2px solid rgba(48, 141, 218, 1)"}
        bg={"white"}
        color={"black"}
        _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
        flexShrink={0}
      >
        <Text>Выбрать базу</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={"20px"}>
          <ModalCloseButton />
          <Text
            color={"black"}
            fontWeight={"600"}
            width={"100%"}
            textAlign={"center"}
          >
            Выберите базу
          </Text>

          <RadioGroup
            value={selected == "" ? pageStore.selected_name_base : selected}
            onChange={(e) => setSelected(e)}
          >
            <VStack
              width={"100%"}
              align={"flex-start"}
              justify={"flex-start"}
              marginTop={"20px"}
            >
              <Text fontWeight={"600"} color={"black"}>
                Все базы
              </Text>
              {pageStore.bases.length > 0
                ? pageStore.bases?.map((item, index) => (
                    <Radio key={index} value={item}>
                      {index + 1}. {item}
                    </Radio>
                  ))
                : null}
            </VStack>
          </RadioGroup>
          <HStack justify={"flex-end"} width={"100%"} marginTop={"20px"}>
            <Button
              onClick={() => {
                onClose();
                pageStore.updateSelectedNameBase("");
              }}
              
              borderRadius={"8px"}
              border={"2px solid rgba(48, 141, 218, 1)"}
              bg={"white"}
              color={"black"}
              _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
              flexShrink={0}
            >
              Отменить
            </Button>
            <Button
              onClick={async () => {
                pageStore.updateSelectedNameBase(selected);
                pageStore.updateCurrentPage(0);
                await pageStore.getBaseByName(
                  pageStore.selected_name_base,
                  pageStore.selected_department,
                  pageStore.current_page,
                  pageStore.countRows
                );
                onClose();
              }}
              
              borderRadius={"8px"}
              border={"2px solid rgba(48, 141, 218, 1)"}
              bg={"white"}
              color={"black"}
              _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
              flexShrink={0}
            >
              Выбрать
            </Button>
          </HStack>
        </ModalContent>
      </Modal>
    </>
  );
});

export default ModalSelectBase;
