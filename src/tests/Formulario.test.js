import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Formulario from '../components/Formulario';

describe('Formulario test', () => {

    test('se crea una nueva serie', async () => {

        render(<Formulario />);

        const inputTitle = screen.getByLabelText('Título');
        const inputCreator = screen.getByLabelText('Creador');
        const inputRating = screen.getByLabelText('Rating');
        const inputDates = screen.getByLabelText('Fechas')
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

});