import AutoCompleter from "../components/AutoCompleter";
import DatePicker from "../components/DatePicker";
import Map from "../components/Map";
import PickersContainer from "../components/PickersContainer";
import Search from "../components/Search";
import Sidebar from "../components/Sidebar";
import TimePicker from "../components/TimePicker";
import { WeatherProvider } from "../contexts/WeatherContext";

function AppLayout() {
  return (
    <div className="App">
      <WeatherProvider>
        <Sidebar />

        <Search />
        <AutoCompleter />

        <PickersContainer>
          <DatePicker />
          <TimePicker />
        </PickersContainer>

        <Map />
      </WeatherProvider>
    </div>
  );
}

export default AppLayout;
