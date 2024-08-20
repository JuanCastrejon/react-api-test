import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const Formulario = ({ serieToEdit, onSuccess }) => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null); // Estado para el error
    const { register, handleSubmit, reset, setValue, formState: { errors, isValid } } = useForm({
        defaultValues: serieToEdit || {},
        mode: 'onChange'
    });

    useEffect(() => {
        if (serieToEdit) {
            setValue('title', serieToEdit.title);
            setValue('creator', serieToEdit.creator);
            setValue('rating', serieToEdit.rating);
            setValue('dates', serieToEdit.dates);
            setValue('image', serieToEdit.image);
            setValue('channel', serieToEdit.channel);
        }
    }, [serieToEdit, setValue]);

    const onSubmit = (data) => {
        const url = serieToEdit 
            ? `https://peticiones.online/api/series/${serieToEdit.id}`
            : 'https://peticiones.online/api/series';
        const method = serieToEdit ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('La petición falló');
                }
                return response.json();
            })
            .then(json => {
                console.log('Respuesta de la API:', json);
                setSuccess(true);
                setError(null);
                if (typeof onSuccess === 'function') {
                    onSuccess();
                }
                reset();
            })
            .catch(error => {
                console.log(error);
                setError('Ha ocurrido un error al procesar la petición');
                setSuccess(false);
            });
    }

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    return <div className="px-5 mt-5">
        <h2>{serieToEdit ? "Editar serie" : "Nueva serie"}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label" htmlFor="inputTitle">Título</label>
                <input className="form-control" type="text" id="inputTitle" {...register('title', { required: 'El título es requerido' })} />
                {errors.title && <div className="alert alert-danger" role="alert">{errors.title.message}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="inputCreator">Creador</label>
                <input className="form-control" type="text" id="inputCreator" {...register('creator', { required: 'El creador es requerido' })} />
                {errors.creator && <div className="alert alert-danger" role="alert">{errors.creator.message}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="inputRating">Rating</label>
                <input className="form-control" type="number" id="inputRating" {...register('rating', { 
                    required: 'El rating es requerido', 
                    min: { value: 1, message: 'El rating debe ser mayor o igual a 1' }, 
                    max: { value: 10, message: 'El rating debe ser menor o igual a 10' },
                    validate: {
                        integer: v => Number.isInteger(Number(v)) || 'El rating debe ser un número entero'
                    }
                })} />
                {errors.rating && <div className="alert alert-danger" role="alert">{errors.rating.message}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="inputDates">Fechas</label>
                <input className="form-control" type="text" id="inputDates" {...register('dates', { required: 'Las fechas son requeridas' })} />
                {errors.dates && <div className="alert alert-danger" role="alert">{errors.dates.message}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="inputImage">Imagen</label>
                <input className="form-control" type="text" id="inputImage" {...register('image', { required: 'La URL de la imagen es requerida', pattern: { value: /https?:\/\/.+\.(jpg|jpeg|png)/, message: 'Debe ser una URL válida de imagen' } })} />
                {errors.image && <div className="alert alert-danger" role="alert">{errors.image.message}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="inputChannel">Canal</label>
                <input className="form-control" type="text" id="inputChannel" {...register('channel', { required: 'El canal es requerido' })} />
                {errors.channel && <div className="alert alert-danger" role="alert">{errors.channel.message}</div>}
            </div>
            <input className="btn btn-outline-info" 
                type="submit" 
                value={serieToEdit ? "Actualizar serie" : "Crear serie"} 
                disabled={Object.keys(errors).length > 0 || !isValid}/>
        </form>
        {success && (
            <div className="alert alert-success mt-4" role="alert">
                {serieToEdit ? "Serie actualizada" : "Se ha creado una nueva serie"}
            </div>
        )}
        {error && (
            <div className="alert alert-danger mt-4" role="alert">
                {error}
            </div>
        )}
    </div>;
}

export default Formulario;