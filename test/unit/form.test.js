const { expect } = require('expect-webdriverio');
const FormularioPage = require('../pageobjects/formulario.page');

describe('Formulario Component', () => {
    beforeAll(async () => {
        await browser.url('/formulario'); // Cambia esto a la URL correcta
    });

    it('should submit the form with valid input', async () => {
        const formData = {
            title: 'Nueva Serie',
            creator: 'Creador',
            rating: 5,
            dates: '2023',
            image: 'http://example.com/image.jpg',
            channel: 'Canal'
        };

        await FormularioPage.fillForm(formData);
        await FormularioPage.submitForm();

        await expect(FormularioPage.successMessage).toBeDisplayed();
        await expect(FormularioPage.successMessage).toHaveTextContaining('Se ha creado una nueva serie');
    });

    it('should display an error with invalid input', async () => {
        await FormularioPage.fillForm({ title: '' });
        await FormularioPage.submitForm();

        const errorMessage = await $('#error-message'); // Cambia esto al selector correcto
        await expect(errorMessage).toBeDisplayed();
    });
});