// test/specs/listaSeries.e2e.js
describe('ListaSeries E2E Test', () => {
    it('debería cargar las imágenes de las series', () => {
        browser.url('http://localhost:3000');

        const images = $$('img');
        expect(images).toBeElementsArrayOfSize(1);

        const title = $('=Juego de Tronos');
        expect(title).toBeDisplayed();
    });

    it('debería actualizar la lista de series después de agregar una nueva serie', () => {
        browser.url('http://localhost:3000');

        let series = $$('h2');
        expect(series).toBeElementsArrayOfSize(1);

        const inputTitle = $('#inputTitle');
        const button = $('button=Crear serie');

        inputTitle.setValue('Nueva serie');
        button.click();

        series = $$('h2');
        expect(series).toBeElementsArrayOfSize(2);
    });

    // Agrega más pruebas según sea necesario
});