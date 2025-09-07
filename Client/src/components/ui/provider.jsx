'use client'

import { ChakraProvider } from '@chakra-ui/react'

export function Provider(props) {
  return (
    <ChakraProvider>
      {props.children}
    </ChakraProvider>
  )
}
