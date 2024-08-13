import { useEffect, useState } from "react";

const ListaSeries = () => {

    const [series, setSeries] = useState([]);

    useEffect(() => {
        fetch('https://peticiones.online/api/series')
            .then(response => response.json())
            .then(json => setSeries(json))
            .catch(error => console.log(error));
    }, []);

    const deleteSerie = (id) => {
        fetch(`https://peticiones.online/api/series/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(() => setSeries(series.filter(serie => serie.id !== id)))
            .catch(error => console.log(error));
    };

    return <div className="series">
        {series.map(serie => (
            <div key={serie.id} className="serie">
                <h2>{serie.title}</h2>
                <p>Creador: {serie.creator}</p>
                <img src={serie.image} alt={serie.title} />
                <p>Puntuación: {serie.rating}</p>
                <p>Canal: {serie.channel}</p>
                <button onClick={() => deleteSerie(serie.id)}>Eliminar</button>
            </div>
        ))}
    </div>;
}

export default ListaSeries;