import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListaSeries from '../components/ListaSeries';
import Formulario from '../components/Formulario';

import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ListaSeries test', () => {
    test('si se cargan las imágenes de las series', async () => {
        render(<ListaSeries />);

        const images = await screen.findAllByRole('img');
        expect(images).toHaveLength(1);

        const title = await screen.findByText('Juego de Tronos');
        expect(title).toBeInTheDocument();
    });

    test('la lista de series se actualiza después de agregar una nueva serie', async () => {
        render(<ListaSeries />);

        let series = await screen.findAllByRole('heading', { level: 2 });
        expect(series).toHaveLength(1);

        render(<Formulario onSuccess={() => {}} />);
        const inputTitle = screen.getByLabelText('Título');
        userEvent.type(inputTitle, 'Nueva serie');
        const button = screen.getByRole('button', { name: /Crear serie/i });
        userEvent.click(button);

        series = await screen.findAllByRole('heading', { level: 2 });
        expect(series).toHaveLength(2);
    });

    test('elimina una serie existente', async () => {
        render(<ListaSeries />);

        // Verifica que la serie "Juego de Tronos" está en la lista inicialmente
        const seriesTitle = await screen.findByText('Juego de Tronos');
        expect(seriesTitle).toBeInTheDocument();

        // Encuentra el contenedor de la serie específica
        const juegoDeTronosContainer = seriesTitle.closest('div');

        // Selecciona el botón "Eliminar" dentro del contenedor de "Juego de Tronos"
        const deleteButton = within(juegoDeTronosContainer).getByRole('button', { name: /eliminar/i });
        userEvent.click(deleteButton);

        // Verifica que la serie "Juego de Tronos" ya no esté en la lista
        await waitFor(() => {
            expect(screen.queryByText('Juego de Tronos')).not.toBeInTheDocument();
        });

        // Verifica que la serie "Nueva serie" todavía está en la lista
        const remainingSeriesTitle = screen.getByText('Nueva serie');
        expect(remainingSeriesTitle).toBeInTheDocument();
    });
});
