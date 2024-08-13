import { useState } from "react";
import { useForm } from "react-hook-form";

const Formulario = () => {

    const [success, setSuccess] = useState(false);

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        fetch('https://peticiones.online/api/series', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => setSuccess(true))
            .catch(error => console.log(error));
    }

    return <div className="px-5 mt-5">
        <h2>Nueva serie</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label" htmlFor="inputTitle">Título</label>
                <input className="form-control" type="text" id="inputTitle" {...register('title')} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="inputCreator">Creador</label>
                <input className="form-control" type="text" id="inputCreator" {...register('creator')} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="inputRating">Rating</label>
                <input className="form-control" type="number" id="inputRating" {...register('rating')} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="inputDates">Fechas</label>
                <input className="form-control" type="text" id="inputDates" {...register('dates')} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="inputImage">Imagen</label>
                <input className="form-control" type="text" id="inputImage" {...register('image')} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="inputChannel">Canal</label>
                <input className="form-control" type="text" id="inputChannel" {...register('channel')} />
            </div>
            <input className="btn btn-outline-info" type="submit" value="Crear serie" />
        </form>
        {success && (
            <div className="alert alert-success mt-4" role="alert">
                Se ha creado una nueva serie
            </div>
        )}
    </div>;
}

export default Formulario;