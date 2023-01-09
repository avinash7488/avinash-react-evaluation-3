import Head from 'next/head'
import Image from 'next/image'
import Link  from 'next/link';
import { getProfie, getProjects } from '../components/github';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Center,
  Grid,
  GridItem,
  Badge,
  Text,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';




export default function Home({profile,projects}) {
  const { isOpen, onOpen, onClose,colorMode, toggleColorMode } = useDisclosure();
 
  console.log(profile);
  console.log(projects)

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>{profile.name}</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
                <Link href="/projects">Projects</Link>
                <Link href="/experience">Experience</Link>
          
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={profile.avatar_url}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={profile.avatar_url}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{profile.name}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
                <Link href="/projects">Projects</Link>
                <Link href="/experience">Experience</Link>
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>
      <Grid
  
  templateRows='repeat(3, 1fr)'
  templateColumns='repeat(5, 1fr)'
  gap={4}
>
  <GridItem rowSpan={1} colSpan={1} boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" >
  <Center py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}>
        <Avatar
          size={'xl'}
          src={profile.avatar_url}
          alt={'Avatar Alt'}
          mb={4}
          pos={'relative'}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {profile.name}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          @{profile.login}
        </Text>
        <Text
          textAlign={'center'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}>
          HTML, CSS, JavaScript, React, Node js ,Next js, Chakra UI 
        </Text>

        

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}>
            Message
          </Button>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}>
            Follow
          </Button>
        </Stack>
      </Box>
    </Center>
  </GridItem>
  <GridItem rowSpan={1} colSpan={1}  boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" ></GridItem>
  <GridItem rowSpan={1} colSpan={1}  boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" >
  
  </GridItem>
   
  <GridItem colSpan={4} rowSpan={3}  boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" >
    {projects.items.slice(0, 5).map((item)=><Box key={item.name}>
      <VStack>
        <Box>{item.name} <br/>
         {item.created_at}
        </Box>
      </VStack>
    </Box>)}
  </GridItem>
  
  
</Grid>
      </Box>
    </>
  );

}

export async function getStaticProps(){
    const profile = await getProfie("avinash7488");
    const projects = await getProjects("avinash7488")
    return{
      props:{
        profile,
        projects
      }
    }
}
