// import { HStack, ModalBody, VStack, Text, SimpleGrid } from "@chakra-ui/react";
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
// import { useStores } from "../store/store_context";
// import { useEffect } from "react";
// import { observer } from "mobx-react-lite";
// import { useNavigate } from "react-router";
// import CallsJournal from "../components/calls_page/calls_journal";
// import CallsTable from "../components/calls_page/calls_table";
// import ScriptsCalls from "../components/calls_page/scripts_calls";

// const CallsPage = observer(() => {
//   const { pageStore } = useStores();
//   const navigate = useNavigate();
//   useEffect(() => {
//     pageStore.get_user_data(pageStore.user_data.id);
//   }, []);
//   useEffect(() => {
//     if (pageStore.user_data.role == "M" || pageStore.user_data.role == "A") {
//       pageStore.getAllCourses();
//       pageStore.get_video_views();
//     }
//   }, [pageStore.user_data]);
//   return (
//     <VStack
//       width={"100%"}
//       marginLeft={pageStore.isOpen ? "280px" : "0px"}
//       p={["10px", "13px", "40px"]}
//     >
//       <VStack
//         width={pageStore.isOpen ? "80%" : "100%"}
//         alignSelf={"center"}
//         marginTop={"30px"}
//       >
//         <VStack width={"100%"} padding={["10px 10px", "20px 40px"]}>
//           <Tabs variant="enclosed" width={"100%"}>
//             <TabList>
//               <Tab fontWeight={600}>Журнал звонков</Tab>
//               <Tab fontWeight={600}>Скрипты</Tab>
//               <Tab fontWeight={600}>Отчетность</Tab>
//             </TabList>

//             <TabPanels>
//               <TabPanel>
//                 <CallsJournal />
//                 <CallsTable />
//               </TabPanel>
//               <TabPanel>
//                 <ScriptsCalls />
//               </TabPanel>
//               <TabPanel>
//                 <p>отчетность</p>
//               </TabPanel>
//             </TabPanels>
//           </Tabs>
//         </VStack>
//       </VStack>
//     </VStack>
//   );
// });

// export default CallsPage;

import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

import Leads from "../components/crm_page/leads";
import Contacts from "../components/crm_page/contacts";
import Automation from "../components/crm_page/automation";
import Tasks from "../components/crm_page/tasks";
import CallsJournal from "../components/calls_page/calls_journal";
import Searcher from "../components/searcher";
import ModalJournalFilter from "../components/calls_page/modal_journal_filter";
import TableCalls from "../components/calls_page/table_calls";
import Scripts from "../components/calls_page/scripts";
import Reports from "../components/calls_page/reports";
import Journal from "../components/calls_page/journal";

const CallsPage = () => {
  const [selected, setSelected] = useState([1, 0, 0, 0]);

  return (
    <VStack
      width={"100%"}
      minHeight={"100vh"}
      height={"auto"}
      overflow={"hidden scroll"}
      align={"flex-start"}
      marginLeft={"280px"}
      padding={"40px"}
    >
      <HStack width={"100%"} gap={"10px"} justify={"space-between"}>
        <Button
          width={"100%"}
          border={"1px solid #4682B4"}
          boxShadow={"-2px 2px 0 0 #4682B4"}
          borderRadius={"0px"}
          bg={selected[0] == 1 ? "#4682B4" : "white"}
          color={selected[0] == 1 ? "white" : "black"}
          onClick={() => setSelected([1, 0, 0])}
          _hover={{ bg: "#4682B4", color: "white" }}
        >
          <Text>Журнал звонков</Text>
        </Button>
        <Button
          width={"100%"}
          border={"1px solid #4682B4"}
          borderRadius={"0px"}
          boxShadow={"-2px 2px 0 0 #4682B4"}
          bg={selected[1] == 1 ? "#4682B4" : "white"}
          color={selected[1] == 1 ? "white" : "black"}
          onClick={() => setSelected([0, 1, 0])}
          _hover={{ bg: "#4682B4", color: "white" }}
        >
          <Text>Скрипты</Text>
        </Button>
        <Button
          width={"100%"}
          border={"1px solid #4682B4"}
          borderRadius={"0px"}
          boxShadow={"-2px 2px 0 0 #4682B4"}
          bg={selected[2] == 1 ? "#4682B4" : "white"}
          color={selected[2] == 1 ? "white" : "black"}
          onClick={() => setSelected([0, 0, 1])}
          _hover={{ bg: "#4682B4", color: "white" }}
        >
          <Text>Отчетность</Text>
        </Button>
      </HStack>

      {selected[0] == 1 ? (
        <Journal />
      ) : selected[1] == 1 ? (
        <Scripts />
      ) : (
        <Reports />
      )}
    </VStack>
  );
};

export default CallsPage;
