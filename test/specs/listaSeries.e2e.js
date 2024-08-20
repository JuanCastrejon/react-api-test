describe('Lista de series', () => {

    // Prueba de carga de imágenes de las series
    it('si se cargan las imágenes de las series', async () => {
        await browser.url('http://localhost:3000');

        const images = await $$('img');
        await expect(images).toBeElementsArrayOfSize(1);

        const title = await $('=Juego de Tronos');
        await expect(title).toBeDisplayed();
    });

    // Prueba de actualización del estado: añadir una nueva serie
    it('la lista de series se actualiza después de agregar una nueva serie', async () => {
        await browser.url('http://localhost:3000');

        // Verifica que inicialmente hay una serie
        let series = await $$('h2');
        await expect(series).toBeElementsArrayOfSize(1);

        // Simula la creación de una nueva serie
        const inputTitle = await $('#inputTitle');
        await inputTitle.setValue('Nueva serie');
        const button = await $('button=Crear serie');
        await button.click();

        // Simula que la nueva serie fue agregada
        series = await $$('h2');
        await expect(series).toBeElementsArrayOfSize(2);
    });

    // Prueba de eliminación de una serie existente
    it('elimina una serie existente', async () => {
        await browser.url('http://localhost:3000');

        // Selecciona el contenedor de la serie "Juego de Tronos"
        const juegoDeTronosElement = await $('=Juego de Tronos');
        const juegoDeTronosContainer = await juegoDeTronosElement.closest('.serie');

        // Dentro de ese contenedor, selecciona el botón "Eliminar"
        const deleteButton = await juegoDeTronosContainer.$('button=Eliminar');
        await deleteButton.click();

        await browser.waitUntil(
            async () => !(await $('=Juego de Tronos').isDisplayed()),
            {
                timeout: 5000,
                timeoutMsg: 'expected Juego de Tronos to be deleted'
            }
        );
    });

    // Prueba de recuperación y muestra de los detalles de una serie específica
    it('recupera y muestra los detalles de una serie específica', async () => {
        await browser.url('http://localhost:3000');
    
        // Espera a que se cargue cualquier serie
        const serieTitle = await $('h2');
        
        // Obtén el título de la serie cargada
        const serieTitleText = await serieTitle.getText();
    
        // Simula el clic en el botón "Ver detalles"
        const viewDetailsButton = await $('button=Ver detalles');
        await viewDetailsButton.click();
    
        // Espera a que se muestren los detalles de la serie
        const titleInDetails = await $(`.serie-details*=Título: ${serieTitleText}`);
        
        // Verifica que el título esté dentro del contenedor de detalles
        await expect(titleInDetails).toBeDisplayed();
    
        // Verifica que se muestren los detalles correctos dentro del contenedor de detalles
        const detailsContainer = await titleInDetails.closest('.serie-details');
        await expect(detailsContainer).toBeDisplayed();
        
        await expect(detailsContainer.$('=Creador: Desconocido')).toBeDisplayed();
        await expect(detailsContainer.$('=Puntuación: 0')).toBeDisplayed();
        await expect(detailsContainer.$('=Canal: Desconocido')).toBeDisplayed();
    
        // Simula el cierre de los detalles
        const closeButton = await detailsContainer.$('button=Cerrar detalles');
        await closeButton.click();
    
        // Verifica que los detalles ya no se muestren
        await expect($(`.serie-details*=Título: ${serieTitleText}`)).not.toBeDisplayed();
    });

    // Prueba de mensaje de error cuando se intenta obtener una serie que no existe
    it('muestra un mensaje de error cuando se intenta obtener una serie que no existe', async () => {
        // Sobrescribe el handler para simular un error 404
        await browser.execute(() => {
            window.fetch = () => Promise.reject({ status: 404, message: "La serie que intentas recuperar no existe" });
        });
    
        await browser.url('http://localhost:3000');
    
        // Espera a que se cargue cualquier serie
        const serieTitle = await $('h2');
    
        // Simula el clic en el botón "Ver detalles"
        const viewDetailsButton = await $('button=Ver detalles');
        await viewDetailsButton.click();
    
        // Espera a que aparezca el mensaje de error
        const errorMessage = await $('=La serie no existe');
        await expect(errorMessage).toBeDisplayed();
    
        // Verifica que no se muestren los detalles de la serie
        await expect($('=Título:')).not.toBeDisplayed();
    });
});