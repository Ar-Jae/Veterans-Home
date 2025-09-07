import React, { useEffect, useState } from 'react'
import { Avatar, Button, Box, Heading, Grid, Input, Select, VStack, Text, Stack } from "@chakra-ui/react"

const STORAGE_KEY = 'vh_meals_v1'
const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
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

  const [form, setForm] = useState({ day: 'Monday', mealType: 'Breakfast', dish: '' })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(menu)) } catch (e) {}
  }, [menu])

  function handleChange(e){
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function addDish(e){
    e.preventDefault()
    if (!form.dish) return
    setMenu(prev => {
      const day = prev[form.day] ? { ...prev[form.day] } : {}
      const list = day[form.mealType] ? [...day[form.mealType]] : []
      list.push({ id: Date.now(), name: form.dish })
      return { ...prev, [form.day]: { ...day, [form.mealType]: list } }
    })
    setForm({ ...form, dish: '' })
  }

  function removeDish(day, mealType, id){
    setMenu(prev => {
      const dayObj = prev[day]
      if (!dayObj) return prev
      const list = (dayObj[mealType] || []).filter(d => d.id !== id)
      return { ...prev, [day]: { ...dayObj, [mealType]: list } }
    })
  }

  return (
    <Box minH="100vh" bg="gray.50" fontFamily="inherit" p={4}>
      <Box maxW="900px" mx="auto" py={10}>
        <Heading as="h1" size="xl" mb={8} color="gray.800">Meal Planning</Heading>

        {/* Add Dish Form */}
        <Box mb={10} p={6} bg="white" borderRadius="lg" borderWidth={1} borderColor="blue.100">
          <Heading as="h2" size="md" mb={4} color="blue.600">Add dish to week</Heading>
          <Grid templateColumns={['1fr','1fr 1fr 2fr 1fr']} gap={4} as="form" onSubmit={addDish}>
            <Box display="flex" flexDirection="column">
              <Text fontWeight="500" mb={1}>Day</Text>
              <Select name="day" value={form.day} onChange={handleChange}>
                {DAYS.map(d => <option key={d}>{d}</option>)}
              </Select>
            </Box>

            <Box display="flex" flexDirection="column">
              <Text fontWeight="500" mb={1}>Meal</Text>
              <Select name="mealType" value={form.mealType} onChange={handleChange}>
                {MEALTYPES.map(m => <option key={m}>{m}</option>)}
              </Select>
            </Box>

            <Box display="flex" flexDirection="column">
              <Text fontWeight="500" mb={1}>Dish</Text>
              <Input 
                name="dish" 
                value={form.dish} 
                onChange={handleChange} 
                placeholder="e.g. Tomato soup" 
                required 
              />
            </Box>

            <Box display="flex" alignItems="end" justifyContent="flex-end">
              <Button type="submit" colorScheme="blue">Add</Button>
            </Box>
          </Grid>
        </Box>

        {/* Week Menu */}
        <Heading as="h2" size="md" mb={4} color="blue.600">Week menu</Heading>

        <Grid templateColumns={['1fr','repeat(7,1fr)']} gap={4}>
          {DAYS.map(day => {
            const dayObj = menu[day] || {}
            return (
              <Box key={day} bg="white" borderRadius="lg" borderWidth={1} borderColor="blue.100" p={4} boxShadow="sm">
                <Text fontWeight={600} mb={3} color="blue.600">{day}</Text>
                {MEALTYPES.map(mt => (
                  <VStack key={mt} align="stretch" mb={3} spacing={1}>
                    <Text fontWeight={500}>{mt}</Text>
                    {(dayObj[mt] || []).length > 0 ? (dayObj[mt] || []).map(d => (
                      <Box key={d.id} display="flex" justifyContent="space-between" alignItems="center">
                        <Text>{d.name}</Text>
                        <Button size="xs" colorScheme="red" variant="link" onClick={() => removeDish(day, mt, d.id)}>Remove</Button>
                      </Box>
                    )) : <Text color="gray.500" fontSize="sm">—</Text>}
                  </VStack>
                ))}
              </Box>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}
