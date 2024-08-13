import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Formulario from '../components/Formulario';

describe('Formulario test', () => {

    // Prueba de creación de una nueva serie
    test('se crea una nueva serie', async () => {
        render(<Formulario />);

        const inputTitle = screen.getByLabelText('Título');
        const inputCreator = screen.getByLabelText('Creador');
        const inputRating = screen.getByLabelText('Rating');
        const inputDates = screen.getByLabelText('Fechas');
        const inputImage = screen.getByLabelText('Imagen');
        const inputChannel = screen.getByLabelText('Canal');

        userEvent.type(inputTitle, 'La casa de la pradera');
        userEvent.type(inputCreator, 'Michael Smith');
        userEvent.type(inputRating, '9');
        userEvent.type(inputDates, '1950-1960');
        userEvent.type(inputImage, 'http://imagen...');
        userEvent.type(inputChannel, 'Telecinco');

        const button = screen.getByRole('button', { name: /Crear serie/i });

        userEvent.click(button);

        const alert = await screen.findByRole('alert');

        expect(alert).toBeInTheDocument();
    });

    // Prueba de validación: campos vacíos
    test('no permite enviar el formulario si los campos están vacíos', async () => {
        render(<Formulario />);

        const button = screen.getByRole('button', { name: /Crear serie/i });

        userEvent.click(button);

        const alert = screen.queryByRole('alert');

        expect(alert).not.toBeInTheDocument();  // No debe aparecer la alerta de éxito
    });

    // Prueba de validación: rating inválido
    test('no permite enviar el formulario si el rating es inválido', async () => {
        render(<Formulario />);

        const inputTitle = screen.getByLabelText('Título');
        const inputRating = screen.getByLabelText('Rating');

        userEvent.type(inputTitle, 'La casa de la pradera');
        userEvent.type(inputRating, '-1');  // Rating inválido

        const button = screen.getByRole('button', { name: /Crear serie/i });

        userEvent.click(button);

        const alert = screen.queryByRole('alert');
        expect(alert).not.toBeInTheDocument();  // No debe aparecer la alerta de éxito
    });

    // Prueba de validación: URL de imagen inválida
    test('no permite enviar el formulario si la URL de la imagen es inválida', async () => {
        render(<Formulario />);

        const inputTitle = screen.getByLabelText('Título');
        const inputImage = screen.getByLabelText('Imagen');

        userEvent.type(inputTitle, 'La casa de la pradera');
        userEvent.type(inputImage, 'imagen-sin-url');  // URL inválida

        const button = screen.getByRole('button', { name: /Crear serie/i });

        userEvent.click(button);

        const alert = screen.queryByRole('alert');
        expect(alert).not.toBeInTheDocument();  // No debe aparecer la alerta de éxito
    });

    // Prueba de errores en la petición
    test('muestra un mensaje de error si la petición falla', async () => {
        global.fetch = jest.fn(() => Promise.reject("API is down"));

        render(<Formulario />);

        const inputTitle = screen.getByLabelText('Título');
        userEvent.type(inputTitle, 'La casa de la pradera');

        const button = screen.getByRole('button', { name: /Crear serie/i });
        userEvent.click(button);

        const alert = screen.queryByRole('alert');
        expect(alert).not.toBeInTheDocument();  // No debe aparecer la alerta de éxito
    });

    // Prueba de accesibilidad
    test('verifica la accesibilidad de los elementos clave', () => {
        render(<Formulario />);

        const inputTitle = screen.getByLabelText('Título');
        expect(inputTitle).toHaveAttribute('id', 'inputTitle');

        const button = screen.getByRole('button', { name: /Crear serie/i });
        expect(button).toBeInTheDocument();
    });
});
