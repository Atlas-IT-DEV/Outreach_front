import React, { useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Icon,
  Text,
  Link,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import { FaRegQuestionCircle, FaUser, FaFileVideo } from "react-icons/fa";
import { MdOutlineFactCheck, MdMenu, MdClose } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";
import Cookies from "js-cookie";
import useWindowDimensions from "../windowDimensions";
import { IoCallSharp } from "react-icons/io5";
import { MdCallSplit } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { PiStrategyBold } from "react-icons/pi";

const SideMenu = observer(() => {
  const navigate = useNavigate();
  const { mainStore, pageStore } = useStores();
  const { width } = useWindowDimensions();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const menuItems = [
    { label: "Дэшборд", icon: FaRegQuestionCircle, href: "/main" },
    { label: "Звонки", icon: IoCallSharp, href: "/calls" },
    { label: "Базы", icon: FaDatabase, href: "/bases" },
    { label: "CRM", icon: MdAnalytics, href: "/analytics" },
    { label: "Рассылки", icon: MdEmail, href: "/sends" },
    { label: "Кампании", icon: PiStrategyBold, href: "/companies" },
  ].filter(Boolean); // Убирает `undefined` из массива

  const handleExit = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Вы действительно хотите выйти?")) {
      Cookies.remove("authed");
      localStorage.clear();
      navigate("/");
    }
  };

  useEffect(() => {
    mainStore.setIsOpen(width >= 1450);
  }, [width]);

  return (
    <>
      {/* Кнопка для открытия меню, если оно закрыто */}
      {!mainStore.isOpen && (
        <Button
          position="fixed"
          top="5px"
          left="5px"
          zIndex={3}
          onClick={onOpen}
          bg="white"
          boxShadow="lg"
          p={2}
        >
          <Icon as={MdMenu} boxSize={6} color={"#4682B4"} />
        </Button>
      )}

      {/* Основное боковое меню */}
      <Box
        as="nav"
        bg="white"
        boxShadow={
          mainStore.isOpen ? "0px 0px 15px 4px rgba(0,0,0,0.08)" : null
        }
        w={mainStore.isOpen ? "280px" : "0"}
        h="100vh"
        overflow="hidden"
        transition="width 0.3s ease"
        py="4"
        px={mainStore.isOpen ? "4" : "0"}
        position="fixed"
        top="0"
        left="0"
        zIndex={2}
        display={mainStore.isOpen ? "block" : "none"}
      >
        <VStack spacing="6">
          {/* Логотип */}
          <HStack marginTop="40px">
            <Text color="#4682B4" fontSize="28px" fontWeight={600}>
              OUTREACH
            </Text>
            <Text color="black" fontSize="28px" fontWeight={600}>
              360
            </Text>
          </HStack>

          {/* Меню */}
          <VStack align="stretch" spacing="4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                _hover={{ textDecor: "none", color: "#4682B4" }}
                py="2"
                px="4"
                onClick={() => navigate(item.href)}
                display="flex"
                alignItems="center"
              >
                <Icon as={item.icon} boxSize="5" color="#4682B4" />
                <Text ml="3" cursor="pointer" color="black" fontWeight={500}>
                  {item.label}
                </Text>
              </Link>
            ))}
          </VStack>
          <Text cursor="pointer" color="red" onClick={handleExit}>
            ВЫЙТИ
          </Text>
        </VStack>

        {/* Выход */}
      </Box>

      {/* Выдвижное меню (если mainStore.isOpen === false) */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing="6" pt="50px">
              <HStack>
                <Text color="#4682B4" fontSize="28px" fontWeight={600}>
                  OUTREACH
                </Text>
                <Text color="black" fontSize="28px" fontWeight={600}>
                  360
                </Text>
              </HStack>

              {/* Меню в Drawer */}
              <VStack align="stretch" spacing="4">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    _hover={{ textDecor: "none", color: "#4682B4" }}
                    py="2"
                    px="4"
                    onClick={() => {
                      navigate(item.href);
                      onClose();
                    }}
                    display="flex"
                    alignItems="center"
                  >
                    <Icon as={item.icon} boxSize="5" color="#4682B4" />
                    <Text
                      ml="3"
                      cursor="pointer"
                      color="black"
                      fontWeight={500}
                    >
                      {item.label}
                    </Text>
                  </Link>
                ))}
              </VStack>
              <Text cursor="pointer" color="red" onClick={handleExit} mt="20px">
                ВЫЙТИ
              </Text>
            </VStack>

            {/* Выход */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
});

export default SideMenu;
