import { Toaster } from "sonner";
import Routes from "./routes/Route";
const App = () => {
  return (
    <div>
      <Toaster richColors position="top-center" />
      <Routes />
    </div>
  );
};

export default App;
