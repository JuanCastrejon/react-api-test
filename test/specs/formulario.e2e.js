// test/specs/formulario.e2e.js
describe('Formulario E2E Test', () => {
    it('debería crear una nueva serie', () => {
        browser.url('http://localhost:3000'); // Cambia la URL según tu configuración

        const inputTitle = $('#inputTitle');
        const inputCreator = $('#inputCreator');
        const inputRating = $('#inputRating');
        const inputDates = $('#inputDates');
        const inputImage = $('#inputImage');
        const inputChannel = $('#inputChannel');
        const button = $('button=Crear serie');

        inputTitle.setValue('La casa de la pradera');
        inputCreator.setValue('Michael Smith');
        inputRating.setValue('9');
        inputDates.setValue('1950-1960');
        inputImage.setValue('http://imagen...');
        inputChannel.setValue('Telecinco');

        button.click();

        const alert = $('role=alert');
        expect(alert).toBeDisplayed();
    });

    it('no debería permitir enviar el formulario si los campos están vacíos', () => {
        browser.url('http://localhost:3000');

        const button = $('button=Crear serie');
        button.click();

        const alert = $('role=alert');
        expect(alert).not.toBeDisplayed();
    });

    // Agrega más pruebas según sea necesario
});