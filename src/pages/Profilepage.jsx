import React from 'react'
import { Layout } from '../components/Layout'
import { Badge, chakra, Code, Container, Heading, Text, Image} from '@chakra-ui/react'
import { Card } from '../components/Card'
import { useAuth } from '../context/AuthContext'
import userDetails from './Registerpage';
export default function Profilepage() {

  const { currentUser } = useAuth();
  return (
    <Layout>
      <Heading>
        Profile page
        <Badge colorScheme='green' fontSize='lg' mx={4}>
          Protected Page
        </Badge>
      </Heading>

      <Container maxW='container.lg' overflowX='auto' py={4}>
        <chakra.pre>
          
        {currentUser && <Heading>Username:{currentUser.displayName}</Heading>}
        {currentUser && <Heading>Email :{currentUser.email}</Heading>}
        {currentUser && <Heading>address:{currentUser.address}</Heading>}
        {/* {currentUser && <Heading>Profile: <Image src={currentUser.imageURL}></Image> </Heading>} */}
        </chakra.pre>
      </Container>
    </Layout>
  )
}
