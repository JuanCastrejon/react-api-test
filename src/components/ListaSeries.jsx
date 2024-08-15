import { useEffect, useState } from "react";
import Formulario from "./Formulario";

const ListaSeries = () => {
    const [series, setSeries] = useState([]);
    const [serieToEdit, setSerieToEdit] = useState(null);
    const [selectedSerie, setSelectedSerie] = useState(null);
    const [error, setError] = useState(null);

    const handleViewDetails = (id) => {
        getSerieById(id);
    };  

    useEffect(() => {
        fetch('https://peticiones.online/api/series')
            .then(response => response.json())
            .then(json => {
                console.log('Series cargadas en ListaSeries:', json); // Verifica las series cargadas
                setSeries(json);
            })
    }, []);   

    const getSerieById = (id) => {
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
            })
            .catch(error => {
                console.error('Error al recuperar la serie:', error);
                setSelectedSerie(null);
                setError(error.message);
            });
    };

    const deleteSerie = (id) => {
        fetch(`https://peticiones.online/api/series/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(() => {
                console.log('Serie eliminada:', id); // Debug
                setSeries(series.filter(serie => serie.id !== id));
            })
            .catch(error => console.log(error));
    };

    const handleEdit = (serie) => {
        console.log('Serie seleccionada para editar:', serie);  // Debug
        setSerieToEdit(serie);
    };

    const handleSuccess = () => {
        console.log('handleSuccess llamado'); // Debug
        fetch('https://peticiones.online/api/series')
            .then(response => response.json())
            .then(json => {
                console.log('Series actualizadas después de la edición:', json); // Debug
                setSeries(json);
            })
            .catch(error => console.log(error));
        setSerieToEdit(null);
    };

    return (
        <div className="series">
            {error && <div className="error-message">{error}</div>}
            {series.map(serie => (
                <div key={serie.id} className="serie">
                    <h2>{serie.title}</h2>
                    <p>Creador: {serie.creator}</p>
                    <img src={serie.image} alt={serie.title} />
                    <p>Puntuación: {serie.rating}</p>
                    <p>Canal: {serie.channel}</p>
                    <button onClick={() => deleteSerie(serie.id)}>Eliminar</button>
                    <button onClick={() => handleEdit(serie)}>Editar</button>
                    <button onClick={() => handleViewDetails(serie.id)}>Ver detalles</button>
                    {serieToEdit && serieToEdit.id === serie.id && (
                        <Formulario serieToEdit={serieToEdit} onSuccess={handleSuccess} />
                    )}
                </div>
            ))}
            {selectedSerie && (
                <div className="serie-details">
                    <h2>Título: {selectedSerie.title}</h2>
                    <p>Creador: {selectedSerie.creator}</p>
                    <p>Puntuación: {selectedSerie.rating}</p>
                    <p>Fechas: {selectedSerie.dates}</p>
                    <p>Canal: {selectedSerie.channel}</p>
                    <img src={selectedSerie.image} alt={selectedSerie.title} />
                    <button onClick={() => setSelectedSerie(null)}>Cerrar detalles</button>
                </div>
            )}
        </div>
    );
}

export default ListaSeries;
