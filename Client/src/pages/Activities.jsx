import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormLabel, Input, Box, VStack } from "@chakra-ui/react"

const STORAGE_KEY = 'vh_activities_v1'

export default function Activities(){
  const [activities, setActivities] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })
  const [form, setForm] = useState({ title: '', date: '', time: '', notes: '' })
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(activities)) } catch (e) {}
  }, [activities])
  function handleChange(e){
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }
  function handleAdd(e){
    e.preventDefault()
    if (!form.title || !form.date) return
    const id = Date.now()
    setActivities(prev => [ { id, title: form.title.trim(), date: form.date, time: form.time, notes: form.notes }, ...prev ])
    setForm({ title: '', date: '', time: '', notes: '' })
  }
  function handleRemove(id){
    setActivities(prev => prev.filter(a => a.id !== id))
  }

  return (
    <Box minH="100vh" bg="gray.50" fontFamily="inherit" p={4}>
      <Box maxW="600px" mx="auto" py={10}>
        <form onSubmit={handleAdd}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Gardening" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Date</FormLabel>
              <Input name="date" value={form.date} onChange={handleChange} type="date" />
            </FormControl>
            <FormControl>
              <FormLabel>Time</FormLabel>
              <Input name="time" value={form.time} onChange={handleChange} type="time" />
            </FormControl>
            <FormControl>
              <FormLabel>Notes (optional)</FormLabel>
              <Input name="notes" value={form.notes} onChange={handleChange} placeholder="Room, special instructions, etc." />
            </FormControl>
            <Button type="submit" alignSelf="flex-end" colorScheme="blue">Add Activity</Button>
          </VStack>
        </form>
        <Box mt={10}>
          {activities.length === 0 ? (
            <Box color="gray.500" fontSize="md">No scheduled activities.</Box>
          ) : (
            <VStack spacing={4} align="stretch">
              {activities.map(act => (
                <Box key={act.id} bg="white" borderRadius="md" borderWidth={1} borderColor="blue.100" p={4} boxShadow="sm">
                  <Box fontWeight={600} fontSize="lg" color="blue.600">{act.title}</Box>
                  <Box fontSize="md" color="gray.600">{act.date} {act.time ? `• ${act.time}` : ''}</Box>
                  {act.notes && <Box fontSize="md" color="gray.700" mt={2}>{act.notes}</Box>}
                  <Button size="sm" variant="outline" colorScheme="red" mt={2} onClick={() => handleRemove(act.id)}>Remove</Button>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      </Box>
    </Box>
  )
}
