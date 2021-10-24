import {
  
  Heading,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../components/Layout'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Homepage() {
  const { currentUser } = useAuth();
  return (
    <Layout> 
      <Heading>Home page</Heading>
      {/* <Text my={6}> {`The current user is: ${currentUser}`} </Text> */}

      <Heading>
        Test Firebase Authentication  
      </Heading>
     
      <Heading size='md' mt={20}>
        Some other links (only for reference):
      </Heading>
      <List>
        <ListItem>
          <Link to='/reset-password'>reset page</Link>
        </ListItem>
        <ListItem>
          <Link to='/forgot-password'>forgot page</Link>
        </ListItem>
      </List>
    </Layout>
  )
}
