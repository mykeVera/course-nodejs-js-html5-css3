import Button from "./Button";

const arr = [
    'chanchito feliz',
    'chanchito triste',
    'chanchito emocionado',
];
const App = () => {
    const miVariable = false;

    if (miVariable) {
        return <div>Variable es true</div>;
    }
    return (
        <div>
            <h1 onClick={(e) => console.log('clic', e)}>Hola Mundo</h1>
            {arr.map((el, i) => (
                <p key={i}>{el}</p>
            ))}
            <Button onClick={() => console.log('clicked')}>
                Enviar
            </Button>
        </div>
    );
}

export default App;