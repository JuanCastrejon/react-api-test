import { useEffect, useState } from "react";
import Formulario from "./Formulario";

const ListaSeries = () => {
    const [series, setSeries] = useState([]);
    const [serieToEdit, setSerieToEdit] = useState(null);

    useEffect(() => {
        fetch('https://peticiones.online/api/series')
            .then(response => response.json())
            .then(json => {
                console.log('Series cargadas:', json); // Debug
                setSeries(json);
            })
            .catch(error => console.log(error));
    }, []);

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
            {series.map(serie => (
                <div key={serie.id} className="serie">
                    <h2>{serie.title}</h2>
                    <p>Creador: {serie.creator}</p>
                    <img src={serie.image} alt={serie.title} />
                    <p>Puntuación: {serie.rating}</p>
                    <p>Canal: {serie.channel}</p>
                    <button onClick={() => deleteSerie(serie.id)}>Eliminar</button>
                    <button onClick={() => handleEdit(serie)}>Editar</button>
                    {serieToEdit && serieToEdit.id === serie.id && (
                        <Formulario serieToEdit={serieToEdit} onSuccess={handleSuccess} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default ListaSeries;
