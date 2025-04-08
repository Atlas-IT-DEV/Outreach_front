import { VStack, HStack, Text } from "@chakra-ui/react";
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";
import CallsSearch from "./calls_search_journal";
import CampaignAnalytics from "./campaign_analytics";
import ScriptsSearch from "./scripts_search";
import ScriptsPanel from "./scripts_panel";

const ScriptsCalls = () => {
  return (
    <VStack width={"100%"} align={"flex-start"} paddingTop={["20px", "40px"]}>
      <Text color={"#4682B4"} fontWeight={500} fontSize={["16px", "20px"]}>
        Скрипты
      </Text>
      <ScriptsSearch />
      <ScriptsPanel />
    </VStack>
  );
};

export default ScriptsCalls;
