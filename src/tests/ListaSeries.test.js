import { render, screen } from "@testing-library/react";
import ListaSeries from '../components/ListaSeries';

describe('ListaSeries test', () => {

    test('si se cargan las imágenes de las series', async () => {

        render(<ListaSeries />);

        const images = await screen.findAllByRole('img');

        expect(images).toHaveLength(1);

        const title = await screen.findByText('Juego de Tronos');

        expect(title).toBeInTheDocument();

    });

});