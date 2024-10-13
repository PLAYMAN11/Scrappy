import './App.css';
import Request from './BrightData'
import useStore from './components/useStore'
function App() {

  const TextInputComponent = () => {

    const { inputValue, setInputValue } = useStore();

    const handleChange = (event) => {
      setInputValue(event.target.value);
    };
  return (
    <div className="App">
      <div>
        <input
            type="text"
            value={inputValue}System.out.println("Hello world!");
            onChange={handleChange}
            placeholder="Escribe algo..."
        />
        <p>Valor actual: {inputValue}</p>

        <Request/>
      </div>
      );
      }

      export default App;

