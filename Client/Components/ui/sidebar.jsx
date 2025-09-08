import React from "react";
import { Box, VStack, Link, Icon, Text, Divider, HStack, Avatar, Flex } from "@chakra-ui/react";
import { FiHome, FiUsers, FiGrid, FiTool, FiClipboard } from "react-icons/fi";
import { HiOutlineMap } from "react-icons/hi";

const navItems = [
  { label: "Dashboard", icon: FiHome, href: "/dashboard" },
  { label: "Residents", icon: FiUsers, href: "/residents" },
  { label: "Rooms", icon: FiGrid, href: "/rooms" },
  { label: "Floor Plan", icon: HiOutlineMap, href: "/floorplan" },
  { label: "Activities", icon: FiClipboard, href: "/activities" },
  { label: "Maintenance", icon: FiTool, href: "/maintenance" },
  { label: "Meal Planning", icon: FiTool, href: "/meals" },
];

export default function Sidebar() {
  return (
    <Box
      as="nav"
      bg="white"
      boxShadow="md"
      minH="100vh"
      w={{ base: "100%", md: "320px" }}
      p={0}
      borderRight="1px solid #e0e7ef"
      position="relative"
      zIndex={10}
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <Flex align="center" gap={4} px={6} py={6} borderBottom="1px solid #e0e7ef">
        <Box boxSize={12} bgGradient="linear(to-r, blue.500, blue.400)" borderRadius={"lg"} display="flex" alignItems="center" justifyContent="center" boxShadow="md">
          <Icon as={FiHome} boxSize={7} color="white" />
        </Box>
        <Box>
          <Text fontWeight={900} fontSize="xl" color="gray.900" mb={1} letterSpacing={-1}>Honor Haven Veterans Home</Text>
          <Text fontSize="sm" color="blue.500" fontWeight={600}>Management System</Text>
        </Box>
      </Flex>
      {/* Navigation */}
      <Box px={6} py={4}>
        <Text fontSize="xs" fontWeight={800} color="gray.500" textTransform="uppercase" letterSpacing={1} mb={2}>Navigation</Text>
        <VStack align="stretch" spacing={1} mb={6}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              display="flex"
              alignItems="center"
              fontWeight={item.label === "Residents" ? 800 : 500}
              fontSize="lg"
              color={item.label === "Residents" ? "blue.600" : "gray.700"}
              bg={item.label === "Residents" ? "blue.50" : "transparent"}
              _hover={{ color: "blue.500", textDecoration: "none", bg: "blue.50" }}
              px={3}
              py={2}
              borderRadius="md"
              transition="background 0.2s"
            >
              <Icon as={item.icon} boxSize={5} mr={3} />
              <span style={{ display: "inline-block" }}>{item.label}</span>
            </Link>
          ))}
        </VStack>
        {/* Facility Info */}
        <Text fontSize="xs" fontWeight={800} color="gray.500" textTransform="uppercase" letterSpacing={1} mb={2} mt={6}>Facility Info</Text>
        <Box bg="gray.50" borderRadius="lg" p={4} mb={2} boxShadow="sm">
          <Flex justify="space-between" mb={2}>
            <Text color="gray.600">Total Capacity</Text>
            <Text fontWeight={800} color="gray.900">20 residents</Text>
          </Flex>
          <Flex justify="space-between" mb={2}>
            <Text color="gray.600">Floors</Text>
            <Text fontWeight={800} color="gray.900">2</Text>
          </Flex>
          <Flex justify="space-between">
            <Text color="gray.600">Total Space</Text>
            <Text fontWeight={800} color="gray.900">10,000 ft²</Text>
          </Flex>
        </Box>
      </Box>
      <Box flex={1} />
      {/* Staff Member Footer */}
      <Box px={6} py={4} borderTop="1px solid #e0e7ef" bg="white">
        <HStack spacing={3}>
          <Avatar name="Staff Member" size="sm" bgGradient="linear(to-r, blue.500, blue.400)" color="white" />
          <Box minW={0}>
            <Text fontWeight={700} color="gray.900" fontSize="md" mb={0.5} noOfLines={1}>Staff Member</Text>
            <Text fontSize="sm" color="gray.500" noOfLines={1}>Honor Haven Staff</Text>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}
