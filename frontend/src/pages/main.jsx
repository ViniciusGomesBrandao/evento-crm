import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Plus, List, LogOut } from 'lucide-react';

function MainPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const loggout = () => {
        try {
            localStorage.clear();
            navigate("/login");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex">
            {/* Main Menu */}
            <div
                className={`bg-primary text-light w-64 min-h-screen p-5 rounded-r-lg md:block shadow-lg ${isMenuOpen ? 'block' : 'hidden'
                    } md:block`}
            >
                <h1 className="text-2xl font-semibold mb-8">CRM de Eventos</h1>
                <ul className="space-y-6">
                    <li className="group bg-secondary rounded-lg">
                        <Link
                            to="/pages/events/create"
                            className="block py-2 px-4 text-primary"
                        >
                            <Plus className="inline-block mr-2" size={20} />
                            Criar Evento
                        </Link>
                    </li>
                    <li className="group bg-secondary rounded-lg">
                        <Link
                            to="/pages/events/list"
                            className="block py-2 px-4 text-primary"
                        >
                            <List className="inline-block mr-2" size={20} />
                            Listar Eventos
                        </Link>
                    </li>
                    <li className="group bg-secondary rounded-lg">
                        <Link onClick={() => { loggout() }} to="/login" className="block py-2 px-4 text-primary">
                            <LogOut className="inline-block mr-2" size={20} />
                            Sair
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Dinamic Content */}
            <div className="flex-1 p-6">
                <div className="md:hidden flex justify-between items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-primary text-2xl"
                    >
                        ☰
                    </button>
                </div>
                <Outlet />
            </div>
        </div>
    );
}

export default MainPage;
