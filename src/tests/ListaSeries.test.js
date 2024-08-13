import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Importa userEvent
import ListaSeries from '../components/ListaSeries';
import Formulario from '../components/Formulario';

describe('ListaSeries test', () => {

    // Prueba de carga de imágenes de las series
    test('si se cargan las imágenes de las series', async () => {
        render(<ListaSeries />);

        const images = await screen.findAllByRole('img');

        expect(images).toHaveLength(1);

        const title = await screen.findByText('Juego de Tronos');

        expect(title).toBeInTheDocument();
    });

    // Prueba de actualización del estado: añadir una nueva serie
    test('la lista de series se actualiza después de agregar una nueva serie', async () => {
        render(<ListaSeries />);

        // Verifica que inicialmente hay una serie
        let series = await screen.findAllByRole('heading', { level: 2 });
        expect(series).toHaveLength(1);

        // Simula la creación de una nueva serie
        render(<Formulario />);
        const inputTitle = screen.getByLabelText('Título');
        userEvent.type(inputTitle, 'Nueva serie');
        const button = screen.getByRole('button', { name: /Crear serie/i });
        userEvent.click(button);

        // Simula que la nueva serie fue agregada
        series = await screen.findAllByRole('heading', { level: 2 });
        expect(series).toHaveLength(2);
    });
});
