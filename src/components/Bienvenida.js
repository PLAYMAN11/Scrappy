import { ShoppingBagIcon } from '@heroicons/react/20/solid';

function Bienvenida() {
    return (
        <div className="flex flex-col items-center justify-center">
            <ShoppingBagIcon className="h-64 w-64 text-indigo-600/20"/>

            <h1 className="text-3xl text-center mt-2 text-black/50 font-bold mb-5">
                Welcome to Scrappy!
            </h1>

            <h3 className="text-3xl mt-2 text-black/50 font-bold mb-5">
                Find the best price of your favorite products
            </h3>
        </div>
    );
}

export default Bienvenida;
