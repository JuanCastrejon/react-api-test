describe('Formulario de agregar series', () => {
    it('debería permitir al usuario agregar una nueva serie', async () => {
        await browser.url('/formulario');

        const inputTitle = await $('#inputTitle');
        const inputCreator = await $('#inputCreator');
        const inputRating = await $('#inputRating');
        const inputDates = await $('#inputDates');
        const inputImage = await $('#inputImage');
        const inputChannel = await $('#inputChannel');

        await inputTitle.setValue('Nueva Serie');
        await inputCreator.setValue('Michael Smith');
        await inputRating.setValue('9');
        await inputDates.setValue('1950-1960');
        await inputImage.setValue('https://ejemplo.com/imagen.jpg');
        await inputChannel.setValue('Telecinco');

        const button = await $('input[type="submit"]');
        await button.waitForClickable({ timeout: 5000 });

        await button.click();

        const successAlert = await $('.alert-success');
        await expect(successAlert).toBeDisplayed();
    });

    it('no permite enviar el formulario si los campos están vacíos', async () => {
        await browser.url('/formulario');

        const button = await $('input[type="submit"]');
        await button.waitForExist({ timeout: 5000 });
        await button.waitForDisplayed({ timeout: 5000 });

        await expect(button).toBeDisabled();
    });

    it('no permite enviar el formulario si el rating es inválido', async () => {
        await browser.url('/formulario');

        const inputRating = await $('#inputRating');
        await inputRating.setValue('0');

        const button = await $('input[type="submit"]');
        await button.waitForExist({ timeout: 5000 });
        await button.waitForDisplayed({ timeout: 5000 });

        await expect(button).toBeDisabled();

        const errorMessage = await $('.alert-danger');
        await expect(errorMessage).toBeDisplayed();
        const errorText = await errorMessage.getText();
        expect(errorText).toMatch(/El rating debe ser mayor o igual a 1/);
    });

    it('no permite enviar el formulario si la URL de la imagen es inválida', async () => {
        await browser.url('/formulario');

        const inputTitle = await $('#inputTitle');
        const inputImage = await $('#inputImage');

        await inputTitle.setValue('La casa de la pradera');
        await inputImage.setValue('imagen-sin-url');

        const button = await $('input[type="submit"]');
        await button.waitForExist({ timeout: 5000 });
        await button.waitForDisplayed({ timeout: 5000 });

        await expect(button).toBeDisabled();

        const errorMessage = await $('.alert-danger');
        await expect(errorMessage).toBeDisplayed();
        const errorText = await errorMessage.getText();
        expect(errorText).toMatch(/Debe ser una URL válida de imagen/);
    });

    it('muestra un mensaje de error si la petición falla', async () => {
        await browser.url('/formulario');

        // Llena todos los campos correctamente
        await $('#inputTitle').setValue('Nueva Serie');
        await $('#inputCreator').setValue('Michael Smith');
        await $('#inputRating').setValue('9');
        await $('#inputDates').setValue('1950-1960');
        await $('#inputImage').setValue('https://ejemplo.com/imagen.jpg');
        await $('#inputChannel').setValue('Telecinco');

        // Sobrescribe fetch para simular un error
        await browser.execute(() => {
            window.fetch = () => Promise.reject(new Error("API is down"));
        });

        const button = await $('input[type="submit"]');
        await button.waitForClickable({ timeout: 5000 });

        await button.click();

        const errorAlert = await $('.alert-danger');
        await expect(errorAlert).toBeDisplayed();
        const errorText = await errorAlert.getText();
        expect(errorText).toMatch(/Ha ocurrido un error al procesar la petición/);
    });

    it('verifica la accesibilidad de los elementos clave', async () => {
        await browser.url('/formulario');

        const inputTitle = await $('#inputTitle');
        await expect(inputTitle).toHaveAttribute('id', 'inputTitle');

        const button = await $('input[type="submit"]');
        await expect(button).toBeDisplayed();
    });
});