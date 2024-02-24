import { useState } from "react";
import { StartScreen, PlayScreen } from "./Screens";
import { Box } from "@chakra-ui/react";

function App() {
  const [gameState, setGameState] = useState("start");

  switch (gameState) {
    case "start":
      return (
          <StartScreen start={() => setGameState("play")}></StartScreen>
      );
    case "play":
      return <PlayScreen end={() => setGameState("start")}>
        <Box w="100%" />
      </PlayScreen>

    default:
      throw new Error("Invalid game state " + gameState);
  }
}

export default App;
