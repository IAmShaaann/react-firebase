import {
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import useMounted from "../hooks/useMounted";


export default function Registerpage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [address, setAddress] = useState("");
  const [profile, setProfile] = useState("");
  const [username, setUsername] = useState("");
  const toast = useToast();
  const { register, signInWithGoogle } = useAuth();
  const mounted = useMounted();



  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Register
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            // your register logic here
            if (!password || !email) {
              toast({
                description: "Credentials not valid.",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
            setIsSubmitting(true);
            register(email, password)
              .then((res) => {})
              .catch((error) => {
                console.log(error.message);
                toast({
                  description: error.message,
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              })
              .finally(() => mounted.current && setIsSubmitting(false));
          }}
        >
          <Stack spacing="6">
            <FormControl id="username">
              <FormLabel>Username:</FormLabel>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                type="text"
                required
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                autoComplete="password"
                required
              />
            </FormControl>
            <FormControl id="address">
              <FormLabel>Address</FormLabel>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                name="Address"
                type="text"
                required
              />
            </FormControl>
            <FormControl id="profile">
              <FormLabel>Image</FormLabel>
              <Input
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
                name="profile"
                type="file"
                onChange={(e)=>setProfile(e.target.files[0])}
                required
              />
            </FormControl>
            
            <Button
              isLoading={isSubmitting}
              type="submit"
              colorScheme="primary"
              size="lg"
              fontSize="md"
            >
              Sign up
            </Button>
          </Stack>
        </chakra.form>
        <Center my={4}>
          <Button
            isLoading={isSubmitting}
            variant="link"
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
        </Center>
        <DividerWithText my={6}>OR</DividerWithText>
        <Button
          variant="outline"
          isFullWidth
          colorScheme="red"
          leftIcon={<FaGoogle />}
          onClick={() =>
            signInWithGoogle()
              .then((user) => console.log(user))
              .catch((error) => console.log(error))
          }
        >
          Sign in with Google
        </Button>
      </Card>
    </Layout>
  );
}
