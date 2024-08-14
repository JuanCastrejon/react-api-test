import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
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

    // Prueba de eliminación de una serie existente
    test('deletes an existing series', async () => {
        render(<ListaSeries />);

        // Selecciona el contenedor de la serie "Juego de Tronos"
        const juegoDeTronosElement = await screen.findByText('Juego de Tronos');
        const juegoDeTronosContainer = juegoDeTronosElement.closest('.serie');

        // Dentro de ese contenedor, selecciona el botón "Eliminar"
        const deleteButton = within(juegoDeTronosContainer).getByRole('button', { name: /eliminar/i });

        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.queryByText(/Juego de Tronos/i)).not.toBeInTheDocument();
        });
    });

    test('recupera y muestra los detalles de una serie específica', async () => {
        render(<ListaSeries />);
    
        // Espera a que se cargue cualquier serie
        const serieTitle = await screen.findByRole('heading', { level: 2 });
        
        // Obtén el título de la serie cargada
        const serieTitleText = serieTitle.textContent;
    
        // Simula el clic en el botón "Ver detalles"
        const viewDetailsButton = screen.getByRole('button', { name: /Ver detalles/i });
        userEvent.click(viewDetailsButton);
    
        // Espera a que se muestren los detalles de la serie
        const titleInDetails = await screen.findByText(`Título: ${serieTitleText}`);
        
        // Verifica que el título esté dentro del contenedor de detalles
        expect(titleInDetails.closest('.serie-details')).toBeInTheDocument();
    
        // Verifica que se muestren los detalles correctos dentro del contenedor de detalles
        const detailsContainer = titleInDetails.closest('.serie-details');
        expect(detailsContainer).toBeInTheDocument();
        
        expect(within(detailsContainer).getByText('Creador: Desconocido')).toBeInTheDocument();
        expect(within(detailsContainer).getByText('Puntuación: 0')).toBeInTheDocument();
        expect(within(detailsContainer).getByText('Canal: Desconocido')).toBeInTheDocument();
    
        // Simula el cierre de los detalles
        const closeButton = within(detailsContainer).getByRole('button', { name: /Cerrar detalles/i });
        userEvent.click(closeButton);
    
        // Verifica que los detalles ya no se muestren
        expect(screen.queryByText(`Título: ${serieTitleText}`)).not.toBeInTheDocument();
    });
});