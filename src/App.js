import { Routes, Route } from "react-router";
import Navigation from "./components/navigation/navigation.component";
import EpisodeList from "./components/episodelist/episode-list.component";
import CharacterList from "./components/character-list/character-list.component";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Navigation />}>
        <Route index element={<CharacterList />} />
        <Route path="episodes" element={<EpisodeList />} />
      </Route>
    </Routes>
  );
};

export default App;
