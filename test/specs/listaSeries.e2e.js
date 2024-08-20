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
        const button = await $('.crear-serie');
        await button.click();

        await browser.waitUntil(async () => (await $$('h2')).length > initialSeriesCount, 
            { timeout: 5000, timeoutMsg: 'Nueva serie no agregada' });
        
        const finalSeriesCount = (await $$('h2')).length;
        expect(finalSeriesCount).toBeGreaterThan(initialSeriesCount);
    });

    /* Prueba de eliminación de una serie existente
    it('elimina una serie existente', async () => {
        await browser.url('http://localhost:3000');
        
        // Esperar a que el elemento body esté presente
        await browser.waitUntil(() => $('body').isDisplayed(), { timeout: 15000 });

        // Imprimir el HTML para depuración
        const bodyHTML = await $('body').getHTML();
        console.log(bodyHTML);

        const initialSeriesCount = await $$('.serie').length;
        console.log(`Número inicial de series: ${initialSeriesCount}`);

        // Intentar encontrar todos los botones dentro de las series
        const buttons = await $$('.serie button');
        console.log(`Número de botones encontrados: ${buttons.length}`);

        // Buscar el botón de eliminar entre todos los botones
        let deleteButton;
        for (const button of buttons) {
            const text = await button.getText();
            console.log(`Texto del botón: ${text}`);
            if (text === 'Eliminar') {
                deleteButton = button;
                break;
            }
        }

        if (!deleteButton) {
            throw new Error('No se encontró el botón de eliminar');
        }

        await deleteButton.click();

        await browser.waitUntil(async () => {
            const currentCount = await $$('.serie').length;
            return currentCount < initialSeriesCount;
        }, { 
            timeout: 15000, 
            timeoutMsg: 'Serie no eliminada' 
        });
        
        const finalSeriesCount = await $$('.serie').length;
        expect(finalSeriesCount).toBeLessThan(initialSeriesCount);
    });*/

    // Prueba de recuperación y muestra de los detalles de una serie específica
    it('recupera y muestra los detalles de una serie específica', async () => {
        await browser.url('http://localhost:3000');
        
        const viewDetailsButton = await $('button=Ver detalles');
        await viewDetailsButton.click();

        await browser.waitUntil(async () => await $('.serie-details').isDisplayed(), 
            { timeout: 5000, timeoutMsg: 'Detalles de la serie no mostrados' });
        
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

        const viewDetailsButton = await $('button=Ver detalles');
        await viewDetailsButton.click();

        await browser.waitUntil(async () => {
            const errorMessage = await $('.error-message');
            return await errorMessage.isDisplayed();
        }, { 
            timeout: 5000, 
            timeoutMsg: 'Mensaje de error no mostrado' 
        });
        
        const errorMessage = await $('.error-message');
        const errorText = await errorMessage.getText();
        expect(errorText).toContain('La serie no existe');
    });
});