import { Box } from "@chakra-ui/react";

export function Tile({ content: Content, flip, state }) {
  switch (state) {
    case "start":
      return (
        <Box
          onClick={flip}
          display="inline-grid"
          width={12}
          height={12}
          textAlign="center"
          bg="green.300"
          rounded="8px"
          placeItems="cemter"
        ></Box>
      );
    case "flipped":
      return (
        <Box
          width={12}
          height={12}
          textAlign="center"
          bg="transparent"
          color="white"
          backgroundColor="green.600"
          borderRadius="8px"
          p="4px"
        >
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Box>
      );
    case "matched":
      return (
        <Box
          display="inline-block"
          width={12}
          height={12}
          textAlign="center"
          color="green.300"
          p="4px"
        >
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Box>
      );
    default:
      throw new Error("Invalid state " + state);
  }
}
