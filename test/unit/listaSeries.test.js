const { expect } = require('expect-webdriverio');
const ListaSeriesPage = require('../pageobjects/listaSeries.page');
const FormularioPage = require('../pageobjects/formulario.page');

describe('ListaSeries Component', () => {
    beforeAll(async () => {
        await ListaSeriesPage.open();
    });

    it('should display the correct number of series items', async () => {
        const seriesCount = await ListaSeriesPage.seriesItems.length;
        expect(seriesCount).toBeGreaterThan(0); // Verifica que haya al menos una serie
    });

    it('should delete a series item', async () => {
        const initialCount = await ListaSeriesPage.seriesItems.length;
        await ListaSeriesPage.deleteSerie(0);
        const newCount = await ListaSeriesPage.seriesItems.length;
        expect(newCount).toBeLessThan(initialCount);
    });

    it('should edit a series item', async () => {
        await ListaSeriesPage.editSerie(0);
        const formData = {
            title: 'Serie Editada',
            creator: 'Nuevo Creador',
            rating: 4,
            dates: '2024',
            image: 'http://example.com/newimage.jpg',
            channel: 'Nuevo Canal'
        };

        await FormularioPage.fillForm(formData);
        await FormularioPage.submitForm();

        await expect(FormularioPage.successMessage).toBeDisplayed();
        await expect(FormularioPage.successMessage).toHaveTextContaining('Serie actualizada');
    });

    it('should view details of a series item', async () => {
        await ListaSeriesPage.viewDetails(0);
        await expect(ListaSeriesPage.serieDetails).toBeDisplayed();
    });
});