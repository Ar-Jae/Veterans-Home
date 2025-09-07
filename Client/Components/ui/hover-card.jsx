import {
  Avatar,
  HStack,
  Icon,
  Link,
  Portal,
  Stack,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";
import { LuChartLine } from "react-icons/lu";

const HoverCard = () => {
  return (
    <Popover trigger="hover" placement="right">
      <PopoverTrigger>
        <Link href="#">@chakra_ui</Link>
      </PopoverTrigger>
      <Portal>
        <PopoverContent width="320px">
          <PopoverArrow />
          <PopoverBody>
            <Stack direction="row" gap={4}>
              <Avatar
                name="Chakra UI"
                src="https://pbs.twimg.com/profile_images/1244925541448286208/rzylUjaf_400x400.jpg"
                size="md"
              />
              <Stack gap={3}>
                <Stack gap={1}>
                  <Text fontSize="sm" fontWeight="semibold">
                    Chakra UI
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    The most powerful toolkit for building modern web applications.
                  </Text>
                </Stack>
                <HStack color="gray.400">
                  <Icon as={LuChartLine} boxSize={4} />
                  <Text fontSize="xs">2.5M Downloads</Text>
                </HStack>
              </Stack>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default HoverCard;
