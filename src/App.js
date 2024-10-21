import './App.css';
import Request from './BrightData';
import useStore from './components/useStore';

function App() {

    const TextInputComponent = () => {
        const { inputValue, setInputValue } = useStore();

        const handleChange = (event) => {
            setInputValue(event.target.value);
        };

        return (
            <div className="App">
                    <Request />

            </div>
        );
    };

    return (
        <div>
            <TextInputComponent />
        </div>
    );
}

export default App;

