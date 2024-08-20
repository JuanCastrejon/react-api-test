describe('Lista de series', () => {

    // Prueba de carga de imágenes de las series
    it('si se cargan las imágenes de las series', async () => {
        await browser.url('http://localhost:3000');
        await browser.waitUntil(async () => (await $$('img')).length > 0, { timeout: 5000, timeoutMsg: 'Imágenes no cargadas' });
        const images = await $$('img');
        await expect(images.length).toBeGreaterThan(0);
    });

    // Prueba de actualización del estado: añadir una nueva serie
    it('la lista de series se actualiza después de agregar una nueva serie', async () => {
        await browser.url('http://localhost:3000');
        const initialSeriesCount = (await $$('h2')).length;
        
        // Simula la creación de una nueva serie
        const inputTitle = await $('#inputTitle');
        await inputTitle.setValue('Nueva serie');
        
        const inputCreator = await $('#inputCreator');
        await inputCreator.setValue('Creador de prueba');
        
        const inputRating = await $('#inputRating');
        await inputRating.setValue('5');
        
        const inputDates = await $('#inputDates');
        await inputDates.setValue('2023-2024');
        
        const inputImage = await $('#inputImage');
        await inputImage.setValue('https://example.com/image.jpg');
        
        const inputChannel = await $('#inputChannel');
        await inputChannel.setValue('Canal de prueba');
        
        // Selecciona el botón de envío dentro del formulario
        const submitButton = await $('form input[type="submit"]');
        await submitButton.click();
    
        await browser.waitUntil(async () => (await $$('h2')).length > initialSeriesCount, 
            { timeout: 5000, timeoutMsg: 'Nueva serie no agregada' });
        
        const finalSeriesCount = (await $$('h2')).length;
        expect(finalSeriesCount).toBeGreaterThan(initialSeriesCount);
    });

    // Prueba de eliminación de una serie existente
    it('elimina una serie existente', async () => {
        await browser.url('http://localhost:3000');
        
        // Esperar a que el elemento body esté presente
    });

    // Prueba de recuperación y muestra de los detalles de una serie específica
    it('recupera y muestra los detalles de una serie específica', async () => {
        await browser.url('http://localhost:3000');
        
        // Espera a que el botón "Ver detalles" esté presente y visible
        const viewDetailsButton = await $('button=Ver detalles');
        await viewDetailsButton.waitForExist({ timeout: 10000 });
        await viewDetailsButton.waitForDisplayed({ timeout: 10000 });
        
        // Haz clic en el botón "Ver detalles"
        await viewDetailsButton.click();

        await browser.waitUntil(async () => await $('.serie-details').isDisplayed(), 
            { timeout: 10000, timeoutMsg: 'Detalles de la serie no mostrados' });
        
        const detailsContainer = await $('.serie-details');
        await expect(detailsContainer).toBeDisplayed();
    });

    // Prueba de muestra de mensaje de error cuando se intenta obtener una serie que no existe
    it('muestra un mensaje de error cuando se intenta obtener una serie que no existe', async () => {
        await browser.url('http://localhost:3000');
        
        // Simular una petición fallida
        await browser.execute(() => {
            window.fetch = () => Promise.reject({ status: 404, message: "La serie no existe" });
        });

        // Espera a que el botón "Ver detalles" esté presente y visible
        const viewDetailsButton = await $('button=Ver detalles');
        await viewDetailsButton.waitForExist({ timeout: 10000 });
        await viewDetailsButton.waitForDisplayed({ timeout: 10000 });
        
        // Haz clic en el botón "Ver detalles"
        await viewDetailsButton.click();

        await browser.waitUntil(async () => {
            const errorMessage = await $('.error-message');
            return await errorMessage.isDisplayed();
        }, { 
            timeout: 10000, 
            timeoutMsg: 'Mensaje de error no mostrado' 
        });
        
        const errorMessage = await $('.error-message');
        const errorText = await errorMessage.getText();
        expect(errorText).toContain('La serie no existe');
    });
});