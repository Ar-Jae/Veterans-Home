import React, { useEffect, useState } from 'react'
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react"

const STORAGE_KEY = 'vh_meals_v1'
const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const MEALTYPES = ['Breakfast','Lunch','Dinner']

export default function Meals() {
  const [menu, setMenu] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : {}
    } catch (e) {
      return {}
    }
  })
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(menu)) } catch (e) {}
  }, [menu])

  return (
    <Box minH="100vh" bg="gray.50" fontFamily="inherit" p={4}>
      <Box maxW="900px" mx="auto" mt={12}>
        <Heading as="h2" size="md" mb={4} color="blue.600">Weekly Meal Plan Table</Heading>
        <Table size="sm" variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Meal Type</Th>
              {DAYS.map(day => (
                <Th key={day}>{day}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {MEALTYPES.map(mealType => (
              <Tr key={mealType}>
                <Td fontWeight="bold">{mealType}</Td>
                {DAYS.map(day => {
                  const dayObj = menu[day] || {}
                  const dishes = dayObj[mealType] || []
                  return (
                    <Td key={day}>
                      {dishes.length > 0
                        ? dishes.map(d => <Text key={d.id}>{d.name}</Text>)
                        : <Text color="gray.400" fontSize="sm">—</Text>
                      }
                    </Td>
                  )
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

