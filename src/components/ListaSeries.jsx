import { useEffect, useState } from "react";
import Formulario from "./Formulario";

const ListaSeries = () => {
    const [series, setSeries] = useState([]);
    const [serieToEdit, setSerieToEdit] = useState(null);
    const [selectedSerie, setSelectedSerie] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleViewDetails = (id) => {
        getSerieById(id);
    };  

    useEffect(() => {
        fetchSeries();
    }, []);   

    const fetchSeries = () => {
        setLoading(true);
        fetch('https://peticiones.online/api/series')
            .then(response => response.json())
            .then(json => {
                console.log('Series cargadas en ListaSeries:', json);
                setSeries(json);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al cargar series:', error);
                setError('Error al cargar las series');
                setLoading(false);
            });
    };

    const getSerieById = (id) => {
        setLoading(true);
        fetch(`https://peticiones.online/api/series/${id}`)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('La serie no existe');
                    }
                    throw new Error('Error en la petición');
                }
                return response.json();
            })
            .then(data => {
                console.log('Serie recuperada:', data);
                setSelectedSerie(data);
                setError(null);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al recuperar la serie:', error);
                setSelectedSerie(null);
                setError(error.message);
                setLoading(false);
            });
    };

    const deleteSerie = (id) => {
        setLoading(true);
        fetch(`https://peticiones.online/api/series/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar la serie');
                }
                setSeries(series.filter(serie => serie.id !== id));
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setError('Error al eliminar la serie');
                setLoading(false);
            });
    };

    const handleEdit = (serie) => {
        console.log('Serie seleccionada para editar:', serie);
        setSerieToEdit(serie);
    };

    const handleSuccess = () => {
        console.log('handleSuccess llamado');
        fetchSeries();
        setSerieToEdit(null);
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="series">
            {error && <div className="error-message">{error}</div>}
            <button className="crear-serie">Crear serie</button>
            {series.map(serie => (
                <div key={serie.id} className="serie">
                    <h2>{serie.title}</h2>
                    <p>Creador: {serie.creator || 'Desconocido'}</p>
                    <img src={serie.image} alt={serie.title} />
                    <p>Puntuación: {serie.rating || '0'}</p>
                    <p>Canal: {serie.channel || 'Desconocido'}</p>
                    <button onClick={() => deleteSerie(serie.id)}>Eliminar</button>
                    {serieToEdit && serieToEdit.id === serie.id ? (
                        <Formulario serieToEdit={serieToEdit} onSuccess={handleSuccess} />
                    ) : (
                        <>
                            <button onClick={() => handleEdit(serie)}>Editar</button>
                            <button onClick={() => handleViewDetails(serie.id)}>Ver detalles</button>
                        </>
                    )}
                </div>
            ))}
            {selectedSerie && (
                <div className="serie-details">
                    <h2>Título: {selectedSerie.title}</h2>
                    <p>Creador: {selectedSerie.creator || 'Desconocido'}</p>
                    <p>Puntuación: {selectedSerie.rating || '0'}</p>
                    <p>Fechas: {selectedSerie.dates || 'Desconocido'}</p>
                    <p>Canal: {selectedSerie.channel || 'Desconocido'}</p>
                    <img src={selectedSerie.image} alt={selectedSerie.title} />
                    <button onClick={() => setSelectedSerie(null)}>Cerrar detalles</button>
                </div>
            )}
        </div>
    );
}

export default ListaSeries;