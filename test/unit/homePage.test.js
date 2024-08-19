describe('Home Page', () => {
    beforeAll(async () => {
        // Navega a la URL de tu aplicación React antes de todas las pruebas
        await browser.url('http://localhost:3000'); // Cambia esto a la URL de tu aplicación si es diferente
    });

    it('should load the home page', async () => {
        // Verifica que el título de la página sea el esperado
        const title = await browser.getTitle();
        expect(title).toBe('React App'); // Cambia esto al título esperado de tu aplicación

        // Espera explícita para asegurarse de que el elemento esté presente
        const header = await $('#header');
        await header.waitForDisplayed({ timeout: 10000 }); // Aumenta el tiempo de espera a 10 segundos
        await expect(header).toBeDisplayed();
    });

    it('should display the main heading', async () => {
        // Verifica que el encabezado principal esté presente y tenga el texto correcto
        const mainHeading = await $('h1');
        await mainHeading.waitForDisplayed({ timeout: 5000 });
        const headingText = await mainHeading.getText();
        expect(headingText).toBe('Welcome to React'); // Cambia esto al texto esperado de tu encabezado
    });

    it('should have a functional navigation link', async () => {
        // Verifica que un enlace de navegación esté presente y sea funcional
        const navLink = await $('a[href="/about"]'); // Cambia esto al selector de tu enlace de navegación
        await navLink.waitForDisplayed({ timeout: 5000 });
        await navLink.click();

        // Verifica que la URL cambie después de hacer clic en el enlace
        const url = await browser.getUrl();
        expect(url).toBe('http://localhost:3000/about'); // Cambia esto a la URL esperada después de hacer clic en el enlace
    });

    it('should display a footer', async () => {
        // Verifica que el pie de página esté presente
        const footer = await $('footer');
        await footer.waitForDisplayed({ timeout: 5000 });
        await expect(footer).toBeDisplayed();
    });
});