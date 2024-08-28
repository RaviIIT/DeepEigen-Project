import React from "react";
import {
  Box,
  Image,
  Text,
  Stack,
  Flex,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
// Create motion components
const MotionBox = motion(Box);
const MotionText = motion(Text);

export default function DetailSection() {
  const bgColor = useColorModeValue("gray.900", "whiteAlpha.900");

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      bg={bgColor}
      pt="5rem"
      pb="2rem"
      px="0" // Set padding to 0 to remove left/right margins
      width="100%" // Ensure the Flex container takes the full width
    >
      <Stack spacing={3} align="center">
        <Heading
          as="h2"
          fontSize={["2xl", "4xl", "5xl"]}
          color={useColorModeValue("yellow.300", "yellow.500")}
          className="heading-text" // Custom class for additional styles if needed
        >
          Bitcoin Data Tracker
        </Heading>

        <MotionText
          fontSize={["md", "lg", "xl"]}
          color={useColorModeValue("whiteAlpha.900", "gray.700")}
          textAlign="center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="motion-text" // Custom class for additional styles if needed
        >
          Stay updated with the latest Bitcoin trends and market data in real-time.
        </MotionText>
      </Stack>

      <MotionBox
        width="100%" // Ensure the MotionBox takes the full width
        height="auto"
        mb={6}
        overflow="hidden"
        boxShadow="2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
      </MotionBox>

      {/* Additional styles using Chakra UI's CSS-in-JS */}
      <style jsx>{`
        .image-container {
          border-radius: 15px; // Keep border radius for the container if desired
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          overflow: hidden;
        }

        .image-container img {
          transition: transform 0.4s ease-in-out;
        }

        .image-container:hover img {
          transform: scale(1.05);
        }

        .heading-text {
          font-weight: bold;
          letter-spacing: 1px;
          text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.7);
              font-size: l;

        }

        .motion-text {
          font-style: italic;
          opacity: 0.9;
          transition: opacity 0.5s ease-in-out;
          
        }

        .motion-text:hover {
          opacity: 1;
        }
      `}</style>
    </Flex>
  );
}
