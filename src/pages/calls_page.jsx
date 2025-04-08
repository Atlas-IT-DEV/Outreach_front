import { HStack, ModalBody, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useStores } from "../store/store_context";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Greetings from "../components/greerings";
import CourseCard from "../components/course_card";
import { useNavigate } from "react-router";
import CallsJournal from "../components/calls_page/calls_journal";
import CallsTable from "../components/calls_page/calls_table";
import ScriptsCalls from "../components/calls_page/scripts_calls";

const CallsPage = observer(() => {
  const { pageStore, mainStore } = useStores();
  const navigate = useNavigate();
  useEffect(() => {
    pageStore.get_user_data(pageStore.user_data.id);
  }, []);
  useEffect(() => {
    if (pageStore.user_data.role == "M" || pageStore.user_data.role == "A") {
      pageStore.getAllCourses();
      pageStore.get_video_views();
    }
  }, [pageStore.user_data]);
  return (
    <VStack
      width={"100%"}
      marginLeft={mainStore.isOpen ? "280px" : "0px"}
      p={["10px", "13px", "40px"]}
    >
      <VStack
        width={mainStore.isOpen ? "80%" : "100%"}
        alignSelf={"center"}
        marginTop={"30px"}
      >
        <VStack width={"100%"} padding={["10px 10px", "20px 40px"]}>
          <Tabs variant="enclosed" width={"100%"}>
            <TabList>
              <Tab fontWeight={600}>Журнал звонков</Tab>
              <Tab fontWeight={600}>Скрипты</Tab>
              <Tab fontWeight={600}>Отчетность</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <CallsJournal />
                <CallsTable />
              </TabPanel>
              <TabPanel>
                <ScriptsCalls />
              </TabPanel>
              <TabPanel>
                <p>отчетность</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </VStack>
    </VStack>
  );
});

export default CallsPage;
