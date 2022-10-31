import { Routes, Route } from "react-router";
import Navigation from "./components/navigation/navigation.component";
import EpisodeList from "./components/episodelist/episode-list.component";
import CharacterList from "./components/character-list/character-list.component";
import EpisodeDetails from "./components/episode-details/episode-details.component";
import CharacterDetails from "./components/character-details/character-details.component";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Navigation />}>
        <Route index element={<CharacterList />} />
        <Route path=":id" element={<CharacterDetails />} />
        <Route path="episodes" element={<EpisodeList />} />
        <Route path="episodes/:id" element={<EpisodeDetails />} />
      </Route>
    </Routes>
  );
};

export default App;
