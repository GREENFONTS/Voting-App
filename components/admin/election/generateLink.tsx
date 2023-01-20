import { useState } from "react";
import Link from "next/link";
import { Flex, Icon, Box, Center, Text } from "@chakra-ui/react";
import { MdFileCopy } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const GenerateLink = ({ user }) => {
  let url = "";
  if (process.env.NODE_ENV == "development") {
    url = "http://localhost:3000/voting";
  } else {
    url = "https://voting-app-virid.vercel.app/voting";
  }
  const [copy, setCopy] = useState<boolean>(false);
  let link = null;
  if (user) {
    link = `${url}/${user.organization}/${user.id}`;
  }
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(link);
      console.log("Page URL copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  return (
    <>
      <Flex>
        <Center>
          <Box>
            <Flex>
              <Box
                boxShadow="base"
                borderRadius="2"
                borderRight="0px white"
                p="3"
                _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
              >
                {user ? (
                  <Link passHref href={link} target="_blank">
                    <Text>Voting Link : {link}</Text>
                  </Link>
                ) : (
                  <></>
                )}
              </Box>
              <Box boxShadow="base" borderRadius="2" p="2">
                {!copy ? (
                  <Icon
                    fontSize="20px"
                    as={MdFileCopy}
                    onClick={() => {
                      setCopy(true);
                      copyToClipboard();
                    }}
                  />
                ) : (
                  <Icon fontSize="25px" as={TiTick} />
                )}
              </Box>
            </Flex>
          </Box>
        </Center>
      </Flex>
    </>
  );
};

export default GenerateLink;
