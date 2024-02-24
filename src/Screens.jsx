import { useState } from "react";
import confetti from "canvas-confetti";
import * as icons from "react-icons/gi";
import { Box, Container, Heading, Text, Grid, Button } from "@chakra-ui/react";

import { Tile } from "./Tile";

export const possibleTileContents = [
  icons.GiHearts,
  icons.GiWaterDrop,
  icons.GiDiceSixFacesFive,
  icons.GiUmbrella,
  icons.GiCube,
  icons.GiBeachBall,
  icons.GiDragonfly,
  icons.GiHummingbird,
  icons.GiFlowerEmblem,
  icons.GiOpenBook,
];

export function StartScreen({ start }) {
  return (
    <>
      <Box
        w="100%"
        display="flex"
        alignItems="center"
        height="100vh"
        justifyContent="center"
        padding="8px"
      >
        <Box
          backgroundColor="#e6fef9"
          maxWidth={"400px"}
          maxHeight={"400px"}
          borderRadius="16px"
          display="flex"
          alignItems="center"
          flexDirection="column"
          gap="2.5em"
          width="100%"
          height="100%"
          paddingTop="76px"
        >
          <Heading color="teal.500" fontSize="40px">
            Memory
          </Heading>

          <Text color="teal.500" fontWeight="400" fontSize="18px">
            Flip over tiles looking for pairs
          </Text>
          <Button
            variant="primary"
            rounded="full"
            fontSize="20px"
            px={"32px"}
            py="24px"
            bg="white"
            color="white"
            bgGradient="linear(to-b, teal.300, teal.500)"
            minW="150px"
          >
            Play
          </Button>
        </Box>
      </Box>
    </>
  );
}

export function PlayScreen({ end }) {
  const [tiles, setTiles] = useState(null);
  const [tryCount, setTryCount] = useState(0);

  const getTiles = (tileCount) => {
    // Throw error if count is not even.
    if (tileCount % 2 !== 0) {
      throw new Error("The number of tiles must be even.");
    }

    // Use the existing list if it exists.
    if (tiles) return tiles;

    const pairCount = tileCount / 2;

    // Take only the items we need from the list of possibilities.
    const usedTileContents = possibleTileContents.slice(0, pairCount);

    // Double the array and shuffle it.
    const shuffledContents = usedTileContents
      .concat(usedTileContents)
      .sort(() => Math.random() - 0.5)
      .map((content) => ({ content, state: "start" }));

    setTiles(shuffledContents);
    return shuffledContents;
  };

  const flip = (i) => {
    // Is the tile already flipped? We don’t allow flipping it back.
    if (tiles[i].state === "flipped") return;

    // How many tiles are currently flipped?
    const flippedTiles = tiles.filter((tile) => tile.state === "flipped");
    const flippedCount = flippedTiles.length;

    // Don't allow more than 2 tiles to be flipped at once.
    if (flippedCount === 2) return;

    // On the second flip, check if the tiles match.
    if (flippedCount === 1) {
      setTryCount((c) => c + 1);

      const alreadyFlippedTile = flippedTiles[0];
      const justFlippedTile = tiles[i];

      let newState = "start";

      if (alreadyFlippedTile.content === justFlippedTile.content) {
        confetti();
        newState = "matched";
      }

      // After a delay, either flip the tiles back or mark them as matched.
      setTimeout(() => {
        setTiles((prevTiles) => {
          const newTiles = prevTiles.map((tile) => ({
            ...tile,
            state: tile.state === "flipped" ? newState : tile.state,
          }));

          // If all tiles are matched, the game is over.
          if (newTiles.every((tile) => tile.state === "matched")) {
            setTimeout(end, 0);
          }

          return newTiles;
        });
      }, 1000);
    }

    setTiles((prevTiles) => {
      return prevTiles.map((tile, index) => ({
        ...tile,
        state: i === index ? "flipped" : tile.state,
      }));
    });
  };

  return (
    <>
      <Grid minH="100dvh" placeItems="center">
        <Container
          display={"flex"}
          flexDir="column"
          gap={10}
          padding={0}
          maxWidth="fit-content"
          height="max-content"
        >
          <Box
            textAlign="center"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Text color="green.600" fontSize="14px" fontWeight="400">
              Tries{" "}
            </Text>
            <Text
              bg="#c6f6d6"
              py="2px"
              color="green.600"
              borderRadius="4px"
              lineHeight="16px"
              padding="0px 8px"
              fontSize="12px"
              fontWeight={"600"}
            >
              {tryCount}
            </Text>
          </Box>

          <Grid
            gridTemplateColumns="repeat(4,1fr)"
            gap={2.5}
            justifyContent="center"
            justifyItems="center"
            padding={2.5}
            bg="#effff3"
            rounded="16px"
          >
            {getTiles(16).map((tile, i) => (
              <Tile
                key={i}
                flip={() => flip(i)}
                {...tile}
                aspectRatio={1}
                w="100%"
                margin={0}
                bg="#37a169"
                color="white"
                rounded="8px"
              />
            ))}
          </Grid>
        </Container>
      </Grid>
    </>
  );
}
