import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, MapPin, Phone, User } from 'lucide-react';
import Spinner from '../../../_components/Spinner';
import { getUniqueEvent, update } from '../../../_services/eventsService';

function EditPage() {
    // ID event to edit
    const { id } = useParams();
    const navigate = useNavigate();
    const [loadingEdit, setLoadingEdit] = useState(false)
    const [loadingEvent, setLoadingEvent] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [eventData, setEventData] = useState({
        name: '',
        location: '',
        state: '',
        address: '',
        number: '',
        complement: '',
        phone: '',
        event_date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({
            ...eventData,
            [name]: value
        });
    };


    const updateEvent = async () => {
        // Reset error menssage
        setLoadingEdit(true);
        setErrorMessage("");
        const response = await update(id, eventData);
        setLoadingEdit(false);
        if (!response.success) {
            setErrorMessage(response.message)
            return;
        }
        navigate('/pages/events/list'); // Redirect event list
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        updateEvent()

    };

    // Get event data
    const getEvent = async (id) => {
        setLoadingEvent(true);
        const response = await getUniqueEvent(id);
        if (!response.success) {
            alert(response.message);
            return
        }
        setLoadingEvent(false);
        setEventData({
            name: response.data.name,
            location: response.data.location,
            state: response.data.state,
            address: response.data.address,
            number: response.data.number,
            complement: response.data.complement,
            phone: response.data.phone,
            event_date: response.data.event_date
        });
    }

    // Init function
    useEffect(() => {
        getEvent(id);
    }, [])

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold mb-6">Editar evento {eventData.name}</h1>
            {
                loadingEvent ?
                    <div className="flex justify-center">
                        <Spinner color={'control'} size={'32'}></Spinner>
                    </div> :
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome do Evento</label>
                            <div className="flex items-center border pl-2 rounded-md">
                                <User className="mr-2 text-gray-500" />
                                <input
                                    type="text"
                                    name="name"
                                    value={eventData.name}
                                    onChange={handleChange}
                                    placeholder="Digite o nome do evento"
                                    className="w-full focus:outline-none p-2 rounded-md"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Local</label>
                            <div className="flex items-center border pl-2 rounded-md">
                                <MapPin className="mr-2 text-gray-500" />
                                <input
                                    type="text"
                                    name="location"
                                    value={eventData.location}
                                    onChange={handleChange}
                                    placeholder="Local do evento"
                                    className="w-full focus:outline-none p-2 rounded-md"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Estado</label>
                            <input
                                type="text"
                                name="state"
                                value={eventData.state}
                                onChange={handleChange}
                                placeholder="Estado"
                                className="w-full p-2 border rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Endereço</label>
                            <div className="flex items-center border pl-2 rounded-md">
                                <MapPin className="mr-2 text-gray-500" />
                                <input
                                    type="text"
                                    name="address"
                                    value={eventData.address}
                                    onChange={handleChange}
                                    placeholder="Endereço completo"
                                    className="w-full focus:outline-none p-2 rounded-md"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Número</label>
                            <input
                                type="text"
                                name="number"
                                value={eventData.number}
                                onChange={handleChange}
                                placeholder="Número"
                                className="w-full p-2 border rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Complemento</label>
                            <input
                                type="text"
                                name="complement"
                                value={eventData.complement}
                                onChange={handleChange}
                                placeholder="Complemento (opcional)"
                                className="w-full p-2 border rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Telefone</label>
                            <div className="flex items-center border pl-2 rounded-md">
                                <Phone className="mr-2 text-gray-500" />
                                <input
                                    type="text"
                                    name="phone"
                                    value={eventData.phone}
                                    onChange={handleChange}
                                    placeholder="Telefone"
                                    className="w-full p-2 focus:outline-none rounded-md"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Data do Evento</label>
                            <div className="flex items-center border pl-2 rounded-md">
                                <Calendar className="mr-2 text-gray-500" />
                                <input
                                    type="date"
                                    name="event_date"
                                    value={eventData.event_date}
                                    onChange={handleChange}
                                    className="w-full p-2 focus:outline-none rounded-md"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-danger">{errorMessage}</label>
                        </div>
                        <div className="mt-6">
                            <button
                                disabled={
                                    loadingEdit ||
                                    eventData.name.trim() === "" ||
                                    eventData.location.trim() === "" ||
                                    eventData.state.trim() === "" ||
                                    eventData.address.trim() === "" ||
                                    eventData.number.trim() === "" ||
                                    eventData.phone.trim() === "" ||
                                    eventData.event_date.trim() === ""
                                }
                                type="submit"
                                className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark"
                            >

                                {
                                    loadingEdit ? <div className='flex justify-center'>
                                        <Spinner size={26} color={'control'}></Spinner>
                                    </div> : <>
                                        Salvar
                                    </>
                                }
                            </button>
                        </div>
                    </form>
            }
        </div>
    );
}

export default EditPage;
