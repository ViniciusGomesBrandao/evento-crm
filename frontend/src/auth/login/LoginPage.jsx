import { useState } from 'react';
import './LoginPage.css';
import { authenticateUser } from '../../_services/authService';
import Spinner from '../../_components/Spinner';
import { useNavigate } from 'react-router-dom';
function LoginPage() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const login = async () => {
        setLoading(true);
        const response = await authenticateUser(formData.email, formData.password);
        setLoading(false);
        if (!response.success) {
            setErrorMessage("Usuário ou senha incorretos!")
            return;
        }

        // SET TOKEN
        localStorage.setItem("access_token", response.data.access_token)
        navigate("/pages/events/list")
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
    };

    return (
        <>
            <div className="bg-sky-100 flex justify-center items-center h-full">

                <div className="w-1/2 h-screen hidden lg:block">
                    <img src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826" alt="Placeholder Image" className="object-cover w-full h-full" />
                </div>

                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 className="text-2xl font-semibold mb-4">Login</h1>
                    <form onSubmit={handleSubmit}>

                        <div className="bg-sky-100">
                            <label htmlFor="email" className="block text-gray-600">Email</label>
                            <input
                                value={formData.email}
                                onChange={handleInputChange}
                                type="text"
                                id="email"
                                name="email"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                autoComplete="off"
                                placeholder='Digite seu email...'
                            />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password" className="block text-gray-800">Senha</label>
                            <input
                                value={formData.password}
                                onChange={handleInputChange}
                                type="password"
                                id="password"
                                name="password"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                autoComplete="off"
                                placeholder='Digite sua senha...'
                            />
                        </div>
                        {
                            errorMessage && <div className="mb-4">
                                <label htmlFor="password" className="block text-danger">
                                    *{
                                        errorMessage
                                    }
                                </label>
                            </div>
                        }


                        <button disabled={formData.email == "" || formData.password == ""} className="bg-primary mt-4 text-control font-semibold rounded-md py-2 px-4 w-full">
                            {
                                loading ?
                                    <div className="flex justify-center">
                                        <Spinner color="control" size="26"></Spinner>
                                    </div> :
                                    <>
                                        Login
                                    </>
                            }
                        </button>
                    </form>

                    <div className="mt-6 text-green-500 text-center">
                        <a href="/register" className="text-primary">Registre-se</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;