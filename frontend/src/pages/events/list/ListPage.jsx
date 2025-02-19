import { useEffect, useState } from "react";
import { formatDate } from '../../../_services/dateService';
import { Edit, Trash2, X } from 'lucide-react';
import { deleteEvent, getEvents } from "../../../_services/eventsService";
import Spinner from "../../../_components/Spinner";

function ListPage() {
    const [loadingGetEvents, setLoadingGetEvents] = useState(false);
    const [loadingRemoveEvent, setLoadingRemoveEvent] = useState(false);
    const [events, setEvents] = useState([]);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Get all events
    const getAllEvents = async () => {
        setLoadingGetEvents(true);
        const response = await getEvents();
        setLoadingGetEvents(false);
        if (!response.success) {
            console.log(response.message);
            return
        } else {
            setEvents(response.data);
        }
    };

    // Handle delete confirmation
    const handleDelete = (id) => {
        setEventToDelete(id);
        setIsModalOpen(true);
    };

    // Confirm delete action
    const confirmDelete = async () => {
        if (eventToDelete !== null) {
            setLoadingRemoveEvent(true);
            const response = await deleteEvent(eventToDelete);
            setLoadingRemoveEvent(false);
            setIsModalOpen(false);
            if (!response.success) {
                alert(response.message)
                return
            }
            getAllEvents()
        }
    };

    // Init Function
    useEffect(() => {
        getAllEvents();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-6">Eventos cadastrados</h1>

            {loadingGetEvents ? (
                <div className="flex justify-center h-full">
                    <Spinner size={40} color={'control'} />
                </div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-primary text-light">
                                <th className="px-4 py-2 text-left">Nome</th>
                                <th className="px-4 py-2 text-left">Organizador</th>
                                <th className="px-4 py-2 text-left">Estado</th>
                                <th className="px-4 py-2 text-left">Endereço</th>
                                <th className="px-4 py-2 text-left">Localização</th>
                                <th className="px-4 py-2 text-left">Telefone</th>
                                <th className="px-4 py-2 text-left">Data do Evento</th>
                                <th className="px-4 py-2 text-left">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event.id} className="border-t border-gray-200">
                                    <td className="px-4 py-2">{event.name}</td>
                                    <td className="px-4 py-2">{event.organizer}</td>
                                    <td className="px-4 py-2">{event.state}</td>
                                    <td className="px-4 py-2">{event.address} {event.complement}</td>
                                    <td className="px-4 py-2">{event.location}</td>
                                    <td className="px-4 py-2">{event.phone}</td>
                                    <td className="px-4 py-2">{formatDate(event.event_date)}</td>
                                    <td className="px-4 py-2 space-x-4">
                                        <button
                                            className="text-yellow-500 hover:text-yellow-700 transition-all duration-200"
                                            onClick={() => window.location.href = `/pages/events/edit/${event.id}`}
                                        >
                                            <Edit className="inline-block mr-1" size={18} />
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700 transition-all duration-200"
                                            onClick={() => handleDelete(event.id)}
                                        >
                                            <Trash2 className="inline-block mr-1" size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-md">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Confirmar Remoção</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-gray-900">
                                <X size={20} />
                            </button>
                        </div>
                        <p className="text-gray-700 mb-6">Tem certeza de que deseja remover este evento? Esta ação não pode ser desfeita.</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-primary text-white rounded-md flex items-center space-x-2"
                            >
                                {
                                    loadingRemoveEvent ?
                                        <div className="flex justify-center">
                                            <Spinner color={'control'} size={28}></Spinner>
                                        </div> : <>
                                            <Trash2 size={18} />
                                            <span>Remover</span>
                                        </>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListPage;
