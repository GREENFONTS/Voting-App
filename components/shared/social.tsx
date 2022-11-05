import React from "react";
import { VStack, Icon,  useColorModeValue } from "@chakra-ui/react";
import { VscGithub } from "react-icons/vsc";
import { FaInstagram } from "react-icons/fa";
import { BsLinkedin, BsTwitter } from "react-icons/bs";

const Socials = (props) => {
  const iconColor = useColorModeValue("themeLight.icon", "themeLight.icon");

  return (
    <VStack spacing={props.spacing} animation="bounceFromBottom 1s">
      <a
        href="https://www.linkedin.com/in/godwill-onyewuchi-6746621b4/"
        target="_blank"
        rel="noreferrer"
      >
        <Icon
          as={BsLinkedin}
          w={{ base: "18px", md: "20px", lg: "35px" }}
          h={{ base: "18px", md: "20px", lg: "35px" }}
          _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
          color={iconColor}
        />
      </a>

      <a
        href="https://twitter.com/GODWILLONYEWUC1"
        target="_blank"
        rel="noreferrer"
      >
        <Icon
          as={BsTwitter}
          w={{ base: "18px", md: "20px", lg: "35px" }}
          _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
          h={{ base: "18px", md: "20px", lg: "35px" }}
          color={iconColor}
        />
      </a>

      <a
        href="https://www.instagram.com/onyewuchigodwill/"
        target="_blank"
        rel="noreferrer"
      >
        <Icon
          as={FaInstagram}
          w={{ base: "18px", md: "20px", lg: "35px" }}
          _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
          h={{ base: "18px", md: "20px", lg: "35px" }}
          color={iconColor}
        />
      </a>

      <a href="https://github.com/GREENFONTS" target="_blank" rel="noreferrer">
        <Icon
          as={VscGithub}
          w={{ base: "18px", md: "20px", lg: "35px" }}
          _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
          h={{ base: "18px", md: "20px", lg: "35px" }}
          color={iconColor}
        />
      </a>
    </VStack>
    //   </Fade>
  );
};

export default Socials;
