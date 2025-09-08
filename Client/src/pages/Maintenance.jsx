import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormLabel, Input, Select, Box, VStack } from "@chakra-ui/react"

const STORAGE_KEY = 'vh_maintenance_v1'

export default function Maintenance(){
  const [requests, setRequests] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })
  const [form, setForm] = useState({ resident: '', room: '', issue: '', priority: 'Low', date: '', notes: '' })
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(requests)) } catch (e) {}
  }, [requests])
  function handleChange(e){
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }
  function handleAdd(e){
    e.preventDefault()
    if (!form.resident || !form.room || !form.issue) return
    const id = Date.now()
    setRequests(prev => [ { id, ...form, resolved: false }, ...prev ])
    setForm({ resident: '', room: '', issue: '', priority: 'Low', date: '', notes: '' })
  }
  function handleRemove(id){
    setRequests(prev => prev.filter(r => r.id !== id))
  }
  function toggleResolved(id){
    setRequests(prev => prev.map(r => r.id === id ? { ...r, resolved: !r.resolved } : r))
  }

  return (
    <Box minH="100vh" bg="gray.50" fontFamily="inherit" p={4}>
      <Box maxW="600px" mx="auto" py={10}>
        <form onSubmit={handleAdd}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Resident</FormLabel>
              <Input name="resident" value={form.resident} onChange={handleChange} placeholder="Full name" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Room</FormLabel>
              <Input name="room" value={form.room} onChange={handleChange} placeholder="e.g. 101A" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Priority</FormLabel>
              <Select name="priority" value={form.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input name="date" value={form.date} onChange={handleChange} type="date" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Issue</FormLabel>
              <Input name="issue" value={form.issue} onChange={handleChange} placeholder="Brief description" />
            </FormControl>
            <FormControl>
              <FormLabel>Notes (optional)</FormLabel>
              <Input name="notes" value={form.notes} onChange={handleChange} placeholder="Additional details" />
            </FormControl>
            <Button type="submit" alignSelf="flex-end" colorScheme="blue">Submit Request</Button>
          </VStack>
        </form>
        <Box mt={10}>
          {requests.length === 0 ? (
            <Box color="gray.500" fontSize="md">No maintenance requests.</Box>
          ) : (
            <VStack spacing={4} align="stretch">
              {requests.map(r => (
                <Box key={r.id} bg="white" borderRadius="md" borderWidth={1} borderColor="blue.100" p={4} boxShadow={r.resolved ? 'none' : 'sm'} opacity={r.resolved ? 0.6 : 1}>
                  <Box fontWeight={600} fontSize="lg" color={r.resolved ? 'gray.400' : 'blue.600'} textDecoration={r.resolved ? 'line-through' : 'none'}>
                    {r.issue} <Box as="span" fontWeight={400} fontSize="md" color="gray.500">({r.priority})</Box>
                  </Box>
                  <Box fontSize="md" color="gray.600">{r.resident} — {r.room} {r.date ? `• ${r.date}` : ''}</Box>
                  {r.notes && <Box fontSize="md" color="gray.700" mt={2}>{r.notes}</Box>}
                  <Box display="flex" gap={4} mt={2}>
                    <Button size="sm" variant="outline" colorScheme="green" onClick={() => toggleResolved(r.id)}>
                      {r.resolved ? 'Reopen' : 'Mark resolved'}
                    </Button>
                    <Button size="sm" variant="outline" colorScheme="red" onClick={() => handleRemove(r.id)}>Remove</Button>
                  </Box>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      </Box>
    </Box>
  )
}
